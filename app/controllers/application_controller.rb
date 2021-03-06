class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  #protect_from_forgery with: :exception,
  #                     if: proc { request.headers["X-Auth"] != "tutorial_secret" }

  protect_from_forgery with: :null_session 
  before_action :configure_permitted_parameters, if: :devise_controller?

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:name, :provider, :uid])
    #devise_parameter_sanitizer.for(:sign_up) << :name
     #devise_parameter_sanitizer.for(:sign_up) << :provider
     #devise_parameter_sanitizer.for(:sign_up) << :uid
  end
end
