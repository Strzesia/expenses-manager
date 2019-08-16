class Expense < ApplicationRecord
  belongs_to :category
  validates :date, presence: true
end
