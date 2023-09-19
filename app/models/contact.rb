class Contact < ApplicationRecord
    has_many :pet_contacts, dependent: :destroy
    has_many :pets, through: :pet_contacts, dependent: :destroy

    validates :name, presence: true, length: { in: 1..15, message: "must have name at least." }
    validates :phone_number, length: { is:10 }, numericality: { only_integer: true }
end
