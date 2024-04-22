import { Component } from 'react';

import { DEFAULT_PROPS, INITIAL_STATE } from './initialize';
import { IProps, IState } from './model';
import renderView from './view';

class TopLink extends Component<IProps, IState> {
  static defaultProps = DEFAULT_PROPS as IProps;
  private timerChangeSlide: any = null;

  constructor(IProps) {
    super(IProps);
    this.state = INITIAL_STATE;
  }

  startAnimation(_props = this.props) {
    const { leftList = [] } = _props;

    /** 1. Check list banner. break out not exist banner list */
    if (0 === leftList.length) {
      return;
    }

    this.setState({
      countChangeSlide: 0,
      selected: leftList[0]
    } as IState);

    /** 2. Init banner with start index at [0] */
    this.selectSlide(leftList, 0, true);

    clearInterval(this.timerChangeSlide);

    this.timerChangeSlide = setInterval(() => {
      this.navSlide('right', true);
    }, 3000);
  }

  selectSlide(list, _index, _keepAutoSlide = false) {
    false === _keepAutoSlide && clearInterval(this.timerChangeSlide);

    /** While animation -> change image and reverse animation */
    setTimeout(() => {
      this.setState({
        countChangeSlide: _index,
        selected: list[_index]
      } as IState);
    }, 10);
  }

  navSlide(_direction, _keepAutoSlide = false) {
    const { leftList = [] } = this.props;

    /** 1. checking direction to increase / recude new index slide */
    let newIndexValue = 'left' === _direction ? -1 : 1;
    newIndexValue += this.state.countChangeSlide;

    /** 2. limit [min, max] for index value */
    newIndexValue = newIndexValue === leftList.length ? 0 : newIndexValue === -1 ? leftList.length - 1 : newIndexValue;

    /** 3. set new index for slde */
    this.selectSlide(leftList, newIndexValue, _keepAutoSlide);
  }

  componentDidMount() {
    this.startAnimation();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.startAnimation(nextProps);
  }

  shouldComponentUpdate(nextProps: IProps, nextState: IState) {
    const leftListLen = (this.props.leftList && this.props.leftList.length) || 0;
    const nextLeftListLen = (nextProps.leftList && nextProps.leftList.length) || 0;

    if (leftListLen !== nextLeftListLen) {
      return true;
    }
    if (this.state.countChangeSlide !== nextState.countChangeSlide) {
      return true;
    }

    return false;
  }

  componentWillUnmount() {
    clearInterval(this.timerChangeSlide);
  }

  render() {
    const { selected, rightLink } = this.state;
    return renderView({ selected, rightLink });
  }
}

export default TopLink;
