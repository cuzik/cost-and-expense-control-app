import React from 'react'
import { Table } from 'semantic-ui-react'
import moment from 'moment'

const BalanceCardItem = ({ item, color }) => (
  <Table.Row className={color}>
    <Table.Cell width={3}>{moment(item.due_date).format("DD/MM/YYYY")}</Table.Cell>
    <Table.Cell>{item.description}</Table.Cell>
    <Table.Cell width={3}> R$ {item.value.toFixed(2)}</Table.Cell>
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
          <Table.Cell width={3}>Data</Table.Cell>
          <Table.Cell>Total</Table.Cell>
          <Table.Cell width={3}>
            R$ {listBalance.reduce((total, item) => total + item.value, 0).toFixed(2)}
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  </React.Fragment>
)

export default BalanceCard
