import { Component } from 'react';

import { renderComponent } from './view';
import { IProps, IState } from './model';
import { DEFAULT_PROPS, INITIAL_STATE } from './initialize';

class ReasonCancelOrder extends Component<IProps, IState> {
  static defaultProps: IProps = DEFAULT_PROPS;
  constructor(props: IProps) {
    super(props);
    this.state = INITIAL_STATE;
  }

  handleSelectedReason(cancelReasonId) {
    this.setState({ cancelReasonId });
  }

  handleSubmit() {
    const { cancelReasonId } = this.state as IState;
    const {
      data: {
        data: { order, number, cancelOrderAction }
      },
      closeModal
    } = this.props as IProps;

    cancelOrderAction({ order, number, cancelReasonId });
    closeModal();
  }

  render() {
    const args = {
      props: this.props,
      state: this.state,
      handleSubmit: this.handleSubmit.bind(this),
      handleSelectedReason: this.handleSelectedReason.bind(this)
    };

    return renderComponent(args);
  }
}

export default ReasonCancelOrder;
