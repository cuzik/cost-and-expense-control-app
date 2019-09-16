import React from 'react'
import PropTypes from 'prop-types'
import { Segment, Grid } from 'semantic-ui-react'

const ResumeResult = ({ flow_input, flow_output }) => {
  if (flow_input >= flow_output) {
    return (
      <Segment color='blue'> R$ {(flow_input - flow_output).toFixed(2)} </Segment>
    )
  } else {
    return (
      <Segment color='red'> R$ {(flow_input - flow_output).toFixed(2)} </Segment>
    )
  }
}

ResumeResult.defaultProps = {
  flow_input: 0,
  flow_output: 0
}

ResumeResult.propTypes = {
  flow_input: PropTypes.number,
  flow_output: PropTypes.number
}

const BalanceResume = ({ flow_input, flow_output }) => (
  <Grid columns={3} divided>
    <Grid.Row>
      <Grid.Column> <Segment color='green'> R$ {flow_input.toFixed(2)} </Segment> </Grid.Column>
      <Grid.Column> <Segment color='yellow'> R$ {flow_output.toFixed(2)} </Segment> </Grid.Column>
      <Grid.Column> <ResumeResult flow_input={flow_input} flow_output={flow_output} /> </Grid.Column>
    </Grid.Row>
  </Grid>
)

BalanceResume.defaultProps = {
  flow_input: 0,
  flow_output: 0
}

BalanceResume.propTypes = {
  flow_input: PropTypes.number,
  flow_output: PropTypes.number
}

export default BalanceResume
