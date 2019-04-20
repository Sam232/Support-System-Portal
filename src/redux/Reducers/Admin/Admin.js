import { 
  AuthenticateAdmin, 
  AuthenticateAdminError,
  FetchedUserSupports,
  FetchUserSupportsError
} from "../../Actions/Types";

const authAdminInitialState = {
  personalDetails: {},
  token: "",
  errorMsg: ""
};

const fetchedUserSupportsInitialState = {
  received: false,
  responses: [],
  msg: "",
  errorMsg: ""
};

export const AuthenticatedAdmin = ( state = authAdminInitialState, action ) => {
  switch(action.type){
    case AuthenticateAdmin: 
      return {
        ...state,
        personalDetails: action.payload.personalDetails,
        token: action.payload.token,
        errorMsg: ""
      }
    case AuthenticateAdminError:  
      return {
        ...state,
        errorMsg: action.payload.errorMsg
      }
    default: {
      return state;
    }
  }
};

export const FetchedUserSupports_ = (state = fetchedUserSupportsInitialState, action) => {
  switch (action.type) {
    case FetchedUserSupports:
      return {
        ...state,
        received: action.payload.received,
        userSupports: action.payload.userSupports,
        msg: action.payload.userSupports.length < 1 ? action.payload.msg : "",
        errorMsg: ""
      }
    case FetchUserSupportsError:
      return {
        ...state,
        received: action.payload.received,
        userSupports: [],
        msg: "",
        errorMsg: action.payload.errorMsg
      }
    default: {
      return state;
    }
  }
};