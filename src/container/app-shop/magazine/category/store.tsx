import { connect } from 'react-redux';

import { updateMetaInfoAction } from '../../../../flows/meta/action';
import {
  fetchMagazineDashboardAction,
  fetchMagazineCategoryAction,
  fetchMagazineListAction,
  fetchMagazineByTagNameAction,
  clearDataMagazineAction
} from '../../../../flows/magazine/action';

import MagazineCategoryContainer from './container';

const mapStateToProps = (state) => ({
  magazineStore: state.magazine
});

const mapDispatchToProps = (dispatch) => ({
  fetchMagazineCategory: (data: any) => dispatch(fetchMagazineCategoryAction(data)),
  fetchMagazineList: (data: any) => dispatch(fetchMagazineListAction(data)),
  fetchMagazineDashboard: () => dispatch(fetchMagazineDashboardAction()),
  fetchMagazineByTagName: (data: any) => dispatch(fetchMagazineByTagNameAction(data)),
  updateMetaInfoAction: (data) => dispatch(updateMetaInfoAction(data)),
  clearDataMagazineAction: () => dispatch(clearDataMagazineAction())
});

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(MagazineCategoryContainer);
