class CreatePets < ActiveRecord::Migration[6.1]
  def change
    create_table :pets do |t|
      t.string :name
      t.string :breed
      t.string :description
      t.string :picture
      t.string :medical_needs
      t.integer :dob
      t.string :notes
      t.belongs_to :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
