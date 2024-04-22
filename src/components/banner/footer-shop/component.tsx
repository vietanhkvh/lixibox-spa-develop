import { Component } from 'react';

import { IProps, IState } from './model';
import renderView from './view';

class BannerFooterShop extends Component<IProps, IState> {
  shouldComponentUpdate(nextProps: IProps) {
    if (this.props.list.length !== nextProps.list.length) {
      return true;
    }

    return false;
  }

  render() {
    const { list } = this.props;
    return renderView({ list });
  }
}

export default BannerFooterShop;
