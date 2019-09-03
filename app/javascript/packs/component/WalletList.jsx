import React from 'react'
import PropTypes from 'prop-types'

import { Grid, Segment, Label } from 'semantic-ui-react'

const WalletItem = ({ item }) => (
  <Segment>
    <Label attached='top'>
      {item.description}
      <span floated='right'>
        R$ {(item.credited - item.debited + item.previous_balance).toFixed(2)}
      </span>
    </Label>

    <Grid columns={2} divided>
      <Grid.Row>
        <Grid.Column> Recebido: </Grid.Column><Grid.Column> R$ {item.credited.toFixed(2)} </Grid.Column>
        <Grid.Column> Gasto: </Grid.Column><Grid.Column> R$ {item.debited.toFixed(2)} </Grid.Column>
        <Grid.Column> Acumulado: </Grid.Column><Grid.Column> R$ {item.previous_balance.toFixed(2)} </Grid.Column>
      </Grid.Row>
    </Grid>
  </Segment>
)

class WalletList extends React.Component {
  render() {
    return (
      <div>
        {this.props.wallets.map((item) => <WalletItem key={item.id} item={item} /> )}
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
