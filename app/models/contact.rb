class Contact < ApplicationRecord
    has_many :pet_contacts, dependent: :destroy
    has_many :pets, through: :pet_contacts, dependent: :destroy
end
