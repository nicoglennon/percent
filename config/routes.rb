Rails.application.routes.draw do

  root to: "pages#hero"
  get '/@:username', :to => 'pages#app'
  get '@:username/weeks/:week_id', :to => 'pages#app'

  post '/welcome', to: 'api/v1/users#new'
  get '/welcome', to: 'api/v1/users#new'


  get '/signup', to: 'api/v1/users#new', as: :signup
  post '/signup', to: 'api/v1/users#create'

  get '/login', to: 'api/v1/sessions#new', as: :login
  post '/login', to: 'api/v1/sessions#create'
  delete '/logout', to: 'api/v1/sessions#destroy', as: :logout

  namespace :api do
    namespace :v1 do
      resources :sessions, only: [:new, :create, :destroy]
      resources :users, only: [ :new, :create, :show ] do
        resources :weeks, only: [ :create, :show ]
      end
    end
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
