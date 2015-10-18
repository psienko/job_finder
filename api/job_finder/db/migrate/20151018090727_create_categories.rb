class CreateCategories < ActiveRecord::Migration
  def change
    create_table :categories do |t|
      t.string :name, null: false
      t.string :ancestry
      t.text :description, default: ""
      t.boolean :enabled, null: false, default: true 

      t.timestamps null: false
    end
  end
end
