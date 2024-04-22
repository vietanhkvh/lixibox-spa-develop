import { PureComponent } from 'react';
import { matchPath, useLocation, withRouter } from 'react-router-dom';

import { getUrlParameter } from '../../../utils/format';
import { initCheckVersion } from '../../../utils/version';
import { isMobileVersion } from '../../../utils/responsive';
import { handleWhenException } from '../../../utils/exception';
import { dispatchDueAlert } from '../../../utils/alert';
import { validateInitTracking } from '../../../utils/tracking';
import { trackOnAppLoad } from '../../../tracking/hooks/app-load';

import { MODAL_SIGN_IN, MODAL_NOTIFICATION_ORDER } from '../../../constants/application/modal';
import { KEY_WORD } from '../../../constants/application/key-word';
import { ORDER_TYPE } from '../../../constants/application/order';
import { SIGN_IN_STATE } from '../../../constants/application/global';
import { storageKey } from '../../../constants/application/client-storage';
import { REFEREE_SCHEME_MODAL_INVOCATION_MODE } from '../../../constants/application/referral';
import { PROMO_POPUP_ROUTE_BLACKLIST } from 'constants/application/path';

import {
  ROUTING_SHOP_INDEX,
  ROUTING_CHECK_OUT_PATH,
  ROUTING_CHECK_OUT,
  ROUTING_CHECK_OUT_PAYMENT,
  ROUTING_CHECK_OUT_SUCCESS,
  ROUTING_GAME,
  ROUTING_GAME_BEAUTY_HUNTER,
  ROUTING_GAME_BEAUTY_HUNTER_PLAY,
  ROUTING_GAME_BEAUTY_HUNTER_RESULT,
  ROUTING_ORDERS_TRACKINGS_PATH,
  ROUTING_USER_ORDER_DETAIL
} from '../../../routings/path';

import { initFacebook } from '../../../tracking/facebook-pixel';
import { initTrackingTiktokPixel } from '../../../tracking/tiktok-pixel';
import { initHotjar } from '../../../tracking/hotjar';
import { initMoEngage } from '../../../tracking/moengage/bootstrap';
import { initMatomo } from 'tracking/matomo/bootstrap';
import { initBranchIo } from 'tracking/branchio/bootstrap';
// import { reportWebVitals, sendWebVitalsToGoogleAnalytics } from 'tracking/web-vitals';
import { objectToHash } from '../../../utils/encode';
import { isCompareObject, isEmptyObject } from '../../../utils/validate';
import { initFbCustomerChat, validateAndEnforceMessengerPluginVisibility } from '../../../utils/messenger';
import { auth, registerAppleSigninEvents, initCrossTabAuthStatusSync } from '../../../utils/auth';
import { createCookie } from 'utils';
import { useScrollTracker } from 'utils/hook';
import { gatewayTrackScroll } from 'tracking/gateway';
import { checkBirthdayGift } from 'utils/generic';
import { canUserRedeemBirthdayGiftInNextNDays, dateToUnixSeconds, getStartOfYear, unixSecondsNow } from 'utils/time';

import { init, fetchListLiked } from './module'; //initTracking
import { IProps, IState } from './model';
import { INITIAL_STATE } from './initialize';
import View from './view';

declare global {
  interface Window {
    callbac401Exception: any;
    callbac500Exception: any;
    fbAsyncInit: any;
    FB: any;
  }
}

const ScrollTracker = () => {
  const location = useLocation();
  useScrollTracker((percentage) => {
    gatewayTrackScroll({ source: location.pathname, scrolledPercentage: percentage });
  });

  return null;
};

