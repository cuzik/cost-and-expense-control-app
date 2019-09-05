import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import moment from 'moment'

import { Grid, Segment, Divider, Header, Icon, Form, Input, Button } from 'semantic-ui-react'

import BalanceCard from '../../component/BalanceCard'
import WalletsCard from '../../component/WalletsCard'
import { entries, wallets, entryCreate, places } from '../../services/requests'
import Navbar from '../../component/Navbar'
import NewEntryModal from '../../component/NewEntryModal'

import 'semantic-ui-css/semantic.min.css'

class DashboardIndex extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      places: [],
      balanceCredit: props.balanceCredit,
      balanceDebit: props.balanceDebit,
      balanceExpected: props.balanceExpected,
      wallets: [],
      starts_on: moment().startOf('month').format('YYYY-MM-DD'),
      ends_on: moment().endOf('month').format('YYYY-MM-DD'),
    }

    this.handleAddNewEntry = this.handleAddNewEntry.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  setBalanceLists() {
    const params = {
      starts_on: this.state.starts_on,
      ends_on: this.state.ends_on
    }

    entries(params).then((res) => {
      const { credit, debit, expected } = res.data.entries

      this.setState({
        balanceCredit: credit,
        balanceDebit: debit,
        balanceExpeted: expected
      })
    })
  }

  setPlaces() {
    places().then((res) => {
      const { places } = res.data

      this.setState({
        places
      })
    })
  }

  setWallets() {
    wallets().then((res) => {
      const { wallets} = res.data

      this.setState({
        wallets
      })
    })
  }

  componentDidMount() {
    this.setBalanceLists()
    this.setWallets()
    this.setPlaces()
  }

  handleAddNewEntry(params) {
    entryCreate(params).then((res) => {
      this.setBalanceLists()
    })
  }

  handleInputChange(event, { name, value }) {
    this.setState({ [name]: value })
  }

  handleSubmit(event) {
    console.log(this.state.starts_on, this.state.ends_on)
    this.setBalanceLists()
  }

  render() {
    return (
      <Grid celled='internally'>
        <Grid.Row>
          <Grid.Column width={16}>
            <Segment>
              <Divider horizontal> <Header as='h3'> <Icon name='dashboard' /> Dashboard </Header> </Divider>
            </Segment>
            <Grid columns={2} divided>
              <Grid.Row>
                <Grid.Column width={3}>
                  <WalletsCard wallets={this.state.wallets}/>
                </Grid.Column>
                <Grid.Column width={13}>
                  <Segment>
                    <Grid>
                      <Grid.Row>
                        <Grid.Column width={8}>
                          <Form>
                            <Form.Group widths='equal' inline>
                              <Form.Field
                                control={Input}
                                type='date'
                                name='starts_on'
                                placeholder='Inicio'
                                value={this.state.starts_on}
                                onChange={this.handleInputChange} />
                              <Form.Field
                                control={Input}
                                type='date'
                                name='ends_on'
                                placeholder='Fim'
                                value={this.state.ends_on}
                                onChange={this.handleInputChange} />
                              <Button onClick={this.handleSubmit}>Ok</Button>
                            </Form.Group>
                          </Form>
                        </Grid.Column>
                        <Grid.Column width={8}>
                          <NewEntryModal
                            wallets={this.state.wallets}
                            handleAddNewEntry={this.handleAddNewEntry}
                            places={this.state.places} />
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>
                  </Segment>
                  <Segment>
                    <Grid columns={3} divided>
                      <Grid.Row>
                        <Grid.Column>
                          <Divider horizontal> <Header as='h4'> <Icon name='exchange' /> Recebimentos </Header> </Divider>
                          <BalanceCard listBalance={this.state.balanceCredit} color='positive' />
                        </Grid.Column>
                        <Grid.Column>
                          <Divider horizontal> <Header as='h4'> <Icon name='exchange' /> Pagamentos Previstos </Header> </Divider>
                          <BalanceCard listBalance={this.state.balanceExpected} color={'warning'} />
                        </Grid.Column>
                        <Grid.Column>
                          <Divider horizontal> <Header as='h4'> <Icon name='exchange' /> Pagamentos Realisados </Header> </Divider>
                          <BalanceCard listBalance={this.state.balanceDebit} color={'negative'} />
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
  balanceExpected: [],
  wallets: []
}

DashboardIndex.propTypes = {
  balanceCredit: PropTypes.arrayOf(PropTypes.shape()),
  balanceDebit: PropTypes.arrayOf(PropTypes.shape()),
  balanceExpected: PropTypes.arrayOf(PropTypes.shape()),
  wallets: PropTypes.arrayOf(PropTypes.shape())
}

ReactDOM.render(
  <Navbar contentPage={<DashboardIndex />}/>,
  document.getElementById('dashboard-index')
)
