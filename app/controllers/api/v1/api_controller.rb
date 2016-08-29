module Api::V1
  class ApiController < ActionController::Base
    #protect_from_forgery with: :null_session
    respond_to :json

    private
    def current_user
      @current_user ||= User.find(doorkeeper_token.resource_owner_id) if doorkeeper_token
    end

    def parse_since
      params[:since] ||= 0
      @since = parse_date params[:since]
    end

    def parse_date(param)
      param.is_a?(ActiveSupport::TimeWithZone) ? param : Time.at(param.to_i).to_datetime
    end

    def current_ability
      @current_ability ||= Ability.new(current_user, params[:id])
    end

    helper_method :current_user
  end
end