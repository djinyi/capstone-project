class ContactSerializer < ActiveModel::Serializer
  attributes :id, :name, :organization, :relationship, :phone_number, :address, :email, :notes
end
