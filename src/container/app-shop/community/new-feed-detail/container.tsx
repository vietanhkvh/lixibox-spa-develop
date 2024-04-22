import { Component } from 'react';
import { connect } from 'react-redux';

import {
  GA_TRACKING_EVENT_LABEL,
  GA_TRACKING_EVENT_ACTION,
  GA_TRACKING_EVENT_CATEGORY
} from '../../../../tracking/google-analytic/type';
import { gaEventTracking } from '../../../../tracking/google-analytic/ga-event-tracking';

import { objectToHash } from '../../../../utils/encode';
import { mapStateToProps, mapDispatchToProps } from './store';
import { DEFAULT_PROPS, INITIAL_STATE } from './initialize';
import { IProps, IState } from './model';
import renderView from './view';

class NewFeedDetailContainer extends Component<IProps, IState> {
  static defaultProps: IProps = DEFAULT_PROPS;

  constructor(props: IProps) {
    super(props);
    this.state = INITIAL_STATE as IState;
  }

  componentDidMount() {
    this.init(this.props);

    gaEventTracking({
      category: GA_TRACKING_EVENT_CATEGORY.BEHAVIOR_IN_PAGE,
      action: GA_TRACKING_EVENT_ACTION.BEHAVIOR_IN_PAGE.COMMNUNITY_PAGE,
      label: GA_TRACKING_EVENT_LABEL.BEHAVIOR_IN_PAGE.COMMNUNITY_PAGE.VIEW_PAGE.FEED_DETAIL,
      value: 1
    });
  }

  init(props = this.props) {
    const {
      match: {
        params: { feedId }
      },
      fetchActivityFeedDetailAction
    } = props;

    fetchActivityFeedDetailAction({ feedId });
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const {
      match: {
        params: { feedId }
      },
      activityFeedStore: { activityFeedDetail }
    } = this.props;

    const keyHash = objectToHash({ feedId });

    feedId !== nextProps.match.params.feedId && this.init(nextProps);

    if (!!nextProps.activityFeedStore.activityFeedDetail[keyHash]) {
      if (!activityFeedDetail[keyHash]) {
        const feedInfo = nextProps.activityFeedStore.activityFeedDetail[keyHash];
        this.props.updateMetaInfoAction({
          info: {
            url: `https://www.lixibox.com/community/${feedInfo.id}`,
            type: 'article',
            title: `Chia sẻ về Lixibox của ${feedInfo.user.name}`,
            description: feedInfo.message,
            image: feedInfo.picture && feedInfo.picture.large_url
          },
          structuredData: {
            breadcrumbList: [
              {
                position: 2,
                name: 'Lixibox Community',
                item: `https://www.lixibox.com/community/${feedInfo.id}`
              }
            ]
          }
        });
      }
    }
  }

  componentWillUnmount() {
    this.props.clearDataActivityFeedDetailAction();
    this.props.clearDataActivityFeedCommentListAction();
  }

  render() {
    return renderView({ props: this.props });
  }
}

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(NewFeedDetailContainer);
