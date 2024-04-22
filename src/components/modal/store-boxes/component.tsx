import { Component } from 'react';

import { IProps, IState } from './model';
import { DEFAULT_PROPS, INITIAL_STATE } from './initialize';
import { renderComponent } from './view';

class StoreBoxes extends Component<IProps, IState> {
  static defaultProps: IProps = DEFAULT_PROPS;
  constructor(props: IProps) {
    super(props);
    this.state = INITIAL_STATE;
  }

  componentDidMount() {
    const {
      data: { storeBoxes }
    } = this.props;

    Array.isArray(storeBoxes) && storeBoxes.length > 0 && this.setState({ idSelected: storeBoxes[0].id });
  }

  handleSelectStore({ id, store }) {
    this.props.onSelectStore({ store });
    this.setState({ idSelected: id });
  }

  render() {
    const args = {
      state: this.state,
      props: this.props,
      handleSelectStore: this.handleSelectStore.bind(this)
    };

    return renderComponent(args);
  }
}

export default StoreBoxes;
