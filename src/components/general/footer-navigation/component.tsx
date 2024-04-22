import { Component } from 'react';

import { IProps, IState } from './model';
import { INITIAL_STATE } from './initialize';
import renderView from './view';

class FooterNavigation extends Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
  }

  render() {
    return renderView();
  }
}

export default FooterNavigation;
