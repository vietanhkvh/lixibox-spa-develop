import { PureComponent } from 'react';

import renderView from './view';
import { DEFAULT_PROPS } from './initialize';
import { IProps, IState } from './model';

class MagazineCategory extends PureComponent<IProps, IState> {
  static defaultProps: IProps = DEFAULT_PROPS;

  render() {
    return renderView(this.props);
  }
}

export default MagazineCategory;
