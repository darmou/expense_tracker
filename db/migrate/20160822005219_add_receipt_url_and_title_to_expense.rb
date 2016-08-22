class AddReceiptUrlAndTitleToExpense < ActiveRecord::Migration[5.0]
  def change
    add_column :expenses, :title, :string
    add_column :expenses, :receipt_url, :string
  end
end
