import React from 'react'
import ReactDOM from 'react-dom'
import { Grid, Segment, Divider, Header, Icon } from 'semantic-ui-react'

import WalletList from '../../component/WalletList'
import { wallets, walletCreate } from '../../services/requests'
import Navbar from '../../component/Navbar'
import NewWalletModal from '../../component/NewWalletModal'

import 'semantic-ui-css/semantic.min.css'

const kinds = [
  {key: 'debit_card', value: 'debit_card', text: 'Cartão de Débito'},
  {key: 'credit_card', value: 'credit_card', text: 'Cartão de Crédto'},
  {key: 'money', value: 'money', text: 'Dinheiro'}
]

class WalletIndex extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      wallets: props.wallets,
    }

    this.handleAddNewWallet = this.handleAddNewWallet.bind(this)
  }

  setWalletsCards() {
    wallets().then((res) => {
      const { wallets} = res.data

      this.setState({
        wallets
      })
    })
  }

  handleAddNewWallet(params) {
    walletCreate(params).then((res) => {
      this.setWalletsCards()
    })
  }

  componentDidMount() {
    this.setWalletsCards()
  }

  render() {
    return(
      <Grid celled='internally'>
        <Grid.Row>
          <Grid.Column width={16}>
            <Segment color='black'>
              <Divider horizontal> <Header as='h3'> <Icon name='dollar' /> Carteiras </Header> </Divider>
            </Segment>

            <Grid columns={2} divided>
              <Grid.Row>
                <Grid.Column width={3}>
                  <Segment color='black'>
                    colocarei alguma coisa aqui
                  </Segment>
                </Grid.Column>
                <Grid.Column width={13}>
                  <Segment color='black'>
                    <Grid>
                      <Grid.Row>
                        <Grid.Column>
                          Descrição dessa página
                          <NewWalletModal handleAddNewWallet={this.handleAddNewWallet} kinds={kinds} />
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>
                  </Segment>
                  <Segment color='black'>
                    <WalletList wallets={this.state.wallets} kinds={kinds} />
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

ReactDOM.render(
  <Navbar contentPage={<WalletIndex />}/>,
  document.getElementById('wallet-index')
)
