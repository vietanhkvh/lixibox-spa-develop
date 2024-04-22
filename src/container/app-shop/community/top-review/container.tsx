import { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { mapStateToProps, mapDispatchToProps } from './store';
import { ITopReviewProps, ITopReviewState } from './model';
import { DEFAULT_PROPS, INITIAL_STATE } from './initialize';
import renderView from './view';

class TopReviewContainer extends Component<ITopReviewProps, ITopReviewState> {
  static defaultProps: ITopReviewProps = DEFAULT_PROPS;

  constructor(props: ITopReviewProps) {
    super(props);
    this.state = INITIAL_STATE as ITopReviewState;
  }

  handleDisplayScreenHeaderDropdown(state) {
    this.setState({ isOpenScreenHeaderDropdown: state });
  }

  handleDisplayMobileAutoHeaeder(state) {
    const { isDisplayMobileAutoHeaeder } = this.state;
    if (state !== isDisplayMobileAutoHeaeder) {
      this.setState({ isDisplayMobileAutoHeaeder: state });
    }
  }

  componentDidMount() {
    this.props.fetchCommunityTopReview({ days: 7, boxLimit: 10, feedLimit: 10 });
  }

  render() {
    return renderView.bind(this)();
  }
}

export default withRouter(connect<any, any, any>(mapStateToProps, mapDispatchToProps)(TopReviewContainer));
