class Entry < ApplicationRecord
  belongs_to :user

  enum kind: %i[ debit credit ]
end
