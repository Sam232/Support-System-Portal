import axios from "axios";
import { 
  AuthenticateAdmin, 
  AuthenticateAdminError, 
  FetchedUserSupports, 
  FetchUserSupportsError 
} from "../Types";

//Authenticate Admin
export const authenticateAdmin = action => dispatch => {
  const { email, password } = action.payload;
  axios.post("http://localhost:4000/admin/7f2db1e4-66ed/login", {
    email,
    password
  })
    .then(response => {
      if(response.data.personalDetails){
        dispatch({
          type: AuthenticateAdmin,
          payload: {
            personalDetails: response.data.personalDetails,
            token: response.data.token
          }
        });
      } 
    })
    .catch(error => {
      if(error.response){
        return dispatch({
          type: AuthenticateAdminError,
          payload: {
            errorMsg: error.response.data.errorMsg
          }
        });
      }
      dispatch({
        type: AuthenticateAdminError,
        payload: {
          errorMsg: "Network Error, Try Again"
        }
      });
    });
};

//Fetch Received User Supports
export const fetchUserSupports = action => dispatch => {
  const { token } = action.payload;
 
  axios.get("http://localhost:4000/admin/7f2db1e4-66ed/view/received/user-support", {
    headers: {
      authorization: `bearer ${token}`
    }
  })
    .then(response => {
      if (response.data.fetchedUserSupport.length > 0) { 
        dispatch({
          type: FetchedUserSupports,
          payload: {
            received: true,
            userSupports: response.data.fetchedUserSupport,
          }
        });
      }
      else if(response.data.msg){
        dispatch({
          type: FetchedUserSupports,
          payload: {
            received: false,
            userSupports: [],
            msg: response.data.msg,

          }
        }); 
      }
    })
    .catch(error => {
      if (error.response) {        
        return dispatch({
          type: FetchUserSupportsError,
          payload: {
            received: false,
            errorMsg: error.response.data.errorMsg
          }
        });
      }
      dispatch({
        type: FetchUserSupportsError,
        payload: {
          received: false,
          errorMsg: "Network Error, Try Again"
        }
      });
    });
};