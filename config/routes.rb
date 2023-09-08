Rails.application.routes.draw do
  
  resources :users
  resources :contacts
  resources :pets
  resources :pet_contacts
  
end
