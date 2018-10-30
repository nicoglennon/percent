class Week < ApplicationRecord
  default_scope { order ("date DESC") }

  belongs_to :user
  has_many :goals, inverse_of: :goalable, as: :goalable

  validates :date, presence: true, uniqueness: true
  validates :percentage, presence: true

  accepts_nested_attributes_for :goals
end
