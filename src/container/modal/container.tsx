import { Component } from 'react';
import { connect } from 'react-redux';

import { isMobileVersion } from '../../utils/responsive';
import { DEFAULT_PROPS, INITIAL_STATE, IGNORE_LIST } from './initialize';
import { mapStateToProps, mapDispatchToProps } from './store';
import { IModalProps, IModalState } from './model';
import renderView from './view';

class Modal extends Component<IModalProps, IModalState> {
  static defaultProps: IModalProps = DEFAULT_PROPS;

  constructor(props: IModalProps) {
    super(props);
    this.state = INITIAL_STATE;
  }

  /**
   * Check to prevent show modal. Ex: login modal
   *
   * Get last item modal to check it
   * AND exist in IGNORE LIST
   */
  checkIgnoreOpenModal(props) {
    if (!Array.isArray(props.data)) {
      return false;
    }

    const lastModalIndex = props.data.length - 1;
    /** Get last modal item */
    const lastComponent = props.data[lastModalIndex] ? props.data[lastModalIndex].childComponent : null;

    return true === props.isShow && IGNORE_LIST.indexOf(lastComponent) >= 0 && true === isMobileVersion();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.checkIgnoreOpenModal(nextProps)) {
      document.getElementsByTagName('html')?.[0]?.setAttribute('style', '');
      nextProps.openMobileSigninAlert();
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.checkIgnoreOpenModal(nextProps)) {
      return false;
    }
    if (this.props.isShow !== nextProps.isShow) {
      return true;
    }
    if (this.props.data.length !== nextProps.data.length) {
      return true;
    }
    if (this.props.data[0].childComponent !== nextProps.data[0].childComponent) {
      return true;
    }
    if (this.props.data[0].title !== nextProps.data[0].title) {
      return true;
    }

    if (this.state.isMobileAlertGoingOut !== nextState.isMobileAlertGoingOut) {
      return true;
    }

    return false;
  }

  handleCloseMobileAlert() {
    this.setState({ isMobileAlertGoingOut: true });

    setTimeout(() => {
      this.setState({ isMobileAlertGoingOut: false });
      this.props.backStateWhenClosingModalAction();
      this.props.closeModal();
    }, 500);
  }

  handleCloseModal() {
    this.props.closeModal();
  }

  render() {
    const viewProps = {
      props: this.props,
      state: this.state,
      handleCloseMobileAlert: this.handleCloseMobileAlert.bind(this),
      handleCloseModal: this.handleCloseModal.bind(this)
    };
    return renderView(viewProps);
  }
}

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(Modal);
