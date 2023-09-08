class PetContact < ApplicationRecord
  belongs_to :pet
  belongs_to :contact
end
