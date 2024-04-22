import { Component } from 'react';

import { isMobileVersion } from '../../../utils/responsive';

import { DEFAULT_PROPS, INITIAL_STATE } from './initialize';
import { renderComponent } from './view';
import { IProps, IState } from './model';

class SlideItem extends Component<IProps, IState> {
  static defaultProps: IProps = DEFAULT_PROPS;

  constructor(props: IProps) {
    super(props);
    this.state = INITIAL_STATE;
  }

  componentDidMount() {
    !isMobileVersion() && this.setState({ isRenderAgain: true }); // Set state that target
  }

  componentDidUpdate() {
    const { handleOmitImgHeight } = this.props;
    if (!isMobileVersion()) {
      const el = document.getElementById('img-community');
      setTimeout(() => {
        el && 'function' === typeof handleOmitImgHeight && handleOmitImgHeight(el.clientHeight);
      }, 1000);
    }
  }

  render() {
    const args = {
      props: this.props
    };

    return renderComponent(args);
  }
}

export default SlideItem;
