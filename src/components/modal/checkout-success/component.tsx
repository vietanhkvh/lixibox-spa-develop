import { Component } from 'react';

import { DEFAULT_PROPS, INITIAL_STATE } from './initialize';
import { IProps, IState } from './model';
import { renderComponent } from './view';

class CheckoutSuccess extends Component<IProps, IState> {
  static defaultProps: IProps = DEFAULT_PROPS;

  constructor(props: IProps) {
    super(props);
    this.state = INITIAL_STATE;
  }

  render() {
    const args = {
      props: this.props,
      state: this.state
    };

    return renderComponent(args);
  }
}

export default CheckoutSuccess;
