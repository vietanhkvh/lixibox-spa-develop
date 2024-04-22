import { ConnectedProps, connect } from 'react-redux';
import { searchAllAction } from 'flows/search/action';
import { RootState } from 'types/redux';
import SearchDetail from './component';

const mapStateToProps = (state: RootState) => ({
  searchStore: state.search,
  isFetchingAvailableFilters: state.shop.isFetchingAvailableFilters
});

const mapDispatchToProps = {
  searchAllAction
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(SearchDetail);
