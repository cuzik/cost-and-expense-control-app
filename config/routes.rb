Rails.application.routes.draw do
  resource :dashboard, only: [:index]
  resources :entries, only: [:index, :create]
  resources :wallets, only: [:index, :create]

  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root 'dashboard#index'
end
