import { Component } from 'react';

import { scrollElement } from '../../../utils/scroll';
import { DEFAULT_PROPS, INITIAL_STATE } from './initialize';
import * as tracking from './tracking';
import { IProps, IState } from './model';
import { renderView } from './view';

class BannerHomeMain extends Component<IProps, IState> {
  static defaultProps: IProps = DEFAULT_PROPS;

  private element: any = null;
  private timerAutoSlide: any = null;

  private timerDebouneScroll: any = null;
  private isDisabledAction: boolean = false;

  private isDown: boolean = false;
  private startX: number;
  private scrollLeft: number;
  private movingOffet: number;

  constructor(props: IProps) {
    super(props);
    this.state = INITIAL_STATE;
  }
  componentDidUpdate() {
    const { list } = this.props;
    !!list && !!list.length && !this.timerAutoSlide && this.startAutoSlide();

    !this.element && (this.element = document.getElementById('home-main-banner'));
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const listLen = (this.props.list && this.props.list.length) || 0;
    const nextListLen = (nextProps.list && nextProps.list.length) || 0;

    if (listLen !== nextListLen) this.startAutoSlide(nextProps);
  }

  shouldComponentUpdate(nextProps: IProps, nextState: IState) {
    const listLen = (this.props.list && this.props.list.length) || 0;
    const nextListLen = (nextProps.list && nextProps.list.length) || 0;

    if (listLen !== nextListLen) return true;
    if (this.state.selectedIndex !== nextState.selectedIndex) return true;
    if (this.state.isWaitingLoadImage !== nextState.isWaitingLoadImage) return true;

    return false;
  }

  componentWillUnmount() {
    clearInterval(this.timerAutoSlide);
    clearTimeout(this.timerDebouneScroll);
  }

  startAutoSlide(_props = this.props) {
    const { isWaitingLoadImage } = this.state;
    setTimeout(() => {
      !!isWaitingLoadImage && this.setState({ isWaitingLoadImage: false });
    }, 2000);

    if (!!this.timerAutoSlide) return;
    const { list = [] } = _props;
    if (!list.length) return;

    clearInterval(this.timerAutoSlide);
    this.timerAutoSlide = setInterval(() => this.handleNavSlide('right', true), 3000);
  }

  handeScrollBanner(e) {
    e.preventDefault();

    !!this.timerDebouneScroll && clearTimeout(this.timerDebouneScroll);

    this.timerDebouneScroll = setTimeout(() => {
      if (!this.element) return;

      const { isWaitingLoadImage } = this.state;

      const { scrollLeft, clientWidth } = this.element;
      const newSelectedValue = !!clientWidth ? scrollLeft / clientWidth : 0;

      this.setState({ selectedIndex: newSelectedValue });
      !!isWaitingLoadImage && this.setState({ isWaitingLoadImage: false });
    }, 200);
  }

  handleScrollTo(newSelectedIndex) {
    if (!this.element) return;

    const { clientWidth } = this.element;
    scrollElement({
      x: clientWidth * newSelectedIndex,
      y: 0,
      element: this.element,
      isAnimation: true
    });
  }

  handleNavSlide(direction, keepAutoSlide = false) {
    if (!this.element || !!this.isDisabledAction) return;
    this.isDisabledAction = true;

    !keepAutoSlide && clearInterval(this.timerAutoSlide);

    const { list = [] } = this.props;
    if (!list || !list.length) return;

    const offsetValue = 'left' === direction ? -1 : 1;
    let newSelectedIndex = this.state.selectedIndex + offsetValue;

    /**
     * Check limit of index value
     * Valid in:  0 -> list.length - 1
     */
    newSelectedIndex =
      newSelectedIndex === list.length ? 0 : newSelectedIndex === -1 ? list.length - 1 : newSelectedIndex;

    this.handleScrollTo(newSelectedIndex);

    setTimeout(() => (this.isDisabledAction = false), 400);
  }

  handleSelectSlide(list, index) {
    clearInterval(this.timerAutoSlide);

    tracking.navigationTracking(index + 1 + ' / ' + list.length);
    this.handleScrollTo(index);
  }

  handleMouseEnter() {
    const { isWaitingLoadImage } = this.state;
    !!isWaitingLoadImage && this.setState({ isWaitingLoadImage: false });

    clearInterval(this.timerAutoSlide);
  }

  handleMouseMove(e) {
    clearInterval(this.timerAutoSlide);
    if (!this.isDown || !this.element) return;

    e.preventDefault();
    const x = e.pageX - this.element.offsetLeft;
    this.movingOffet = x - this.startX;
    this.element.scrollLeft = this.scrollLeft - this.movingOffet;
  }

  handleMouseUp(e) {
    this.handleGrabSlide();
  }

  handleMouseLeave() {
    this.handleGrabSlide();
  }

  handleGrabSlide() {
    if (!this.element || !this.isDown) return;

    const { selectedIndex } = this.state;
    const { list } = this.props;
    this.isDown = false;
    if (this.movingOffet < 0 && list.length - 1 !== selectedIndex) this.handleNavSlide('right');
    if (this.movingOffet > 0 && 0 !== selectedIndex) this.handleNavSlide('left');

    setTimeout(() => (this.element.style.scrollSnapType = 'x mandatory'), 500);
  }

  handleMouseDown(e) {
    if (!this.element) return;
    clearInterval(this.timerAutoSlide);

    this.isDown = true;
    this.element.style.scrollSnapType = 'none';
    this.startX = e.pageX - this.element.offsetLeft;
    this.scrollLeft = this.element.scrollLeft;
  }

  render() {
    const renderViewProps = {
      props: this.props,
      state: this.state,
      handleMouseMove: this.handleMouseMove.bind(this),
      handleMouseUp: this.handleMouseUp.bind(this),
      handleMouseDown: this.handleMouseDown.bind(this),
      handleSelectSlide: this.handleSelectSlide.bind(this),
      handleNavSlide: this.handleNavSlide.bind(this),
      handeScrollBanner: this.handeScrollBanner.bind(this),
      handleMouseEnter: this.handleMouseEnter.bind(this),
      handleMouseLeave: this.handleMouseLeave.bind(this)
    };

    return renderView(renderViewProps);
  }
}

export default BannerHomeMain;
