import { Component } from 'react';

import { isUndefined } from '../../../utils/validate';
import { objectToHash } from '../../../utils/encode';

import { DEFAULT_PROPS, INITIAL_STATE } from './initialize';
import { IProps, IState } from './model';
import renderView from './view';

class ReviewsContainer extends Component<IProps, IState> {
  static defaultProps: IProps = DEFAULT_PROPS;

  constructor(props: IProps) {
    super(props);
    this.state = INITIAL_STATE as IState;
  }

  init(props = this.props) {
    const {
      fetchFeedbackByIdAction,
      feedbackStore: { feedbackById },
      match: {
        params: { feedbackId }
      }
    } = props as IProps;

    const keyHash = objectToHash({ feedbackId });

    if (isUndefined(feedbackById) || isUndefined(feedbackById[keyHash])) {
      this.setState({ isLoading: true }, () => fetchFeedbackByIdAction({ feedbackId }));
    }
  }

  componentDidMount() {
    this.init(this.props);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const {
      updateMetaInfoAction,
      feedbackStore: { isFetchFeedbackById }
    } = this.props;
    const {
      match: {
        params: { feedbackId }
      }
    } = nextProps;

    if (!isFetchFeedbackById && nextProps.feedbackStore.isFetchFeedbackById) {
      this.setState({ isLoading: false });

      const keyHash = objectToHash({ feedbackId });
      const feedItem =
        (nextProps.feedbackStore.feedbackById &&
          !isUndefined(nextProps.feedbackStore.feedbackById[keyHash]) &&
          nextProps.feedbackStore.feedbackById[keyHash]) ||
        {};

      updateMetaInfoAction({
        info: {
          url: `https://www.lixibox.com/feedbacks/${feedbackId}`,
          type: 'article',
          title: feedItem && feedItem.feedbackable_name,
          description: feedItem && feedItem.review,
          keyword: 'lixibox, feedback, community, halio',
          image: feedItem && feedItem.feedbackable_image && feedItem.feedbackable_image.large_url
        },
        structuredData: {
          breadcrumbList: [
            {
              position: 2,
              name: 'Lixibox Community',
              item: `https://www.lixibox.com/feedbacks/${feedbackId}`
            }
          ]
        }
      });
    }
  }

  render() {
    const args = {
      props: this.props,
      state: this.state
    };

    return renderView(args);
  }
}

export default ReviewsContainer;
