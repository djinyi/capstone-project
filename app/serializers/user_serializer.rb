class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :name, :email, :family_members, :phone_number, :address, :pets, :dob

  has_many :pets
  
  
module Response
  def json_response(object, status = :ok)
      render json: object, status: status
  end
end
end
