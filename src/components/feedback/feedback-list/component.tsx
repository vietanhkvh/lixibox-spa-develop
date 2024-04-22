import { PureComponent } from 'react';

import { DEFAULT_PROPS, INITIAL_STATE } from './initialize';
import { IProps } from './model';
import { renderComponent } from './view';

class Feedback extends PureComponent<IProps, any> {
  static defaultProps: IProps = DEFAULT_PROPS;

  constructor(props: IProps) {
    super(props);
    this.state = INITIAL_STATE;
  }

  render() {
    return renderComponent.bind(this)();
  }
}

export default Feedback;
