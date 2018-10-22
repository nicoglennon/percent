class Week < ApplicationRecord
  default_scope { order ("created_at DESC") }

  belongs_to :user
  has_many :goals, inverse_of: :goalable, as: :goalable 

  validates :date, presence: true
  validates :percentage, presence: true

  accepts_nested_attributes_for :goals
end
