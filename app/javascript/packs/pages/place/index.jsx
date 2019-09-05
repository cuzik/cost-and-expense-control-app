import React from 'react'
import ReactDOM from 'react-dom'
import { Grid, Segment, Divider, Header, Icon } from 'semantic-ui-react'

import PlaceList from '../../component/PlaceList'
import { places, placeCreate } from '../../services/requests'
import Navbar from '../../component/Navbar'
import NewPlaceModal from '../../component/NewPlaceModal'

import 'semantic-ui-css/semantic.min.css'

class PlaceIndex extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      places: props.places,
    }

    this.handleAddNewPlace = this.handleAddNewPlace.bind(this)
  }

  setPlaces() {
    places().then((res) => {
      const { places } = res.data

      this.setState({
        places
      })
    })
  }

  handleAddNewPlace(params) {
    placeCreate(params).then((res) => {
      this.setPlaces()
    })
  }

  componentDidMount() {
    this.setPlaces()
  }

  render() {
    return(
      <Grid celled='internally'>
        <Grid.Row>
          <Grid.Column width={16}>
            <Segment>
              <Divider horizontal> <Header as='h3'> <Icon name='home' /> Lugares </Header> </Divider>
            </Segment>

            <Grid columns={2} divided>
              <Grid.Row>
                <Grid.Column width={3}>
                  <Segment>
                    colocarei alguma carlos
                  </Segment>
                </Grid.Column>
                <Grid.Column width={13}>
                  <Segment>
                    <Grid>
                      <Grid.Row>
                        <Grid.Column>
                          Descrição dessa página
                          <NewPlaceModal handleAddNewPlace={this.handleAddNewPlace} />
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>
                  </Segment>
                  <Segment>
                    <PlaceList places={this.state.places}/>
                  </Segment>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

ReactDOM.render(
  <Navbar contentPage={<PlaceIndex />}/>,
  document.getElementById('place-index')
)
