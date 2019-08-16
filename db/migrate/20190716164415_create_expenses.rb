class CreateExpenses < ActiveRecord::Migration[5.2]
  def change
    create_table :expenses do |t|
      t.date :date, null: false
      t.decimal :amount, null: false, precision: 100, scale: 2
      t.references :category, foreign_key: true

      t.timestamps
    end
  end
end
