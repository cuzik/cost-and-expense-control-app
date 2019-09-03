import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import { Grid, Segment, Divider, Header, Icon, Button, Container } from 'semantic-ui-react'

import BalanceCard from '../../component/BalanceCard'
import WalletList from '../../component/WalletList'
import { entryList, walletList, entryCreate } from '../../services/requests'
import Navbar from '../../component/Navbar'
import NewEntryModal from '../../component/NewEntryModal'

import 'semantic-ui-css/semantic.min.css'

class DashboardIndex extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      balanceCredit: props.balanceCredit,
      balanceDebit: props.balanceDebit,
      wallets: props.balanceDebit
    }

    this.handleAddNewEntry = this.handleAddNewEntry.bind(this)
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

  handleAddNewEntry(params) {
    entryCreate(params).then((res) => {
      this.setBalanceLists()
    })
  }

  render() {
    return (
      <Grid celled='internally'>
        <Grid.Row>
          <Grid.Column width={16}>
            <Segment>
              <Divider horizontal>
                <Header as='h3'>
                  <Icon name='dashboard' />
                  Dashboard
                </Header>
              </Divider>
            </Segment>
            <Grid columns={2} divided>
              <Grid.Row>
                <Grid.Column width={3}>
                  <WalletList wallets={this.state.wallets}/>
                </Grid.Column>

                <Grid.Column width={13}>
                  <Segment>
                    <Grid>
                      <Grid.Row>
                        <Grid.Column>
                          Bagulho de selecionar o mês / ano
                          <NewEntryModal wallets={this.state.wallets} handleAddNewEntry={this.handleAddNewEntry} />
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>
                  </Segment>
                  <Segment>
                    <Grid columns={3} divided>
                      <Grid.Row>
                        <Grid.Column>
                          <Divider horizontal>
                            <Header as='h4'>
                              <Icon name='exchange' />
                              Recebimentos
                            </Header>
                          </Divider>
                          <BalanceCard listBalance={this.state.balanceCredit} />
                        </Grid.Column>
                        <Grid.Column>
                          <Divider horizontal>
                            <Header as='h4'>
                              <Icon name='exchange' />
                              Pagamentos Previstos
                            </Header>
                          </Divider>
                          <BalanceCard listBalance={this.state.balanceDebit} />
                        </Grid.Column>
                        <Grid.Column>
                          <Divider horizontal>
                            <Header as='h4'>
                              <Icon name='exchange' />
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
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

DashboardIndex.defaultProps = {
  balanceCredit: [],
  balanceDebit: [],
  wallets: []
}

DashboardIndex.propTypes = {
  balanceCredit: PropTypes.arrayOf(PropTypes.shape()),
  balanceDebit: PropTypes.arrayOf(PropTypes.shape()),
  wallets: PropTypes.arrayOf(PropTypes.shape())
}

ReactDOM.render(
  <Navbar contentPage={<DashboardIndex />}/>,
  document.getElementById('dashboard-index')
)
