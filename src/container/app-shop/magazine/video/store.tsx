import { connect } from 'react-redux';

import { updateMetaInfoAction } from '../../../../flows/meta/action';
import { fetchMagazineListAction } from '../../../../flows/magazine/action';

import MagazineDetailContainer from './container';

const mapStateToProps = (state) => ({
  magazineStore: state.magazine
});

const mapDispatchToProps = (dispatch) => ({
  fetchMagazineList: (data) => dispatch(fetchMagazineListAction(data)),
  updateMetaInfoAction: (data) => dispatch(updateMetaInfoAction(data))
});

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(MagazineDetailContainer);
