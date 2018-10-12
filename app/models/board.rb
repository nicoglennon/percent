class Board < ApplicationRecord
  belongs_to :user
  has_many :goals, as: :goalable
end
