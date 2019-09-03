import React from 'react'
import ReactDOM from 'react-dom'

import WalletList from '../../component/WalletList'
import { walletList } from '../../services/requests'
import Navbar from '../../component/Navbar'

import 'semantic-ui-css/semantic.min.css'

class WalletIndex extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      wallets: props.balanceDebit,
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
    return(
      <WalletList wallets={this.state.wallets}/>
    )
  }
}

ReactDOM.render(
  <Navbar contentPage={<WalletIndex />}/>,
  document.getElementById('wallet-index')
)
