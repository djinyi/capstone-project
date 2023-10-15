class Pet < ApplicationRecord
  belongs_to :user
  has_many :pet_contacts, dependent: :destroy
  has_many :contacts, through: :pet_contacts, dependent: :destroy
  has_many_attached :images

  validates :name, presence: true, length: { in: 1..15 }
  validates :dob, presence:true

  validate :dob_must_be_valid

  def dob_must_be_valid
    if dob.present? && dob > Date.yesterday
      errors.add(:dob, "must be valid")
    end

    if dob < 100.years.ago.to_date
      errors.add(:dob, "must be valid")
    end
  end 

  def image_urls
    if images.attached?
      images.map do |image|
        Rails.application.routes.url_helpers.rails_blob_path(image, only_path: true)
      end 
    end
  end

end
