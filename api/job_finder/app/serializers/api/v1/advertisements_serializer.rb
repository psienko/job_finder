class Api::V1::AdvertisementsSerializer < ActiveModel::Serializer
  attributes :id, :title, :content, :profession, :active, :contact_email, :contact_phone,
             :contact_person, :type_of_employment, :expires_at, :created_at, :updated_at,
             :category, :user, :errors, :full_error_messages

  def category
    object.category.slice(:id, :name) if object.category
  end

  def user
    object.user.fullname if object.user
  end

  def errors
    object.errors.messages if object.errors.any?
  end

  def full_error_messages
    object.errors.full_messages if object.errors.any?
  end

  private

  def attributes
    return super.except(:errors, :full_error_messages) unless object.errors.any?
    super
  end
end
