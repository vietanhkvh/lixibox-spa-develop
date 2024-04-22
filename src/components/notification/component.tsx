import { PureComponent } from 'react';

import renderView from './view';
import { DEFAULT_PROPS, INITIAL_STATE } from './initialize';
import { IProps, IState } from './model';

class SummaryNotificationList extends PureComponent<IProps, IState> {
  static defaultProps: IProps = DEFAULT_PROPS;

  constructor(props: IProps) {
    super(props);
    this.state = INITIAL_STATE;
  }

  componentDidMount() {
    !this.props.isNotShowLoading && this.setState({ isLoadingList: true });
  }

  UNSAFE_componentWillReceiveProps(nextProps: IProps) {
    // Fetching notification list success
    this.props.isFetchNotificationSuccess &&
      !nextProps.isFetchNotificationSuccess &&
      this.setState({ isLoadingList: true });

    // Fetched notification list success
    !this.props.isFetchNotificationSuccess &&
      nextProps.isFetchNotificationSuccess &&
      this.setState({ isLoadingList: false });
  }

  render() {
    const args = {
      props: this.props,
      state: this.state
    };

    return renderView(args);
  }
}

export default SummaryNotificationList;
