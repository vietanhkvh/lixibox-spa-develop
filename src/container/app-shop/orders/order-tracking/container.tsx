import { PureComponent } from 'react';

import { componentDidMount, UNSAFE_componentWillReceiveProps } from './lifecycle';
import {
  fetchData,
  handleSearch,
  handleFetchData,
  handleInputOnChange,
  handleSearchOnKeyUp,
  handleGetMomoPaymentAddressUrl
} from './handler';
import { INITIAL_STATE } from './initialize';
import { IProps } from './model';
import renderView from './view';

class OrdersTrackingContainer extends PureComponent<IProps, any> {
  fetchData = fetchData.bind(this);
  handleSearch = handleSearch.bind(this);
  handleFetchData = handleFetchData.bind(this);
  handleInputOnChange = handleInputOnChange.bind(this);
  handleSearchOnKeyUp = handleSearchOnKeyUp.bind(this);
  handleGetMomoPaymentAddressUrl = handleGetMomoPaymentAddressUrl.bind(this);

  componentDidMount = componentDidMount.bind(this);
  UNSAFE_componentWillReceiveProps = UNSAFE_componentWillReceiveProps.bind(this);

  constructor(props: IProps) {
    super(props);
    this.state = INITIAL_STATE;
  }

  render() {
    const args = {
      props: this.props,
      state: this.state,
      handleSearch: this.handleSearch.bind(this),
      handleInputOnChange: this.handleInputOnChange.bind(this),
      handleSearchOnKeyUp: this.handleSearchOnKeyUp.bind(this),
      handleGetMomoPaymentAddressUrl: this.handleGetMomoPaymentAddressUrl.bind(this)
    };

    return renderView(args);
  }
}

export default OrdersTrackingContainer;
