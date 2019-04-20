import React, { Component } from "react";
import { connect } from "react-redux";
import { Message, Form, Button, TextArea, Radio } from "semantic-ui-react";
import PropTypes from 'prop-types';
import { submitSupport } from "../../../redux/Actions/User/User";
import Navbar from "../Navbar/Navbar";
import "./SendSupport.css";

class SendSupport extends Component {
  state = {
    subject: "",
    body: "",
    private_: false,
    msg: "",
    validation: {
      subjectError: "",
      bodyError: "",
      errorMsg :""
    }
  };

  static getDerivedStateFromProps(props, state){
    const { msg, errorMsg } = props;
    if(msg){
      return {
        ...state,
        msg,
        validation: {
          ...state.validation,
          error: ""
        }
      }
    }
    else if(errorMsg){
      return {
        ...state,
        msg: "",
        validation: {
          ...state.validation,
          errorMsg
        }
      }
    }
    else return state;
  }

  handleInput = e => this.setState({
    ...this.state,
    [e.target.name]: e.target.value
  });

  handleToggleInput = () => {
    const { private_ } = this.state;
    if(private_){
      return this.setState({
        ...this.state,
        private_: false
      });
    }
    else {
      return this.setState({
        ...this.state,
        private_: true
      });
    }
  }


  sendUserSupport = e => {
    e.preventDefault();

    const { subject, body, private_ } = this.state;
    const { _id, token, submitSupport } = this.props;

    if(!subject){
      return this.setState({
        validation: {
          ...this.state.validation,
          subjectError: "Subject Is Required"
        }  
      });
    }

    if(subject.length <= 4){
      return this.setState({
        validation: {
          ...this.state.validation,
          subjectError: "Length Of Subject Should Be Greater Than 4"
        }  
      });
    }

    if(!body){
      return this.setState({
        validation: {
          ...this.state.validation,
          subjectError: "",
          bodyError: "Body Is Required"
        }  
      });
    }

    if(body.length <= 5){
      return this.setState({
        validation: {
          ...this.state.validation,
          subjectError: "",
          bodyError: "Length Of Body Should Be Greater Than 5"
        }  
      });
    }

    const action = {
      payload: {
        _id,
        token,
        subject,
        body,
        private_
      }
    };

    submitSupport(action);

    this.setState({
      validation: {
        ...this.state.validation,
        subjectError: "",
        bodyError: "",
        errorMsg: ""
      }
    });
  }

  render(){
    const { subject, body, private_, msg, validation: { subjectError, bodyError, errorMsg } } = this.state;

    return(
      <React.Fragment>
        <Navbar />
        <div className="position">
          <Form onSubmit={this.sendUserSupport}>
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
              subjectError ? <Message negative>
                <p>{subjectError}</p>
              </Message> : null
            }
            {
              bodyError ? <Message negative>
                <p>{bodyError}</p>
              </Message> : null
            }
            <Form.Field>
              <label>Subject</label>
              <input name="subject" placeholder='Subject' value={subject} onChange={this.handleInput}/>
            </Form.Field>
            <Form.Field>
              <label>Body</label>
              <TextArea name="body" placeholder='Body' value={body} onChange={this.handleInput} style={{ minHeight: 100 }} />
            </Form.Field>
            <Form.Field>
              <label>Private</label>
              <Radio toggle onChange={this.handleToggleInput} />
            </Form.Field>
            <Button type='submit'>Submit</Button>
          </Form>
        </div>
      </React.Fragment>
    );
  }
}

SendSupport.propTypes = {
  submitSupport: PropTypes.func.isRequired,
  _id: PropTypes.string,
  token: PropTypes.string,
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
  supportResponse: {
    msg,
    errorMsg
  }
}) => ({
  _id,
  token,
  msg,
  errorMsg
});

export default connect(mapStateToProps, {
  submitSupport
})(SendSupport);
