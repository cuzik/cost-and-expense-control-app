class CreateInstallments < ActiveRecord::Migration[5.2]
  def change
    create_table :installments do |t|
      t.string :description, null: false, default: ""
      t.float :value, null: false, default: 0.0
      t.date :due_date

      t.belongs_to :purchase, index: true, null: false

      t.timestamps
    end
  end
end
