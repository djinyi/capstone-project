class User < ApplicationRecord
    has_many :pets, dependent: :destroy
    has_many :contacts, through: :pets, dependent: :destroy
    has_many :checklist

    has_secure_password

    validates :username, presence: true, uniqueness: true, length: { in: 2..15 }
    validates :dob, presence: true, length: { is:6, message: "must be 6 numbers, eg. 010100 for January 1st 2000" }
end

