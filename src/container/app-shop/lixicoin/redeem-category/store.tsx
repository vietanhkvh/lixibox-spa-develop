import { connect } from 'react-redux';
import {
  fetchRedeemLatestBoxesAction,
  fetchRedeemUserBoxesAction,
  fetchRedeemSpecialBoxesAction
} from '../../../../flows/shop/action';
import { fetchBannerAction } from '../../../../flows/banner/action';
import { RootState } from 'types/redux';
import RedeemCategory from './component';
import { updateMetaInfoAction } from 'flows/meta/action';
import { fetchCountdownListAction } from 'flows/countdown/action';

const mapState = (state: RootState) => ({
  authStore: state.auth,
  cartStore: state.cart,
  shopStore: state.shop,
  bannerStore: state.banner,
  countdownStore: state.countdown
});

const mapDispatch = {
  fetchRedeemLatestBoxesAction,
  fetchRedeemUserBoxesAction,
  fetchRedeemSpecialBoxesAction,
  fetchBannerAction,
  updateMetaInfoAction,
  fetchCountdownListAction
};

export default connect<any, any, any>(mapState, mapDispatch)(RedeemCategory);
