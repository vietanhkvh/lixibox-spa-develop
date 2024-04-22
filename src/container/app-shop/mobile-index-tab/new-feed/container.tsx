import { Component } from 'react';
import { connect } from 'react-redux';

import { ROUTING_SHOP_INDEX } from '../../../../routings/path';
import { SIGN_IN_STATE } from '../../../../constants/application/global';
import { isMobileVersion } from '../../../../utils/responsive';
import { mapStateToProps, mapDispatchToProps } from './store';
import { DEFAULT_PROPS, INITIAL_STATE } from './initialize';
import { INewFeedProps, INewFeedState } from './model';
import { renderComponent } from './view';

class NewFeedContainer extends Component<INewFeedProps, INewFeedState> {
  static defaultProps: INewFeedProps = DEFAULT_PROPS;

  constructor(props: INewFeedProps) {
    super(props);
    this.state = INITIAL_STATE as INewFeedState;
  }

  handleSubmit() {
    const {
      activityFeedStore: { nextPageCode },
      fecthActivityFeedListAction,
      limit
    } = this.props;

    fecthActivityFeedListAction({ limit, pageCode: nextPageCode });
  }

  componentDidMount() {
    !isMobileVersion() && this.props.history.push(`${ROUTING_SHOP_INDEX}`);
    this.init();
  }

  init() {
    const {
      authStore: { profile, signInStatus },
      fetchUserProfileAction,
      fecthActivityFeedListAction,
      limit
    } = this.props as INewFeedProps;

    fecthActivityFeedListAction({ limit });

    !profile && signInStatus === SIGN_IN_STATE.LOGIN_SUCCESS && fetchUserProfileAction();
  }

  shouldComponentUpdate(nextProps) {
    if (
      this.props.activityFeedStore &&
      this.props.activityFeedStore.list &&
      this.props.activityFeedStore.list.length !== nextProps.activityFeedStore.list.length
    ) {
      return true;
    }
    return false;
  }

  render() {
    const args = {
      props: this.props,
      handleSubmit: this.handleSubmit.bind(this)
    };
    return renderComponent(args);
  }
}

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(NewFeedContainer);
