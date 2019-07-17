class CreateCategories < ActiveRecord::Migration[5.2]
  def change
    create_table :categories do |t|
      t.string :name, null: false
      t.references :parent_category, index: true, default: "", on_delete: :cascade
      t.references :user, null: false, foreign_key: { on_delete: :cascade }

      t.timestamps
    end

    add_index :categories, :name, unique: true
  end
end