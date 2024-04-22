import { Component } from 'react';

import { TAB_INFO_STATUS } from '../../../constants/application/product';

import { renderComponent } from './view';
import { INITIAL_STATE, DEFAULT_PROPS } from './initialize';
import { IProps, IState } from './model';

class TabMobileInfo extends Component<IProps, IState> {
  static defaultProps: IProps = DEFAULT_PROPS;

  constructor(props: IProps) {
    super(props);

    this.state = INITIAL_STATE;
  }

  componentDidMount() {
    this.props.type === TAB_INFO_STATUS.info && this.props.isIndividual && this.setState({ isShow: true });
  }

  handleShowInfo() {
    this.setState({ isShow: !this.state.isShow });
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    (this.props.idProduct !== nextProps.idProduct || this.props.data.length !== nextProps.data.length) &&
      nextProps.type === TAB_INFO_STATUS.info &&
      nextProps.isIndividual &&
      this.setState({ isShow: true });
  }

  render() {
    const args = {
      props: this.props,
      state: this.state,
      handleShowInfo: this.handleShowInfo.bind(this)
    };

    return renderComponent(args);
  }
}

export default TabMobileInfo;
