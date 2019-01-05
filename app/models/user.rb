require 'digest'

class User < ApplicationRecord
  attr_accessor :skip_password
  
  authenticates_with_sorcery!

  before_save :downcase_username_and_email

  has_many :weeks, dependent: :destroy
  has_many :boards, dependent: :destroy

  validates :username, presence: true, uniqueness: :true, length: { minimum: 2, maximum: 35 }
  validates :password, length: { minimum: 3 }, confirmation: true, unless: :skip_password
  validates :email, presence: true, uniqueness: true, email_format: { message: 'has invalid format' }
  validate :username_has_no_special_characters

  def lower_case_md5_hashed_email
    Digest::MD5.hexdigest(self.email.downcase)
  end 

  private

  def to_param
    username
  end

  def downcase_username_and_email
    self.username.downcase!
    self.email.downcase!
  end

  def username_has_no_special_characters
    regex_pattern = /^[a-zA-Z0-9]+$/
    if !regex_pattern.match?(username)
      errors.add(:username, "can't have special characters - please use letters and numbers only")
    end
  end

end
