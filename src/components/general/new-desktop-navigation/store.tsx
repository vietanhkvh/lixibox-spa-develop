import { ConnectedProps, connect } from 'react-redux';
import { RootState } from 'types/redux';

import { fetchListMenuAction, removeMenuSelectedAction } from 'flows/menu/action';
import { fetchPromotionsAction } from 'flows/theme/action';

import Navigations from './component';

const mapStateToProps = (state: RootState) => ({
  menuStore: state.menu,
  promotions: state.theme.promotions,
  countdownStore: state.countdown,
  cartStore: state.cart
});

const mapDispatchToProps = {
  fetchPromotionsAction,
  fetchListMenuAction,
  removeMenuSelectedAction
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Navigations);
