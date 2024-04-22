import { PureComponent } from 'react';

import { DEFAULT_PROPS } from './initialize';
import renderView from './view';
import { IProps, IState } from './model';

class ListNavigation extends PureComponent<IProps, IState> {
  static defaultProps: IProps = DEFAULT_PROPS;

  handleSignOut() {
    const { signOut } = this.props;
    signOut();
  }

  render() {
    const args = {
      props: this.props,
      handleSignOut: this.handleSignOut.bind(this)
    };

    return renderView(args);
  }
}

export default ListNavigation;
