import { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { isUndefined } from '../../../../utils/validate';
import { FEEDABLE_TYPE } from '../../../../constants/application/feedable';

import {
  GA_TRACKING_EVENT_LABEL,
  GA_TRACKING_EVENT_ACTION,
  GA_TRACKING_EVENT_CATEGORY
} from '../../../../tracking/google-analytic/type';
import { gaEventTracking } from '../../../../tracking/google-analytic/ga-event-tracking';

import { mapStateToProps, mapDispatchToProps } from './store';
import { DEFAULT_PROPS, INITIAL_STATE } from './initialize';
import { IProps, IState } from './model';
import renderView from './view';

class LoveFeedContainer extends Component<IProps, IState> {
  static defaultProps: IProps = DEFAULT_PROPS;

  constructor(props: IProps) {
    super(props);
    this.state = INITIAL_STATE as IState;
  }

  handleSubmit() {
    const {
      limit,
      activityFeedStore: { nextPageCode },
      fecthActivityFeedListAction
    } = this.props;

    fecthActivityFeedListAction({
      limit,
      pageCode: nextPageCode,
      feedType: FEEDABLE_TYPE.LOVE
    });
  }

  handleLoadViewMore() {
    const { isLoading, isFeedbackFull, pageLoadMore = 1 } = this.state as IState;

    let eleInfo = this.getPositionElementById('load-view-more');
    const height = window.innerHeight;

    const isLoadMore = !isFeedbackFull && !isLoading && eleInfo && eleInfo.top - 100 <= height;
    if (isLoadMore) {
      gaEventTracking({
        category: GA_TRACKING_EVENT_CATEGORY.BEHAVIOR_IN_PAGE,
        action: GA_TRACKING_EVENT_ACTION.BEHAVIOR_IN_PAGE.COMMNUNITY_PAGE,
        label: `${GA_TRACKING_EVENT_LABEL.BEHAVIOR_IN_PAGE.COMMNUNITY_PAGE.VIEW_PAGE.LOAD_PAGE} ${pageLoadMore + 1}`,
        value: 1
      });
      this.setState({ isLoading: true, pageLoadMore: pageLoadMore + 1 }, this.handleSubmit);
    }
  }

  getScrollTop() {
    const el = document.scrollingElement || document.documentElement;
    return el.scrollTop;
  }

  getPositionElementById(elementId) {
    const el = document.getElementById(elementId);
    const eleInfo = el && el.getBoundingClientRect();
    return eleInfo;
  }

  handleGetCollectionDetai(props = this.props) {
    const {
      getCollectionDetailAction,
      activityFeedStore: { collection }
    } = props as IProps;

    const collectionDetailId =
      (collection && Array.isArray(collection.list) && !!collection.list.length && collection.list[0].id) || 0;
    if (collectionDetailId !== 0) {
      getCollectionDetailAction({ id: collectionDetailId });
    } else {
      this.state.isPriorityBlock && this.setState({ isPriorityBlock: false });
      this.handleGetFeed(props);
    }
  }

  handleGetFeed(props = this.props) {
    const { isPriorityBlock, isFetchFeedList } = this.state as IState;

    if (!!isPriorityBlock) {
      return;
    }

    if (!isFetchFeedList) {
      const { limit, fecthActivityFeedListAction } = props as IProps;

      this.setState({ isFetchFeedList: true });

      fecthActivityFeedListAction({ limit, feedType: FEEDABLE_TYPE.LOVE });
    }
  }

  init(props = this.props) {
    props.getCollectionAction({});
  }

  componentDidMount() {
    this.init();
    window.addEventListener('scroll', this.handleLoadViewMore.bind(this));

    gaEventTracking({
      category: GA_TRACKING_EVENT_CATEGORY.BEHAVIOR_IN_PAGE,
      action: GA_TRACKING_EVENT_ACTION.BEHAVIOR_IN_PAGE.COMMNUNITY_PAGE,
      label: GA_TRACKING_EVENT_LABEL.BEHAVIOR_IN_PAGE.COMMNUNITY_PAGE.VIEW_PAGE.UNBOXING,
      value: 1
    });

    gaEventTracking({
      category: GA_TRACKING_EVENT_CATEGORY.BEHAVIOR_IN_PAGE,
      action: GA_TRACKING_EVENT_ACTION.BEHAVIOR_IN_PAGE.COMMNUNITY_PAGE,
      label: `${GA_TRACKING_EVENT_LABEL.BEHAVIOR_IN_PAGE.COMMNUNITY_PAGE.VIEW_PAGE.LOAD_PAGE} 1`,
      value: 1
    });

    this.props.fetchCommunityHotBoxes({ days: 7, limit: 10 });
    this.props.fetchCommunityGoodSale({ limit: 10 });
    this.props.fetchCommunityTopReview({ days: 7, boxLimit: 10, feedLimit: 10 });
    this.props.fetchCommunityTopLiked({ days: 7, limit: 10 });
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', () => {});

    this.props.clearDataCollectionAction();
    this.props.clearDataActivityFeedListAction();
    this.props.clearDataActivityFeedCommentListAction();
  }

  updateTopFeedList(data, code) {
    if (!data || !data.length) return;
    const firstData = data[0];
    const { topFeedList } = this.state;
    let newImage = '';

    switch (code) {
      case 'communityHotBoxes':
      case 'communityGoodSale':
        newImage = firstData.primary_picture && firstData.primary_picture.medium_url;
        break;

      case 'communityTopReview':
        newImage = firstData.primary_picture_medium_url;
        break;

      case 'communityTopLiked':
        newImage = firstData.picture && firstData.picture.medium_url;
        break;

      default:
        break;
    }

    const newTopFeedList = topFeedList.map((item) => {
      if (item.code !== code) return item;

      return {
        ...item,
        img: newImage
      };
    });

    !!newTopFeedList && this.setState({ topFeedList: newTopFeedList });
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const {
      updateMetaInfoAction,
      activityFeedStore: {
        isFetchFeedbackSuccessful,
        isFetchedAllFeedback,
        isFetchCollectionSuccess,
        isFetchCollectionDetailSuccess,
        isFetchCommunityHotBoxes,
        isFetchCommunityGoodSale,
        isFetchCommunityTopReview,
        isFetchCommunityTopLiked,
        list
      }
    } = this.props as IProps;

    if (!!isFetchCommunityHotBoxes && !nextProps.activityFeedStore.isFetchCommunityHotBoxes) {
      this.updateTopFeedList(nextProps.activityFeedStore.communityHotBoxes, 'communityHotBoxes');
    }

    if (!!isFetchCommunityGoodSale && !nextProps.activityFeedStore.isFetchCommunityGoodSale) {
      this.updateTopFeedList(nextProps.activityFeedStore.communityGoodSale, 'communityGoodSale');
    }

    if (!!isFetchCommunityTopReview && !nextProps.activityFeedStore.isFetchCommunityTopReview) {
      this.updateTopFeedList(nextProps.activityFeedStore.communityTopReview, 'communityTopReview');
    }

    if (!!isFetchCommunityTopLiked && !nextProps.activityFeedStore.isFetchCommunityTopLiked) {
      this.updateTopFeedList(nextProps.activityFeedStore.communityTopLiked, 'communityTopLiked');
    }

    !isFetchFeedbackSuccessful &&
      nextProps.activityFeedStore.isFetchFeedbackSuccessful &&
      this.setState({ isLoading: false });

    !isFetchedAllFeedback &&
      nextProps.activityFeedStore.isFetchedAllFeedback &&
      this.setState({ isFeedbackFull: true });

    !isFetchCollectionSuccess &&
      nextProps &&
      nextProps.activityFeedStore &&
      nextProps.activityFeedStore.isFetchCollectionSuccess &&
      this.handleGetCollectionDetai(nextProps);

    !isFetchCollectionDetailSuccess &&
      nextProps &&
      nextProps.activityFeedStore &&
      nextProps.activityFeedStore.isFetchCollectionDetailSuccess &&
      this.state.isPriorityBlock &&
      this.setState({ isPriorityBlock: false });

    // Set meta for SEO
    const feedList = list || [];
    const nextFeedList = nextProps.activityFeedStore.list || [];

    (isUndefined(feedList) || feedList.length === 0) &&
      !isUndefined(nextFeedList) &&
      nextFeedList.length > 0 &&
      updateMetaInfoAction({
        info: {
          url: `https://www.lixibox.com/community/unboxing`,
          type: 'article',
          title: 'Lixibox Community | Cộng đồng chia sẻ kiến thức làm đẹp',
          description: 'Cộng đồng chia sẻ kiến thức sản phẩm và các kinh nghiệm làm đẹp',
          keyword: 'lixibox, community, halio',
          image: ''
        },
        structuredData: {
          breadcrumbList: [
            {
              position: 2,
              name: 'Lixibox Community Unboxing',
              item: `https://www.lixibox.com/community/unboxing`
            }
          ]
        }
      });
  }

  render() {
    const args = {
      props: this.props,
      state: this.state,
      handleSubmit: this.handleSubmit.bind(this),
      handleGetFeed: this.handleGetFeed.bind(this)
    };

    return renderView(args);
  }
}

export default withRouter(connect<any, any, any>(mapStateToProps, mapDispatchToProps)(LoveFeedContainer));
