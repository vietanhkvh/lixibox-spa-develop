import { Component } from 'react';
import { connect } from 'react-redux';

import { INotificationProps, INotificationState } from './model';
import { DEFAULT_PROPS, INITIAL_STATE } from './initialize';
import { mapStateToProps, mapDispatchToProps } from './store';
import { renderComponent } from './view';

class NotificationContainer extends Component<INotificationProps, INotificationState> {
  static defaultProps: INotificationProps = DEFAULT_PROPS;

  constructor(props: INotificationProps) {
    super(props);
    this.state = INITIAL_STATE as INotificationState;
  }

  render() {
    return renderComponent.bind(this)();
  }
}

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(NotificationContainer);
