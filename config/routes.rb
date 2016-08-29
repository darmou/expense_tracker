Rails.application.routes.draw do
  devise_for :users
  scope :auth do
    get 'is_signed_in', to: 'auth#is_signed_in?'
    post 'sign_user_out', to: 'auth#sign_user_out'
  end

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  # Serve websocket cable requests in-process
  # mount ActionCable.server => '/cable'

  root "pages#index"

  get "simple", to: "pages#simple"
  get "no-router", to: "pages#no_router"

  get "expenses(/*all)", to: "pages#index"

  # React Router needs a wildcard
  get "react-router(/*all)", to: "pages#index"


  namespace :api, :defaults => { :format => :json } do
    namespace :v1 do
      resources :expenses do
      end
    end
  end


  resources :comments
end
