import { PureComponent } from 'react';

import { objectToHash } from '../../../../utils/encode';
import { getUrlParameter } from '../../../../utils/format';
import { ROUTING_USER_NOTIFICATION } from '../../../../routings/path';

import renderView from './view';
import { IProps, IState } from './model';
import { DEFAULT_PROPS, INITIAL_STATE } from './initialize';

class NotificationContainer extends PureComponent<IProps, IState> {
  static defaultProps: IProps = DEFAULT_PROPS;
  constructor(props: IProps) {
    super(props);
    this.state = INITIAL_STATE;
  }

  init() {
    const { fetchNotificationListAction, perPage } = this.props;

    const page = this.getPage();
    const params = { page, perPage };

    fetchNotificationListAction(params);
  }

  getPage() {
    const page = getUrlParameter(window.location.search, 'page') || 1;
    this.setState({ page });

    return page;
  }

  initPagination(props = this.props) {
    const {
      perPage,
      notificationStore: { notificationList }
    } = props;

    const page = this.getPage();
    const params = { page, perPage };
    const keyHash = objectToHash(params);

    const { total_pages } = (notificationList[keyHash] && notificationList[keyHash].paging) || 0;

    const urlList: Array<any> = [];

    for (let i = 1; i <= total_pages; i++) {
      urlList.push({
        number: i,
        title: i,
        link: `${ROUTING_USER_NOTIFICATION}?page=${i}`
      });
    }

    this.setState({ urlList });
  }

  componentDidMount() {
    this.init();
    this.initPagination(this.props);
  }

  UNSAFE_componentWillReceiveProps(nextProps, nextState) {
    const {
      notificationStore: { isFetchNotificationSuccess },
      fetchNotificationListAction,
      perPage
    } = this.props;

    const page = getUrlParameter(window.location.search, 'page') || 1;
    const params = { page, perPage };

    page !== this.state.page && this.setState({ page }, () => fetchNotificationListAction(params));

    !isFetchNotificationSuccess &&
      nextProps.notificationStore.isFetchNotificationSuccess &&
      this.initPagination(nextProps);
  }

  render() {
    const args = {
      props: this.props,
      state: this.state
    };
    return renderView(args);
  }
}

export default NotificationContainer;
