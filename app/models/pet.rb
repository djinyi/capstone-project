class Pet < ApplicationRecord
  belongs_to :user
  has_many :pet_contacts, dependent: :destroy
  has_many :contacts, through: :pet_contacts, dependent: :destroy
  has_many_attached :images

  validates :name, presence: true, length: { in: 1..15 }
  validates :dob, presence: true, length: { is:6, message: "must be 6 numbers, eg. 010100 for January 1st 2000" }

  def image_urls
    if images.attached?
      images.map do |image|
        Rails.application.routes.url_helpers.rails_blob_path(image, only_path: true)
      end 
    end
  end

end
