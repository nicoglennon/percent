Rails.application.routes.draw do

  root to: "pages#home"
  get '/@:username', :to => 'pages#home'
  get '@:username/weeks/:week_id', :to => 'pages#home'

  namespace :api, defaults: { format: :json } do
    namespace :v1, defaults: { format: :json } do
      resources :users, only: [ :create, :show ] do
        resources :weeks, only: [ :create, :show ]
      end
    end
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
