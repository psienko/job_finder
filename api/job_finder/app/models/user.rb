class User < ActiveRecord::Base
  # Include default devise modules.
  devise :database_authenticatable, :registerable,
          :recoverable, :rememberable, :trackable, :validatable,
          :omniauthable #:confirmable
  include DeviseTokenAuth::Concerns::User

  validates :email, uniqueness: true

  has_many :advertisements

  def fullname
    "#{name.to_s.humanize} #{lastname.to_s.humanize}"
  end
end
