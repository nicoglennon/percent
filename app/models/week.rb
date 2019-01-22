class Week < ApplicationRecord
  default_scope { order ("date DESC") }

  belongs_to :user
  has_many :goals, inverse_of: :goalable, as: :goalable

  validates :date, presence: {message: "of week must be selected" }, uniqueness: { scope: :user_id,
    message: "has already been used for an existing week" }

  validates :percentage, presence: true

  accepts_nested_attributes_for :goals
end
