module Api
  class ApiController < ActionController::Base
    include DeviseTokenAuth::Concerns::SetUserByToken
    protect_from_forgery with: :null_session
    respond_to :json

    rescue_from ActiveRecord::RecordNotFound do |exception|
      render json: { error: "Not found" }, status: :not_found
    end
  end
end
