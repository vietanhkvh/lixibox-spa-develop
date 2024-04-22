import { PureComponent } from 'react';

import { IProps, IState } from './model';
import renderView from './view';

class MetaConfig extends PureComponent<IProps, IState> {
  render() {
    const props = this.props;
    return renderView({ props });
  }
}

export default MetaConfig;
