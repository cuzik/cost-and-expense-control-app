import React from 'react'

const BalanceCardItem = ({ item, itemClasses }) => (
  <a className={itemClasses}>
    {item.description}
    <span className='float-right'>
      R$ {item.value}
    </span>
  </a>
)

const BalanceCardList = ({ listBalance, itemClasses }) => (
  <div className="list-group list-group-flush">
    {listBalance.map((item, idx) => <BalanceCardItem key={idx} item={item} itemClasses={itemClasses} /> )}
  </div>
)

const BalanceCard = ({ listBalance, itemClasses }) => (
  <div>
    <div className="card-balance">
      <BalanceCardList listBalance={listBalance} itemClasses={itemClasses} />
    </div>

    <div className="list-group list-group-flush">
      <a className={itemClasses}>
        <strong>Total</strong>
        <span className='float-right'>
          <strong>R$ {listBalance.reduce((total, item) => total + item.value, 0).toFixed(2)}</strong>
        </span>
      </a>
    </div>
  </div>
)

export default BalanceCard
