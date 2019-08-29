import React from 'react'

const BalanceCreditCardList = ({ listBalance }) => (
  <div className="list-group">
    {listBalance.map((item, idx) => <BalanceCreditCardItem key={idx} item={item} /> )}
  </div>
)

const BalanceDebitCardList = ({ listBalance }) => (
  <div className="list-group">
    {listBalance.map((item, idx) => <BalanceDebitCardItem key={idx} item={item} /> )}
  </div>
)

const BalanceCreditCardItem = ({ item }) => (
  <a href="#" className="list-group-item list-group-item-action list-group-item-success">
    {item.description}
    <span className='float-right'>
      R$ {item.value}
    </span>
  </a>
)

const BalanceDebitCardItem = ({ item }) => (
  <a href="#" className="list-group-item list-group-item-action list-group-item-danger">
    {item.description}
    <span className='float-right'>
      R$ {item.value}
    </span>
  </a>
)

const CreditCard = ({ listBalance }) => (
  <div className="card">
    <div className="card-header">
      <h5>Crédito</h5>
    </div>
    <div className="card-body">
      <h5 className="card-title">Lista de Créditos</h5>
      <BalanceCreditCardList listBalance={listBalance}/>
    </div>
    <div className="card-footer text-muted">
      alguma coisa
    </div>
  </div>
)

const DebitCard = ({ listBalance }) => (
  <div className="card">
    <div className="card-header">
      <h5>Débito</h5>
    </div>
    <div className="card-body">
      <h5 className="card-title">Lista de Débito</h5>
      <BalanceDebitCardList listBalance={listBalance}/>
    </div>
    <div className="card-footer text-muted">
      alguma coisa
    </div>
  </div>
)

export {
  CreditCard,
  DebitCard
}
