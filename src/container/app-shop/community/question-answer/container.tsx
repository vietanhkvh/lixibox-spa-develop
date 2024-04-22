import { Component } from 'react';
import { connect } from 'react-redux';

import { SIGN_IN_STATE } from '../../../../constants/application/global';
import { MODAL_SIGN_IN } from '../../../../constants/application/modal';
import { auth } from '../../../../utils/auth';

import { mapStateToProps, mapDispatchToProps } from './store';
import { DEFAULT_PROPS, INITIAL_STATE } from './initialize';
import { IProps, IState } from './model';
import { renderComponent } from './view';

class QuestionAnswerContainer extends Component<IProps, IState> {
  static defaultProps: IProps = DEFAULT_PROPS;

  constructor(props: IProps) {
    super(props);
    this.state = INITIAL_STATE as IState;
  }

  handleSubmit() {
    const {
      activityFeedStore: { nextPageCode },
      fecthActivityFeedListAction,
      limit
    } = this.props;

    fecthActivityFeedListAction({ limit, pageCode: nextPageCode });
  }

  handleClick() {
    auth.loggedIn()
      ? this.setState({ showInfoQuestion: true, showFocus: true })
      : this.props.openModalAction(MODAL_SIGN_IN());
  }

  handleFocusClick() {
    this.setState({ showInfoQuestion: false, showFocus: false });
  }

  componentDidMount() {
    this.init();
  }

  init() {
    const {
      authStore: { signInStatus, profile },
      fetchUserProfileAction,
      fecthActivityFeedListAction,
      limit
    } = this.props as IProps;

    fecthActivityFeedListAction({ limit });

    !profile && signInStatus === SIGN_IN_STATE.LOGIN_SUCCESS && fetchUserProfileAction();
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (
      this.props.activityFeedStore &&
      this.props.activityFeedStore.list &&
      this.props.activityFeedStore.list.length !== nextProps.activityFeedStore.list.length
    ) {
      return true;
    }

    if (false === this.state.showInfoQuestion && true === nextState.showInfoQuestion) {
      return true;
    }
    if (true === this.state.showFocus && false === nextState.showFocus) {
      return true;
    }

    return false;
  }

  render() {
    const args = {
      props: this.props,
      state: this.state,
      handleSubmit: this.handleSubmit.bind(this),
      handleClick: this.handleClick.bind(this),
      handleFocusClick: this.handleFocusClick.bind(this)
    };
    return renderComponent(args);
  }
}

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(QuestionAnswerContainer);
