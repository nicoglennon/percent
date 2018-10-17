class Goal < ApplicationRecord
  default_scope { order ("created_at ASC") }

  belongs_to :goalable, polymorphic: true
  validates :title, presence: true

end
