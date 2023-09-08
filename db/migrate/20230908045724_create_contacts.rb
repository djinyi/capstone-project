class CreateContacts < ActiveRecord::Migration[6.1]
  def change
    create_table :contacts do |t|
      t.string :name
      t.string :organization
      t.string :relationship
      t.integer :phone_number
      t.string :address
      t.string :email
      t.string :notes

      t.timestamps
    end
  end
end
