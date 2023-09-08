class Pet < ApplicationRecord
  belongs_to :user
  has_many :pet_contacts, dependent: :destroy
  has_many :contacts, through: :pet_contacts, dependent: :destroy
end
