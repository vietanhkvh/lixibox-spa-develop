import { ISpecialDealMenuProps } from './model';
import { showHideSpecialDealMenuAction } from '../../../flows/menu/action';

export const mapStateToProps = (state) =>
  ({
    menuStore: state.menu
  } as ISpecialDealMenuProps);

export const mapDispatchToProps = (dispatch) =>
  ({
    showHideSpecialDealMenu: (state) => dispatch(showHideSpecialDealMenuAction(state))
  } as ISpecialDealMenuProps);
