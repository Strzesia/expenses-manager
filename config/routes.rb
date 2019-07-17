Rails.application.routes.draw do
  resources :expenses
  resources :categories do
    get 'all-categories', on: :collection
  end
  root to: 'static_pages#home'
  devise_for :users
end
