import React from 'react'
import ReactDOM from 'react-dom'
import Navbar from '../../component/Navbar'
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';

import 'semantic-ui-css/semantic.min.css'

import { resumeBalance } from '../../services/requests'

class ChartsIndex extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      day_names: props.day_names,
      gross_profit: props.gross_profit,
      net_profit: props.net_profit,
      debiteds: props.debiteds,
      totals: props.totals
    }
  }

  configOpitions = () => (
    {
      title: {
        text: 'Comparativo e projeção de gastos'
      },
      xAxis: { categories: this.state.day_names },
      yAxis: [{
        title: {
          text: 'Trasações'
        }
      }, {
        title: {
          text: 'R$'
        },
        opposite: true
      }],
      legend: {
        shadow: false
      },
      tooltip: {
        shared: true
      },
      plotOptions: {
        column: {
          grouping: false,
          shadow: false,
          borderWidth: 0
        }
      },
      series: [{
        type: 'column',
        name: 'Lucro Bruto',
        color: 'rgba(35, 184, 47,.7)',
        data: this.state.gross_profit,
        tooltip: {
          valuePrefix: 'R$'
        }
      }, {
        type: 'column',
        name: 'Gastos',
        color: 'rgba(199, 32, 51,.7)',
        data: this.state.debiteds,
        pointPadding: 0.3,
        tooltip: {
          valuePrefix: 'R$'
        }
      }, {
        type: 'column',
        name: 'Lucro Líquido',
        color: 'rgba(15, 49, 112,.7)',
        data: this.state.net_profit,
        pointPadding: 0.4,
        tooltip: {
          valuePrefix: 'R$'
        }
      }, {
        name: 'Total',
        color: 'rgba(15, 49, 112,1)',
        data: this.state.totals
      }]
    }
  )

  setData() {
    resumeBalance({}).then((res) => {
      const { day_names, gross_profit, net_profit, debiteds, totals } = res.data

      this.setState({
        day_names,
        gross_profit,
        net_profit,
        debiteds,
        totals
      })
    })
  }

  componentDidMount() {
    this.setData()
  }

  render() {
    return(
      <HighchartsReact
        highcharts={Highcharts}
        options={this.configOpitions()}
      />
    )
  }
}

ReactDOM.render(
  <Navbar contentPage={<ChartsIndex />} />,
  document.getElementById('charts-index')
)
