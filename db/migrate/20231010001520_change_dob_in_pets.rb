class ChangeDobInPets < ActiveRecord::Migration[6.1]
  def up
    remove_column :pets, :dob
  end

  def down
    change_column :pets, :dob, :string
  end
end
