class CreateWallets < ActiveRecord::Migration[5.2]
  def change
    create_table :wallets do |t|
      t.string :description, null: false, default: ""
      t.integer :kind, null: false, default: 0
      t.float :amount, null: false, default: 0

      t.belongs_to :user, index: true, null: false

      t.timestamps
    end
  end
end
