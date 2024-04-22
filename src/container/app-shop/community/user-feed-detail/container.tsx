import { Component } from 'react';
import { connect } from 'react-redux';

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

class UserFeedContainer extends Component<IProps, IState> {
  static defaultProps: IProps = DEFAULT_PROPS;

  constructor(props: IProps) {
    super(props);
    this.state = INITIAL_STATE as IState;
  }

  handleSubmit() {
    const {
      limit,
      fecthActivityFeedListAction,
      activityFeedStore: { nextPageCode },
      match: {
        params: { userReferralCode }
      }
    } = this.props;

    fecthActivityFeedListAction({ limit, pageCode: nextPageCode, userReferralCode });
  }

  handleLoadViewMore() {
    const { isLoading, isFeebackFull } = this.state as IState;

    let eleInfo = this.getPositionElementById('load-view-more');
    const height = window.innerHeight;

    !isFeebackFull &&
      !isLoading &&
      eleInfo &&
      eleInfo.top - 100 <= height &&
      this.setState({ isLoading: true }, this.handleSubmit);
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
    const {
      limit,
      fecthActivityFeedListAction,
      getUserCommunityProfileAction,
      match: {
        params: { userReferralCode }
      }
    } = props as IProps;

    fecthActivityFeedListAction({ limit, userReferralCode });
    getUserCommunityProfileAction({ userReferralCode });
  }

  componentDidMount() {
    this.init();
    window.addEventListener('scroll', this.handleLoadViewMore.bind(this));

    gaEventTracking({
      category: GA_TRACKING_EVENT_CATEGORY.BEHAVIOR_IN_PAGE,
      action: GA_TRACKING_EVENT_ACTION.BEHAVIOR_IN_PAGE.COMMNUNITY_PAGE,
      label: GA_TRACKING_EVENT_LABEL.BEHAVIOR_IN_PAGE.COMMNUNITY_PAGE.VIEW_PAGE.USER_PROFILE,
      value: 1
    });
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', () => {});
    this.props.clearDataActivityFeedListAction();
    this.props.clearDataActivityFeedCommentListAction();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const {
      updateMetaInfoAction,
      match: {
        params: { userReferralCode }
      },
      activityFeedStore: { isFetchFeedbackSuccessful, isFetchedAllFeedback, list }
    } = this.props as IProps;

    if (userReferralCode !== nextProps.match.params.userReferralCode) {
      this.setState({ isLoading: false, isFeebackFull: false });
      this.init(nextProps);
    }

    !isFetchFeedbackSuccessful &&
      nextProps.activityFeedStore.isFetchFeedbackSuccessful &&
      this.setState({ isLoading: false });

    !isFetchedAllFeedback && nextProps.activityFeedStore.isFetchedAllFeedback && this.setState({ isFeebackFull: true });

    // Set meta for SEO
    const feedList = list || [];
    const nextFeedList = nextProps.activityFeedStore.list || [];

    (isUndefined(feedList) || feedList.length === 0) &&
      !isUndefined(nextFeedList) &&
      nextFeedList.length > 0 &&
      updateMetaInfoAction({
        info: {
          url: `https://www.lixibox.com/community/user/${userReferralCode}`,
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
              name: 'Lixibox Community User Feed Detail',
              item: `https://www.lixibox.com/community/user/${userReferralCode}`
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

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(UserFeedContainer);
