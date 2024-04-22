import { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { isUndefined } from '../../../../utils/validate';

import {
  GA_TRACKING_EVENT_LABEL,
  GA_TRACKING_EVENT_ACTION,
  GA_TRACKING_EVENT_CATEGORY
} from '../../../../tracking/google-analytic/type';
import { gaEventTracking } from '../../../../tracking/google-analytic/ga-event-tracking';

import { mapStateToProps, mapDispatchToProps } from './store';
import { DEFAULT_PROPS, INITIAL_STATE } from './initialize';
import { INewFeedProps, INewFeedState } from './model';
import renderView from './view';

class NewFeedContainer extends Component<INewFeedProps, INewFeedState> {
  static defaultProps: INewFeedProps = DEFAULT_PROPS;

  constructor(props: INewFeedProps) {
    super(props);
    this.state = INITIAL_STATE as INewFeedState;
  }

  handleSubmit() {
    const {
      limit,
      activityFeedStore: { list, hashtagFeeds, nextPageCode },
      fecthActivityFeedListAction,
      match: {
        params: { hashtag }
      },
      fetchCommunityHashtagFeedsAction
    } = this.props;

    const { showCommunityHashTag } = this.state as INewFeedState;

    const feedList = showCommunityHashTag ? hashtagFeeds : list;
    const length = (feedList && feedList.length) || 0;
    const currentId = length > 0 ? feedList[length - 1].id : 0;

    showCommunityHashTag
      ? fetchCommunityHashtagFeedsAction({ hashtag, limit, currentId })
      : fecthActivityFeedListAction({ limit, pageCode: nextPageCode });
  }

  handleLoadViewMore() {
    const { isLoading, isFeedbackFull, pageLoadMore } = this.state as INewFeedState;

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
    return el && el.getBoundingClientRect();
  }

  handleGetCollectionDetai(props = this.props) {
    const {
      getCollectionDetailAction,
      activityFeedStore: { collection }
    } = props as INewFeedProps;

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
    const { isPriorityBlock, isFetchFeedList } = this.state as INewFeedState;

    if (!!isPriorityBlock) {
      return;
    }

    if (!isFetchFeedList) {
      const {
        limit,
        fecthActivityFeedListAction,
        fetchCommunityHashtagFeedsAction,
        match: {
          params: { hashtag }
        }
      } = props as INewFeedProps;

      this.setState({ isFetchFeedList: true });

      hashtag
        ? this.setState({ showCommunityHashTag: true }, () => fetchCommunityHashtagFeedsAction({ hashtag, limit }))
        : this.setState({ showCommunityHashTag: false }, () => fecthActivityFeedListAction({ limit }));
    }
  }

  init(props = this.props) {
    const {
      getCollectionAction,
      match: {
        params: { hashtag }
      }
    } = props as INewFeedProps;

    this.setState({ showCommunityHashTag: !!hashtag }, () => getCollectionAction({}));
  }

  componentDidMount() {
    this.init();
    window.addEventListener('scroll', this.handleLoadViewMore.bind(this));

    gaEventTracking({
      category: GA_TRACKING_EVENT_CATEGORY.BEHAVIOR_IN_PAGE,
      action: GA_TRACKING_EVENT_ACTION.BEHAVIOR_IN_PAGE.COMMNUNITY_PAGE,
      label: GA_TRACKING_EVENT_LABEL.BEHAVIOR_IN_PAGE.COMMNUNITY_PAGE.VIEW_PAGE.NEW_FEEDS,
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
      match: {
        params: { hashtag }
      },
      activityFeedStore: {
        isFetchFeedbackSuccessful,
        isFetchedAllFeedback,
        isFetchCollectionSuccess,
        isFetchCollectionDetailSuccess,
        hashtagFeeds,
        isFetchCommunityHotBoxes,
        isFetchCommunityGoodSale,
        isFetchCommunityTopReview,
        isFetchCommunityTopLiked,
        list
      }
    } = this.props as INewFeedProps;

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

    if (hashtag !== nextProps.match.params.hashtag) {
      this.setState(
        {
          isLoading: false,
          isFeedbackFull: false,
          isPriorityBlock: false,
          isFetchFeedList: false
        },
        () => this.handleGetFeed(nextProps)
      );
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
    const { showCommunityHashTag } = this.state as INewFeedState;

    const feedList = showCommunityHashTag ? hashtagFeeds : list;
    const nextFeedList = showCommunityHashTag
      ? nextProps.activityFeedStore.hashtagFeeds
      : nextProps.activityFeedStore.list;
    const tag = (showCommunityHashTag && nextProps.match.params.hashtag) || '';

    (isUndefined(feedList) || feedList.length === 0) &&
      !isUndefined(nextFeedList) &&
      nextFeedList.length > 0 &&
      updateMetaInfoAction({
        info: {
          url: `https://www.lixibox.com/community/${tag}`,
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
              name: 'Lixibox Community',
              item: `https://www.lixibox.com/community/${tag}`
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

export default withRouter(connect<any, any, any>(mapStateToProps, mapDispatchToProps)(NewFeedContainer));
