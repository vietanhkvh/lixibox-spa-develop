import { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { mapStateToProps, mapDispatchToProps } from './store';
import { ITopLikedProps, ITopLikedState } from './model';
import { DEFAULT_PROPS, INITIAL_STATE } from './initialize';
import renderView from './view';

class TopLikedContainer extends Component<ITopLikedProps, ITopLikedState> {
  static defaultProps: ITopLikedProps = DEFAULT_PROPS;

  constructor(props: ITopLikedProps) {
    super(props);
    this.state = INITIAL_STATE as ITopLikedState;
  }

  handleDisplayScreenHeaderDropdown(state) {
    this.setState({ isOpenScreenHeaderDropdown: state });
  }

  componentDidMount() {
    this.props.fetchCommunityTopLiked({ days: 7, limit: 10 });
  }

  render() {
    return renderView.bind(this)();
  }
}

export default withRouter(connect<any, any, any>(mapStateToProps, mapDispatchToProps)(TopLikedContainer));
