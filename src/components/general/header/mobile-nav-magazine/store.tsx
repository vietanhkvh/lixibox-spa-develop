import { connect } from 'react-redux';

import { showHideMobileMagazineMenuAction } from '../../../../flows/menu/action';

import MobileLeftMenuMagazineContainer from './component';

export const mapStateToProps = (state) => ({});

export const mapDispatchToProps = (dispatch) => ({
  showHideMobileMagazineMenu: (state: boolean) => dispatch(showHideMobileMagazineMenuAction(state))
});
export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(MobileLeftMenuMagazineContainer);
