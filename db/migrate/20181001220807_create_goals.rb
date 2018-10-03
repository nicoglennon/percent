class CreateGoals < ActiveRecord::Migration[5.1]
  def change
    create_table :goals do |t|
      t.string :title
      t.boolean :completed
      t.references :week, foreign_key: true, null: false

      t.timestamps
    end
  end
end
