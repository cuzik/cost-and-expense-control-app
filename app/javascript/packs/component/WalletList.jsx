import React from 'react'
import PropTypes from 'prop-types'

import { Table } from 'semantic-ui-react'

const WalletListItem = ({ item }) => (
  <Table.Row>
    <Table.Cell width={1}>{item.id}</Table.Cell>
    <Table.Cell>{item.description}</Table.Cell>
    <Table.Cell>{item.kind}</Table.Cell>
    <Table.Cell width={5}> R$ {item.amount.toFixed(2)}</Table.Cell>
  </Table.Row>
)

class WalletList extends React.Component {
  render() {
    return (
      <Table size='small' compact celled fixed singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width={1}>ID</Table.HeaderCell>
            <Table.HeaderCell>Descrição</Table.HeaderCell>
            <Table.HeaderCell>Tipo</Table.HeaderCell>
            <Table.HeaderCell width={5}>Valor Inicial</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {this.props.wallets.map((item, idx) => <WalletListItem key={idx} item={item} /> )}
        </Table.Body>
      </Table>
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
