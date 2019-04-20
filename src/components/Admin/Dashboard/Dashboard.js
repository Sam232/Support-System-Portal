import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchUserSupports } from "../../../redux/Actions/Admin/Admin"; 
import PropTypes from "prop-types";
import { Button, Form, Comment, Message } from 'semantic-ui-react';
import Navbar from "../Navbar/Navbar";

class Dashboard extends Component {
  state = {
    userSupports: [],
    msg: "",
    errorMsg: ""
  };

  componentDidMount(){
    const { token, fetchUserSupports } = this.props;

    if(token){
      const action = {
        payload: {
          token
        }
      };

      fetchUserSupports(action);
    }
  }

  static getDerivedStateFromProps(props, state){
    const { received, userSupports, msg, errorMsg } = props;

    if(received){
      if(userSupports.length >= 1){
        return {
          ...state,
          userSupports,
          msg: "",
          errorMsg: ""
        };
      }      
    }
    else if(msg){
      return {
        ...state,
        userSupports: [],
        msg,
        errorMsg: ""
      };
    }  
    else return {
      ...state,
      userSupports: [],
      msg: "",
      errorMsg
    }
  }

  render(){
    const { userSupports, msg, errorMsg } = this.state;
  
    return(
      <React.Fragment>
        <Navbar />
        <div className="position">
          {
            msg ? <Message positive>
              <p>{msg}</p>
            </Message> : null
          }
          {
            errorMsg ? <Message negative>
              <p>{errorMsg}</p>
            </Message> : null
          }
          {
            userSupports.length > 0 ? userSupports.map(userSupport => {
              return(
                <Comment.Group key={userSupport._id}>
                  <Comment>
                    <Comment.Content>
                      <Comment.Author as='h1'>{userSupport.subject}</Comment.Author>
                      <Comment.Text>{userSupport.body}</Comment.Text>
                      <Comment.Actions>
                        <Comment.Action active>Reply</Comment.Action>
                      </Comment.Actions>
                      <Form reply>
                        <Form.TextArea style={{ height: 100 }}/>
                        <Button color="black" content='Submit Response' labelPosition='left' icon='edit' primary />
                      </Form>
                    </Comment.Content>
                  </Comment>
                </Comment.Group>
              );
            }) : null
          }
        </div>
      </React.Fragment>
    );
  };  
}

Dashboard.propTypes = {
  fetchUserSupports: PropTypes.func.isRequired,
  _id: PropTypes.string,
  token: PropTypes.string,
  userSupports: PropTypes.array
};

const mapStateToProps = ({
  authAdmin: {
    personalDetails: {
      _id
    },
    token
  },
  userSupports: {
    received,
    userSupports,
    msg,
    errorMsg
  }
}) => ({
  _id,
  token,
  received,
  userSupports,
  msg,
  errorMsg
});

export default connect(mapStateToProps, {
  fetchUserSupports
})(Dashboard);