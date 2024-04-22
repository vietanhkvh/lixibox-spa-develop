import { Component } from 'react';

import { DEFAULT_PROPS, INITIAL_STATE } from './initialize';
import { renderComponent } from './view';
import { IProps, IState } from './model';

class SlideItem extends Component<IProps, IState> {
  static defaultProps: IProps = DEFAULT_PROPS;

  constructor(props: IProps) {
    super(props);
    this.state = INITIAL_STATE;
  }

  render() {
    const renderViewProps = {
      props: this.props
    };

    return renderComponent(renderViewProps);
  }
}

export default SlideItem;
