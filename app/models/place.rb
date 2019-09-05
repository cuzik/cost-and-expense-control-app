class Place < ApplicationRecord
  has_many :entries

  belongs_to :user
end
