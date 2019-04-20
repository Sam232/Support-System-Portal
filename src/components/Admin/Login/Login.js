import React, { Component } from "react";
import { Button, Form, Grid, Header, Message, Segment, Icon } from "semantic-ui-react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { authenticateAdmin } from "../../../redux/Actions/Admin/Admin";

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
      props.history.push("/dashboard");
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

  authenticateAdmini = e => {
    e.preventDefault();

    const { email, password } = this.state;
    const { authenticateAdmin } = this.props;

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

    authenticateAdmin(action);

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
            <Header as='h2' color='white' textAlign='center'>
              Support System
            </Header>
            {
              error ? <Message negative>
                <p>{error}</p>
              </Message> : null
            }
            <Form size='large' onSubmit={this.authenticateAdmini}>
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
          </Grid.Column>
        </Grid>
      </div>
    );
  };
}

Login.propTypes = {
  authenticateAdmin: PropTypes.func.isRequired,
  token: PropTypes.string,
  errorMsg: PropTypes.string
};

const mapStateToProps = ({
  authAdmin: {
    token,
    errorMsg
  }
}) => ({
  token,
  errorMsg
});

export default connect(mapStateToProps, {
  authenticateAdmin
})(Login);
