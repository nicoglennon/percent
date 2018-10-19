class Week < ApplicationRecord
  default_scope { order ("created_at DESC") }

  # accepts_nested_attributes_for :goals

  belongs_to :user
  has_many :goals, as: :goalable

  validates :date, presence: true
  validates :percentage, presence: true
end
