class ChangeDobInUsers < ActiveRecord::Migration[6.1]
  def change
    change_column :users, :dob, :string
  end
end
