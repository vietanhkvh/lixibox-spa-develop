import { Component } from 'react';
import { IProps, IState } from './model';
import { renderComponent } from './view';

class LandingLustreProductComponent extends Component<IProps, IState> {
  render() {
    return renderComponent({ props: this.props });
  }
}

export default LandingLustreProductComponent;
