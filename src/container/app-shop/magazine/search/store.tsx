import { ConnectedProps, connect } from 'react-redux';

import { searchAllAction } from '../../../../flows/search/action';
import { fetchMagazineByKeywordAction } from '../../../../flows/magazine/action';
import { RootState } from 'types/redux';

import Component from './component';

const mapStateToProps = (state: RootState) => ({
  magazineStore: state.magazine,
  searchStore: state.search
});

const mapDispatchToProps = (dispatch) => ({
  searchAllAction: (data) => dispatch(searchAllAction(data)),
  fetchMagazineByKeywordAction: (data) => dispatch(fetchMagazineByKeywordAction(data))
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Component);
