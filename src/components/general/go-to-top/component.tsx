import { PureComponent } from 'react';

import { scrollElement } from '../../../utils/scroll';

import { INITIAL_STATE } from './initialize';
import { IProps, IState } from './model';
import renderView from './view';

class GoToTop extends PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = INITIAL_STATE as IState;
  }

  componentDidMount() {
    window.addEventListener('scroll', this.init.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', () => {});
  }

  init() {
    const { isShowButton } = this.state as IState;
    let scrollTop = this.getScrollTop(); // document.documentElement.scrollTop;
    const SCROLL_TOP_VALUE_TO_FIX = 200;

    scrollTop >= SCROLL_TOP_VALUE_TO_FIX
      ? false === isShowButton && this.setState({ isShowButton: true })
      : true === isShowButton && this.setState({ isShowButton: false });
  }

  getScrollTop() {
    const el = document.scrollingElement || document.documentElement;
    return el.scrollTop;
  }

  handleOnScroll() {
    scrollElement({ x: 0, y: 0, isAnimation: true });
    this.setState({ isShowButton: true });
  }

  render() {
    const renderViewProps = {
      isShowButton: this.state.isShowButton,
      handleOnScroll: this.handleOnScroll.bind(this)
    };

    return renderView(renderViewProps);
  }
}

export default GoToTop;
