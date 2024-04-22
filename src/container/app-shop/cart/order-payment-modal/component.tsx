import { PureComponent } from 'react';
import { connect } from 'react-redux';

import renderView from './view';
import { mapStateToProps, mapDispatchToProps } from './store';
import { DEFAULT_PROPS } from './initialize';
import { IProps, IState } from './model';

class SummaryNotificationList extends PureComponent<IProps, IState> {
  static defaultProps: IProps = DEFAULT_PROPS;

  render() {
    return renderView(this.props);
  }
}

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(SummaryNotificationList);
