module API::V1
  class ExpenseController < ApiController
    def create
      @expense = Expense.new
      @expense.update_attributes(params)

      if @expense.save
        render json: {success: true}, status: 200
      else
        render json: {errors: @expense.errors}, status: 422
      end
    end

    def index
      @expenses = Expense.all.where(:username=> params[:username])
      render json: { expenses: @expenses.to_json}, status: 200
    end

    def show
      @expense = Expense(params)

    end

    private
    def expense_params
      return params[:expense].permit(:user_id, :title, :expense_type, :amount, :description, :expense_receipt, :receipt_url)
    end
  end

end
