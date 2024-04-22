import { PureComponent } from 'react';

import { CDN_ASSETS_PREFIX } from '../../../utils/uri';

import { IRatingStarProps, IRatingStarState } from './model';
import { INITIAL_STATE, DEFAULT_PROPS } from './initialize';
import { renderComponent } from './view';
import STYLE from './style';

class RatingStar extends PureComponent<IRatingStarProps, IRatingStarState> {
  static defaultProps: IRatingStarProps = DEFAULT_PROPS;

  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
  }

  createName(_item) {
    const starNum = this.getStarNum(this.state.tmpValue);

    switch (starNum) {
      case _item:
        return 'star';

      case _item - 0.5:
        return 'star-half';

      default:
        return starNum > _item ? 'star' : 'star-line';
    }
  }

  createSource(_item) {
    const starNum = this.getStarNum(this.state.tmpValue);

    switch (starNum) {
      case _item:
        return CDN_ASSETS_PREFIX('/icons/star/full-yellow.png');

      case _item - 0.5:
        return CDN_ASSETS_PREFIX('/icons/star/half-yellow.png');

      default:
        return starNum >= _item
          ? CDN_ASSETS_PREFIX('/icons/star/full-yellow.png')
          : CDN_ASSETS_PREFIX('/icons/star/line-grey.png');
    }
  }

  createStyle(_item) {
    const { starStyle } = this.props;
    const starNum = this.getStarNum(this.state.tmpValue);

    switch (starNum) {
      case _item:
        return Object.assign({}, STYLE.item, STYLE.item.active, starStyle);

      case _item - 0.5:
        return Object.assign({}, STYLE.item, STYLE.item.active, starStyle);

      default:
        return Object.assign({}, STYLE.item, starNum >= _item ? STYLE.item.active : STYLE.item.normal, starStyle);
    }
  }

  getStarNum(val) {
    if (!val) return 0;

    const arr = (val + '').split('.');
    if (arr.length === 1) return val;
    const firstNum = parseInt(arr[0]);
    const lastNum = parseInt(arr[1]);

    if (lastNum < 3) {
      return firstNum;
    } else if (lastNum >= 3 && lastNum < 8) {
      return firstNum + 0.5;
    }

    return firstNum + 1;
  }

  handleOnEnter(item) {
    this.setState({ tmpValue: item, disable: false } as IRatingStarState);
  }

  handleOnLeave() {
    this.setState({ tmpValue: this.props.value } as IRatingStarState);
  }

  handleOnClick(item) {
    this.setState({ tmpValue: item, disable: true } as IRatingStarState);
    this.props.onChange(item);
  }

  componentDidMount() {
    this.setState({ tmpValue: this.props.value } as IRatingStarState);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.value !== nextProps.value) {
      this.setState({ tmpValue: nextProps.value } as IRatingStarState);
    }
  }

  render() {
    return renderComponent.bind(this)();
  }
}

export default RatingStar;
