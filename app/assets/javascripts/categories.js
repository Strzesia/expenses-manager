$(document).on('turbolinks:load', function () {
    loadAllCategories();
    $('#new-category-btn, #add-category-btn, #discard-category-btn').on('click', function () {
        $('#new-category-btn, #add-category-div').toggle();
    });
    $('#add-category-btn').on('click', function () {
        let value = $('#add-category-div input').val();
        addCategory(value, null);
    });

    $('body')
        .on('click', '.new-subcategory-btn', function () {
            discardSubcategory($('.discard-subcategory-btn'));
            discardEdit($('.discard-edit-category-btn'));
            showSubcategoryDiv($(this));
        })
        .on('click', '.discard-subcategory-btn', function () {
            discardSubcategory($(this));
        })
        .on('click', '.add-subcategory-btn', function () {
            let id = $(this).closest('.category-div').attr('data-category-id');
            let value = $(this).prev('input').val();
            addCategory(value, id);
        })
        .on('click', '.edit-category-btn', function () {
            discardSubcategory($('.discard-subcategory-btn'));
            discardEdit($('.discard-edit-category-btn'));
            showEditingDiv($(this));
        })
        .on('click', '.discard-edit-category-btn', function () {
            discardEdit($(this));
        })
        .on('click', '.save-category-btn', function () {
            let id = $(this).closest('.category-div').attr('data-category-id');
            let value = $(this).prev('input').val();
            updateCategory(id, value);
        })
        .on('click', '.delete-category-btn', function () {
            let id = $(this).closest('.category-div').attr('data-category-id');
            deleteCategory(id);
        })
});


function loadAllCategories() {
    $.ajax({
        url: "/categories/all-categories",
        type: "get",
        complete: function (data) {
            $('#all-categories').html(data.responseText);
        }
    });
}

function addCategory(value, parent_category_id) {
    $.ajax({
        url: "/categories",
        type: "post",
        data: {
            category: {
                name: value,
                parent_category_id: parent_category_id
            }
        },
        complete: function () {
            loadAllCategories();
            $('#add-category-div input').val('');
        }
    });
}

function updateCategory(id, value) {
    $.ajax({
        url: `/categories/${id}`,
        type: "put",
        data: {
            category: {
                name: value
            }
        },
        complete: function () {
            loadAllCategories();
        }
    });
}

function deleteCategory(id) {
    $.ajax({
        url: `/categories/${id}`,
        type: "delete",
        complete: function () {
            loadAllCategories();
        }
    });
}

function showSubcategoryDiv(obj) {
    obj.hide();
    obj.next().show();
}

function discardSubcategory(obj) {
    obj.closest('.new-subcategory-div').prev().show();
    obj.closest('.new-subcategory-div').hide();
}

function showEditingDiv(obj) {
    obj.hide();
    obj.next('.edit-category-div').show();
}

function discardEdit(obj) {
    obj.parent().hide();
    obj.parent().prev('.edit-category-btn').show();
}