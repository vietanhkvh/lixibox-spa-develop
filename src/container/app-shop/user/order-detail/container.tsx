import { Component } from 'react';

import { IProps, IState } from './model';

import { DEFAULT_PROPS, INITIAL_STATE } from './initialize';
import { componentDidMount, UNSAFE_componentWillReceiveProps } from './lifecycle';
import {
  init,
  handleGetMomoPaymentAddressUrl,
  handleGetOnepayPaymentAddressUrl,
  handleChangeToCOD,
  handleCancelOrder
} from './handler';
import view from './view';

class container extends Component<IProps, IState> {
  static defaultProps: IProps = DEFAULT_PROPS;

  init = init.bind(this);
  handleGetMomoPaymentAddressUrl = handleGetMomoPaymentAddressUrl.bind(this);
  handleGetOnepayPaymentAddressUrl = handleGetOnepayPaymentAddressUrl.bind(this);
  handleChangeToCOD = handleChangeToCOD.bind(this);
  handleCancelOrder = handleCancelOrder.bind(this);

  componentDidMount = componentDidMount.bind(this);
  UNSAFE_componentWillReceiveProps = UNSAFE_componentWillReceiveProps.bind(this);

  constructor(props: IProps) {
    super(props);
    this.state = INITIAL_STATE;
  }

  render() {
    const args = {
      props: this.props,
      state: this.state,

      handleGetMomoPaymentAddressUrl: this.handleGetMomoPaymentAddressUrl.bind(this),
      handleGetOnepayPaymentAddressUrl: this.handleGetOnepayPaymentAddressUrl.bind(this),
      handleChangeToCOD: this.handleChangeToCOD.bind(this),
      handleCancelOrder: this.handleCancelOrder.bind(this)
    };

    return view(args);
  }
}

export default container;
