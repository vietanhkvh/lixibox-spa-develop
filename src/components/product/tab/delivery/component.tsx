/** Library */
import { Component } from 'react';

/** View */
import { renderComponent } from './view';

/** Model */
import { ITabDeliveryProps, ITabDeliveryState } from './model';

/** Initialize */
import { DEFAULT_PROPS, INITIAL_STATE } from './initialize';

class TabDelivery extends Component<ITabDeliveryProps, ITabDeliveryState> {
  static defaultProps: ITabDeliveryProps = DEFAULT_PROPS;

  constructor(props: ITabDeliveryProps) {
    super(props);
    this.state = INITIAL_STATE;
  }

  render() {
    return renderComponent.bind(this)();
  }
}

export default TabDelivery;
