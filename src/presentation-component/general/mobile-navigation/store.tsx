// TODO: Move out of presentation-component

import { fetchCountdownListAction } from 'flows/countdown/action';
import { fetchListMenuAction, showHideInfoMenuAction, showHideSpecialDealMenuAction } from '../../../flows/menu/action';

export const mapStateToProps = (state) => ({
  cartStore: state.cart,
  productName: state.shop.productName,
  menuStore: state.menu,
  countdownStore: state.countdown
});

export const mapDispatchToProps = (dispatch) => ({
  showHideInfoMenu: (state: boolean) => dispatch(showHideInfoMenuAction(state)),
  showHideSpecialDealMenu: (state: boolean) => dispatch(showHideSpecialDealMenuAction(state)),
  fetchListMenuAction: () => dispatch(fetchListMenuAction()),
  fetchCountdownListAction: () => dispatch(fetchCountdownListAction())
});
