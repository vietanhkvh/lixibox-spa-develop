import { connect } from 'react-redux';

import { updateMetaInfoAction } from '../../../../flows/meta/action';
import {
  fetchMagazineListAction,
  fetchMagazineDashboardAction,
  clearDataMagazineAction
} from '../../../../flows/magazine/action';

import MagazineIndexContainer from './container';

const mapStateToProps = (state) => ({
  magazineStore: state.magazine
});

const mapDispatchToProps = (dispatch) => ({
  fetchMagazineListAction: (data) => dispatch(fetchMagazineListAction(data)),
  fetchMagazineDashboard: () => dispatch(fetchMagazineDashboardAction()),
  updateMetaInfoAction: (data) => dispatch(updateMetaInfoAction(data)),
  clearDataMagazineAction: () => dispatch(clearDataMagazineAction())
});

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(MagazineIndexContainer);
