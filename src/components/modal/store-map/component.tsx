import { Component } from 'react';

import { IProps, IState } from './model';
import { renderComponent } from './view';

class StoreMap extends Component<IProps, IState> {
  getStoreUrl() {
    const query = new URLSearchParams(window.location.search || '');
    const encodedUrl = query.get('storeUrl') || '';
    return decodeURIComponent(encodedUrl);
  }

  render() {
    return renderComponent({
      stores: this.props.cartStore.stores,
      storeUrl: this.getStoreUrl()
    });
  }
}

export default StoreMap;
