class AddOrderToGoals < ActiveRecord::Migration[5.1]
  def change
    add_column :goals, :order, :integer, :default => nil
  end
end
