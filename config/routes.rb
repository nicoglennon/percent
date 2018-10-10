Rails.application.routes.draw do

  root to: "pages#home"
  get '/@:username', :to => 'pages#home'
  get '@:username/weeks/:week_id', :to => 'pages#home'
  get '/login', :to => 'pages#home'
  get '/register', :to => 'pages#home'

  get '/signup', to: 'api/v1/users#new', as: :signup
  post '/signup', to: 'api/v1/users#create'

  namespace :api do
    namespace :v1 do
      resources :users, only: [ :new, :create, :show ] do
        resources :weeks, only: [ :create, :show ]
      end
    end
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
