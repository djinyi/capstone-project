class Checklist < ApplicationRecord
  belongs_to :user

  validates :to_do, presence: true
end
