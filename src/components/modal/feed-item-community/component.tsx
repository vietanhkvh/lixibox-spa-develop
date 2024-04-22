import { Component } from 'react';

import { IProps, IState } from './model';
import { renderComponent } from './view';

class FeedItemCommunityComponent extends Component<IProps, IState> {
  handleOmitImgHeight(heightLimit) {
    const ele = document.getElementById('feed-right-col');
    if (ele) {
      ele.style.maxHeight = `${Math.floor(heightLimit)}px`;
    }
  }

  render() {
    const args = {
      props: this.props,
      handleOmitImgHeight: this.handleOmitImgHeight.bind(this)
    };

    return renderComponent(args);
  }
}

export default FeedItemCommunityComponent;
