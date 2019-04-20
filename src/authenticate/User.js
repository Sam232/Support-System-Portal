import { connectedRouterRedirect } from "redux-auth-wrapper/history4/redirect";
import locationHelperBuilder from "redux-auth-wrapper/history4/locationHelper";
import _ from "lodash";

const locationHelper = locationHelperBuilder({});

export const userIsAuthenticated = connectedRouterRedirect({
  redirectPath: "/user-login",
  authenticatedSelector: ({ authUser: { personalDetails } }) =>
    !_.isEmpty(personalDetails)
});

export const userIsNotAuthenticated = connectedRouterRedirect({
  redirectPath: (state, ownProps) =>
    locationHelper.getRedirectQueryParam(ownProps) || "/user-dashboard/",
  allowRedirectBack: false,
  authenticatedSelector: ({ authUser: { personalDetails } }) =>
    _.isEmpty(personalDetails)
});