let expenses = [];

$(document).on('turbolinks:load', function () {
    $('#expense_amount').on('input', function () {
        if ($(this)[0].validity.valid) {
            $(this).next('.form-error').text('');
            $(this).next('.form-error').attr('class', 'form-error');
            $(this).removeClass('input-error');
        } else {
            $(this).next($('.form-error')).text('Please enter a correct amount. It should be in format "1,12" or "1"');
            $(this).next($('.form-error')).attr('class', 'form-error active');
            $(this).addClass('input-error');
        }
    });
    $('#expenses-form').on('change', $('#selectCategory'), function () {
        if ($('#selectCategory').val()) {
            $('#selectCategory').closest('.field').find('.form-error').text('');
            $('#selectCategory').closest('.field').find('.selectize-input').removeClass('input-error');
        } else {
            $('#selectCategory').closest('.field').find('.form-error').text('Please select category');
            $('#selectCategory').closest('.field').find('.selectize-input').addClass('input-error');
        }
    });
    $('#add-expense-btn').on('click', function () {
        let hasError = false;
        if (!$('#expense_amount')[0].validity.valid) {
            $('#expense_amount').next($('.form-error')).text('Please enter a correct amount. It should be in format "1,12" or "1"');
            $('#expense_amount').next($('.form-error')).attr('class', 'form-error active');
            $('#expense_amount').addClass('input-error');
            hasError = true;
        }
        if (!$('#selectCategory').val()) {
            $('#selectCategory').closest('.field').find('.form-error').text('Please select category');
            $('#selectCategory').closest('.field').find('.form-error').attr('class', 'form-error active');
            $('#selectCategory').closest('.field').find('.selectize-input').addClass('input-error');
            hasError = true;
        }
        if (hasError) {
            return;
        }
        let year = $('#expense_date_1i').val();
        let month = $('#expense_date_2i').val();
        let day = $('#expense_date_3i').val();
        let date = new Date(year, month - 1, day);
        let id = $('.selectize').val();
        let name = $('.selectize').find('.item')[0].innerHTML;
        let category = new Category(id, name);
        let amount = $('#expense_amount').val();
        addExpense(date, category, amount);
    });
    $('#expense_amount').on('keypress', function (e) {
        if (e.which == 13) {
            $('#add-expense-btn').click();
        }
    });
    $('#create-expenses').on('click', function () {
        sendExpenses();
    });
    $(document).on('click', '.delete-expense', function () {
        console.log(expenses);
        let index = $(this).parent().index();
        expenses.splice(index, 1);
        $(this).parent().remove();
    });
});

function addExpense(date, category, amount) {
    let expense = new Expense(date, category, amount);
    expenses.push(expense);
    $('#expenses').append(
        $('<div>', {class: 'expense-div'})
            .append(
                $('<div>', {class: 'expense-date'}).text(date.toLocaleDateString())
            )
            .append(
                $('<div>', {class: 'expense-category'}).text(category.name)
            )
            .append(
                $('<div>', {class: 'expense-amount'}).text(amount)
            )
            .append(
                $('<button>', {class: 'delete-expense'}).text('delete')
            )
    );
    clearData();
    $('#expense_amount').focus();
}

function sendExpenses() {
    expenses.map(function (expense) {
        expense['category_id'] = expense['category']['id'];
        delete expense.category;
        return expense;
    });
    $.ajax({
        method: 'post',
        url: '/expenses',
        data: {expenses: JSON.stringify(expenses)},
        complete: function () {
            // location.reload();
        }
    });
    expenses = [];
}

function clearData() {
    $('#expense_amount').val('');
}