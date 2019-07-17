class Category < ApplicationRecord
  belongs_to :user
  belongs_to :parent_category, class_name: "Category", optional: true
  has_many :subcategories, class_name: "Category", foreign_key: "parent_category_id", dependent: :destroy
  has_many :expenses
  validates :name, presence: :true, uniqueness: { case_sensitive: false }
end
