import { connect } from 'react-redux';

import { showHideInfoMenuAction } from '../../../../flows/menu/action';
import { updateMetaInfoAction } from '../../../../flows/meta/action';
import DashboardContainer from './container';

export const mapStateToProps = (state) => ({
  menuStore: state.menu,
  appStore: state.app
});

export const mapDispatchToProps = (dispatch) => ({
  showHideInfoMenu: (state) => dispatch(showHideInfoMenuAction(state)),
  updateMetaInfoAction: (data) => dispatch(updateMetaInfoAction(data))
});

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(DashboardContainer);
