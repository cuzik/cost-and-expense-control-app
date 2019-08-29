class Entry < ApplicationRecord
  belongs_to :wallet

  enum kind: %i[ debit credit ]
end
