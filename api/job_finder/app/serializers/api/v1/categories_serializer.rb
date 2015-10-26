class Api::V1::CategoriesSerializer < ActiveModel::Serializer
  attributes :id, :name, :enabled, :subcategories

  def subcategories
    ActiveModel::ArraySerializer.new(object.children, each_serializer: Api::V1::CategoriesSerializer) 
  end
end
