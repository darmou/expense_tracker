class AuthController < ApplicationController
  def is_signed_in?
    if user_signed_in?
      render :json => {"signed_in" => true, "user" => current_user}.to_json()
    else
      render :json => {"signed_in" => false}.to_json()
    end
 
  end

  def sign_user_out
    user = User.find(params[:user_id])
    sign_out user
    reset_session
    render json: {success: true, signed_in: false}, status: 200
  end
end
