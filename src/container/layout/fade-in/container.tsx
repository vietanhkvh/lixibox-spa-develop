import { Component, Children } from 'react';

import { INITIAL_STATE } from './initialize';
import renderView from './view';
import { IProps, IState } from './model';

class FadeIn extends Component<IProps, IState> {
  private interval;

  constructor(props: IProps) {
    super(props);
    this.state = INITIAL_STATE;
  }

  componentDidMount() {
    const count = Children.count(this.props.children);
    let i = 0;

    this.interval = setInterval(() => {
      i++;
      if (i > count) {
        clearInterval(this.interval);
      }

      this.setState({ maxIsVisible: i });
    }, 50);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const renderViewProps = {
      props: this.props,
      state: this.state
    };

    return renderView(renderViewProps);
  }
}

export default FadeIn;
