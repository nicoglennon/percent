class User < ApplicationRecord
  has_many :weeks

  validates :username, presence: true, uniqueness: :true

  def to_param
    username
  end
end
