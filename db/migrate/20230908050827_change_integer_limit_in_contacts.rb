class ChangeIntegerLimitInContacts < ActiveRecord::Migration[6.1]
  def change
    change_column :contacts, :phone_number, :integer, limit: 8
  end
end
