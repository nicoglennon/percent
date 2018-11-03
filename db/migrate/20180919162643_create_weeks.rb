class CreateWeeks < ActiveRecord::Migration[5.1]
  def change
    create_table :weeks do |t|
      t.string :date, null: false
      t.string :percentage, null: false
      t.references :user, foreign_key: true, null: false

      t.timestamps
    end
  end
end
