import { ConnectedProps, connect } from 'react-redux';
import { fetchUserWaitListAction } from '../../../../flows/user/action';
import { openModalAction } from '../../../../flows/modal/action';
import { selectGiftAction, addItemToCartAction } from '../../../../flows/cart/action';
import { RootState } from 'types/redux';

import WaitListContainer from './container';

export const mapStateToProps = (state: RootState) => ({
  userStore: state.user
});

const mapDispatchToProps = {
  fetchUserWaitListAction,
  openModalAction,
  selectGiftAction,
  addItemToCartAction
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(WaitListContainer);
