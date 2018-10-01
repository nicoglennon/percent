class Week < ApplicationRecord
  validates :date, presence: true
  validates :percentage, presence: true

  belongs_to :user
end
