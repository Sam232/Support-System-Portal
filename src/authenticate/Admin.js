import { connectedRouterRedirect } from "redux-auth-wrapper/history4/redirect";
import locationHelperBuilder from "redux-auth-wrapper/history4/locationHelper";
import _ from "lodash";

const locationHelper = locationHelperBuilder({});

export const adminIsAuthenticated = connectedRouterRedirect({
  redirectPath: "/admin/7f2db1e4-66ed",
  authenticatedSelector: ({ authAdmin: { personalDetails } }) =>
    !_.isEmpty(personalDetails)
});

export const adminIsNotAuthenticated = connectedRouterRedirect({
  redirectPath: (state, ownProps) =>
    locationHelper.getRedirectQueryParam(ownProps) || "/dashboard/",
  allowRedirectBack: false,
  authenticatedSelector: ({ authAdmin: { personalDetails } }) =>
    _.isEmpty(personalDetails)
});
