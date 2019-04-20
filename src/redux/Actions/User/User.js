import axios from "axios";
import { 
  AuthenticateUser, 
  AuthenticateUserError, 
  RegisterUser, 
  RegisterUserError, 
  AccountActivated, 
  AccountActivateError,
  FetchedResponses,
  FetchResponsesError,
  SupportSubmitted,
  SupportSubmitError,
  FetchedResponse,
  FetchResponseError,
  UserLogoutResponse,
  UserLogoutResponseError
} from "../Types";

//Authenticate User
export const authenticateUser = action => dispatch => {
  const { email, password } = action.payload;

  axios.post("https://ssrestfulapi.herokuapp.com/user/login", {
    email,
    password
  })
    .then(response => {
      if (response.data.personalDetails) {
        dispatch({
          type: AuthenticateUser,
          payload: {
            personalDetails: response.data.personalDetails,
            token: response.data.token
          }
        });
      }
    })
    .catch(error => {
      if (error.response) {
        return dispatch({
          type: AuthenticateUserError,
          payload: {
            errorMsg: error.response.data.errorMsg
          }
        });
      }
      dispatch({
        type: AuthenticateUserError,
        payload: {
          errorMsg: "Network Error, Try Again"
        }
      });
    });
};

//Register User
export const registerUser = action => dispatch => {
  const { firstName, lastName, email, password, confirmPassword } = action.payload;

  axios.post("https://ssrestfulapi.herokuapp.com/user/register", {
    firstName,
    lastName,
    emailAddress: email,
    password,
    confirmPassword
  })
    .then(response => {
      if (response.data.msg) {
        dispatch({
          type: RegisterUser,
          payload: {
            msg: response.data.msg,
          }
        });
      }
    })
    .catch(error => {
      if (error.response) {
        return dispatch({
          type: RegisterUserError,
          payload: {
            errorMsg: error.response.data.errorMsg
          }
        });
      }
      dispatch({
        type: RegisterUserError,
        payload: {
          errorMsg: "Network Error, Try Again"
        }
      });
    });
};

//Activate Account
export const activateAccount = action => dispatch => {
  const { accountId } = action.payload;

  axios.put(`https://ssrestfulapi.herokuapp.com/user/activate/new-account/${accountId}`)
    .then(response => {
      if (response.data.msg) {
        dispatch({
          type: AccountActivated,
          payload: {
            activated: true,
            msg: response.data.msg,
          }
        });
      }
    })
    .catch(error => {
      if (error.response) {
        return dispatch({
          type: AccountActivateError,
          payload: {
            activated: false,
            errorMsg: error.response.data.errorMsg
          }
        });
      }
      dispatch({
        type: AccountActivateError,
        payload: {
          activated: false,
          errorMsg: "Network Error, Try Again"
        }
      });
    });
};

//Fetch User Support Responses
export const fetchReceivedResponses = action => dispatch => {
  const { _id, token } = action.payload;
 
  axios.get(`https://ssrestfulapi.herokuapp.com/user/read/user-support/responses/${_id}`, {
    headers: {
      authorization: `bearer ${token}`
    }
  })
    .then(response => {
      if (response.data.fetchedSupportMsgs.length > 0) {        
        dispatch({
          type: FetchedResponses,
          payload: {
            received: true,
            responses: response.data.fetchedSupportMsgs,
          }
        });
      }
      else if(response.data.msg){
        dispatch({
          type: FetchedResponses,
          payload: {
            received: false,
            responses: [],
            msg: response.data.msg,

          }
        }); 
      }
    })
    .catch(error => {
      if (error.response) {        
        return dispatch({
          type: FetchResponsesError,
          payload: {
            received: false,
            errorMsg: error.response.data.errorMsg
          }
        });
      }
      dispatch({
        type: FetchResponsesError,
        payload: {
          received: false,
          errorMsg: "Network Error, Try Again"
        }
      });
    });
};

//Register User
export const submitSupport = action => dispatch => {
  const { _id, token, subject, body, private_ } = action.payload;

  axios.post("https://ssrestfulapi.herokuapp.com/user/submit/user-support/", {
    userId: _id,
    subject,
    body,
    private: private_
  }, {
    headers: {
      authorization: `bearer ${token}`
    }
  })
    .then(response => {
      if (response.data.msg) {
        dispatch({
          type: SupportSubmitted,
          payload: {
            msg: response.data.msg,
          }
        });
      }
    })
    .catch(error => {
      if (error.response) {
        return dispatch({
          type: SupportSubmitError,
          payload: {
            errorMsg: error.response.data.errorMsg
          }
        });
      }
      dispatch({
        type: SupportSubmitError,
        payload: {
          errorMsg: "Network Error, Try Again"
        }
      });
    });
};

//View Response
export const viewResponse = action => dispatch => {
  const { id, token } = action.payload;
  
  axios.get(`https://ssrestfulapi.herokuapp.com/user/view/user-support-response/${id}`, {
    headers: {
      authorization: `bearer ${token}`
    }
  })
    .then(response => {
      if (response.data.fetchedResponse) {        
        dispatch({
          type: FetchedResponse,
          payload: {
            fetchedResponse: response.data.fetchedResponse,
          }
        });
      }
    })
    .catch(error => {
      if (error.response) {
        return dispatch({
          type: FetchResponseError,
          payload: {
            errorMsg: error.response.data.errorMsg
          }
        });
      }
      dispatch({
        type: FetchResponseError,
        payload: {
          errorMsg: "Network Error, Try Again"
        }
      });
    });
};

//Logout
export const logoutUser = action => dispatch => {
  const { token } = action.payload;
  
  axios.post("https://ssrestfulapi.herokuapp.com/user/logout", {}, {
    headers: {
      authorization: `bearer ${token}`
    }
  })
    .then(response => {
      if (response.data.msg) {        
        dispatch({
          type: UserLogoutResponse,
          payload: {
            msg: response.data.msg,
          }
        });
      }
    })
    .catch(error => {
      if (error.response) {
        return dispatch({
          type: UserLogoutResponseError,
          payload: {
            errorMsg: error.response.data.errorMsg
          }
        });
      }
      dispatch({
        type: FetchResponseError,
        payload: {
          errorMsg: "Network Error, Try Again"
        }
      });
    });
};