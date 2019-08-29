class CreateEntries < ActiveRecord::Migration[5.2]
  def change
    create_table :entries do |t|
      t.string :description, null: false, default: ""
      t.datetime :due_date
      t.float :value, null: false, default: 0.0
      t.integer :kind, null: false, default: 0

      t.belongs_to :user, index: true, null: false

      t.timestamps
    end
  end
end
