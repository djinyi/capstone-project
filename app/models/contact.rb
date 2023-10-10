class Contact < ApplicationRecord
    has_many :pet_contacts, dependent: :destroy
    has_many :pets, through: :pet_contacts, dependent: :destroy

    validates :name, presence: true, length: { in: 1..15 }
    validates :phone_number, length: { is:10 }, numericality: true
    # validates :pet_id, presence: true
end
