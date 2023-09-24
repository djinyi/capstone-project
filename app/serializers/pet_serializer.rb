class PetSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  attributes :id, :name, :breed, :description, :picture, :medical_needs, :dob, :notes, :contacts, :images

  has_many :contacts

  
end
