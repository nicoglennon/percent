class Goal < ApplicationRecord
  belongs_to :week

  validates :title, presence: true
end
