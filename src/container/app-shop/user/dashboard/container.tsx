import { PureComponent } from 'react';

import { SIGN_IN_STATE } from 'constants/application/global';
import { NOTIFICATION_TYPE } from 'constants/application/notification';
import { ORDER_TYPE } from 'constants/application/order';

import { DEFAULT_PROPS, INITIAL_STATE } from './initialize';
import { IProps, IState } from './model';
import renderView from './view';

class DashboardContainer extends PureComponent<IProps, IState> {
  static defaultProps: IProps = DEFAULT_PROPS;
  constructor(props: IProps) {
    super(props);
    this.state = INITIAL_STATE;
  }

  filterOrderFulfilled(props = this.props) {
    const {
      userStore: { userDashboard }
    } = props;
    const tmpOrderList =
      'undefined' !== typeof userDashboard.orders
        ? userDashboard.orders.filter(
            (item) => item.status !== ORDER_TYPE.FULFILLED && item.status !== ORDER_TYPE.SHIPPED
          )
        : [];
    this.setState({
      orderList: tmpOrderList
    });
  }

  filterNotificationSuccess(props = this.props) {
    const {
      userStore: { userDashboard }
    } = props;

    const tmpNotificationList =
      'undefined' !== typeof userDashboard.notifications
        ? userDashboard.notifications.filter(
            (item) =>
              item.notification_type === NOTIFICATION_TYPE.ORDER_CANCELLED ||
              item.notification_type === NOTIFICATION_TYPE.ORDER_REMIND ||
              item.notification_type === NOTIFICATION_TYPE.PARTIAL_ORDER_CANCELLED
          )
        : [];

    this.setState({
      notificationList: tmpNotificationList
    });
  }

  init() {
    const {
      perPage,
      fetchUserDashboardAction,
      fetchUserBoxesToFeedbackAction,
      fetchUserWatchedListAction,
      fetchListLikedBoxesAction,
      fetchUserProfileAction,
      getReferralSchemesAction,
      authStore: { signInStatus },
      getOrderBirthdayReceived,
      getMembershipAction
    } = this.props;

    const param: any = { page: 1, perPage };

    getReferralSchemesAction({ status: 'available' });
    const firstDayCurrentYear = new Date(new Date().getFullYear(), 0, 1).getTime() / 1000;
    const currentYear = Math.floor(new Date().getTime() / 1000);
    const data = {
      startAt: firstDayCurrentYear,
      endAt: currentYear
    };
    if (signInStatus === SIGN_IN_STATE.LOGIN_SUCCESS) {
      fetchUserDashboardAction();
      fetchUserWatchedListAction(param);
      fetchUserBoxesToFeedbackAction(param);
      fetchListLikedBoxesAction(param);
      fetchUserProfileAction();
      getOrderBirthdayReceived(data);
      getMembershipAction();
    }
  }

  componentDidMount() {
    this.init();
    this.filterOrderFulfilled(this.props);
    this.filterNotificationSuccess(this.props);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const params: any = { page: 1, perPage: nextProps.perPage };
    const {
      userStore: { isSuccess },
      likeStore,
      fetchListLikedBoxesAction
    } = this.props;

    likeStore.liked &&
      likeStore.liked.id &&
      likeStore.liked.id.length !== nextProps.likeStore.liked.id.length &&
      fetchListLikedBoxesAction(params);

    if (false === isSuccess && true === nextProps.userStore.isSuccess) {
      this.filterOrderFulfilled(nextProps);
      this.filterNotificationSuccess(nextProps);
    }
  }

  render() {
    const args = {
      props: this.props,
      state: this.state
    };
    return renderView(args);
  }
}

export default DashboardContainer;
