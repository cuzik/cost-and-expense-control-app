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
  <div className="list-group">
    {listBalance.map((item, idx) => <BalanceCardItem key={idx} item={item} itemClasses={itemClasses} /> )}
  </div>
)

const BalanceCard = ({ listBalance, itemClasses, title='Balance', subtitle='Lista Balance' }) => (
  <div className="card">
    <div className="card-header">
      <h5>{title}</h5>
    </div>
    <div className="card-body">
      <h5 className="card-title">{subtitle}</h5>
      <BalanceCardList listBalance={listBalance} itemClasses={itemClasses} />
    </div>

    <div className="card-footer">
      <div className="list-group">
        <a className={itemClasses}>
          Total
          <span className='float-right'>
            R$ {listBalance.reduce((total, item) => total + item.value, 0)}
          </span>
        </a>
      </div>
    </div>
  </div>
)

export default BalanceCard
