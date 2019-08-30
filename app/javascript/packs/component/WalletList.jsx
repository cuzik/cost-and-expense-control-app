import React from 'react'
import PropTypes from 'prop-types'

import { walletList } from '../services/requests'

const classItem = (item) => {
  if (item.kind == 'credit_card') {
    return 'table-warning'
  } else if (item.kind == 'debit_card') {
    return 'table-info'
  } else if (item.kind == 'money') {
    return 'table-success'
  }

  return 'table-secundary'
}

const WalletItem = ({ item }) => (
  <tr className={classItem(item)}>
    <td> {item.description} </td>
    <td> R$ {item.previous_balance} </td>
    <td> R$ {item.credited} </td>
    <td> R$ {item.debited} </td>
    <td> R$ {(item.credited - item.debited + item.previous_balance).toFixed(2)} </td>
  </tr>
)

class WalletList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      wallets: props.wallets,
    }
  }

  setWalletLists() {
    walletList().then((res) => {
      const { wallets} = res.data

      this.setState({
        wallets
      })
    })
  }

  componentDidMount() {
    this.setWalletLists()
  }

  render() {
    return (
      <div className="container">
        <div className="card">
          <div className="card-header">
            <h5>Carteiras</h5>
          </div>
          <div className="card-body">
            <table className="table table-bordered table-sm">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Anterior</th>
                  <th>Recebido</th>
                  <th>Gasto</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {this.state.wallets.map((item) => <WalletItem key={item.id} item={item} /> )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}

WalletList.defaultProps = {
  wallets: []
}

WalletList.propTypes = {
  wallets: PropTypes.arrayOf(PropTypes.shape())
}

export default WalletList
