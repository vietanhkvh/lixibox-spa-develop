import { Component } from 'react';
import { isUndefined } from '../../../../../utils/validate';
import RightBarCommunity from '../../right-bar-container';
import { DEFAULT_PROPS, INITIAL_STATE } from './initialize';
import { IFeedbackRightPanelProps, IFeedbackRightPanelState } from './model';

class FeedbackRightPanelContainer extends Component<IFeedbackRightPanelProps, IFeedbackRightPanelState> {
  static defaultProps: IFeedbackRightPanelProps = DEFAULT_PROPS;

  constructor(props: IFeedbackRightPanelProps) {
    super(props);
    this.state = INITIAL_STATE as IFeedbackRightPanelState;
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

    const { showCommunityHashTag } = this.state as IFeedbackRightPanelState;

    const feedList = showCommunityHashTag ? hashtagFeeds : list;
    const length = (feedList && feedList.length) || 0;
    const currentId = length > 0 ? feedList[length - 1].id : 0;

    showCommunityHashTag
      ? fetchCommunityHashtagFeedsAction({ hashtag, limit, currentId })
      : fecthActivityFeedListAction({ limit, currentId, pageCode: nextPageCode });
  }

  handleLoadViewMore() {
    const { isLoading, isFeedbackFull } = this.state as IFeedbackRightPanelState;

    let eleInfo = this.getPositionElementById('load-view-more');
    const height = window.innerHeight;

    !isFeedbackFull &&
      !isLoading &&
      eleInfo &&
      eleInfo.top - 100 <= height &&
      this.setState({ isLoading: true }, this.handleSubmit);
  }

  getPositionElementById(elementId) {
    const el = document.getElementById(elementId);
    return el && el.getBoundingClientRect();
  }

  handleGetCollectionDetai(props = this.props) {
    const {
      getCollectionDetailAction,
      activityFeedStore: { collection }
    } = props as IFeedbackRightPanelProps;

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
    const { isPriorityBlock, isFetchFeedList } = this.state as IFeedbackRightPanelState;

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
      } = props as IFeedbackRightPanelProps;

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
    } = props as IFeedbackRightPanelProps;

    this.setState({ showCommunityHashTag: !!hashtag }, () => getCollectionAction({}));
  }

  componentDidMount() {
    this.init();
    window.addEventListener('scroll', this.handleLoadViewMore.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', () => {});

    this.props.clearDataCollectionAction();
    this.props.clearDataActivityFeedListAction();
    this.props.clearDataActivityFeedCommentListAction();
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
        list
      }
    } = this.props as IFeedbackRightPanelProps;

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
    const { showCommunityHashTag } = this.state as IFeedbackRightPanelState;

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
    const {
      activityFeedStore: { hashtags },
      match: {
        params: { hashtag }
      },
      feedbackStore: { userBoxesToFeedback }
    } = this.props;

    const rightBarCommunityProps = {
      isShowUnReview: false,
      hashtags,
      hashtagSelected: hashtag,
      userBoxesToFeedback
    };

    return <RightBarCommunity {...rightBarCommunityProps} />;
  }
}

export default FeedbackRightPanelContainer;