class AppShopContainer extends PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = INITIAL_STATE;
    this.handleGlobalException();
  }

  componentDidCatch(error, info) {
    /*
      isError value:
      -1 : not error
      0  : error out side main component
      1  : error in main component
    */
    const isError = info.componentStack.includes('AppShopSwitchRouting') ? 1 : 0;
    this.setState({ isError });

    handleWhenException({ error, info });
  }

  componentDidMount() {
    const {
      authStore,
      cartStore: { guestUser },
      fetchListLikedBoxIdAction,
      fetchListMenuAction,
      closeModalAction,
      clolseMobileSigninAlert,
      showHideInfoMobileMenuAction,
      showHideSpecialDealMenuAction,
      fetchSpecialDealList,
      history,
      location,
      // changeRoutingAction,
      trackingUtmsAction,
      saveUtmIdTrackingAction,
      // clearDataSearchAction,
      checkBirthdayAction,
      fetchConstantsAction,
      getCartAction,
      fetchUserBoxesToFeedbackAction,
      updateUrlParamsAction,
      getUtmIdFromAffiliateTrackingAction,
      signInWithAppleIDAction,
      setAppleSigninStateAction,
      linkSocialAccountAction,
      updatePrivateMode,
      fetchNotificationListAction,
      fetchStoresAction,
      updateABTestingModeAction,
      showHideCartSumaryLayoutAction
    } = this.props as IProps;

    const initializeProps = {
      history,
      authStore,
      getCartAction,
      closeModalAction,
      fetchListMenuAction,
      clolseMobileSigninAlert,
      showHideInfoMobileMenuAction,
      showHideSpecialDealMenuAction,
      fetchSpecialDealList,
      showSignInModal: this.showSignInModal.bind(this),
      location,
      setIsShowCartSummary: this.setIsShowCartSummary.bind(this),
      checkBirthdayAction,
      fetchConstantsAction,
      fetchUserBoxesToFeedbackAction,
      updateUrlParamsAction,
      getUtmIdFromAffiliateTrackingAction,
      updatePrivateMode,
      fetchNotificationListAction,
      fetchStoresAction,
      updateABTestingModeAction,
      showHideCartSumaryLayoutAction
    };

    init(initializeProps);
    this.setState({ crossTabSyncIntervalId: initCrossTabAuthStatusSync() });

    registerAppleSigninEvents(signInWithAppleIDAction, setAppleSigninStateAction, linkSocialAccountAction);
    // TODO: Upgrade to GA4
    // validateInitTracking() && initTracking({
    //   history,
    //   changeRoutingAction,
    //   clearDataSearchAction,
    //   onTrackerLoadComplete() {
    // reportWebVitals(sendWebVitalsToGoogleAnalytics);
    //   }
    // });
    // TODO: Configure remote switch
    initMoEngage();
    if (['production', 'staging-mb', 'staging'].includes(process.env.REACT_APP_ENV)) {
      initMatomo();
      initBranchIo();
    }

    initCheckVersion();

    /** Fetch list liked when first load - need auth */
    fetchListLiked({ authStore, fetchListLikedBoxIdAction });

    validateAndEnforceMessengerPluginVisibility({ pathname: location.pathname });
    validateInitTracking() && initFacebook();
    validateInitTracking() && initTrackingTiktokPixel(guestUser || {});
    validateInitTracking() && trackOnAppLoad();
    !isMobileVersion() && initFbCustomerChat();
    process.env.REACT_APP_ENV === 'production' && validateInitTracking() && initHotjar();

    dispatchDueAlert();

    // UTM ID Tracking
    const utmId = getUrlParameter(location.search, KEY_WORD.UTM_ID);
    const utmSource = getUrlParameter(location.search, KEY_WORD.UTM_SOURCE);
    const utmMedium = getUrlParameter(location.search, KEY_WORD.UTM_MEDIUM);
    const utmCampaign = getUrlParameter(location.search, KEY_WORD.UTM_CAMPAIGN);

    const utmData = Object.assign(
      {},
      !!utmId && !!utmId.length && { utmId },
      !!utmSource && !!utmSource.length && { utmSource },
      !!utmMedium && !!utmMedium.length && { utmMedium },
      !!utmCampaign && !!utmCampaign.length && { utmCampaign }
    );

    utmId && trackingUtmsAction({ utmId });
    !!utmData && saveUtmIdTrackingAction(utmData);

    // Get notification order
    this.handleFetchOrderList();

    // Show suggest feedback modal
    // Limit show modal one times per day
    // re-show after two days

    const timeShowSuggestionFeedback = localStorage.getItem(storageKey.TIME_SHOW_SUGGESTION_FEEDBACK);
    const currentTime = new Date().getTime();
    if (!timeShowSuggestionFeedback) {
      localStorage.setItem(storageKey.TIME_SHOW_SUGGESTION_FEEDBACK, currentTime.toString());
    } else {
      if (currentTime - parseInt(timeShowSuggestionFeedback) * 1 > 86400 * 1000) {
        localStorage.setItem(storageKey.TIME_SHOW_SUGGESTION_FEEDBACK, currentTime.toString());
      }
    }

    //data for get orderBirthdayReceived
    authStore.signInStatus === SIGN_IN_STATE.LOGIN_SUCCESS && this.handleFetchBirthDayOrders();
  }

  componentWillUnmount() {
    clearInterval(this.state.crossTabSyncIntervalId);
  }

  // ECOMOBI
  createUtmIdCookieForEcomobi = () => {
    const { trackingStore } = this.props;
    if (!!trackingStore.utmId && trackingStore.utmSource === 'ecomobi') {
      createCookie('utmId', trackingStore.utmId, 0.5);
    }
  };

  handleFetchOrderList() {
    // Get notification order
    const showedNotificationOrder = localStorage.getItem(storageKey.HAS_SHOW_NOTIFICATION_ORDER) || '';

    auth.loggedIn() &&
      !showedNotificationOrder &&
      this.props.fetchUserOrderListAction({ page: 1, perPage: 1, status: '' });
  }

  handleGlobalException() {
    const { clearUserStoreAction, clearAuthStoreAction, history } = this.props;
    window.callbac401Exception = () => {
      clearUserStoreAction();
      clearAuthStoreAction();
      history.push(ROUTING_SHOP_INDEX);
    };

    window.callbac500Exception = () => {
      clearUserStoreAction();
      clearAuthStoreAction();
      history.push(ROUTING_SHOP_INDEX);
    };
  }

  handleFetchBirthDayOrders() {
    const { getOrderBirthdayReceived } = this.props;
    const startOfYear = dateToUnixSeconds(getStartOfYear());
    const now = unixSecondsNow();
    const data = {
      startAt: startOfYear,
      endAt: now
    };
    getOrderBirthdayReceived(data);
  }

  handleBirthdayModalDisplay(isDisplay: boolean) {
    const { location } = this.props;

    const isOnAllowedRouting = isMobileVersion()
      ? ROUTING_SHOP_INDEX === location.pathname
      : !PROMO_POPUP_ROUTE_BLACKLIST.some((route) => matchPath(location.pathname, { path: route, exact: false }));

    this.setState(
      {
        isShowBirthdayModalForm: isOnAllowedRouting && isDisplay
      },
      () => isOnAllowedRouting && isDisplay && localStorage.setItem(storageKey.HAS_SHOW_BIRTHDAY_MODAL, 'success')
    );
  }

  handleSetIsShowBirthdayModal(value: boolean) {
    this.setState({ isShowBirthdayModalForm: value });
  }

  showNotificationOrderModal(props = this.props) {
    const {
      openModalAction,
      userStore: { userOrderList }
    } = props;

    const checkoutRoutingList = [
      ROUTING_CHECK_OUT_PATH,
      ROUTING_CHECK_OUT,
      ROUTING_CHECK_OUT_PAYMENT,
      ROUTING_CHECK_OUT_SUCCESS,
      ROUTING_GAME,
      ROUTING_GAME_BEAUTY_HUNTER,
      ROUTING_GAME_BEAUTY_HUNTER_PLAY,
      ROUTING_GAME_BEAUTY_HUNTER_RESULT
    ];

    if (
      auth.loggedIn() &&
      !isEmptyObject(userOrderList) &&
      checkoutRoutingList.indexOf(window.location.pathname) < 0 &&
      window.location.pathname.indexOf(ROUTING_ORDERS_TRACKINGS_PATH) < 0 &&
      window.location.pathname.indexOf(ROUTING_USER_ORDER_DETAIL) < 0
    ) {
      const params = { page: 1, perPage: 1, filter: '' };
      const keyHash = objectToHash(params);
      const orderList = userOrderList[keyHash];

      const order =
        (!isEmptyObject(orderList) &&
          Array.isArray(orderList.orders) &&
          orderList.orders.length > 0 &&
          orderList.orders[0]) ||
        '';

      order &&
        (order.status === ORDER_TYPE.UNPAID ||
          order.status === ORDER_TYPE.PAYMENT_PENDING ||
          order.status === ORDER_TYPE.CONFIRMED ||
          order.status === ORDER_TYPE.PAID ||
          order.status === ORDER_TYPE.SHIPPED) &&
        openModalAction(MODAL_NOTIFICATION_ORDER(order));

      localStorage.setItem(storageKey.HAS_SHOW_NOTIFICATION_ORDER, 'success');
    }
  }

  showSignInModal() {
    const { openModalAction } = this.props;
    openModalAction(MODAL_SIGN_IN());
  }

  UNSAFE_componentWillReceiveProps(nextProps: IProps) {
    const {
      authStore,
      fetchListLikedBoxIdAction,
      openSharedModalAction,
      userStore: { isFetchUserOrderList }
    } = this.props as IProps;

    if (nextProps.authStore.signInStatus !== authStore.signInStatus) {
      fetchListLiked({
        authStore: nextProps.authStore,
        fetchListLikedBoxIdAction
      });
      nextProps.authStore.signInStatus === SIGN_IN_STATE.LOGIN_SUCCESS && this.handleFetchBirthDayOrders();

      // FIXME: [CRITICAL] Remove the following block and utilize the block in `src/components/auth/sign-in/components.tsx:handleSignInSuccess`
      // NOTE: The following block was added as a temporary workaround as the above mentioned block gets skipped due to a bug.
      if (nextProps.authStore.signInStatus === SIGN_IN_STATE.LOGIN_SUCCESS) {
        const referralModalToOpen = localStorage.getItem(storageKey.REFERRAL_MODAL_TO_OPEN);
        if (referralModalToOpen) {
          const { id, code, schemeId } = JSON.parse(referralModalToOpen);
          openSharedModalAction({
            id,
            surviveSingleRouteChange: true,
            data: { code, schemeId, mode: REFEREE_SCHEME_MODAL_INVOCATION_MODE.INITIAL }
          });
          localStorage.removeItem(storageKey.REFERRAL_MODAL_TO_OPEN);
        }
      }
    }

    !isFetchUserOrderList && nextProps.userStore.isFetchUserOrderList && this.showNotificationOrderModal(nextProps);
  }

  componentDidUpdate(prevProps: IProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      const {
        closeModalAction,
        clolseMobileSigninAlert,
        showHideInfoMobileMenuAction,
        showHideSpecialDealMenuAction,
        closeAllSharedModalAction,
        showHideCartSumaryLayoutAction
      } = this.props as IProps;

      showHideCartSumaryLayoutAction?.(false);
      closeModalAction();
      clolseMobileSigninAlert();
      showHideInfoMobileMenuAction(false);
      showHideSpecialDealMenuAction(false);
      closeAllSharedModalAction({ reason: 'routeChanged' });
      validateAndEnforceMessengerPluginVisibility({ pathname: this.props.location.pathname });
    }
    // ECOMOBI
    if (this.props.trackingStore !== prevProps.trackingStore) {
      this.createUtmIdCookieForEcomobi();
    }

    if (
      isCompareObject(this.props.orderStore?.birthdayOrder, prevProps.orderStore?.birthdayOrder) &&
      this.props.authStore?.signInStatus === SIGN_IN_STATE.LOGIN_SUCCESS
    ) {
      const {
        orderStore: { birthdayOrder },
        authStore
      } = this.props;
      const { isLoading, isSuccess } = birthdayOrder;

      if (!isLoading && isSuccess) {
        const isReceivedBirthdayGift = checkBirthdayGift(birthdayOrder?.orders, birthdayOrder?.storeOrders);

        let canUserRedeemBirthdayGift = false;
        if (!!authStore?.userInfo?.birthday)
          canUserRedeemBirthdayGift = canUserRedeemBirthdayGiftInNextNDays({
            birthday: new Date(authStore?.userInfo?.birthday * 1000),
            hasRedeemedThisYear: isReceivedBirthdayGift,
            redeemableInNextNDays: 90 //3 months from today
          });

        this.handleBirthdayModalDisplay(!authStore?.userInfo?.birthday || canUserRedeemBirthdayGift);
      }
    }
  }

  handleBackToHome() {
    this.props.history.push(ROUTING_SHOP_INDEX);
    this.setState({ isError: -1 });
  }

  handleReload() {
    this.setState({ isError: -1 }, () => {
      setTimeout(() => window.location.reload(), 500);
    });
  }

  setIsShowCartSummary() {
    this.setState({ isShowCartSummary: true } as any);
  }

  render() {
    return (
      <>
        <View
          {...{
            props: this.props,
            state: this.state,
            handleBackToHome: this.handleBackToHome.bind(this),
            handleReload: this.handleReload.bind(this),
            handleSetIsShowBirthdayModal: this.handleSetIsShowBirthdayModal.bind(this)
          }}
        />
        <ScrollTracker />
      </>
    );
  }
}

export default withRouter(AppShopContainer as any);
