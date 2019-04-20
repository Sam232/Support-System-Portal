import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { activateAccount } from "../../../redux/Actions/User/User";
import { Message } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import './AccountActivation.css';

class AccountActivation extends Component {
  state = {
    msg: "",
    errorMsg: ""
  };

  componentDidMount(){
    const { match: { params }, activateAccount } = this.props;

    if(params.id){
      const action = {
        payload: {
          accountId: params.id
        }
      };
      return activateAccount(action);
    }
  }

  static getDerivedStateFromProps(props, state){
    const { activated, msg, errorMsg } = props;
    if(activated){
      return {
        ...state,
        msg
      };
    }
    else if(!activated){
      return {
        ...state,
        msg: "",
        errorMsg
      };
    }
    else return state;
  }

  render(){
    const { msg, errorMsg } = this.state;
   
    return(
      <div className="position">
        {
          msg && !errorMsg ? 
            <Message positive>
              <Message.Header>Your new account has been successfully activated</Message.Header>
              <p>
              <Link to="/user-login">Login</Link> from here.
              </p>
            </Message> : null
        }
        {
          !msg && errorMsg ? <Message negative>
          <Message.Header>{errorMsg}</Message.Header>
          <p>
          Contact support team.
          </p>
        </Message> : null
        }
        {
          !msg && !errorMsg ? <PulseLoader 
            css={{
              display: "block",
              margin: "0 auto",
              borderColor: "green"
            }}
            sizeUnit="px"
            size="20"
            color="green"
            loading={true}
          /> : null
        }
      </div>
    );
  }
}

AccountActivation.propTypes = {
  activateAccount: PropTypes.func.isRequired,
  activated: PropTypes.bool,
  msg: PropTypes.string,
  errorMsg: PropTypes.string 
};

const mapStateToProps = ({
  accountActivation: {
    activated,
    msg,
    errorMsg
  }
}) => ({
  activated,
  msg,
  errorMsg
});

export default connect(mapStateToProps, {
  activateAccount
})(AccountActivation);