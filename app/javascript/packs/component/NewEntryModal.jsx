import React from 'react'
import PropTypes from 'prop-types'

import { Button, Modal, Form, Select, Input } from 'semantic-ui-react'

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
      dueDate: '',
      kind: 'debit',
      walletId: this.props.wallets.length === 0 ? '' : this.props.wallets[0].id
    }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSelectWalletChange = this.handleSelectWalletChange.bind(this)
    this.handleSelectKindChange = this.handleSelectKindChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  cleanForm = () => {
    this.state = {
      open: false,
      description: '',
      value: 0.0,
      dueDate: '',
      kind: 'debit',
      walletId: this.props.wallets.length === 0 ? '' : this.props.wallets[0].id
    }
  }

  open = () => this.setState({ open: true })
  close = () => {
    this.cleanForm()

    this.setState({ open: false })
  }

  handleInputChange(event) {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name

    this.setState({
      [name]: value
    })
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

  handleSubmit(event) {
    const params = {
      description: this.state.description,
      value: this.state.value,
      due_date: this.state.dueDate,
      kind: this.state.kind,
      wallet_id: this.state.walletId
    }

    this.props.handleAddNewEntry(params)
    this.close()
    event.preventDefault()
  }

  preparWalletList = () => {
    return this.props.wallets.map((item) => (
      { key: item.id, value: item.id, text: item.description }
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
          <Button content='Novo Laçamento' floated='right' positive/>
        }
      >
        <Modal.Header>Adicionar Nova Entrada</Modal.Header>
        <Modal.Content>
          <Form size='tiny' >
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
              <Form.Field
                control={Input}
                label='Vencimento'
                type='date'
                name='dueDate'
                placeholder='Vencimento'
                value={this.state.dueDate}
                onChange={this.handleInputChange} />
            </Form.Group>
            <Form.Group widths='equal'>
              <Form.Field
                control={Select}
                label='Carteira'
                name='wallet'
                value={this.state.walletId}
                options={this.preparWalletList()}
                onChange={this.handleSelectWalletChange} />
              <Form.Field
                control={Select}
                label='Pagamento/Recebimento'
                name='kind'
                value={this.state.kind}
                options={kinds}
                onChange={this.handleSelectKindChange} />
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
  wallets: []
}

NewEntryModal.propTypes = {
  wallets: PropTypes.arrayOf(PropTypes.shape()),
  handleAddNewEntry: PropTypes.func
}

export default NewEntryModal
