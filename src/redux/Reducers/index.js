import { combineReducers } from "redux";
import { AuthenticatedAdmin, FetchedUserSupports_ } from "./Admin/Admin";
import { 
  AuthenticatedUser, 
  RegisteredUser, 
  ActivateAccount, 
  fetchReceivedResponses, 
  submitSupport,
  viewResponse,
  logoutUser
} from "./User/User";

export default combineReducers({
  //Admin
  authAdmin: AuthenticatedAdmin,
  userSupports: FetchedUserSupports_,
  //User
  authUser: AuthenticatedUser,
  regUser: RegisteredUser,
  accountActivation: ActivateAccount,
  receivedResponses: fetchReceivedResponses,
  supportResponse: submitSupport,
  fetchedResponse: viewResponse,
  logoutResponse: logoutUser
});