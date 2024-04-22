import { Component } from 'react';

import { isCompareObject } from '../../../utils/validate';

import { IFeedProps, IFeedState } from './model';
import { renderView } from './view';
import { DEFAULT_PROPS, INITIAL_STATE } from './initialize';

class Feed extends Component<IFeedProps, any> {
  static defaultProps: IFeedProps = DEFAULT_PROPS;

  constructor(props: IFeedProps) {
    super(props);
    this.state = INITIAL_STATE as IFeedState;
  }

  handleDisableVideo() {
    this.setState({ forceDisableVideo: true }, () => {
      setTimeout(() => this.setState({ forceDisableVideo: false }), 1000);
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (!isCompareObject(nextProps.list, this.props.list)) {
      return true;
    }
    if (!isCompareObject(nextProps.userProfile, this.props.userProfile)) {
      return true;
    }
    if (nextProps.isFeedDetail !== this.props.isFeedDetail) {
      return true;
    }
    if (nextState.forceDisableVideo !== this.state.forceDisableVideo) {
      return true;
    }

    return false;
  }

  render() {
    return renderView.bind(this)();
  }
}
export default Feed;
