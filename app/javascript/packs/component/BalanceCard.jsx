import React from 'react'

import { Table } from 'semantic-ui-react'

const BalanceCardItem = ({ item }) => (
  <Table.Row>
    <Table.Cell>{item.description}</Table.Cell>
    <Table.Cell width={6}> R$ {item.value.toFixed(2)}</Table.Cell>
  </Table.Row>
)

const BalanceCard = ({ listBalance }) => (
  <React.Fragment>
    <Table>
      <Table.Body>
        {listBalance.map((item, idx) => <BalanceCardItem key={idx} item={item} /> )}
      </Table.Body>
    </Table>

    <Table>
      <Table.Body>
        <Table.Row>
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
