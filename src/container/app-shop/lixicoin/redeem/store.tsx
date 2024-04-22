import { connect } from 'react-redux';
import {
  fetchRedeemLatestBoxesAction,
  fetchRedeemUserBoxesAction,
  fetchRedeemSpecialBoxesAction
} from '../../../../flows/shop/action';
import { fetchBannerAction } from '../../../../flows/banner/action';
import RedeemCategory from './component';

const mapState = (state) => ({
  authStore: state.auth,
  cartStore: state.cart,
  shopStore: state.shop,
  bannerStore: state.banner
});

const mapDispatch = (dispatch) => ({
  fetchRedeemLatestBoxesAction: (data) => dispatch(fetchRedeemLatestBoxesAction(data)),
  fetchRedeemUserBoxesAction: (data) => dispatch(fetchRedeemUserBoxesAction(data)),
  fetchRedeemSpecialBoxesAction: (data) => dispatch(fetchRedeemSpecialBoxesAction(data)),
  fetchBannerAction: (data) => dispatch(fetchBannerAction(data))
});

export default connect<any, any, any>(mapState, mapDispatch)(RedeemCategory);
