class Wallet < ApplicationRecord
  has_many :entries

  belongs_to :user

  enum kind: %i[debit_card credit_card money]
end
