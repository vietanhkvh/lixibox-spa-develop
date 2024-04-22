import { Component } from 'react';

import { INITIAL_STATE, DEFAULT_PROPS } from './initialize';
import { IProps, IState } from './model';
import renderView from './view';

class NotificationOrder extends Component<IProps, IState> {
  static defaultProps: IProps = DEFAULT_PROPS;

  constructor(props: IProps) {
    super(props);
    this.state = INITIAL_STATE;
  }

  render() {
    const renderViewProps = {
      props: this.props
    };

    return renderView(renderViewProps);
  }
}

export default NotificationOrder;
