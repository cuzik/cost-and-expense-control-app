import React from 'react'
import PropTypes from 'prop-types'

import { Button, Modal, Form, Select, Input } from 'semantic-ui-react'

const kinds = [
  {key: 'debit_card', value: 'debit_card', text: 'Cartão de Débito'},
  {key: 'credit_card', value: 'credit_card', text: 'Cartão de Crédto'},
  {key: 'money', value: 'money', text: 'Dinheiro'}
]

class NewWalletModal extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      open: false,
      description: '',
      kind: 'debit_card',
      amount: 0.0,
    }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSelectKindChange = this.handleSelectKindChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  cleanForm = () => {
    this.state = {
      open: false,
      description: '',
      kind: 'debit_card',
      amount: 0.0,
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

  handleSelectKindChange(event, {value}) {
    this.setState({
      kind: value
    })
  }

  handleSubmit(event) {
    const params = {
      description: this.state.description,
      kind: this.state.kind,
      amount: this.state.amount
    }

    this.props.handleAddNewWallet(params)
    this.close()
    event.preventDefault()
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
          <Button content='Nova Carteira' floated='right' positive/>
        }
      >
        <Modal.Header>Nova Carteira</Modal.Header>
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
                name='amount'
                placeholder='Valor'
                value={this.state.amount}
                onChange={this.handleInputChange} />
            </Form.Group>
            <Form.Group widths='equal'>
              <Form.Field
                control={Select}
                label='Tipo de Carteira'
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

NewWalletModal.defaultProps = {
  wallets: []
}

NewWalletModal.propTypes = {
  wallets: PropTypes.arrayOf(PropTypes.shape()),
  handleAddNewWallet: PropTypes.func
}

export default NewWalletModal
