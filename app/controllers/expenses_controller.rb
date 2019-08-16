require 'json'

class ExpensesController < ApplicationController
  before_action :set_expense, only: [:show, :edit, :update, :destroy]
  before_action :change_amounts_comma_to_dot, only: [:create, :update]
  before_action :authenticate_user!

  # GET /expenses
  def index
    @expenses = Expense.all
  end

  # GET /expenses/1
  def show
  end

  # GET /expenses/new
  def new
    @expense = Expense.new
  end

  # GET /expenses/1/edit
  def edit
  end

  # POST /expenses
  def create
    puts "------------------ #{expense_params}"
    if expense_params.empty?
      redirect_to new_expense_path, alert: 'Error'
      return
    end
    Expense.transaction do
      expense_params.each {|expense| Expense.create(expense)}
    redirect_to new_expense_path, notice: 'Expenses were created'
    end
  end


  # PATCH/PUT /expenses/1
  def update
    if @expense.update(expense_params)
      redirect_to @expense, notice: 'Expense was successfully updated.'
    else
      render :edit
    end
  end

  # DELETE /expenses/1
  def destroy
    @expense.destroy
    redirect_to expenses_url, notice: 'Expense was successfully destroyed.'
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_expense
    @expense = Expense.find(params[:id])
  end

  # Only allow a trusted parameter "white list" through.
  def expense_params
    JSON.parse params.require(:expenses)
  end

  def change_amounts_comma_to_dot
    JSON.parse(params[:expenses]).each {|expense| expense["amount"].gsub!(',', '.')}
  end
end