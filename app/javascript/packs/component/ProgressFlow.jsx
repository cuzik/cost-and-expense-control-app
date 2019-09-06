import React from 'react'
import PropTypes from 'prop-types'
import { Segment, Grid } from 'semantic-ui-react'

const ResultFlow = ({ flow_input, flow_output }) => {
  if (flow_input >= flow_output) {
    return (
      <Segment secondary inverted color='blue'> R$ {(flow_output - flow_input).toFixed(2)} </Segment>
    )
  } else {
    return (
      <Segment secondary inverted color='red'> R$ {(flow_input - flow_output).toFixed(2)} </Segment>
    )
  }
}

ResultFlow.defaultProps = {
  flow_input: 0,
  flow_output: 0
}

ResultFlow.propTypes = {
  flow_input: PropTypes.number,
  flow_output: PropTypes.number
}

const ProgressFlow = ({ flow_input, flow_output }) => (
  <Grid columns={5}>
    <Grid.Row>
      <Grid.Column> <Segment secondary inverted color='green'> R$ {flow_input.toFixed(2)} </Segment> </Grid.Column>
      <Grid.Column width={1}> <Segment> / </Segment> </Grid.Column>
      <Grid.Column> <Segment secondary inverted color='yellow'> R$ {flow_output.toFixed(2)} </Segment> </Grid.Column>
      <Grid.Column width={1}> <Segment> = </Segment> </Grid.Column>
      <Grid.Column> <ResultFlow flow_input={flow_input} flow_output={flow_output} /> </Grid.Column>
    </Grid.Row>
  </Grid>
)

ProgressFlow.defaultProps = {
  flow_input: 0,
  flow_output: 0
}

ProgressFlow.propTypes = {
  flow_input: PropTypes.number,
  flow_output: PropTypes.number
}

export default ProgressFlow
