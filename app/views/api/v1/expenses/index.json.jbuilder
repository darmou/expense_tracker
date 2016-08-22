# Specify the partial, as well as the name of the variable used in the partial
json.expenses(@expenses, partial: "api/v1/expenses/expense", as: :expense)