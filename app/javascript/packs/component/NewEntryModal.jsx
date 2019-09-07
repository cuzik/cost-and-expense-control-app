import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import 'moment/locale/pt-br';

import { DateInput } from 'semantic-ui-calendar-react';
import { Button, Modal, Form, Select, Input, Icon } from 'semantic-ui-react'

const kinds = [
  {key: 'debit', value: 'debit', text: 'Débito'},
  {key: 'credit', value: 'credit', text: 'Crédito'}
]

class NewEntryModal extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      open: false,
      description: '',
      value: 0.0,
      dueDate: moment().format('DD-MM-YYYY'),
      kind: 'debit',
      walletId: this.props.wallets.length === 0 ? '' : this.props.wallets[0].id,
      placeId: this.props.places.length === 0 ? '' : this.props.places[0].id
    }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSelectWalletChange = this.handleSelectWalletChange.bind(this)
    this.handleSelectKindChange = this.handleSelectKindChange.bind(this)
    this.handleSelectPlaceChange = this.handleSelectPlaceChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  cleanForm = () => {
    this.state = {
      description: '',
      value: 0.0,
      dueDate: moment().format('DD-MM-YYYY'),
      kind: 'debit',
      walletId: this.props.wallets.length === 0 ? '' : this.props.wallets[0].id,
      placeID: this.props.places.length === 0 ? '' : this.props.places[0].id
    }
  }

  open = () => this.setState({ open: true })
  close = () => {
    this.cleanForm()

    this.setState({ open: false })
  }

  handleInputChange(event, { name, value }) {
    this.setState({ [name]: value })
  }

  handleSelectWalletChange(event, {value}) {
    this.setState({
      walletId: value
    })
  }

  handleSelectKindChange(event, {value}) {
    this.setState({
      kind: value
    })
  }

  handleSelectPlaceChange(event, {value}) {
    this.setState({
      placeID: value
    })
  }

  handleSubmit(event) {
    const params = {
      description: this.state.description,
      value: this.state.value,
      due_date: this.state.dueDate,
      kind: this.state.kind,
      wallet_id: this.state.walletId,
      place_id: this.state.placeID
    }

    this.props.handleAddNewEntry(params)
    this.close()
    event.preventDefault()
  }

  formatWallets = () => {
    return this.props.wallets.map((item) => (
      { key: item.id, value: item.id, text: item.description }
    ))
  }

  formatPlaces = () => {
    return this.props.places.map((item) => (
      { key: item.id, value: item.id, text: item.name }
    ))
  }

  render() {
    const { open } = this.state

    return (
      <Modal
        open={open}
        onOpen={this.open}
        onClose={this.close}
        size='tiny'
        trigger={
          <Button icon labelPosition='left' positive floated='right'>
            Entrada
            <Icon name='plus' />
          </Button>
        }
      >
        <Modal.Header>Adicionar Nova Entrada</Modal.Header>
        <Modal.Content>
          <Form size='tiny'>
            <Form.Group widths='equal'>
              <Form.Field
                control={Input}
                label='Descrição'
                type='text'
                name='description'
                placeholder='Descrição'
                value={this.state.description}
                onChange={this.handleInputChange} />
              <Form.Field
                control={Input}
                label='Valor'
                type='number'
                name='value'
                placeholder='Valor'
                value={this.state.value}
                onChange={this.handleInputChange} />
            </Form.Group>
            <Form.Group widths='equal'>
              <DateInput
                label='Vencimento'
                closable
                name="dueDate"
                popupPosition='bottom right'
                iconPosition="left"
                icon="calendar alternate outline"
                localization='pt-br'
                duration={0}
                value={this.state.dueDate}
                onChange={this.handleInputChange} />
              <Form.Field
                control={Select}
                label='Carteira'
                name='walletID'
                value={this.state.walletId}
                options={this.formatWallets()}
                onChange={this.handleSelectWalletChange} />
            </Form.Group>
            <Form.Group widths='equal'>
              <Form.Field
                control={Select}
                label='Pagamento/Recebimento'
                name='kind'
                value={this.state.kind}
                options={kinds}
                onChange={this.handleSelectKindChange} />
              <Form.Field
                control={Select}
                label='Lugar'
                name='placeID'
                value={this.state.placeID}
                options={this.formatPlaces()}
                onChange={this.handleSelectPlaceChange} />
            </Form.Group>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button content='Criar' positive onClick={this.handleSubmit} />
        </Modal.Actions>
      </Modal>
    )
  }
}

NewEntryModal.defaultProps = {
  wallets: [],
  places: []
}

NewEntryModal.propTypes = {
  wallets: PropTypes.arrayOf(PropTypes.shape()),
  places: PropTypes.arrayOf(PropTypes.shape()),
  handleAddNewEntry: PropTypes.func
}

export default NewEntryModal
