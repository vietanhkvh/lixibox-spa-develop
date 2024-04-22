import { ConnectedProps, connect } from 'react-redux';
import { RootState } from 'types/redux';
import PrimaryActionButtonGroup from './component';

const mapStateToProps = (state: RootState) => ({
  cartStore: state.cart
});

const mapDispatchToProps = {};

const connector = connect(mapStateToProps, mapDispatchToProps);
export type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(PrimaryActionButtonGroup);
