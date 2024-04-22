import { connect } from 'react-redux';
import { fetchBundledProductsAction } from 'flows/shop/action';
import ProductInfo from './component';

const mapStateToProps = (state: any) => ({
  bundledProducts: state.shop.bundledProducts
});
const mapDispatchToProps = (dispatch: any) => ({
  fetchBundledProductsAction: (data) => dispatch(fetchBundledProductsAction(data))
});

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(ProductInfo);
