import {
  AuthenticateUser, 
  AuthenticateUserError, 
  RegisterUser, 
  RegisterUserError, 
  AccountActivated,
  AccountActivateError,
  FetchedResponses,
  FetchResponsesError,
  SupportSubmitError,
  SupportSubmitted,
  FetchedResponse,
  FetchResponseError,
  UserLogoutResponse,
  UserLogoutResponseError
} from "../../Actions/Types";

const authUserInitialState = {
  personalDetails: {},
  token: "",
  errorMsg: ""
};

const registeredUserInitialState = {
  msg: "",
  errorMsg: ""
};

const activateAccountInitialState = {
  activated: false,
  msg: "",
  errorMsg: ""
};

const fetchResponsesInitialState = {
  received: false,
  responses: [],
  msg: "",
  errorMsg: ""
};

const supportSubmittedInitialState = {
  msg: "",
  errorMsg: ""
};

const fetchResponseInitialState = {
  response: {},
  errorMsg: ""
};

const logoutResponseInitialState = {
  msg: "",
  errorMsg: ""
};

export const AuthenticatedUser = (state = authUserInitialState, action) => {
  switch (action.type) {
    case AuthenticateUser:
      return {
        ...state,
        personalDetails: action.payload.personalDetails,
        token: action.payload.token,
        errorMsg: ""
      }
    case AuthenticateUserError:
      return {
        ...state,
        personalDetails: "",
        token: "",
        errorMsg: action.payload.errorMsg
      }
    default: {
      return state;
    }
  }
};

export const RegisteredUser = (state = registeredUserInitialState, action) => {
  switch (action.type) {
    case RegisterUser:
      return {
        ...state,
        msg: action.payload.msg,
        errorMsg: ""
      }
    case RegisterUserError:
      return {
        ...state,
        msg: "",
        errorMsg: action.payload.errorMsg
      }
    default: {
      return state;
    }
  }
};

export const ActivateAccount = (state = activateAccountInitialState, action) => {
  switch (action.type) {
    case AccountActivated:
      return {
        ...state,
        activated: action.payload.activated,
        msg: action.payload.msg,
        errorMsg: ""
      }
    case AccountActivateError:
      return {
        ...state,
        activated: action.payload.activated,
        msg: "",
        errorMsg: action.payload.errorMsg
      }
    default: {
      return state;
    }
  }
};

export const fetchReceivedResponses = (state = fetchResponsesInitialState, action) => {
  switch (action.type) {
    case FetchedResponses:
      return {
        ...state,
        received: action.payload.received,
        responses: action.payload.responses,
        msg: action.payload.responses.length < 1 ? action.payload.msg : "",
        errorMsg: ""
      }
    case FetchResponsesError:
      return {
        ...state,
        received: action.payload.received,
        responses: [],
        msg: "",
        errorMsg: action.payload.errorMsg
      }
    default: {
      return state;
    }
  }
};

//Submit User Support
export const submitSupport = (state = supportSubmittedInitialState, action) => {
  switch (action.type) {
    case SupportSubmitted:
      return {
        ...state,
        msg: action.payload.msg,
        errorMsg: ""
      }
    case SupportSubmitError:
      return {
        ...state,
        msg: "",
        errorMsg: action.payload.errorMsg
      }
    default: {
      return state;
    }
  }
};

//View Response
export const viewResponse = (state = fetchResponseInitialState, action) => {
  switch (action.type) {
    case FetchedResponse:
      return {
        ...state,
        response: action.payload.response,
        errorMsg: ""
      }
    case FetchResponseError:
      return {
        ...state,
        response: {},
        errorMsg: action.payload.errorMsg
      }
    default: {
      return state;
    }
  }
};

//Logout User
export const logoutUser = (state = logoutResponseInitialState, action) => {
  switch (action.type) {
    case UserLogoutResponse:
      return {
        ...state,
        msg: action.payload.msg,
        errorMsg: ""
      }
    case UserLogoutResponseError:
      return {
        ...state,
        msg: "",
        errorMsg: action.payload.errorMsg
      }
    default: {
      return state;
    }
  }
};