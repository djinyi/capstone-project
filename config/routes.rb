Rails.application.routes.draw do
  
  resources :users
  resources :contacts
  resources :pets
  resources :pet_contacts

  post "/signup", to: "users#create"
  get "/photographers", to: "users#index"
  get "/me", to: "users#show"
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"
  
end
