class Api::V1::AdvertisementsController < Api::ApiController
  before_action :set_ad, only: [:show, :update, :destroy]
  before_action :set_category, except: [:destroy]
  before_action :authenticate_user!, only: [:create, :update, :destroy]
  before_action :require_owner!, only: [:update, :destroy]


  def index
    if params[:category_id]
      ads = Advertisement.find_active_by_category_ids(@category.subtree_ids)
      render json: ads, each_serializer: Api::V1::AdvertisementsSerializer
    else
      render nothing: true, status: :unprocessable_entity
    end
  end

  def show
    render json: @ad, status: :ok, serializer: Api::V1::AdvertisementsSerializer, root: 'advert'
  end

  def update
    @ad.user = current_user
    @ad.category = @category
    if @ad.update_attributes(advert_params)
      render json: @ad, status: :ok, serializer: Api::V1::AdvertisementsSerializer, root: 'advert'
    else
      render json: @ad, status: :forbidden, serializer: Api::V1::AdvertisementsSerializer, root: 'advert'
    end
  end

  def create
  end

  def destroy
  end

  private

  def set_ad
    @ad = Advertisement.find(params[:id]) if params[:id]
    raise ActiveRecord::RecordNotFound unless @ad
  end

  def set_category
    @category = Category.find(params[:category_id]) if params[:category_id]
    raise ActiveRecord::RecordNotFound unless @category
  end

  def require_owner!
    render nothing: true, status: :unauthorized unless current_user == @ad.user
  end

  def advert_params
    params.require(:advert).permit(:title, :content, :profession, :active, :contact_email, :contact_phone,
                                   :contact_person, :type_of_employment, :expires_at)
  end

end
