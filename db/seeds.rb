user = User.create!(
  name: "User de Test",
  email: "user@mail.com",
  cpf: "093.092.619-60",
  password: "nopasswd"
)

outros = Place.create(user: user, name: "Outros")
Place.create(user: user, name: "Mercado")
Place.create(user: user, name: "Fliperama")
Place.create(user: user, name: "Dispesas Casas")
Place.create(user: user, name: "Ifood")
Place.create(user: user, name: "Uber Eats")
Place.create(user: user, name: "Transferência")
Place.create(user: user, name: "Álcool")

nuconta = Wallet.create!(user: user, description: "NuConta", kind: :debit_card, amount: 0)
bbd = Wallet.create!(user: user, description: "B&B Débito", kind: :debit_card, amount: 0)
nubank = Wallet.create!(user: user, description: "NuBank", kind: :credit_card, amount: 0)
bbc = Wallet.create!(user: user, description: "B&B Crédito", kind: :credit_card, amount: 0)
money = Wallet.create!(user: user, description: "Dinheiro Vivo", kind: :money, amount: 0)

Entry.create!(place: outros, wallet: nuconta, description: "João em Agosto", value: 180.77, kind: :credit, due_date: Time.parse('10-09-2019'))
Entry.create!(place: outros, wallet: nuconta, description: "Lucas em Agosto", value: 180.77, kind: :credit, due_date: Time.parse('10-09-2019'))
Entry.create!(place: outros, wallet: nuconta, description: "Marcos em Agosto", value: 180.77, kind: :credit, due_date: Time.parse('10-09-2019'))
Entry.create!(place: outros, wallet: nuconta, description: "Salário em Agosto", value: 2_599.0, kind: :credit, due_date: Time.parse('05-09-2019'))
Entry.create!(place: outros, wallet: nubank, description: "Liberação do crédito", value: 2_000.0, kind: :credit, due_date: Time.parse('05-09-2019'))
Entry.create!(place: outros, wallet: bbc, description: "Liberação do crédito", value: 650.0, kind: :credit, due_date: Time.parse('05-09-2019'))


Entry.create!(place: outros, wallet: nuconta, description: "Aluguél de Agosto", value: 477.78, kind: :debit, due_date: Time.parse('10-09-2019'))
Entry.create!(place: outros, wallet: nuconta, description: "Pai em Agosto", value: 450.0, kind: :debit, due_date: Time.parse('10-09-2019'))
Entry.create!(place: outros, wallet: nuconta, description: "BB crédito Agosto", value: 648.84, kind: :debit, due_date: Time.parse('11-09-2019'))
Entry.create!(place: outros, wallet: nuconta, description: "NuBank Agosto", value: 1_262.92, kind: :debit, due_date: Time.parse('08-09-2019'))

Entry.create!(place: outros, wallet: nubank, description: "Luz de Agosto", value: 465.22, kind: :debit, due_date: Time.parse('10-09-2019'))
Entry.create!(place: outros, wallet: nubank, description: "Internet de Agosto", value: 89.22, kind: :debit, due_date: Time.parse('10-09-2019'))
Entry.create!(place: outros, wallet: nubank, description: "Água de Agosto", value: 168.63, kind: :debit, due_date: Time.parse('10-09-2019'))

Entry.create!(place: outros, wallet: bbc, description: "NuBank Agosto", value: 648.84, kind: :debit, due_date: Time.parse('11-09-2019'))
