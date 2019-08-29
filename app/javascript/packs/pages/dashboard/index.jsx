import React from 'react'
import ReactDOM from 'react-dom'

import { CreditCard, DebitCard } from '../../component/BalanceCard'

const balanceCredit = [
  {
    description: "Item 1",
    value: 50.00
  },
  {
    description: "Item 2",
    value: 67.00
  },
  {
    description: "Item 3",
    value: 43.00
  },
  {
    description: "Item 3",
    value: 43.00
  },
  {
    description: "Item 3",
    value: 43.00
  },
  {
    description: "Item 3",
    value: 43.00
  },
  {
    description: "Item 4",
    value: 2000.00
  }
]

const balanceDebit = [
  {
    description: "Item 1",
    value: 43.00
  },
  {
    description: "Item 2",
    value: 123.00
  },
  {
    description: "Item 3",
    value: 89.00
  },
  {
    description: "Item 4",
    value: 91283.00
  }
]

class DashboardIndex extends React.Component {
  render() {
    return (
      <div className='container'>
        <div className='row'>
          <h4>Balanço atual</h4>
        </div>
        <div className='row'>
          <div className='col-6'>
            <CreditCard listBalance={this.props.balanceCredit} />
          </div>
          <div className='col-6'>
            <DebitCard listBalance={this.props.balanceDebit} />
          </div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(
  <DashboardIndex balanceCredit={balanceCredit} balanceDebit={balanceDebit}/>,
  document.getElementById('dashboard-index')
)
