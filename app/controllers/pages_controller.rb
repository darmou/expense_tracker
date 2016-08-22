class PagesController < ApplicationController
  include ReactOnRails::Controller
  before_action :set_expenses

  def index
    # NOTE: The below notes apply if you want to set the value of the props in the controller, as
    # compared to the view. However, it's more convenient to use Jbuilder from the view. See
    # app/views/pages/index.html.erb:20
    #
    #  <%= react_component('App', props: render(template: "/comments/index.json.jbuilder"),
    #     prerender: true) %>
    #
    #
    # NOTE: this could be an alternate syntax if you wanted to pass comments as a variable to a partial
    # @comments_json_sting = render_to_string(partial: "/comments/comments.json.jbuilder",
    #                                         locals: { comments: Comment.all }, format: :json)
    # NOTE: @comments is used by the render_to_string call
    # @comments_json_string = render_to_string("/comments/index.json.jbuilder")
    # NOTE: It's CRITICAL to call respond_to after calling render_to_string, or else Rails will
    # not render the HTML version of the index page properly. (not a problem if you do this in the view)
    # respond_to do |format|
    #   format.html
    # end

    redux_store("routerExpensesStore", props: expenses_json_string)
    render_html
  end

  # Declaring no_router and simple to indicate we have views for them
  def no_router
    redux_store("expensesStore", props: expenses_json_string)
    render_html
  end

  def simple
  end


  private

  def set_expenses
    @expenses = Expense.all.order("id DESC")
  end

  def expenses_json_string
    #@expenes_json_sting = render_to_string(template: "/api/v1/expenses/index.json.jbuilder", locals: { expenses: Expense.all }, format: :json)

    #require 'pry'
    #binding.pry
    render_to_string(template: "/api/v1/expenses/index.json.jbuilder",
                     locals: { expenses: Expense.all }, format: :json)
  end

  def render_html
    respond_to do |format|
      format.html
    end
  end
end
