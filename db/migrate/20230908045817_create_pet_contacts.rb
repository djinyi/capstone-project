class CreatePetContacts < ActiveRecord::Migration[6.1]
  def change
    create_table :pet_contacts do |t|
      t.belongs_to :pet, null: false, foreign_key: true
      t.belongs_to :contact, null: false, foreign_key: true

      t.timestamps
    end
  end
end
