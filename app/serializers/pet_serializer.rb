class PetSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  attributes :id, :name, :breed, :description, :picture, :medical_needs, :dob, :notes, :contacts, :image_urls
  # attributes :id, :name, :breed, :description, :picture, :medical_needs, :dob, :notes, :contacts, :images
  
  has_many :contacts

  def images
    rails_blob_path(object.images, only_path:true) if object.images.attached?
  end

end
