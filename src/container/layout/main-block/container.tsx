import { PureComponent } from 'react';

import { DEFAULT_PROPS } from './initialize';
import renderView from './view';
import { IProps, IState } from './model';

class MainBlock extends PureComponent<IProps, IState> {
  static defaultProps: IProps = DEFAULT_PROPS;

  render() {
    return renderView(this.props);
  }
}

export default MainBlock;
