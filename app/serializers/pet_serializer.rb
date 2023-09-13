class PetSerializer < ActiveModel::Serializer
  attributes :id, :name, :breed, :description, :picture, :medical_needs, :dob, :notes, :contacts

  has_many :contacts
end
