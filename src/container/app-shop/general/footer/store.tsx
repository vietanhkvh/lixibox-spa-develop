import { connect } from 'react-redux';
import { openModalAction } from '../../../../flows/modal/action';
import { fetchBannerAction } from '../../../../flows/banner/action';
import Footer from './component';

export const mapStateToProps = (state) => ({
  bannerStore: state.banner,
  cartStore: state.cart,
  authStore: state.auth
});

export const mapDispatchToProps = (dispatch) => ({
  openModal: (data: any) => dispatch(openModalAction(data)),
  fetchFooterBanner: ({ idBanner, limit }) => dispatch(fetchBannerAction({ idBanner, limit }))
});

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(Footer);
