import { ConnectedProps, connect } from 'react-redux';
import { RootState } from 'types/redux';
import { toggleApplyBalanceStatusAction } from 'flows/cart/action';
import PricingBreakdown from './component';

const mapStateToProps = (state: RootState) => ({
  cartStore: state.cart
});

const mapDispatchToProps = {
  toggleApplyBalanceStatusAction
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(PricingBreakdown);
