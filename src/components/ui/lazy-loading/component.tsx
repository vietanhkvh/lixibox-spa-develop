import { PureComponent } from 'react';

import { DEFAULT_PROPS } from './initialize';
import { ILoadingProps } from './model';
import renderView from './view';

class Loading extends PureComponent<ILoadingProps, any> {
  static defaultProps: ILoadingProps = DEFAULT_PROPS;

  render() {
    return renderView({ style: this.props.style });
  }
}

export default Loading;
