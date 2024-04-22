import { Component } from 'react';
import { isCompareObject } from '../../../utils/validate';

import { DEFAULT_PROPS, INITIAL_STATE } from './initialize';
import { IProps, IState } from './model';
import renderView from './view';

/**
 * @deprecated Use `Icon` from `presentation-component/ui/icon`
 */
class Icon extends Component<IProps, IState> {
  static defaultProps: IProps = DEFAULT_PROPS;

  constructor(props: IProps) {
    super(props);
    this.state = INITIAL_STATE;
    this.onEnter = this.onEnter.bind(this);
    this.onLeave = this.onLeave.bind(this);
  }

  shouldComponentUpdate(nextProps: IProps, nextState: IState) {
    if (this.props.name !== nextProps.name) {
      return true;
    }
    if (!isCompareObject(this.props.style, nextProps.style)) {
      return true;
    }
    if (!isCompareObject(this.props.innerStyle, nextProps.innerStyle)) {
      return true;
    }
    if (this.props.className !== nextProps.className) {
      return true;
    }

    if (this.state.hovering !== nextState.hovering) {
      return true;
    }

    return false;
  }

  onEnter(event) {
    this.setState({ hovering: true });
    this.props.onEnter && this.props.onEnter(event);
  }

  onLeave(event) {
    this.setState({ hovering: false });
    this.props.onLeave && this.props.onLeave(event);
  }

  render() {
    return renderView.bind(this)();
  }
}

export default Icon;
