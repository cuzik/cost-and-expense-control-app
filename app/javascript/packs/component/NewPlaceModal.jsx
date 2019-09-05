import React from 'react'
import PropTypes from 'prop-types'

import { Button, Modal, Form, Select, Input } from 'semantic-ui-react'

class NewPlaceModal extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      open: false,
      name: ''
    }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  cleanForm = () => {
    this.state = {
      open: false,
      name: ''
    }
  }

  open = () => this.setState({ open: true })
  close = () => {
    this.cleanForm()

    this.setState({ open: false })
  }

  handleInputChange(event, { name, value }) {
    this.setState({
      [name]: value
    })
  }

  handleSubmit(event) {
    const params = {
      name: this.state.name
    }

    this.props.handleAddNewPlace(params)
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
          <Button content='Nova Lugar' floated='right' positive/>
        }
      >
        <Modal.Header>Nova Carteira</Modal.Header>
        <Modal.Content>
          <Form size='tiny'>
            <Form.Group widths='equal'>
              <Form.Field
                control={Input}
                label='Nome'
                type='text'
                name='name'
                placeholder='Nome'
                value={this.state.name}
                onChange={this.handleInputChange} />
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

NewPlaceModal.propTypes = {
  handleAddNewPlace: PropTypes.func
}

export default NewPlaceModal
