# Create Users

user_01 = User.create!(
  name: "User de Test",
  email: "user@mail.com",
  cpf: "111.111.111-11",
  password: "nopasswd"
)

user_2 = User.create!(
  name: "User de Test",
  email: "user2@mail.com",
  cpf: "222.222.222-22",
  password: "nopasswd"
)

# Your Places

office = Place.create(user: user_01, name: "Office")
tenant = Place.create(user: user_01, name: "Tenant")
state = Place.create(user: user_01, name: "State")
restaurant = Place.create(user: user_01, name: "Restaurant")

# Your Entries

debit_card = Wallet.create!(user: user_01, description: "Wallet credit", kind: :debit_card, amount: 20.0)
credit_card = Wallet.create!(user: user_01, description: "Wallet debit", kind: :credit_card, amount: -200.0)
money_wallet = Wallet.create!(user: user_01, description: "Money", kind: :money, amount: 50.0)

moves = {
  "02/09/2019" => {
    entries: [
      {
        wallet: money_wallet,
        debits: [
          { value: 12.50, place: restaurant, description: "Lunch"},
        ],
        credits: [],
      },
    ],
    transactions: [],
  },
  "03/09/2019" => {
    entries: [
      {
        wallet: money_wallet,
        debits: [
          { value: 12.50, place: restaurant, description: "Lunch"},
        ],
        credits: [],
      },
    ],
    transactions: [],
  },
  "04/09/2019" => {
    entries: [
      {
        wallet: money_wallet,
        debits: [
          { value: 12.50, place: restaurant, description: "Lunch"},
        ],
        credits: [],
      },
    ],
    transactions: [],
  },
  "05/09/2019" => {
    entries: [
      {
        wallet: money_wallet,
        debits: [
          { value: 12.50, place: restaurant, description: "Lunch"},
        ],
        credits: [
          { value: 650.00, place: tenant, description: "Beach House Rent" },
        ],
      },
      {
        wallet: debit_card,
        debits: [
          { value: 156.68, place: state, description: "Electrical Light" },
          { value: 95.90, place: state, description: "Water" },
        ],
        credits: [
          { value: 2000.56, place: office, description: "Salary" },
        ],
      },
    ],
    transactions: [],
  },
  "06/09/2019" => {
    entries: [
      {
        wallet: money_wallet,
        debits: [
          { value: 12.50, place: restaurant, description: "Lunch"},
        ],
        credits: [],
      },
    ],
    transactions: [],
  },
  "09/09/2019" => {
    entries: [
      {
        wallet: money_wallet,
        debits: [
          { value: 12.50, place: restaurant, description: "Lunch"},
        ],
        credits: [],
      },
    ],
    transactions: [],
  },
  "10/09/2019" => {
    entries: [
      {
        wallet: money_wallet,
        debits: [
          { value: 12.50, place: restaurant, description: "Lunch"},
        ],
        credits: [],
      },
    ],
    transactions: [],
  },
  "11/09/2019" => {
    entries: [
      {
        wallet: money_wallet,
        debits: [
          { value: 12.50, place: restaurant, description: "Lunch"},
        ],
        credits: [],
      },
    ],
    transactions: [],
  },
  "12/09/2019" => {
    entries: [
      {
        wallet: money_wallet,
        debits: [
          { value: 12.50, place: restaurant, description: "Lunch"},
        ],
        credits: [],
      },
    ],
    transactions: [],
  },
  "13/09/2019" => {
    entries: [
      {
        wallet: money_wallet,
        debits: [
          { value: 12.50, place: restaurant, description: "Lunch"},
        ],
        credits: [],
      },
    ],
    transactions: [],
  },
  "16/09/2019" => {
    entries: [
      {
        wallet: money_wallet,
        debits: [
          { value: 12.50, place: restaurant, description: "Lunch"},
        ],
        credits: [],
      },
    ],
    transactions: [],
  },
  "17/09/2019" => {
    entries: [
      {
        wallet: money_wallet,
        debits: [
          { value: 12.50, place: restaurant, description: "Lunch"},
        ],
        credits: [],
      },
    ],
    transactions: [],
  },
  "18/09/2019" => {
    entries: [
      {
        wallet: money_wallet,
        debits: [
          { value: 12.50, place: restaurant, description: "Lunch"},
        ],
        credits: [],
      },
    ],
    transactions: [],
  },
  "19/09/2019" => {
    entries: [
      {
        wallet: money_wallet,
        debits: [
          { value: 12.50, place: restaurant, description: "Lunch"},
        ],
        credits: [],
      },
    ],
    transactions: [],
  },
  "20/09/2019" => {
    entries: [
      {
        wallet: money_wallet,
        debits: [
          { value: 12.50, place: restaurant, description: "Lunch"},
        ],
        credits: [],
      },
    ],
    transactions: [],
  },
  "23/09/2019" => {
    entries: [
      {
        wallet: money_wallet,
        debits: [
          { value: 12.50, place: restaurant, description: "Lunch"},
        ],
        credits: [],
      },
    ],
    transactions: [],
  },
  "24/09/2019" => {
    entries: [
      {
        wallet: money_wallet,
        debits: [
          { value: 12.50, place: restaurant, description: "Lunch"},
        ],
        credits: [],
      },
    ],
    transactions: [],
  },
  "25/09/2019" => {
    entries: [
      {
        wallet: money_wallet,
        debits: [
          { value: 12.50, place: restaurant, description: "Lunch"},
        ],
        credits: [],
      },
    ],
    transactions: [],
  },
  "26/09/2019" => {
    entries: [
      {
        wallet: money_wallet,
        debits: [
          { value: 12.50, place: restaurant, description: "Lunch"},
        ],
        credits: [],
      },
    ],
    transactions: [],
  },
  "27/09/2019" => {
    entries: [
      {
        wallet: money_wallet,
        debits: [
          { value: 12.50, place: restaurant, description: "Lunch"},
        ],
        credits: [],
      },
    ],
    transactions: [],
  },
  "30/09/2019" => {
    entries: [
      {
        wallet: money_wallet,
        debits: [
          { value: 12.50, place: restaurant, description: "Lunch"},
        ],
        credits: [],
      },
    ],
    transactions: [],
  },
}

moves.each do |day, entries_groups|
  entries_groups[:entries].each do |wallet_entries|
    wallet = wallet_entries[:wallet]

    wallet_entries[:debits].each do |entry|
      Entry.create!(
        due_date: day,
        value: entry[:value],
        wallet: wallet,
        place: entry[:place],
        description: entry[:description],
        kind: :debit
      )
    end

    wallet_entries[:credits].each do |entry|
      Entry.create!(
        due_date: day,
        value: entry[:value],
        wallet: wallet,
        place: entry[:place],
        description: entry[:description],
        kind: :credit
      )
    end
  end
end
