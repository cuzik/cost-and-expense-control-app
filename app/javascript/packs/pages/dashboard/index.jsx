import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import { Grid, Segment, Divider, Header, Icon } from 'semantic-ui-react'

import BalanceCard from '../../component/BalanceCard'
import WalletList from '../../component/WalletList'
import { entryList, walletList } from '../../services/requests'

import 'semantic-ui-css/semantic.min.css'

class DashboardIndex extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      balanceCredit: props.balanceCredit,
      balanceDebit: props.balanceDebit,
      wallets: props.balanceDebit,
    }
  }

  setBalanceLists() {
    entryList().then((res) => {
      const { credit, debit } = res.data.entries

      this.setState({
        balanceCredit: credit,
        balanceDebit: debit
      })
    })
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
    this.setBalanceLists()
    this.setWalletLists()
  }

  render() {
    return (
      <Grid columns={2} divided>
        <Grid.Row stretched>
          <Grid.Column width={3}>
            <Segment>
              Alguma coisa
            </Segment>
          </Grid.Column>
          <Grid.Column width={13}>
            <Segment>
              <h4>
                Dashboard
              </h4>
            </Segment>
            <Segment>
              <WalletList wallets={this.state.wallets}/>
            </Segment>
            <Segment>
              <Grid columns={3} divided>
                <Grid.Row>
                  <Grid.Column>
                    <Divider horizontal>
                      <Header as='h4'>
                        <Icon name='bar chart' />
                        Recebimentos
                      </Header>
                    </Divider>
                    <BalanceCard listBalance={this.state.balanceCredit} />
                  </Grid.Column>
                  <Grid.Column>
                    <Divider horizontal>
                      <Header as='h4'>
                        <Icon name='bar chart' />
                        Pagamentos Previstos
                      </Header>
                    </Divider>
                    <BalanceCard listBalance={this.state.balanceDebit} />
                  </Grid.Column>
                  <Grid.Column>
                    <Divider horizontal>
                      <Header as='h4'>
                        <Icon name='bar chart' />
                        Pagamentos Realisados
                      </Header>
                    </Divider>
                    <BalanceCard listBalance={this.state.balanceDebit} />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

DashboardIndex.defaultProps = {
  balanceCredit: [],
  balanceDebit: [],
  wallets: [],
}

DashboardIndex.propTypes = {
  balanceCredit: PropTypes.arrayOf(PropTypes.shape()),
  balanceDebit: PropTypes.arrayOf(PropTypes.shape()),
  wallets: PropTypes.arrayOf(PropTypes.shape())
}

ReactDOM.render(
  <DashboardIndex />,
  document.getElementById('dashboard-index')
)
