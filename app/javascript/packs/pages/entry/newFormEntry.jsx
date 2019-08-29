import React from 'react'
import moment from 'moment'

import { entryCreate } from '../../services/requests'

class newFormEntry extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      description: '',
      value: 0.0,
      dueDate: moment().format('YYYY-MM-DD'),
      kind: 'debit'
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleInputChange(event) {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name

    this.setState({
      [name]: value
    })
  }

  handleSubmit(event) {
    const params = {
      description: this.state.description,
      value: this.state.value,
      due_date: this.state.dueDate,
      kind: this.state.kind
    }

    entryCreate(params).then(() =>{
      this.setState({
        description: '',
        value: 0.0,
        dueDate: moment().format('YYYY-MM-DD'),
        kind: 'debit'
      })

      this.props.handleChangeListBalance()
    })

    event.preventDefault();
  }

  render() {
    return (
      <div className="card">
        <div className="card-header">
          <h5>Adicionar</h5>
        </div>
        <div className="card-body">
          <h5 className="card-title">aaa</h5>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <div className="form-row">
                <div className="col">
                  <label>
                    Descrição
                    <input
                      type="text"
                      className="form-control"
                      name="description"
                      value={this.state.description}
                      onChange={this.handleInputChange}
                      placeholder="Descrição" />
                  </label>
                </div>
                <div className="col">
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="kind"
                      value={this.state.kind}
                      onChange={this.handleInputChange}
                      id="credit"
                      value="credit" />
                    <label className="form-check-label" htmlFor="credit">Recebimento</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="kind"
                      value={this.state.kind}
                      onChange={this.handleInputChange}
                      id="debit"
                      value="debit" />
                    <label className="form-check-label" htmlFor="debit">Pagamento</label>
                  </div>
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="form-row">
                <div className="col">
                  <label>
                    Valor
                    <input
                      type="number"
                      className="form-control"
                      name="value"
                      value={this.state.value}
                      onChange={this.handleInputChange}
                      placeholder="Valor" />
                  </label>
                </div>
                <div className="col">
                  <label>
                    Vencimento/Pagamento
                    <input
                      type="date"
                      className="form-control"
                      name="dueDate"
                      value={this.state.dueDate}
                      onChange={this.handleInputChange} />
                  </label>
                </div>
              </div>
            </div>
            <button type="submit" className="btn btn-primary">Enviar</button>
          </form>
        </div>
        <div className="card-footer">
        </div>
      </div>
    )
  }
}

export default newFormEntry
