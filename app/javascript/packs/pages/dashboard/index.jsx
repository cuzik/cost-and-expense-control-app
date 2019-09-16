import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import moment from 'moment'
import 'moment/locale/pt-br';

import { Grid, Segment, Divider, Header, Icon, Form, Input, Button } from 'semantic-ui-react'
import { YearInput, MonthInput } from 'semantic-ui-calendar-react';


import BalanceCard from '../../component/BalanceCard'
import WalletsCard from '../../component/WalletsCard'
import { entries, wallets, entryCreate, places } from '../../services/requests'
import Navbar from '../../component/Navbar'
import NewEntryModal from '../../component/NewEntryModal'
import BalanceResume from '../../component/BalanceResume'

import 'semantic-ui-css/semantic.min.css'

class DashboardIndex extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      places: [],
      balanceCredit: props.balanceCredit,
      balanceDebit: props.balanceDebit,
      balanceExpected: props.balanceExpected,
      flow_input: 0,
      flow_output: 0,
      wallets: [],
      year: moment().format("YYYY"),
      month: moment().format("MMMM")
    }

    this.handleAddNewEntry = this.handleAddNewEntry.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  setBalanceLists() {
    const starts_on = moment(this.state.month + " " + this.state.year, 'MMMM YYYY', 'pt-br').startOf('month').format('YYYY-MM-DD')
    const ends_on = moment(this.state.month + " " + this.state.year, 'MMMM YYYY', 'pt-br').endOf('month').format('YYYY-MM-DD')

    const params = {
      starts_on: starts_on,
      ends_on: ends_on
    }

    entries(params).then((res) => {
      const { credit, debit, expected, flow } = res.data.entries

      this.setState({
        balanceCredit: credit,
        balanceDebit: debit,
        balanceExpeted: expected,
        flow_input: flow.input,
        flow_output: flow.output
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
    this.setBalanceLists()
  }

  render() {
    return (
      <Grid celled='internally'>
        <Grid.Row>
          <Grid.Column width={16}>
            <Segment color='black'>
              <Divider horizontal> <Header as='h3'> <Icon name='dashboard' /> Dashboard </Header> </Divider>
            </Segment>
            <Grid columns={2} divided>
              <Grid.Row>
                <Grid.Column width={3}>
                  <WalletsCard wallets={this.state.wallets}/>
                </Grid.Column>
                <Grid.Column width={13}>
                  <Grid divided>
                    <Grid.Row>
                      <Grid.Column width={9}>
                        <Segment color='black'>
                          <Form size='tiny'>
                            <Form.Group widths='equal' inline>
                              <YearInput
                                closable
                                name="year"
                                popupPosition='bottom right'
                                icon="calendar alternate outline"
                                placeholder="Ano"
                                duration={0}
                                value={this.state.year}
                                onChange={this.handleInputChange}
                              />
                              <MonthInput
                                closable
                                name="month"
                                popupPosition='bottom right'
                                icon="calendar alternate outline"
                                localization='pt-br'
                                dateFormat='MMMM'
                                duration={0}
                                placeholder="Mês"
                                value={this.state.month}
                                onChange={this.handleInputChange}
                              />
                              <Form.Button icon labelPosition='left' onClick={this.handleSubmit}> Ok <Icon name='search' /> </Form.Button>
                            </Form.Group>
                          </Form>
                        </Segment>
                        </Grid.Column>
                      <Grid.Column width={7}>
                        <Segment color='black'>
                          <BalanceResume flow_input={this.state.flow_input} flow_output={this.state.flow_output}/>
                        </Segment>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>

                  <Segment color='black'>
                    <Grid>
                      <Grid.Row>
                        <Grid.Column width={14}>
                          <Divider horizontal> <Header as='h3'> <Icon name='plus' /> Fechamento Parcial </Header> </Divider>
                        </Grid.Column>
                        <Grid.Column width={2}>
                          <NewEntryModal
                            wallets={this.state.wallets}
                            handleAddNewEntry={this.handleAddNewEntry}
                            places={this.state.places} />
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>
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
