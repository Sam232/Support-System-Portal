import React, { Component } from "react";
import { Segment, Menu, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { persistor } from '../../../redux/Store';

class Navbar extends Component {
  constructor(){
    super();
    this.state = {
      activeItem: "Submitted Response"
    };
  }

  handleItemClick = (e, { name }) => {
    this.setState({
      activeItem: name
    });
  }

  logout = () => {
    const { history } = this.props;

    localStorage.clear()
    persistor.purge()
      .then(() => {
        window.location.reload();
        return history.push("/user-login");   
      })
      .catch(error => {
        if(error){
          return;
        }
      });     
  }

  render(){
    const { activeItem } = this.state;

    return(
      <React.Fragment>
        <Segment style={{borderRadius: "0px"}} inverted>
          <Menu inverted pointing secondary >
            <Menu.Item as={Link} to='/user-dashboard'>
              <Icon name="computer" />
            </Menu.Item>
            <Menu.Item as={Link} to='/user-dashboard' name='Submitted Response' active={activeItem === 'Submitted Response'} onClick={this.handleItemClick}>
              <Icon name='send' />Submitted Response
            </Menu.Item>
            <Menu.Item
              as={Link} to='/user-support'
              name='User Support'
              active={activeItem === 'User Support'}
              onClick={this.handleItemClick}
            >
              <Icon name='help circle' />User Support
            </Menu.Item>
            <Menu.Item
              name='Logout'
              active={activeItem === 'Logout'}
              position="right"
              onClick={this.logout}
            >
              <Icon name='sign out' />Logout 
            </Menu.Item>
          </Menu> 
        </Segment>        
      </React.Fragment>
    );
  }
}

export default Navbar;