class CreateGoals < ActiveRecord::Migration[5.1]
  def change
    create_table :goals do |t|
      t.string :title
      t.boolean :completed
      t.string :shortid
      t.belongs_to :goalable, polymorphic: true

      t.timestamps
    end
    add_index :goals, [:goalable_id, :goalable_type]
  end
end
