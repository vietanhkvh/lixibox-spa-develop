import { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { mapStateToProps, mapDispatchToProps } from './store';
import { ITopHotBoxesProps, ITopHotBoxesState } from './model';
import { DEFAULT_PROPS, INITIAL_STATE } from './initialize';
import renderView from './view';

class TopHotBoxesContainer extends Component<ITopHotBoxesProps, ITopHotBoxesState> {
  static defaultProps: ITopHotBoxesProps = DEFAULT_PROPS;

  constructor(props: ITopHotBoxesProps) {
    super(props);
    this.state = INITIAL_STATE as ITopHotBoxesState;
  }

  handleDisplayScreenHeaderDropdown(state) {
    this.setState({ isOpenScreenHeaderDropdown: state });
  }

  componentDidMount() {
    this.props.fetchCommunityHotBoxes({ limit: 10 });
  }

  render() {
    return renderView.bind(this)();
  }
}

export default withRouter(connect<any, any, any>(mapStateToProps, mapDispatchToProps)(TopHotBoxesContainer));
