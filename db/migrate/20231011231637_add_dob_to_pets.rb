class AddDobToPets < ActiveRecord::Migration[6.1]
  def change
    add_column :pets, :dob, :date
  end
end
