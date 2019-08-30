import React from 'react'
import moment from 'moment'

import { entryCreate, walletList } from '../../services/requests'

class newFormEntry extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      description: '',
      value: 0.0,
      dueDate: moment().format('YYYY-MM-DD'),
      kind: 'debit',
      wallets: [],
      walletId: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  componentDidMount() {
    walletList().then((res) => {
      const { wallets} = res.data

      this.setState({
        wallets
      })
    })
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
      kind: this.state.kind,
      wallet_id: this.state.walletId
    }

    entryCreate(params).then(() =>{
      this.setState({
        description: '',
        value: 0.0,
        dueDate: moment().format('YYYY-MM-DD'),
        kind: 'debit',
        walletId: ''
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

            <div className="form-group">
              <div className="form-row">
                <div className="col">
                  <label> Carteira </label>
                    <select value={this.state.walletId} name="walletId" className="form-control" onChange={this.handleInputChange}>
                      {this.state.wallets.map((item) => <option key={item.id} value={item.id}>{item.description}</option>)}
                    </select>
                </div>
                <div className="col">
                  <label> Tipo </label>
                    <select value={this.state.kind} name="kind" className="form-control" onChange={this.handleInputChange}>
                      <option value="debit">Pagamento</option>
                      <option value="credit">Recebimento</option>
                    </select>
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
