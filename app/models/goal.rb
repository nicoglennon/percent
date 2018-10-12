class Goal < ApplicationRecord
  belongs_to :goalable, polymorphic: true

  validates :title, presence: true
end
