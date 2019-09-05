class CreatePlaces < ActiveRecord::Migration[5.2]
  def change
    create_table :places do |t|
      t.string :name, null: false, default: ""

      t.belongs_to :user, index: true, null: false

      t.timestamps
    end
  end
end
