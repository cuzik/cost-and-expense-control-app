class AddFieldsToUser < ActiveRecord::Migration[5.2]
  def change
    change_table :users do |t|
      t.string :name, null: false, default: ""
      t.string :cpf, null: false, default: ""
    end

    add_index :users, :cpf, unique: true
  end
end
