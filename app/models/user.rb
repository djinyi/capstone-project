class User < ApplicationRecord
    has_many :pets, dependent: :destroy
    has_many :contacts, through: :pets, dependent: :destroy

    has_secure_password

    validates :username, presence: true, uniqueness: true, length: { in: 2..15 }
    validates :password, presence: true, length: { minimum: 8 }
    validates :dob, length: { is:6 }, numericality: { only_integer: true, message: "must be 8 numbers only" }
    validates :phone_number, length: { is:10 }, numericality: { only_integer: true }
end

