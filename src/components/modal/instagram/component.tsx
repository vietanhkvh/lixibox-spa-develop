import { Component } from 'react';
import { IProps, IState } from './model';
import { renderComponent } from './view';

class Instagram extends Component<IProps, IState> {
  render() {
    return renderComponent({ props: this.props });
  }
}

export default Instagram;
