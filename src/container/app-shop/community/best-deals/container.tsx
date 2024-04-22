import { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { DEAL_FEED } from '../../../../constants/application/community';
import { isUndefined } from '../../../../utils/validate';

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

class BestDealsContainer extends Component<IProps, IState> {
  static defaultProps: IProps = DEFAULT_PROPS;

  constructor(props: IProps) {
    super(props);
    this.state = INITIAL_STATE as IState;
  }

  handleSubmit() {
    const {
      limit,
      fecthActivityFeedListAction,
      activityFeedStore: { nextPageCode }
    } = this.props;

    fecthActivityFeedListAction({
      limit,
      pageCode: nextPageCode,
      userReferralCode: DEAL_FEED.ID
    });
  }

  handleLoadViewMore() {
    const { isLoading, isFeebackFull, pageLoadMore = 1 } = this.state as IState;

    let eleInfo = this.getPositionElementById('load-view-more');
    const height = window.innerHeight;

    const isLoadMore = !isFeebackFull && !isLoading && eleInfo && eleInfo.top - 100 <= height;
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

  init(props = this.props) {
    const { limit, fecthActivityFeedListAction } = props as IProps;

    fecthActivityFeedListAction({ limit, userReferralCode: DEAL_FEED.ID });
  }

  componentDidMount() {
    this.init();
    window.addEventListener('scroll', this.handleLoadViewMore.bind(this));

    gaEventTracking({
      category: GA_TRACKING_EVENT_CATEGORY.BEHAVIOR_IN_PAGE,
      action: GA_TRACKING_EVENT_ACTION.BEHAVIOR_IN_PAGE.COMMNUNITY_PAGE,
      label: GA_TRACKING_EVENT_LABEL.BEHAVIOR_IN_PAGE.COMMNUNITY_PAGE.VIEW_PAGE.BEST_DEALS,
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
      activityFeedStore,
      updateMetaInfoAction,
      activityFeedStore: {
        isFetchFeedbackSuccessful,
        isFetchedAllFeedback,
        isFetchCommunityHotBoxes,
        isFetchCommunityGoodSale,
        isFetchCommunityTopReview,
        isFetchCommunityTopLiked
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

    !activityFeedStore.isFetchFeedbackSuccessful &&
      nextProps.activityFeedStore.isFetchFeedbackSuccessful &&
      this.setState({ isLoading: false });

    !isFetchedAllFeedback && nextProps.activityFeedStore.isFetchedAllFeedback && this.setState({ isFeebackFull: true });

    !activityFeedStore.isFetchedAllFeedback &&
      nextProps.activityFeedStore.isFetchedAllFeedback &&
      this.setState({ isFeebackFull: true });

    // Set meta for SEO
    const feedList = activityFeedStore.list || [];
    const nextFeedList = nextProps.activityFeedStore.list || [];

    (isUndefined(feedList) || feedList.length === 0) &&
      !isUndefined(nextFeedList) &&
      nextFeedList.length > 0 &&
      updateMetaInfoAction({
        info: {
          url: `https://www.lixibox.com/community/best-deals`,
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
              name: 'Lixibox Community Best Deals',
              item: `https://www.lixibox.com/community/best-deals`
            }
          ]
        }
      });
  }

  render() {
    const args = {
      props: this.props,
      state: this.state,
      handleSubmit: this.handleSubmit.bind(this)
    };
    return renderView(args);
  }
}

export default withRouter(connect<any, any, any>(mapStateToProps, mapDispatchToProps)(BestDealsContainer));
