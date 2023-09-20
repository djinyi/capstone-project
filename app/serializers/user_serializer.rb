class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :name, :dob, :email, :family_members, :phone_number, :address, :pets

  has_many :pets
  
end
