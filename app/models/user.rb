class User < ApplicationRecord
    has_many :pets, dependent: :destroy
    has_many :contacts, through: :pets, dependent: :destroy
    has_many :checklist, dependent: :destroy

    has_secure_password

    validates :username, presence: true, uniqueness: true, length: { in: 2..15 }
    validates :phone_number, length: { is:10 }, numericality: true
    validates_format_of :email, with: URI::MailTo::EMAIL_REGEXP
    validates :dob, presence:true

    validate :dob_must_be_valid

  def dob_must_be_valid
    if dob.present? && dob > 18.years.ago.to_date.yesterday
      errors.add(:dob, "must be valid (must be 18 years old at least)")
    end

    if dob.present? && dob < 100.years.ago.to_date
      errors.add(:dob, "must be valid")
    end
  end 
end

