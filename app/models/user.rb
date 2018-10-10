class User < ApplicationRecord
  authenticates_with_sorcery!
  has_many :weeks

  validates :username, presence: true, uniqueness: :true
  validates :password, length: { minimum: 3 }
  validates :password, confirmation: true
  validates :email, presence: true, uniqueness: true, email_format: { message: 'has invalid format' }

  def to_param
    username
  end
end
