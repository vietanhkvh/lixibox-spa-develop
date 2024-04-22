import { Component } from 'react';
import { connect } from 'react-redux';

import { IProps, IState } from './model';
import { mapStateToProps, mapDispatchToProps } from './store';
import { DEFAULT_PROPS, INITIAL_STATE } from './initialize';
import renderView from './view';

class MobileContainer extends Component<IProps, IState> {
  static defaultProps: IProps = DEFAULT_PROPS;

  constructor(props: IProps) {
    super(props);
    this.state = INITIAL_STATE as IState;
  }

  render() {
    return renderView();
  }
}

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(MobileContainer);
