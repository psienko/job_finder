class Api::V1::CategoriesController < Api::ApiController
  def index
    render json: Category.roots, each_serializer: Api::V1::CategoriesSerializer
  end
end
