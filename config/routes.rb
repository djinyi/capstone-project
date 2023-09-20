Rails.application.routes.draw do
  
  resources :users
  resources :contacts
  resources :pets
  resources :pet_contacts
  resources :checklists

  post "/signup", to: "users#create"
  get "/photographers", to: "users#index"
  get "/me", to: "users#show"
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"

  post "/:id/pets", to: "users#change"

  post "/:pet_id/contacts", to: "contacts#create_new"
  
end
