import { ConnectedProps, connect } from 'react-redux';
import { resetPaymentHighlightErrorBlockAction, setPaymentHighlightErrorBlockAction } from 'flows/cart/action';
import { RootState } from 'types/redux';
import ServicesBlock from './component';

const mapStateToProps = (state: RootState) => ({
  cartStore: state.cart
});

const mapDispatchToProps = {
  setPaymentHighlightErrorBlockAction,
  resetPaymentHighlightErrorBlockAction
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(ServicesBlock);
