import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import moment from 'moment'

import { entryList } from '../../services/requests'
import NewFormEntry from './newFormEntry'

class EntryIndex extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      balanceList: props.balanceList
    }
  }

  componentDidMount() {
    entryList().then((res) => {
      const balanceList = res.data

      this.setState({
        balanceList
      })
    })
  }

  classItem({ kind }) {
    if(kind === 'debit') {
      return 'danger'
    } else {
      return 'success'
    }
  }

  render() {
    return (
      <div className='container'>
        <div className="card">
          <div className="card-header">
            <h5>asdasd</h5>
          </div>
          <div className="card-body">
            <h5 className="card-title">asdas</h5>
            <div className="list-group">
              {this.state.balanceList.map((item) => (
                <div key={item.id} className={"list-group-item list-group-item-action list-group-item-" + this.classItem(item)}>
                  {moment(item.due_date).format("DD/MM/YYYY")} | {item.description}
                  <span className='float-right'>
                    R$ {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="card-footer">
            colocar alguma coisa aqui
          </div>
        </div>
      </div>
    )
  }
}

EntryIndex.defaultProps = {
  balanceList: []
}

EntryIndex.propTypes = {
  balanceList: PropTypes.arrayOf(PropTypes.shape())
}

ReactDOM.render(
  <EntryIndex />,
  document.getElementById('entry-index')
)
