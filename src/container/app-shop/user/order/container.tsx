import { PureComponent } from 'react';

import { objectToHash } from '../../../../utils/encode';
import { getUrlParameter } from '../../../../utils/format';
import { ROUTING_USER_ORDER } from '../../../../routings/path';
import { navigateWithParams } from '../../../../utils/navigate';
import { generateMobileTab } from './handler';

import renderView from './view';
import { IProps, IState } from './model';
import { INITIAL_STATE, DEFAULT_PROPS } from './initialize';

class OrderContainer extends PureComponent<IProps, IState> {
  static defaultProps: IProps = DEFAULT_PROPS;
  constructor(props: IProps) {
    super(props);
    const { page, status } = this.getParams();
    this.state = INITIAL_STATE({ page, status });
  }

  init() {
    const { fetchUserOrderListAction, perPage } = this.props;

    const { page, status } = this.getParams();
    const param = { page, perPage, status };

    fetchUserOrderListAction(param);
  }

  getParams() {
    const page = parseInt(getUrlParameter(window.location.search, 'page')) || 1;
    const status = getUrlParameter(window.location.search, 'status') || '';

    return { page, status };
  }

  initPagination(props = this.props) {
    const {
      perPage,
      userStore: { userOrderList }
    } = props;

    const { page, status } = this.getParams();
    const params = { page, perPage, status };
    const keyHash = objectToHash(params);

    const { total_pages } = (userOrderList[keyHash] && userOrderList[keyHash].paging) || 0;

    const urlList: Array<any> = [];

    for (let i = 1; i <= total_pages; i++) {
      const query = new URLSearchParams();
      status && query.set('status', status);
      query.set('page', String(i));
      urlList.push({
        number: i,
        title: i,
        link: `${ROUTING_USER_ORDER}?${query.toString()}`
      });
    }

    this.setState({ urlList });
  }

  componentDidMount() {
    this.init();
    this.initPagination(this.props);
    this.props.getCancelOrderReasonAction();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const {
      userStore: { isFetchUserOrderList },
      orderStore: { isCancelOrderSuccess },
      fetchUserOrderListAction,
      perPage,
      location
    } = this.props;

    !isCancelOrderSuccess && nextProps.orderStore.isCancelOrderSuccess && this.init();

    const page = parseInt(getUrlParameter(location.search, 'page')) || 1;
    const nextPage = parseInt(getUrlParameter(nextProps.location.search, 'page')) || 1;
    const status = getUrlParameter(location.search, 'status') || '';
    const nextStatus = getUrlParameter(nextProps.location.search, 'status') || '';
    const params = { page: nextPage, perPage, status: nextStatus };

    page !== nextPage && this.setState({ page: nextPage }, () => fetchUserOrderListAction(params));
    status !== nextStatus && this.setState({ status: nextStatus }, () => fetchUserOrderListAction(params));

    !isFetchUserOrderList && nextProps.userStore.isFetchUserOrderList && this.initPagination(nextProps);

    if (location !== nextProps.location) {
      const mobileTabs = generateMobileTab({ status: nextStatus });
      this.setState({ mobileTabs });
    }
  }

  handleChangeMobileTab({ status }) {
    const { history } = this.props;
    navigateWithParams(history, { status }, ['status', 'page']);
  }

  render() {
    return renderView.bind(this)();
  }
}

export default OrderContainer;
