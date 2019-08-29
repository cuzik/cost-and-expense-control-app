user = User.create!(
  name: "User de Test",
  email: "user@mail.com",
  cpf: "093.092.619-60",
  password: "nopasswd"
)

Entry.create!(user: user, description: "Luz de Agosto", value: 490.54, kind: :debit, due_date: Time.parse('10-08-2019'))
Entry.create!(user: user, description: "Internet de Agosto", value: 89.26, kind: :debit, due_date: Time.parse('10-08-2019'))
Entry.create!(user: user, description: "Água de Agosto", value: 168.45, kind: :debit, due_date: Time.parse('10-08-2019'))
Entry.create!(user: user, description: "NuBank Agosto", value: 1_893.73, kind: :debit, due_date: Time.parse('08-08-2019'))
Entry.create!(user: user, description: "BB crédito Agosto", value: 649.65, kind: :debit, due_date: Time.parse('11-08-2019'))
Entry.create!(user: user, description: "Pai em Agosto", value: 450.0, kind: :debit, due_date: Time.parse('10-08-2019'))

Entry.create!(user: user, description: "João em Agosto", value: 180.0, kind: :credit, due_date: Time.parse('10-08-2019'))
Entry.create!(user: user, description: "Lucas em Agosto", value: 180.0, kind: :credit, due_date: Time.parse('10-08-2019'))
Entry.create!(user: user, description: "Marcos em Agosto", value: 180.0, kind: :credit, due_date: Time.parse('10-08-2019'))
Entry.create!(user: user, description: "Salário em Agosto", value: 2_000.0, kind: :credit, due_date: Time.parse('05-08-2019'))
