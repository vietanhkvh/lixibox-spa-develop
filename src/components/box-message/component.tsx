import { PureComponent } from 'react';

import renderView from './view';
import { DEFAULT_PROPS } from './initialize';
import { IProps } from './model';

class BoxMessage extends PureComponent<IProps> {
  static defaultProps: IProps = DEFAULT_PROPS;

  render() {
    const { message } = this.props;
    return renderView(message);
  }
}

export default BoxMessage;
