class RenameBirthdayInUsers < ActiveRecord::Migration[6.1]
  def change
    rename_column :users, :birthday, :dob
  end
end
