import { PureComponent } from 'react';

import renderView from './view';
import { IProps, IState } from './model';
import { DEFAULT_PROPS } from './initialize';

class Item extends PureComponent<IProps, IState> {
  static defaultProps = DEFAULT_PROPS;

  render() {
    return renderView(this.props);
  }
}

export default Item;
