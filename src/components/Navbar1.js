import React, { Component } from 'react'
import { Input, Menu,Container } from 'semantic-ui-react'
import axios from 'axios';

export default class Navbar1 extends Component {
  state = { activeItem: '' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <div>
        <Menu primary>
          <Menu.Item
            name='home'
            active={activeItem === 'home'}
            
            href='/'
          />
          <Menu.Item
            name='apply now'
            active={activeItem === 'apply now'}
            
            href='/view'
          />
          <Menu.Menu position='right'>
            <Menu.Item
              name='login'
              active={activeItem === 'login'}
              href='/login'
            />
            <Menu.Item
              name='register'
              active={activeItem === 'register'}
              href='/register'
            />
          </Menu.Menu>
        </Menu>
      </div>
    )
  }
}