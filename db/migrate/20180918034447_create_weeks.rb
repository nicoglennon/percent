class CreateWeeks < ActiveRecord::Migration[5.1]
  def change
    create_table :weeks do |t|
      t.string :date
      t.string :percentage

      t.timestamps
    end
  end
end
