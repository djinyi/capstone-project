class CreateChecklists < ActiveRecord::Migration[6.1]
  def change
    create_table :checklists do |t|
      t.string :to_do
      t.belongs_to :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
