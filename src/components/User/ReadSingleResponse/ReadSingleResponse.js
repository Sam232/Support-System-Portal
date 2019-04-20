import React, { Component } from "react";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Card, Message, Button } from "semantic-ui-react";
import _ from "lodash";
import { viewResponse } from "../../../redux/Actions/User/User";
import Navbar from "../Navbar/Navbar";
import "./ReadSingleResponse.css";

class ReadSingleResponse extends Component {
  state = {
    response: {},
    errorMsg: ""
  };

  componentDidMount(){
    const { match: { params: { id } }, token, viewResponse } = this.props;

    const action = {
      payload: {
        id,
        token
      }
    };
    viewResponse(action);
  }

  static getDerivedStateFromProps(props, state){
    const { response, errorMsg } = props;
 
    if(response.response){
      return {
        ...state,
        response,
        errorMsg: ""
      }
    }
    else if(errorMsg){
      return {
        ...state,
        errorMsg
      }
    }
    else return state;
  }

  render(){
    const { response, errorMsg } = this.state;
    
    return(
      <React.Fragment>
        <Navbar />
        <div className="position">
          {
            errorMsg ? <Message negative>
              <p>{errorMsg}</p>
            </Message> : null
          }
          {
            response.response ? <Card>
              <Card.Content>
                <Card.Header>{response.supportMsgId.subject}</Card.Header>
                <Card.Meta>{response.supportMsgId.body}</Card.Meta>
                <Card.Description>
                  {response.response ? response.response : "Not Answered"}
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <div className='ui two buttons'>
                  {
                    response.response ? <Button basic color='green'>
                      Answered
                    </Button> : null
                  }
                  {
                    response.response ? <Button basic color='red'>
                      {response.supportMsgId.status.capitalize()}
                    </Button> : null
                  }
                </div>
              </Card.Content>
            </Card> : null
          }
        </div>
      </React.Fragment>
    );
  }
}

ReadSingleResponse.propTypes = {
  viewResponse: PropTypes.func.isRequired,
  token: PropTypes.string,
  response: PropTypes.object,
  errorMsg: PropTypes.string
};

const mapStateToProps = ({
  authUser: {
    token
  },
  fetchedResponse: {
    response,
    errorMsg
  }
}) => ({
  token,
  response,
  errorMsg
});

export default connect(mapStateToProps, {
  viewResponse
})(ReadSingleResponse);