class Advertisement < ActiveRecord::Base
  belongs_to :user
  belongs_to :category

  validates_presence_of :title, :content

  scope :find_active_by_category_ids, -> (ids) { where(category_id: ids, active: true) }
end
