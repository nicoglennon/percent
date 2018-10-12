class CreateBoards < ActiveRecord::Migration[5.1]
  def change
    create_table :boards do |t|
      t.string :title
      t.references :user, foreign_key: true, null: false

      t.timestamps
    end
  end
end
