import { PureComponent } from 'react';

import renderView from './view';
import { IProps, IState } from './model';

class WrapLayout extends PureComponent<IProps, IState> {
  static defaultProps: IProps = { type: 'normal' };

  render() {
    const { children, style, type, className } = this.props;
    return renderView({ children, style, type, className });
  }
}

export default WrapLayout;
