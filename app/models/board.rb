class Board < ApplicationRecord
  belongs_to :user
  has_many :goals, as: :goalable, dependent: :destroy

  accepts_nested_attributes_for :goals
end
