class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :null_session #, if: Proc.new { |c| binding.pry; c.request.format == 'application/json' }
  #protect_from_forgery with: :exception, unless: Proc.new { |c| c.request.format == 'application/json' }

  before_action :configure_permitted_parameters, if: :devise_controller?
  def configure_permitted_parameters
    devise_parameter_sanitizer.for(:sign_up).concat [:name, :phone_number, :email, 
        :password, :password_confirmation, :confirm_success_url, :nickname, :lastname]
    devise_parameter_sanitizer.for(:account_update).concat [:name, :phone_number, :email, 
        :password, :password_confirmation, :current_password, :confirm_success_url, :nickname, :lastname]
  end
end
