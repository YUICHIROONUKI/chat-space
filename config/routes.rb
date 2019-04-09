Rails.application.routes.draw do
  devise_for :users
  root 'groups#index'
  resources :users, only: [:edit, :update, :index]
  resources :groups, only: [:create, :edit, :update, :new] do
  resources :messages, only: [:create, :index]
    namespace :api do
      resources :messages, only: :index
    end
  end
end