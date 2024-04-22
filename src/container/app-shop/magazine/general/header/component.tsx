import { PureComponent } from 'react';

import renderView from './view';
import { DEFAULT_PROPS, INITIAL_STATE } from './initialize';
import { IProps, IState } from './model';

class Header extends PureComponent<IProps, IState> {
  static defaultProps: IProps = DEFAULT_PROPS;

  constructor(props: IProps) {
    super(props);
    this.state = INITIAL_STATE;
  }

  render() {
    return renderView(this.props);
  }
}

export default Header;
