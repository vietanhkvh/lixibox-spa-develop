import { Component } from 'react';

import { IProductInfoProps, IProductInfoState } from './model';
import { INITIAL_STATE, DEFAULT_PROPS } from './initialize';
import { renderComponent } from './view';

class ProductInfo extends Component<IProductInfoProps, IProductInfoState> {
  static defaultProps: IProductInfoProps = DEFAULT_PROPS;

  constructor(props: IProductInfoProps) {
    super(props);
    this.state = INITIAL_STATE;
  }

  componentDidMount(): void {
    this.props.product?.box?.is_bundle &&
      this.props.fetchBundledProductsAction({
        boxId: this.props.product?.box?.slug || ''
      });
  }

  UNSAFE_componentWillReceiveProps(nextProps: Readonly<IProductInfoProps>, nextContext: any): void {
    if (nextProps.product?.box?.is_bundle && nextProps.product?.box?.slug !== this.props.product?.box?.slug) {
      this.props.fetchBundledProductsAction({
        boxId: nextProps.product?.box?.slug || ''
      });
    }
  }

  handleViewMore() {
    this.setState({ canViewMore: true });
  }

  handleDisplayMobileInfoModal(state) {
    this.setState({ isOpenMobileInfoModal: state });
  }

  render() {
    const args = {
      props: this.props,
      state: this.state,
      handleViewMore: this.handleViewMore.bind(this),
      handleDisplayMobileInfoModal: this.handleDisplayMobileInfoModal.bind(this)
    };

    return renderComponent(args);
  }
}

export default ProductInfo;
