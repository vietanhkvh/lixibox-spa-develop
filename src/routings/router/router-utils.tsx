import { ComponentType } from 'react';
import { useEffect } from 'react';
import { Route, Redirect, useHistory } from 'react-router-dom';

import { storageKey } from '../../constants/application/client-storage';
import { AUTHENTICATOR_ROUTES } from 'constants/application/path';
import { auth } from '../../utils/auth';
import { setReferrer } from 'utils/navigate';
import { getPathnameWithoutQuery } from 'utils/path';
import { usePrevious } from '../../utils/hook';
import * as ROUTINGS from '../path';

/**
 * AuthenticatedRoute
 *
 * Purpose:
 * - Intended to be used for private pages
 *
 * Actions:
 * - Renders the passed component if the user is authenticated
 * - If user is not authenticated
 *   - Sets referral redirect in local storage as a post authentication redirect hint
 *   - Redirects to sign in page
 */
export const AuthenticatedRoute = ({
  component: Component,
  exact = false,
  path
}: {
  component: ComponentType<any>;
  path: string;
  exact?: boolean;
}) => (
  <Route
    path={path}
    render={(routeProps) => {
      if (!!auth.loggedIn()) return <Component {...routeProps} exact={exact} />;

      setReferrer();
      return <Redirect to={ROUTINGS.ROUTING_AUTH_SIGN_IN} />;
    }}
  />
);

/**
 * AuthenticatorRoute
 *
 * Purpose:
 * - Intended to be used for authentication pages (e.g. sign in, sign up, forgot password, verify phone, ...)
 *
 * Actions:
 * - Renders the passed component only if the user is not authenticated
 * - While user is not authenticated and if the authentication status changes to authenticated
 *   - Redirects user to any of the following targets in the following order (if available)
 *     - 1. Referrer from history state (history.location.state.referrer)
 *     - 2. Referral redirect from local storage (localStorage.getItem(storageKey.REFERRAL_REDIRECT))
 *     - 3. Home page
 */
export const AuthenticatorRoute = ({
  component: Component,
  path,
  exact = false
}: {
  component: ComponentType<any>;
  path: string;
  exact?: boolean;
}) => {
  const history = useHistory<{ referrer?: string }>();
  const isLoggedIn = auth.loggedIn();
  const wasLoggedIn = usePrevious(isLoggedIn);

  useEffect(() => {
    if (!wasLoggedIn && isLoggedIn) {
      let targetRedirect = ROUTINGS.ROUTING_SHOP_INDEX;

      if (history.location.state?.referrer) {
        const referrerPathname = getPathnameWithoutQuery(history.location.state?.referrer);
        if (!AUTHENTICATOR_ROUTES.includes(referrerPathname)) {
          targetRedirect = history.location.state?.referrer;
        }
      } else {
        const referralRedirectStorage = localStorage.getItem(storageKey.REFERRAL_REDIRECT);
        if (referralRedirectStorage) {
          const referrerPathname = getPathnameWithoutQuery(referralRedirectStorage);
          if (!AUTHENTICATOR_ROUTES.includes(referrerPathname)) {
            targetRedirect = referralRedirectStorage;
          }
          localStorage.removeItem(storageKey.REFERRAL_REDIRECT);
        }
      }

      history.replace(targetRedirect);
    }
  }, [isLoggedIn, wasLoggedIn, history]);

  return <Route path={path} exact={exact} component={Component} />;
};

/* Hard core list product detail url for halio */
const HALIO_BLUE = `${ROUTINGS.ROUTING_PRODUCT_DETAIL_PATH}/halio-facial-cleansing-massaging-device-sky-blue`;
const HALIO_YELLOW = `${ROUTINGS.ROUTING_PRODUCT_DETAIL_PATH}/halio-facial-cleansing-massaging-device-mustard`;
const HALIO_PINK = `${ROUTINGS.ROUTING_PRODUCT_DETAIL_PATH}/halio-facial-cleansing-massaging-device-baby-pink`;
const HALIO_HOT_PINK = `${ROUTINGS.ROUTING_PRODUCT_DETAIL_PATH}/may-rua-mat-halio-facial-cleansing-massaging`;
const HALIO_GREY = `${ROUTINGS.ROUTING_PRODUCT_DETAIL_PATH}/halio-facial-cleansing-massaging-grey-smoke`;

const HALIO_SENSITIVE_PINK = `${ROUTINGS.ROUTING_PRODUCT_DETAIL_PATH}/halio-facial-cleansing-massaging-device-for-sensitive-skin`;
const HALIO_SENSITIVE_MINT = `${ROUTINGS.ROUTING_PRODUCT_DETAIL_PATH}/halio-sensitive-facial-cleansing-massaging-device-mint`;

export const HALIO_REDIRECT_LIST = [
  /* Halio */
  { from: `${ROUTINGS.ROUTING_HOT_LINK_HALIO}`, to: HALIO_BLUE },
  { from: `${ROUTINGS.ROUTING_HOT_LINK_HALIO}/blue`, to: HALIO_BLUE },
  { from: `${ROUTINGS.ROUTING_HOT_LINK_HALIO}/yellow`, to: HALIO_YELLOW },
  { from: `${ROUTINGS.ROUTING_HOT_LINK_HALIO}/pink`, to: HALIO_PINK },
  { from: `${ROUTINGS.ROUTING_HOT_LINK_HALIO}/hot-pink`, to: HALIO_HOT_PINK },
  { from: `${ROUTINGS.ROUTING_HOT_LINK_HALIO}/grey`, to: HALIO_GREY },

  /* Senstive pink */
  { from: `${ROUTINGS.ROUTING_HOT_LINK_HALIO_SENSITIVE_WITHOUT_SLASH}`, to: HALIO_SENSITIVE_PINK },
  { from: `${ROUTINGS.ROUTING_HOT_LINK_HALIO_SENSITIVE}`, to: HALIO_SENSITIVE_PINK },
  { from: `${ROUTINGS.ROUTING_HOT_LINK_HALIO_SENSITIVE_PINK_SHORT}`, to: HALIO_SENSITIVE_PINK },
  { from: `${ROUTINGS.ROUTING_HOT_LINK_HALIO_SENSITIVE_PINK_REAL}`, to: HALIO_SENSITIVE_PINK },

  /* Senstive mint */
  { from: `${ROUTINGS.ROUTING_HOT_LINK_HALIO_SENSITIVE_MINT_SHORT}`, to: HALIO_SENSITIVE_MINT },
  { from: `${ROUTINGS.ROUTING_HOT_LINK_HALIO_SENSITIVE_MINT_REAL}`, to: HALIO_SENSITIVE_MINT }
];
