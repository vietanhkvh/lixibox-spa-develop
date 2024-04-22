import MobileCategory from './component';

import { connect } from 'react-redux';
import { fetchListMenuAction } from 'flows/menu/action';

const mapStateToProps = (state) => ({
  menuStore: state.menu
});

export const mapDispatchToProps = (dispatch) => ({
  fetchListMenuAction: () => dispatch(fetchListMenuAction())
});

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(MobileCategory);
