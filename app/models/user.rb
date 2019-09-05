class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  validates :name, presence: true
  validates :cpf, presence: true, uniqueness: { case_sensitive: false }

  has_many :wallets
  has_many :places
  has_many :entries, through: :wallets
end
