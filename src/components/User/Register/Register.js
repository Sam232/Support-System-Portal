import React, { Component } from "react";
import { Button, Form, Grid, Header, Message, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { registerUser } from "../../../redux/Actions/User/User";

class Register extends Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    validationError: {
      firstNameError: "",
      lastNameError: "",
      emailError: "",
      passwordError: "",
      error: ""
    },
    msg: ""
  }

  static getDerivedStateFromProps(props, state) {
    if (props.msg) {
      return {
        ...state,
        msg: props.msg,
        validationError: {
          ...state.validationError,
          error: ""
        }
      };
    }
    else if (props.errorMsg) {
      return {
        ...state,
        msg: "",
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

  registerUser_ = e => {
    e.preventDefault();

    const { firstName, lastName, email, password, confirmPassword } = this.state;
    const { registerUser } = this.props;

    if (!firstName) {
      return this.setState({
        validationError: {
          ...this.state.validationError,
          firstNameError: "First Name Is Required"
        }
      });
    }

    if (firstName.length <= 1) {
      return this.setState({
        validationError: {
          ...this.state.validationError,
          firstNameError: "Length Of First Name Should Be Greater Than One"
        }
      });
    }

    if (!lastName) {
      return this.setState({
        validationError: {
          ...this.state.validationError,
          firstNameError: "",
          lastNameError: "Last Name Is Required"
        }
      });
    }

    if (lastName.length <= 1) {
      return this.setState({
        validationError: {
          ...this.state.validationError,
          firstNameError: "",
          lastNameError: "Length Of Last Name Should Be Greater Than One"
        }
      });
    }

    if (!email) {
      return this.setState({
        validationError: {
          ...this.state.validationError,
          firstNameError: "",
          lastNameError: "",
          emailError: "Email Address Is Required"
        }
      });
    }

    if (!password) {
      return this.setState({
        validationError: {
          ...this.state.validationError,
          firstNameError: "",
          lastNameError: "",
          emailError: "",
          passwordError: "Password Is Required"
        }
      });
    }

    if (!confirmPassword) {
      return this.setState({
        validationError: {
          ...this.state.validationError,
          firstNameError: "",
          lastNameError: "",
          emailError: "",
          passwordError: "Confirm Password Is Required"
        }
      });
    }

    if (password === confirmPassword) {
      //dispatch action
      const action = {
        payload: {
          firstName,
          lastName,
          email,
          password,
          confirmPassword
        }
      };

      registerUser(action);

      return this.setState({
        validationError: {
          ...this.state.validationError,
          firstNameError: "",
          lastNameError: "",
          emailError: "",
          passwordError: ""
        }
      });
    }
    else {
      return this.setState({
        validationError: {
          ...this.state.validationError,
          firstNameError: "",
          lastNameError: "",
          emailError: "",
          passwordError: "Password and Confirm Password Must Match"
        }
      });
    }
  };

  render() {
    const { firstName, lastName, email, password, confirmPassword, msg } = this.state;
    const { firstNameError, lastNameError, emailError, passwordError, error } = this.state.validationError;

    return (
      <div style={{ marginTop: "7em" }}>
        <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle' >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='white' textAlign='center'>
            Support System
            </Header>
            {
              msg ? <Message positive>
                <p>{msg}</p>
              </Message> : null
            }
            {
              error ? <Message negative>
                <p>{error}</p>
              </Message> : null
            }
            <Form size='large' onSubmit={this.registerUser_}>
              <Segment stacked>
                {
                  firstNameError ? <Header as='h5' color='red' textAlign='center'>
                    {firstNameError}
                  </Header> : null
                }
                {
                  lastNameError ? <Header as='h5' color='red' textAlign='center'>
                    {lastNameError}
                  </Header> : null
                }
                {
                  emailError ? <Header as='h5' color='red' textAlign='center'>
                    {emailError}
                  </Header> : null
                }
                {
                  passwordError ? <Header as='h5' color='red' textAlign='center'>
                    {passwordError}
                  </Header> : null
                }
                <Form.Input name="firstName" fluid icon='user' iconPosition='left' type="text" placeholder='First Name' value={firstName} onChange={this.submitData} />
                <Form.Input name="lastName" fluid icon='user' iconPosition='left' type="text" placeholder='Last Name' value={lastName} onChange={this.submitData} />
                <Form.Input name="email" fluid icon='envelope' iconPosition='left' type="email" placeholder='E-mail address' value={email} onChange={this.submitData} />
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
                <Form.Input
                  name="confirmPassword"
                  fluid
                  icon='lock'
                  iconPosition='left'
                  placeholder='Confirm Password'
                  type='password'
                  value={confirmPassword}
                  onChange={this.submitData}
                />
                <Button color='blue' fluid size='large'>
                  Register
                </Button>
              </Segment>
            </Form>
            <Message>
              Not new to us? <Link to='/user-login'>Login</Link>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    );
  };
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  msg: PropTypes.string,
  errorMsg: PropTypes.string
};

const mapStateToProps = ({
  regUser: {
    msg,
    errorMsg
  }
}) => ({
  msg,
  errorMsg
});

export default connect(mapStateToProps, {
  registerUser
})(Register);
