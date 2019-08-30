import React from 'react'
import PropTypes from 'prop-types'

import { walletList } from '../services/requests'

const classItem = (item) => {
  if (item.kind == 'credit_card') {
    return 'bg-warning'
  } else if (item.kind == 'debit_card') {
    return 'bg-info'
  } else if (item.kind == 'money') {
    return 'bg-success'
  }

  return 'secundary'
}

const WalletItem = ({ item }) => (
  <div className="col-4">
    <div className={"card " + classItem(item)}>
      <div className="card-header">
        {item.description}
      </div>
      <div className="card-body">
        <ul>
          <li> Saldo Anterior: <span className='float-right'> R$ {item.previous_balance} </span></li>
          <li> Recebiso: <span className='float-right'> R$ {item.credited} </span></li>
          <li> Gasto: <span className='float-right'> R$ - {item.debited} </span></li>
        </ul>
      </div>
      <div className="card-footer">
        Totol: <span className='float-right'> R$ {item.credited - item.debited} </span>
      </div>
    </div>
  </div>
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
      <div className="row">
        {this.state.wallets.map((item) => <WalletItem key={item.id} item={item} /> )}
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
