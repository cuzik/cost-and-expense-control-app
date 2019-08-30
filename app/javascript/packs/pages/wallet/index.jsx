import React from 'react'
import ReactDOM from 'react-dom'

import WalletList from '../../component/WalletList'

const WalletIndex = () => (
  <React.Fragment>
    <br />
    <WalletList />
  </React.Fragment>
)

ReactDOM.render(
  <WalletIndex />,
  document.getElementById('wallet-index')
)
