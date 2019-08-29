import React from 'react'
import ReactDOM from 'react-dom'

import BalanceCard from '../../component/BalanceCard'
import { balanceCredit, balanceDebit } from '../../moks/dashboard/index'

class DashboardIndex extends React.Component {
  render() {
    return (
      <div className='container'>
        <div className='row'>
          <h4>Balanço atual</h4>
        </div>
        <div className='row'>
          <div className='col-6'>
            <BalanceCard
              listBalance={this.props.balanceCredit}
              itemClasses="list-group-item list-group-item-action list-group-item-success"
              title="Crédito"
              subtitle="Lista de Crédito"
            />
          </div>
          <div className='col-6'>
            <BalanceCard
              listBalance={this.props.balanceDebit}
              itemClasses="list-group-item list-group-item-action list-group-item-danger"
              title="Crédito"
              subtitle="Lista de Crédito"
            />
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
