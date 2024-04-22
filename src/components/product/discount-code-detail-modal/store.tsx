import { connect } from 'react-redux';

import { addDiscountCodeAction } from '../../../flows/cart/action';

import ProductComment from './component';

export const mapStateToProps = (state) => ({});

export const mapDispatchToProps = (dispatch) => ({
  addDiscountCodeAction: (data: any): void => dispatch(addDiscountCodeAction(data))
});

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(ProductComment);
