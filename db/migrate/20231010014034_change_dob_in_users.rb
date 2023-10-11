class ChangeDobInUsers < ActiveRecord::Migration[6.1]
  def up
    remove_column :users, :dob 
  end

  def down
    change_column :users, :dob, :string
  end
end
