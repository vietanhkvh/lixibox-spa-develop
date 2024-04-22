import { Component } from 'react';

import { IProps, IState } from './model';
import { DEFAULT_PROPS } from './initialize';
import renderView from './view';

class Dropdown extends Component<IProps, IState> {
  static defaultProps = DEFAULT_PROPS;

  render() {
    return renderView.bind(this)();
  }
}

export default Dropdown;
