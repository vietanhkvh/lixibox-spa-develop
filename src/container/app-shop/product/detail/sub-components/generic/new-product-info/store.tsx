import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import NewProductInfo from './component';

export const mapStateToProps = (state) => ({
  cartStore: state.cart,
  shopStore: state.shop,
  provinceStore: state.province
});

export const mapDispatchToProps = (dispatch) => ({});

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(withRouter<any, any>(NewProductInfo));
