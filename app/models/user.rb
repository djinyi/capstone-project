class User < ApplicationRecord
    has_many :pets, dependent: :destroy
    has_many :contacts, through: :pets, dependent: :destroy

    has_secure_password
end
