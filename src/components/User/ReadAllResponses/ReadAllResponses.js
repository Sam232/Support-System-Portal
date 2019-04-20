import React, { Component } from "react";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Card, Message, Icon } from "semantic-ui-react";
import { fetchReceivedResponses } from "../../../redux/Actions/User/User";
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import './ReadAllResponses.css';

class ReadAllResponses extends Component {
  state = {
    responses: [],
    received: false,
    msg: "",
    errorMsg: ""
  };

  componentDidMount(){
    const { _id, token } = this.props;
    const { fetchReceivedResponses } = this.props;
    const action = {
      payload: {
        _id,
        token
      }
    };

    fetchReceivedResponses(action);
  }

  static getDerivedStateFromProps(props, state){
    const { responses, msg, received, errorMsg } = props;
    if(received){
      return {
        ...state,
        responses,
        msg: "",
        errorMsg: ""
      };
    }

    else if(msg){
      return {
        ...state,
        responses: [],
        msg,
        errorMsg: ""
      };
    }

    else if(errorMsg){
      return {
        ...state,
        responses: [],
        msg: "",
        errorMsg
      };
    }
    else return state;
  }

  render(){
    const { responses, msg, errorMsg } = this.state;
    return(
      <React.Fragment>
        <Navbar />
        <div className="position">
          {
            responses.length > 0 ? responses.map(response => {
              return(
                <Card key={response._id} style={{width: "100%"}}>
                  <Card.Content header={response.subject} />
                  <Card.Content description={response.body} />
                  <Card.Content extra>
                    <Icon name='announcement' />
                    {
                      response.status === "answered" ? <Link to={`/response/${response._id}`}>View Response</Link> :
                        "Not Answered"
                    }
                  </Card.Content>
                </Card>
              );
            }) : null
          }
          {
            msg && !errorMsg ? <Message positive>
              <p>{msg}</p>
            </Message> : null
          }
          {
            !msg && errorMsg ? <Message negative>
              <p>{errorMsg}</p>
            </Message> : null
          }
        </div>
      </React.Fragment>
    );
  }
}

ReadAllResponses.propTypes = {
  fetchReceivedResponses: PropTypes.func.isRequired,
  _id: PropTypes.string,
  token: PropTypes.string,
  responses: PropTypes.array,
  received: PropTypes.bool,
  msg: PropTypes.string,
  errorMsg: PropTypes.string
};

const mapStateToProps = ({
  authUser: {
    personalDetails: { 
      _id 
    },
    token
  },
  receivedResponses: {
    responses,
    received,
    msg,
    errorMsg
  }
}) => ({
  _id,
  token,
  responses,
  received,
  msg,
  errorMsg
});

export default connect(mapStateToProps, {
  fetchReceivedResponses
})(ReadAllResponses);