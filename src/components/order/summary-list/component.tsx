import { PureComponent } from 'react';
import { withRouter } from 'react-router';

import renderView from './view';
import { DEFAULT_PROPS, INITIAL_STATE } from './initialize';
import { IProps, IState } from './model';

class SummaryOrderList extends PureComponent<IProps, IState> {
  static defaultProps: IProps = DEFAULT_PROPS;

  constructor(props: IProps) {
    super(props);
    this.state = INITIAL_STATE;
  }

  componentDidMount() {
    !this.props.isNotShowLoading && this.setState({ isLoadingList: true });
  }

  UNSAFE_componentWillReceiveProps(nextProps: IProps) {
    // Fetching order list success
    this.props.isFetchUserOrderList && !nextProps.isFetchUserOrderList && this.setState({ isLoadingList: true });

    // Fetched order list success
    !this.props.isFetchUserOrderList && nextProps.isFetchUserOrderList && this.setState({ isLoadingList: false });
  }

  render() {
    const args = {
      props: this.props,
      state: this.state
    };

    return renderView(args);
  }
}

export default withRouter(SummaryOrderList as any);
