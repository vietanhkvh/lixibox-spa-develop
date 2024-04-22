import { Suspense, lazy } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import LazyLoading from '../../components/ui/lazy-loading';
/** Utils */
import { AuthenticatedRoute } from './router-utils';
import * as ROUTINGS from '../path';

const OrderContainer = lazy(() => import('../../container/app-shop/user/order'));
const StoreOrdersContainer = lazy(() => import('../../container/app-shop/user/store-orders'));
const WatchedContainer = lazy(() => import('../../container/app-shop/user/watched'));
const DeliveryContainer = lazy(() => import('../../container/app-shop/user/delivery'));
const WishListContainer = lazy(() => import('../../container/app-shop/user/wish-list'));
const WaitListContainer = lazy(() => import('../../container/app-shop/user/wait-list'));
const DashboardContainer = lazy(() => import('../../container/app-shop/user/dashboard'));
const ProfileEditContainer = lazy(() => import('../../container/app-shop/user/profile'));
const VerifyUserContainer = lazy(() => import('../../container/app-shop/user/verify-user'));
const UpdatePasswordContainer = lazy(() => import('../../container/app-shop/user/update-password'));

const NotificationContainer = lazy(() => import('../../container/app-shop/user/notification'));
const OrderDetailContainer = lazy(() => import('../../container/app-shop/user/order-detail'));
const OrderDetailOnepayContainer = lazy(() => import('../../container/app-shop/user/order-detail-onepay'));
const TransactionHistoryContainer = lazy(() => import('../../container/app-shop/user/transaction-history'));
// const UserInvitationContainer = lazy(() => import('../../components/user-invitation'));
const ReferralSchemesContainer = lazy(() => import('../../container/app-shop/referral-schemes'));
const ReferralStatisticsAndHistoryContainer = lazy(
  () => import('../../container/app-shop/referral-statistics-and-history')
);
const ReferralDetailContainer = lazy(() => import('../../container/app-shop/referral-detail'));

const NotFoundContainer = lazy(() => import('../../container/exception/404'));

export const AppShopUserSwitchRouting = () => (
  <Suspense fallback={<LazyLoading />}>
    <Switch>
      {/* Group: Root */}
      <Route exact path={ROUTINGS.ROUTING_USER} component={DashboardContainer} />

      {/* Group: Order */}
      <AuthenticatedRoute exact path={ROUTINGS.ROUTING_USER_ORDER} component={OrderContainer} />
      <AuthenticatedRoute exact path={ROUTINGS.ROUTING_USER_ORDER_STORE_PURCHASES} component={StoreOrdersContainer} />
      <AuthenticatedRoute exact path={ROUTINGS.ROUTING_USER_ORDER_DETAIL} component={OrderDetailContainer} />
      <AuthenticatedRoute
        exact
        path={ROUTINGS.ROUTING_USER_ORDER_STORE_PURCHASES_DETAIL}
        component={OrderDetailContainer}
      />
      <AuthenticatedRoute
        exact
        path={ROUTINGS.ROUTING_USER_ORDER_DETAIL_ONEPAY}
        component={OrderDetailOnepayContainer}
      />

      {/* Group: Product */}
      <AuthenticatedRoute exact path={ROUTINGS.ROUTING_USER_WATCHED} component={WatchedContainer} />
      <AuthenticatedRoute exact path={ROUTINGS.ROUTING_USER_WISHLIST} component={WishListContainer} />
      <AuthenticatedRoute exact path={ROUTINGS.ROUTING_USER_WAITLIST} component={WaitListContainer} />
      <Route
        exact
        path={ROUTINGS.ROUTING_USER_FEEDBACK}
        render={() => <Redirect to={ROUTINGS.ROUTING_COMMUNITY_SUBMITTED_FEEDBACKS} />}
      />

      {/* Group: PromotioN */}
      <Route
        exact
        path={ROUTINGS.ROUTING_USER_TRANSACTIONS_LIXICOIN_OLD}
        render={() => <Redirect to={ROUTINGS.ROUTING_USER_TRANSACTIONS_LIXICOIN} />}
      />
      <AuthenticatedRoute exact path={ROUTINGS.ROUTING_USER_TRANSACTIONS} component={TransactionHistoryContainer} />
      <AuthenticatedRoute
        exact
        path={ROUTINGS.ROUTING_USER_TRANSACTIONS_LIXICOIN}
        component={TransactionHistoryContainer}
      />
      <AuthenticatedRoute
        exact
        path={ROUTINGS.ROUTING_USER_TRANSACTIONS_BALANCE}
        component={TransactionHistoryContainer}
      />
      <Route exact path={ROUTINGS.ROUTING_USER_INVITE} component={ReferralSchemesContainer} />
      <AuthenticatedRoute
        exact
        path={ROUTINGS.ROUTING_USER_INVITE_HISTORY}
        component={ReferralStatisticsAndHistoryContainer}
      />
      <Route exact path={ROUTINGS.ROUTING_USER_INVITE_DETAIL} component={ReferralDetailContainer} />
      <AuthenticatedRoute
        exact
        path={ROUTINGS.ROUTING_USER_DISCOUNT_CODES}
        component={() => <Redirect to={ROUTINGS.ROUTING_VOUCHERS_PATH} />}
      />

      {/* Group: Account */}
      <AuthenticatedRoute exact path={ROUTINGS.ROUTING_USER_PROFILE_EDIT} component={ProfileEditContainer} />
      <AuthenticatedRoute exact path={ROUTINGS.ROUTING_USER_VERIFY} component={VerifyUserContainer} />
      <AuthenticatedRoute exact path={ROUTINGS.ROUTING_USER_UPDATE_PASSWORD} component={UpdatePasswordContainer} />
      <AuthenticatedRoute exact path={ROUTINGS.ROUTING_USER_DELIVERY} component={DeliveryContainer} />
      <AuthenticatedRoute exact path={ROUTINGS.ROUTING_USER_NOTIFICATION} component={NotificationContainer} />

      <Route
        exact
        path={ROUTINGS.ROUTING_USER_CHANGE_PASSWORD}
        render={() => <Redirect to={ROUTINGS.ROUTING_USER_VERIFY} />}
      />
      {/* Backward compatibility redirection. Retain for about a year before removal */}
      <Route
        exact
        path={ROUTINGS.ROUTING_USER_VERIFY_EMAIL}
        render={() => <Redirect to={ROUTINGS.ROUTING_USER_VERIFY} />}
      />

      {/* Group: 404 */}
      <Route path={'*'} render={(routeProps) => <NotFoundContainer {...routeProps} />} />
    </Switch>
  </Suspense>
);
