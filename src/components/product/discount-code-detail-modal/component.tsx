import { Component } from 'react';

import {
  GA_TRACKING_EVENT_CATEGORY,
  GA_TRACKING_EVENT_ACTION,
  GA_TRACKING_EVENT_LABEL
} from '../../../tracking/google-analytic/type';
import { gaEventTracking } from '../../../tracking/google-analytic/ga-event-tracking';

import { IProps, IState } from './model';
import { DEFAULT_PROPS, INITIAL_STATE } from './initialize';
import renderView from './view';

class ProductDiscussion extends Component<IProps, IState> {
  static defaultProps: IProps = DEFAULT_PROPS;

  constructor(props: IProps) {
    super(props);
    this.state = INITIAL_STATE;
  }

  componentDidMount() {
    gaEventTracking({
      category: GA_TRACKING_EVENT_CATEGORY.FEATURE_EFFECTIVE,
      action: GA_TRACKING_EVENT_ACTION.FEATURE_EFFECTIVE.DISCOUNT_CODE_IN_THEME,
      label: GA_TRACKING_EVENT_LABEL.FEATURE_EFFECTIVE.DISCOUNT_CODE_IN_THEME.OPEN,
      value: 1
    });
  }

  handleAddDiscountCode(code) {
    this.props.addDiscountCodeAction({
      discountCode: code.toUpperCase(),
      isOpenCartSummary: false,
      whereAdded: 'Discount code detail modal'
    });

    this.handleCloseModal();

    gaEventTracking({
      category: GA_TRACKING_EVENT_CATEGORY.FEATURE_EFFECTIVE,
      action: GA_TRACKING_EVENT_ACTION.FEATURE_EFFECTIVE.DISCOUNT_CODE_IN_THEME,
      label: GA_TRACKING_EVENT_LABEL.FEATURE_EFFECTIVE.DISCOUNT_CODE_IN_THEME.APPLY,
      value: 1
    });
  }

  handleCloseModal() {
    this.props.closeModal();
  }

  render() {
    return renderView.bind(this)();
  }
}

export default ProductDiscussion;
