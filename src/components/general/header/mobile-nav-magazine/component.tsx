import { Component } from 'react';

import { DEFAULT_PROPS, INITIAL_STATE } from './initialize';
import { IProps, IState } from './model';
import renderView from './view';

class MobileHeaderNavMagazine extends Component<IProps, IState> {
  static defaultProps = DEFAULT_PROPS as IProps;

  constructor(props: IProps) {
    super(props);
    this.state = INITIAL_STATE as IState;
  }

  render() {
    return renderView(this.props);
  }
}

export default MobileHeaderNavMagazine;
