import React, { Component } from 'react'
import { Input, Menu,Container } from 'semantic-ui-react'
import axios from 'axios';

export default class Navbar extends Component {
  state = { activeItem: '' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  logout = () => {
    axios.delete('/logout')
      .then(res => window.location='/')
  }

  render() {
    const { activeItem } = this.state

    return (
      <div className='navbar'>
        <Menu primary>
          <Menu.Item
            name='home'
            active={activeItem === 'home'}
            
            href='/'
          />
          <Menu.Item
            name='view'
            active={activeItem === 'view'}
            
            href='/view'
          />
          <Menu.Item
            name='Recruit'
            active={activeItem === 'Recruit'}
            
            href='/requirements'
          />
          <Menu.Menu position='right'>
            <Menu.Item
              name='logout'
              active={activeItem === 'logout'}
              onClick={this.logout}
              href='#'
            />
          </Menu.Menu>
        </Menu>
      </div>
    )
  }
}