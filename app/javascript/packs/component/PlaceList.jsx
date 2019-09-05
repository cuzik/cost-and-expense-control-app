import React from 'react'
import PropTypes from 'prop-types'

import { Table } from 'semantic-ui-react'

const PlaceListItem = ({ item }) => (
  <Table.Row>
    <Table.Cell width={1}>{item.id}</Table.Cell>
    <Table.Cell>{item.name}</Table.Cell>
  </Table.Row>
)

class PlaceList extends React.Component {
  render() {
    return (
      <Table size='small' compact celled fixed singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width={1}>ID</Table.HeaderCell>
            <Table.HeaderCell>Nome</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {this.props.places.map((item, idx) => <PlaceListItem key={idx} item={item} /> )}
        </Table.Body>
      </Table>
    )
  }
}

PlaceList.defaultProps = {
  places: []
}

PlaceList.propTypes = {
  places: PropTypes.arrayOf(PropTypes.shape())
}

export default PlaceList
