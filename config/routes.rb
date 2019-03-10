Rails.application.routes.draw do

  root to: "pages#hero"
  get '/@:username', :to => 'pages#app'
  get '/@:username/welcome', :to => 'pages#app'
  get '/@:username/weeks/:week_id', :to => 'pages#app'
  get '/@:username/goals', :to => 'pages#app'
  get '/@:username/analytics', :to => 'pages#app'

  post '/welcome', to: 'api/v1/users#new'
  get '/welcome', to: 'api/v1/users#new'

  get '/settings', to: 'api/v1/users#edit'
  patch '/settings', to: 'api/v1/users#update'

  get '/signup', to: 'api/v1/users#new'
  post '/signup', to: 'api/v1/users#create', as: :register

  get '/login', to: 'api/v1/sessions#new', as: :login
  post '/login', to: 'api/v1/sessions#create'
  delete '/logout', to: 'api/v1/sessions#destroy', as: :logout

  get '/password', to: 'api/v1/password_resets#new', as: :reset_password
  post '/password', to: 'api/v1/password_resets#create'

  namespace :api do
    namespace :v1 do
      resources :sessions, only: [:new, :create, :destroy]
      resources :password_resets, only: [:new, :create, :edit, :update]
      resources :users, only: [ :new, :create, :show, :edit, :update, :destroy ] do
        resources :weeks, only: [ :create, :destroy ] do
          resources :goals, only: [ :create, :update, :destroy ]
        end
        resources :boards, only: [ :create, :update ] do
          resources :goals, only: [ :create, :update, :destroy ]
        end
      end
    end
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
