import React, { Component } from "react";
import { Segment, Menu, Icon, Message } from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";
import { persistor } from '../../../redux/Store';

class Navbar extends Component {
  constructor(){
    super();
    this.state = {
      activeItem: "Received Supports"
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
        return history.push("/admin/7f2db1e4-66ed");   
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
            <Menu.Item as={Link} to='/dashboard'>
              <Icon name="computer" />
            </Menu.Item>
            <Menu.Item as={Link} to='/dashboard' name='Received Supports' active={activeItem === 'Received Supports'} onClick={this.handleItemClick}>
              <Icon name='send' />Received Supports
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