import { Suspense, lazy } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import LazyLoading from '../../components/ui/lazy-loading';
import * as ROUTINGS from '../path';
import { AuthenticatedRoute } from './router-utils';

const CheckOutContainer = lazy(() => import('../../container/app-shop/cart/check-out'));
const CheckOutPaymentContainer = lazy(() => import('../../container/app-shop/cart/payment'));
const CheckOutSuccessContainer = lazy(() => import('../../container/app-shop/cart/success'));

export const AppShopCheckOutSwitchRouting = () => (
  <Suspense fallback={<LazyLoading />}>
    <Switch>
      <Route path={ROUTINGS.ROUTING_CHECK_OUT} render={(routeProps) => <CheckOutContainer {...routeProps} />} />
      {false && <AuthenticatedRoute path={ROUTINGS.ROUTING_CHECK_OUT_PAYMENT} component={CheckOutPaymentContainer} />}
      <Route
        exact
        path={ROUTINGS.ROUTING_CHECK_OUT_PAYMENT}
        render={() => <Redirect to={ROUTINGS.ROUTING_CHECK_OUT} />}
      />
      <AuthenticatedRoute path={ROUTINGS.ROUTING_CHECK_OUT_SUCCESS} component={CheckOutSuccessContainer} />
    </Switch>
  </Suspense>
);
