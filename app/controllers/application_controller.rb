class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :configure_devise_params, if: :devise_controller?

  before_action :authenticate_user!

  layout -> { devise_controller? && !user_signed_in? ? 'devise' : 'application' }

  def configure_devise_params
    devise_parameter_sanitizer.permit(:sign_up, keys: [:name, :cpf])
  end
end
