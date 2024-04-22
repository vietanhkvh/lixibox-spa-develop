import { PureComponent } from 'react';

import renderView from './view';
import { DEFAULT_PROPS } from './initialize';
import { IProps } from './model';

class WaitListComponent extends PureComponent<IProps> {
  static defaultProps: IProps = DEFAULT_PROPS;

  render() {
    const args = {
      props: this.props,
      state: this.state
    };

    return renderView(args);
  }
}

export default WaitListComponent;
