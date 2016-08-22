class RenameTypeToExpenseTypeForExpenses < ActiveRecord::Migration[5.0]
  def change
    rename_column :expenses, :type, :expense_type
  end
end
