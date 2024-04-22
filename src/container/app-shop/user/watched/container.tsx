import { PureComponent } from 'react';

import { objectToHash } from '../../../../utils/encode';
import { getUrlParameter } from '../../../../utils/format';
import { ROUTING_USER_WATCHED } from '../../../../routings/path';

import renderView from './view';
import { IProps, IState } from './model';
import { INITIAL_STATE, DEFAULT_PROPS } from './initialize';

class WatchedContainer extends PureComponent<IProps, IState> {
  static defaultProps: IProps = DEFAULT_PROPS;
  constructor(props: IProps) {
    super(props);
    this.state = INITIAL_STATE;
  }

  init() {
    const { fetchUserWatchedListAction, location, perPage } = this.props;

    const page = this.getPage(location.pathname);
    const params = { page, perPage };

    fetchUserWatchedListAction(params);
  }

  getPage(url) {
    const page = getUrlParameter(window.location.search, 'page') || 1;
    this.setState({ page });

    return page;
  }

  initPagination(props = this.props) {
    const {
      perPage,
      location,
      userStore: { userWatchedList }
    } = props;

    const page = this.getPage(location.pathname);
    const params = { page, perPage };
    const keyHash = objectToHash(params);

    const { total_pages } = (userWatchedList[keyHash] && userWatchedList[keyHash].paging) || 0;

    const urlList: Array<any> = [];

    for (let i = 1; i <= total_pages; i++) {
      urlList.push({
        number: i,
        title: i,
        link: `${ROUTING_USER_WATCHED}?page=${i}`
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
      userStore: { isFetchUserWatchedList },
      fetchUserWatchedListAction,
      perPage
    } = this.props;

    const page = getUrlParameter(window.location.search, 'page') || 1;
    const params = { page, perPage };

    page !== this.state.page && this.setState({ page }, () => fetchUserWatchedListAction(params));

    false === isFetchUserWatchedList &&
      true === nextProps.userStore.isFetchUserWatchedList &&
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

export default WatchedContainer;
