import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Modal from 'react-responsive-modal'

import BalanceCard from '../../component/BalanceCard'
import { entryList } from '../../services/requests'
import NewFormEntry from '../entry/newFormEntry'
import DashboardHeader from './DashboardHeader'

class DashboardIndex extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      balanceCredit: props.balanceCredit,
      balanceDebit: props.balanceDebit,
      openNewModal: false
    }

    this.handleChangeListBalance = this.handleChangeListBalance.bind(this)
  }

  setBalanceLists() {
    entryList().then((res) => {
      const { credit, debit} = res.data.entries

      this.setState({
        balanceCredit: credit,
        balanceDebit: debit
      })
    })
  }

  componentDidMount() {
    this.setBalanceLists()
  }

  handleChangeListBalance() {
    this.onCloseModal()
    this.setBalanceLists()
  }

  onOpenModal = () => {
    this.setState({ openNewModal: true })
  }

  onCloseModal = () => {
    this.setState({ openNewModal: false })
  }

  totalCurrentMonth = () => (
    this.state.balanceCredit.reduce((total, item) => total + item.value, 0) - this.state.balanceDebit.reduce((total, item) => total + item.value, 0)
  )

  render() {
    return (
      <React.Fragment>
        <br />
        <DashboardHeader />
        <br />
        <div className='container'>
          <div className="card">
            <div className="card-header">
              <h5>Balanço atual <button className="float-right btn btn-success" onClick={this.onOpenModal}>Novo Lançamento</button></h5>
            </div>
            <div className='card-body'>
              <div className='row'>
                <div className='col-4'>
                  <h4>Recebimentos</h4>
                  <BalanceCard
                    listBalance={this.state.balanceCredit}
                    itemClasses="list-group-item list-group-item-action list-group-item-success"
                  />
                </div>
                <div className='col-4'>
                  <h4>Pagamentos Previstos</h4>
                  <BalanceCard
                    listBalance={this.state.balanceDebit}
                    itemClasses="list-group-item list-group-item-action list-group-item-warning"
                  />
                </div>
                <div className='col-4'>
                  <h4>Pagamentos Realisados</h4>
                  <BalanceCard
                    listBalance={this.state.balanceDebit}
                    itemClasses="list-group-item list-group-item-action list-group-item-info"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <Modal open={this.state.openNewModal} onClose={this.onCloseModal} center>
          <NewFormEntry handleChangeListBalance={this.handleChangeListBalance}/>
        </Modal>
      </React.Fragment>
    )
  }
}

DashboardIndex.defaultProps = {
  balanceCredit: [],
  balanceDebit: []
}

DashboardIndex.propTypes = {
  balanceCredit: PropTypes.arrayOf(PropTypes.shape()),
  balanceDebit: PropTypes.arrayOf(PropTypes.shape())
}

ReactDOM.render(
  <DashboardIndex />,
  document.getElementById('dashboard-index')
)
