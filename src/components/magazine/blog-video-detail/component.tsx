import { PureComponent } from 'react';

import renderView from './view';
import { IProps, IState } from './model';
import { DEFAULT_PROPS } from './initialize';

class BlogVideoDetail extends PureComponent<IProps, IState> {
  static defaultProps: IProps = DEFAULT_PROPS;

  render() {
    return renderView(this.props);
  }
}

export default BlogVideoDetail;
