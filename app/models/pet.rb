class Pet < ApplicationRecord
  belongs_to :user
  has_many :pet_contacts, dependent: :destroy
  has_many :contacts, through: :pet_contacts, dependent: :destroy
  has_many_attached :images

  validates :name, presence: true, length: { in: 1..15, message: "must have name at least." }
  validates :dob, presence: true, length: { is:6 }, numericality: { only_integer: true }

  def image_urls
    if images.attached?
      images.map do |image|
        Rails.application.routes.url_helpers.rails_blob_path(image, only_path: true)
      end 
    end
  end

end
