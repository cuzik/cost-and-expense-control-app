import React from 'react'
import { Table } from 'semantic-ui-react'

const BalanceCardItem = ({ item, color }) => (
  <Table.Row className={color}>
    <Table.Cell>{item.description}</Table.Cell>
    <Table.Cell width={6}> R$ {item.value.toFixed(2)}</Table.Cell>
  </Table.Row>
)

const BalanceCard = ({ listBalance, color }) => (
  <React.Fragment>
    <Table size='small' compact celled fixed singleLine>
      <Table.Body>
        {listBalance.map((item, idx) => <BalanceCardItem key={idx} item={item} color={color} /> )}
      </Table.Body>
    </Table>

    <Table size='small' compact celled fixed singleLine>
      <Table.Body>
        <Table.Row className={color}>
          <Table.Cell>Total</Table.Cell>
          <Table.Cell width={6}>
            R$ {listBalance.reduce((total, item) => total + item.value, 0).toFixed(2)}
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  </React.Fragment>
)

export default BalanceCard
