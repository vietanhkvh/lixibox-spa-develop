import { connect } from 'react-redux';
import { fetchDataHotDealAction } from '../../../../flows/shop/action';

import HotDealContainer from './container';

export const mapStateToProps = (state) => ({
  hotDeal: state.shop.hotDeal
});

export const mapDispatchToProps = (dispatch) => ({
  fetchDataHotDealAction: (data) => dispatch(fetchDataHotDealAction(data))
});

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(HotDealContainer);
