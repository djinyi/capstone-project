class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.string :username
      t.string :password
      t.string :name
      t.string :family_members
      t.string :address
      t.integer :dob
      t.integer :phone_number
      t.string :email

      t.timestamps
    end
  end
end
