class AddExpenseReceiptToExpense < ActiveRecord::Migration[5.0]
  def change
    add_column :expenses, :expense_receipt, :string
  end
end
