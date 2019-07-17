class CategoriesController < ApplicationController
  before_action :set_category, only: [:show, :edit, :update, :destroy]
  before_action :authenticate_user!

  # GET /categories
  def index
  end

  def all_categories
    @categories = Category.where(parent_category: nil)
    render partial: 'all_categories'
  end

  # GET /categories/1
  def show
  end

  # GET /categories/new
  def new
    @category = Category.new
  end

  def new_subcategory
    @parent_category = Category.find(params[:id])
    @category = Category.new
  end

  # GET /categories/1/edit
  def edit
  end

  # POST /categories
  def create
    @category = Category.new(category_params)
    @category.user = current_user

    @category.save
  end

  def create_subcategory
    @category = Category.new(category_params)
    @category.user = current_user

    @category.save
  end

  # PATCH/PUT /categories/1
  def update
    @category.update(category_params)
    respond_to do |f|
      f.js
    end
  end

  # DELETE /categories/1
  def destroy
    @category.destroy
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_category
    @category = Category.find(params[:id])
  end

  # Only allow a trusted parameter "white list" through.
  def category_params
    params.require(:category).permit(:name, :parent_category_id)
  end
end
