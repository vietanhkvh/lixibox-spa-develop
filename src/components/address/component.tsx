import { Component } from 'react';

import { renderComponent } from './view';
import { IProps } from './model';
import { DEFAULT_PROPS, INITIAL_STATE } from './initialize';

class AddressItemComponent extends Component<IProps, any> {
  static defaultProps: IProps = DEFAULT_PROPS;
  constructor(props: IProps) {
    super(props);
    this.state = INITIAL_STATE;
  }

  render() {
    const args = {
      props: this.props
    };

    return renderComponent(args);
  }
}

export default AddressItemComponent;
