import React, { Component } from "react";
import { Button, Form, Grid, Header, Message, Segment, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { authenticateUser } from "../../../redux/Actions/User/User";

class Login extends Component {
  state = {
    email: "",
    password: "",
    validationError: {
      emailError: "",
      passwordError: "",
      error: ""
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (props.token) {
      return {
        ...state,
        validationError: {
          ...state.validationError,
          error: ""
        }
      };
    }
    else if (props.errorMsg) {
      return {
        ...state,
        validationError: {
          ...state.validationError,
          error: props.errorMsg
        }
      }
    }
    else return state;
  }

  submitData = e => this.setState({
    ...this.state,
    [e.target.name]: e.target.value
  });

  authenticateUser_ = e => {
    e.preventDefault();

    const { email, password } = this.state;
    const { authenticateUser } = this.props;

    if (!email) {
      return this.setState({
        validationError: {
          ...this.state.validationError,
          emailError: "Email Address Is Required"
        }
      });
    }

    if (!password) {
      return this.setState({
        validationError: {
          ...this.state.validationError,
          emailError: "",
          passwordError: "Password Is Required"
        }
      });
    }

    //dispatch action
    const action = {
      payload: {
        email,
        password
      }
    };

    authenticateUser(action);

    this.setState({
      validationError: {
        ...this.state.validationError,
        emailError: "",
        passwordError: ""
      }
    });
  };

  render() {
    const { email, password } = this.state;
    const { emailError, passwordError, error } = this.state.validationError;

    return (
      <div style={{ marginTop: "7em" }}>
        <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle' >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Icon name='computer' size="large" />
            <Header as='h2' color='black' textAlign='center'>
              Support System
            </Header>
            {
              error ? <Message negative>
                <p>{error}</p>
              </Message> : null
            }
            <Form size='large' onSubmit={this.authenticateUser_}>
              <Segment stacked>
                { 
                  emailError ?  <Header as='h5' color='red' textAlign='center'>
                              {emailError}
                            </Header> : null
                }
                { 
                  passwordError ?  <Header as='h5' color='red' textAlign='center'>
                              {passwordError}
                            </Header> : null
                }
                <Form.Input name="email" fluid icon='user' iconPosition='left' type="email" placeholder='E-mail address' value={email} onChange={this.submitData} />
                
                <Form.Input
                  name="password"
                  fluid
                  icon='lock'
                  iconPosition='left'
                  placeholder='Password'
                  type='password'
                  value={password}
                  onChange={this.submitData}
                />
                <Button color='black' fluid size='large'>
                  Login
                </Button>
              </Segment>
            </Form>
            <Message>
              New to us? <Link to='/user-register'>Sign Up</Link>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    );
  };
}

Login.propTypes = {
  authenticateUser: PropTypes.func.isRequired,
  token: PropTypes.string,
  errorMsg: PropTypes.string
};

const mapStateToProps = ({
  authUser: {
    token,
    errorMsg
  }
}) => ({
  token,
  errorMsg
});

export default connect(mapStateToProps, {
  authenticateUser
})(Login);
