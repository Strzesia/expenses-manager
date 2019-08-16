require 'test_helper'

class ExpensesControllerTest < ActionDispatch::IntegrationTest
  include Devise::Test::IntegrationHelpers

  setup do
    sign_in users(:admin)
  end

  test "should create expense" do
    assert_difference('Expense.count', 3) do
      post expenses_url, params: expenses_params
    end
  end

  test "should return error if expenses are empty" do
    post expenses_url, params: {'expenses'=>'[]'}
    follow_redirect!
    assert_includes(response.body, '<p id="alert">Error</p>')
  end

  private

  def expenses_params
    {"expenses" => "[{\"date\":\"2019-08-07T22:00:00.000Z\",\"amount\":\"4\",\"category_id\":\"2\"},{\"date\":\"2019-08-07T22:00:00.000Z\",\"amount\":\"5\",\"category_id\":\"2\"},{\"date\":\"2019-08-07T22:00:00.000Z\",\"amount\":\"6\",\"category_id\":\"2\"}]"}
  end

  def formatted_params
    expenses_params.values[0].values.each {|val| val.values}
  end
end
