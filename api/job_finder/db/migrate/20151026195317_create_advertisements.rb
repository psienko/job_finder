class CreateAdvertisements < ActiveRecord::Migration
  def change
    create_table :advertisements do |t|
      t.string :title
      t.text :content
      t.string :profession
      t.boolean :active
      t.string :contact_email
      t.string :contact_phone
      t.string :contact_person
      t.string :type_of_employment
      t.datetime :expires_at
      t.references :category, index: true, foreign_key: true
      t.references :user, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
