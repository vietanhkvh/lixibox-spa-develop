import { Component } from 'react';

import { IProps, IState } from './model';
import { INITIAL_STATE, DEFAULT_PROPS } from './initialize';
import { renderComponent } from './view';

class ProductVideo extends Component<IProps, IState> {
  static defaultProps: IProps = DEFAULT_PROPS;

  constructor(props: IProps) {
    super(props);
    this.state = INITIAL_STATE;
  }

  componentDidUpdate() {
    const videoMainElement = document.getElementById('main-video');
    if (!!videoMainElement) {
      var att = document.createAttribute('controls');
      att.value = 'true';
      videoMainElement.setAttributeNode(att);
    }
  }

  render() {
    return renderComponent({ props: this.props });
  }
}

export default ProductVideo;
