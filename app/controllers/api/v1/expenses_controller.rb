module Api::V1
  class ExpensesController < ApiController
    def create
      @expense = Expense.new
      @expense.update_attributes(expense_params)

      if @expense.save
        render json: {success: true}, status: 200
      else
        render json: {errors: @expense.errors}, status: 422
      end
    end

    def index
      @expenses = Expense.all.where(:user_id=> params[:user_id]).order(created_at: :desc)
      @string = render_to_string(template: "/api/v1/expenses/index.json.jbuilder",
                      locals: { expenses: @expenses }, format: :json)

      render json: { expenses: JSON.parse(@string)['expenses'].to_json }, status: 200
    end

    def show
      @expense = Expense(params)

    end

    private
    def expense_params
      return params[:expense].permit(:user_id, :title, :expense_type, :amount, :expense_receipt, :description, :expense_receipt, :receipt_url)
    end
  end

end
