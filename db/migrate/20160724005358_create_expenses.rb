class CreateExpenses < ActiveRecord::Migration[5.0]
  def change
    create_table :expenses do |t|
      t.decimal :amount
      t.string :type
      t.text :description

      t.timestamps
    end
  end
end
