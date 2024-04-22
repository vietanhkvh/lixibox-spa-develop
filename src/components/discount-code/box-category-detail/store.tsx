import { connect } from 'react-redux';

import {
  fetchDiscountCodesByCodeAction,
  fetchDiscountCodeSpecialAddonsAction,
  fetchDiscountCodeApplicableBoxesAction,
  fetchDiscountCodeGiftBoxesAction
} from '../../../flows/discount-code/action';
import DiscountCodeDetail from './component';

const mapStateToProps = (state) => ({
  discountCodeStore: state.discountCode
});

const mapDispatchToProps = (dispatch) => ({
  fetchDiscountCodesByCodeAction: (data: any) => dispatch(fetchDiscountCodesByCodeAction(data)),
  fetchDiscountCodeSpecialAddonsAction: (data: any) => dispatch(fetchDiscountCodeSpecialAddonsAction(data)),
  fetchDiscountCodeApplicableBoxesAction: (data: any) => dispatch(fetchDiscountCodeApplicableBoxesAction(data)),
  fetchDiscountCodeGiftBoxesAction: (data: any) => dispatch(fetchDiscountCodeGiftBoxesAction(data))
});

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(DiscountCodeDetail);
