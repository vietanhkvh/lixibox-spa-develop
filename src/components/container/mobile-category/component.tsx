import { Component } from 'react';

import { renderComponent } from './view';
import { DEFAULT_PROPS, INITIAL_STATE } from './initialize';
import { IProps, IState } from './model';

class MobileCategory extends Component<IProps, IState> {
  static defaultProps = DEFAULT_PROPS as IProps;

  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
  }

  render() {
    const { isSmallSize, list } = this.props;
    return renderComponent({ isSmallSize, list });
  }
}

export default MobileCategory;
