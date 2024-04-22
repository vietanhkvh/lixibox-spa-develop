import { PureComponent } from 'react';

import { DEFAULT_PROPS } from './initialize';
import { ILoadingProps } from './model';
import renderView from './view';

/**
 * @deprecated Use LoadingPlaceholder from `presentation-component/ui/loading-placeholder`
 */
class LoadingPlaceholder extends PureComponent<ILoadingProps, any> {
  static defaultProps: ILoadingProps = DEFAULT_PROPS;

  render() {
    return renderView({ style: this.props.style });
  }
}

export default LoadingPlaceholder;
