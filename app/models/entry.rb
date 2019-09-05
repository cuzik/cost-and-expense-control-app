class Entry < ApplicationRecord
  belongs_to :wallet
  belongs_to :place

  enum kind: %i[ debit credit ]

  delegate :kind, to: :wallet, prefix: true
end
