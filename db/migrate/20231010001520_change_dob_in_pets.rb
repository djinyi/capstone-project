class ChangeDobInPets < ActiveRecord::Migration[6.1]
  def change
    change_column :pets, :dob, :string
  end
end
