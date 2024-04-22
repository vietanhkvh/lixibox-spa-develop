import { PureComponent } from 'react';

import renderView from './view';
import { DEFAULT_PROPS, INITIAL_STATE } from './initialize';
import { IProps, IState } from './model';

class SummaryWatchedList extends PureComponent<IProps, IState> {
  static defaultProps: IProps = DEFAULT_PROPS;

  constructor(props: IProps) {
    super(props);
    this.state = INITIAL_STATE;
  }

  UNSAFE_componentWillReceiveProps(nextProps: IProps) {
    // Fetching watched list success
    this.props.isFetchUserWatchedList && !nextProps.isFetchUserWatchedList && this.setState({ isLoadingList: true });

    // Fetched watched list success
    !this.props.isFetchUserWatchedList && nextProps.isFetchUserWatchedList && this.setState({ isLoadingList: false });
  }

  render() {
    const args = {
      props: this.props,
      state: this.state
    };

    return renderView(args);
  }
}

export default SummaryWatchedList;
