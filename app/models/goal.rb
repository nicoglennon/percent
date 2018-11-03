class Goal < ApplicationRecord
  default_scope { order ("created_at ASC") }

  belongs_to :goalable, polymorphic: true

  def to_param
    shortid
  end

end
