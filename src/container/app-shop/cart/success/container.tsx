import { Component } from 'react';

import renderComponent from './view';
import { IProps, IState } from './model';
import { INITIAL_STATE } from './initialize';
import { componentDidMount, UNSAFE_componentWillReceiveProps, componentWillUnmount } from './lifecycle';
import {
  handleClipboard,
  handleCreateAccount,
  handleInputOnChange,
  handleGetMomoPaymentAddressUrl,
  handleGetOnepayPaymentAddressUrl
} from './handler';

class CartContainer extends Component<IProps, IState> {
  componentDidMount = componentDidMount.bind(this);
  componentWillUnmount = componentWillUnmount.bind(this);
  UNSAFE_componentWillReceiveProps = UNSAFE_componentWillReceiveProps.bind(this);

  handleClipboard = handleClipboard.bind(this);
  handleCreateAccount = handleCreateAccount.bind(this);
  handleInputOnChange = handleInputOnChange.bind(this);
  handleGetMomoPaymentAddressUrl = handleGetMomoPaymentAddressUrl.bind(this);
  handleGetOnepayPaymentAddressUrl = handleGetOnepayPaymentAddressUrl.bind(this);

  constructor(props: IProps) {
    super(props);
    this.state = INITIAL_STATE;
  }

  render() {
    const args = {
      props: this.props,
      state: this.state,
      handleClipboard: this.handleClipboard.bind(this),
      handleCreateAccount: this.handleCreateAccount.bind(this),
      handleInputOnChange: this.handleInputOnChange.bind(this),
      handleGetMomoPaymentAddressUrl: this.handleGetMomoPaymentAddressUrl.bind(this)
    };
    return renderComponent(args);
  }
}

export default CartContainer;
