class Purchase < ApplicationRecord
  has_many :installments

  belongs_to :place
  belongs_to :user
end
