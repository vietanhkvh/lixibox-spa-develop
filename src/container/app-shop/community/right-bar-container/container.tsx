import { Component } from 'react';

import { DEFAULT_PROPS, INITIAL_STATE } from './initialize';
import { IProps, IState } from './model';
import renderView from './view';

class RightBarContainer extends Component<IProps, IState> {
  static defaultProps: IProps = DEFAULT_PROPS;

  constructor(props: IProps) {
    super(props);
    this.state = INITIAL_STATE as IState;
  }

  render() {
    const args = {
      props: this.props
    };

    return renderView(args);
  }
}

export default RightBarContainer;
