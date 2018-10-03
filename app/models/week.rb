class Week < ApplicationRecord
  belongs_to :user
  has_many :goals

  validates :date, presence: true
  validates :percentage, presence: true
end
