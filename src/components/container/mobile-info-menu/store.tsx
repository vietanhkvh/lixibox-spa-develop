import { IInfoMobileMenuProps } from './model';
import { showHideInfoMenuAction } from '../../../flows/menu/action';

export const mapStateToProps = (state) =>
  ({
    menuStore: state.menu
  } as IInfoMobileMenuProps);

export const mapDispatchToProps = (dispatch) =>
  ({
    showHideInfoMobileMenu: (state) => dispatch(showHideInfoMenuAction(state))
  } as IInfoMobileMenuProps);
