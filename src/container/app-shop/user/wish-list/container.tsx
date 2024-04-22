import { PureComponent } from 'react';

import { objectToHash } from '../../../../utils/encode';
import { getUrlParameter } from '../../../../utils/format';
import { ROUTING_USER_WISHLIST } from '../../../../routings/path';

import renderView from './view';
import { IProps, IState } from './model';
import { INITIAL_STATE, DEFAULT_PROPS } from './initialize';

class WishListContainer extends PureComponent<IProps, IState> {
  static defaultProps: IProps = DEFAULT_PROPS;
  constructor(props: IProps) {
    super(props);
    this.state = INITIAL_STATE;
  }

  init() {
    const { perPage, fetchListLikedBoxesAction } = this.props;

    const page = this.getPage();
    const params = { page, perPage };

    fetchListLikedBoxesAction(params);
  }

  getPage() {
    const page = getUrlParameter(window.location.search, 'page') || 1;
    this.setState({ page });

    return page;
  }

  initPagination(props = this.props) {
    const {
      perPage,
      likeStore: { liked }
    } = props;

    const page = this.getPage();
    const params = { page, perPage };
    const keyHash = objectToHash(params);

    const { total_pages } = (liked.box && liked.box[keyHash] && liked.box[keyHash].paging) || 0;

    const urlList: Array<any> = [];

    for (let i = 1; i <= total_pages; i++) {
      urlList.push({
        number: i,
        title: i,
        link: `${ROUTING_USER_WISHLIST}?page=${i}`
      });
    }

    this.setState({ urlList });
  }

  componentDidMount() {
    this.init();
    this.initPagination(this.props);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { likeStore, fetchListLikedBoxesAction, perPage } = this.props;

    const page = getUrlParameter(window.location.search, 'page') || 1;
    const params = { page, perPage };

    page !== this.state.page && this.setState({ page }, () => fetchListLikedBoxesAction(params));

    likeStore.liked &&
      likeStore.liked.id &&
      likeStore.liked.id.length !== nextProps.likeStore.liked.id.length &&
      fetchListLikedBoxesAction(params);

    !this.props.likeStore.isFetchLikedListSuccess &&
      nextProps.likeStore.isFetchLikedListSuccess &&
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

export default WishListContainer;
