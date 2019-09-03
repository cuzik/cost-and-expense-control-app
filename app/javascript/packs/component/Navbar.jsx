import React from 'react'

import { Sidebar, Menu, Icon } from 'semantic-ui-react'

import 'semantic-ui-css/semantic.min.css'

class Navbar extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      visible: false,
    }
  }

  handleSidebarShow = () => {
    this.setState({ visible: true })
  }

  handleSidebarHide = () => {
    this.setState({ visible: false })
  }

  render() {
    return(
      <div>
        <Sidebar.Pushable>
          <Sidebar
            as={Menu}
            animation='overlay'
            icon='labeled'
            inverted
            onHide={this.handleSidebarHide}
            vertical
            visible={this.state.visible}
            width='thin'
          >
            <Menu.Item onClick={this.handleSidebarHide}>
              <Icon name='arrow left'/>
              Voltar
            </Menu.Item>
            <Menu.Item href='/'>
              <Icon name='dashboard'/>
              Dashboard
            </Menu.Item>
            <Menu.Item href='/wallets'>
              <Icon name='btc'/>
              Carteiras
            </Menu.Item>
          </Sidebar>

          <Sidebar.Pusher dimmed={this.state.visible}>
            <Menu attached='top' inverted>
              <Menu.Item icon='bars' onClick={this.handleSidebarShow} />
            </Menu>

            {this.props.contentPage}
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    )
  }
}

export default Navbar
