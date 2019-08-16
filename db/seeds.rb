# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

admin = User.create(
    id: 1,
    username: 'admin',
    email: 'serdelek.xd@gmail.com',
    password: 'admin123',
    password_confirmation: 'admin123'
)

categories = %w(food car alcohol)
categories.each_with_index do |category, index|
  Category.create(
      id: index + 1,
      name: category,
      user_id: admin.id
  )
  expenses = %w(10 15 20)
  expenses.each do |expense|
    Expense.create(
        date: Date.today,
        amount: expense,
        category_id: index + 1
    )
  end

end
