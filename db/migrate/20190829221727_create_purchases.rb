class CreatePurchases < ActiveRecord::Migration[5.2]
  def change
    create_table :purchases do |t|
      t.string :description, null: false, default: ""
      t.datetime :acquisition_date

      t.belongs_to :user, index: true, null: false

      t.timestamps
    end
  end
end
