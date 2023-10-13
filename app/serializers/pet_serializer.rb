class PetSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  attributes :id, :name, :breed, :description, :picture, :medical_needs, :notes, :contacts, :image_urls, :dob
  
  has_many :contacts

  def images
    rails_blob_path(object.images, only_path:true) if object.images.attached?
  end

end
