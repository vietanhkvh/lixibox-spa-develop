import { Component } from 'react';

import { isEmptyObject } from '../../../utils/validate';
import { formatDateTime } from '../../../utils/date-time';
import { DATETIME_FORMAT_TYPE } from '../../../constants/application/global';

import { INITIAL_STATE } from './initialize';
import { IDeliverCalculatorProps } from './model';
import renderView from './view';

class DeliverCalculationContainer extends Component<IDeliverCalculatorProps, any> {
  constructor(props: IDeliverCalculatorProps) {
    super(props);
    this.state = INITIAL_STATE;
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const {
      provinceStore: { isFetchShipFeeListSuccess }
    } = this.props;

    if (!isFetchShipFeeListSuccess && nextProps.provinceStore.isFetchShipFeeListSuccess) {
      const shippingFee = nextProps.provinceStore.shipFeeList;
      const price = isEmptyObject(shippingFee) ? 0 : shippingFee.shipping_fee;
      const time = isEmptyObject(shippingFee)
        ? ''
        : formatDateTime(shippingFee.shipping_time.min, DATETIME_FORMAT_TYPE.DD_MM_YYYY) +
          ' - ' +
          formatDateTime(shippingFee.shipping_time.max, DATETIME_FORMAT_TYPE.DD_MM_YYYY);
      this.setState({
        valueCalculated: { price, time },
        isFetchTimeFeeShippingFinished: true
      });
    }
  }

  render() {
    const renderViewProps = {
      props: this.props,
      state: this.state
    };

    return renderView(renderViewProps);
  }
}

export default DeliverCalculationContainer;
