Rails.application.routes.draw do
  devise_for :users
	resources :users, only: [:edit, :update]
	resources :groups, only: [:create, :edit, :update, :new] do
	resources :messages, only: [:create, :index]
end
root 'groups#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
