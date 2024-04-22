import { ConnectedProps, connect } from 'react-redux';
import {
  searchSuggestionAction,
  magazineSearchSuggestionAction,
  getSearchBarSectionsAction,
  getTrendingKeywordsAction,
  getSearchHistoryAction,
  setLastSearchSourceAction
} from 'flows/search/action';
import { toggleSubmitSearchAction } from 'flows/search/action';
import { RootState } from 'types/redux';
import SearchSuggestionContainer from './container';
import { withRouter } from 'react-router-dom';

export const mapStateToProps = (state: RootState) => ({
  cartStore: state.cart,
  shopStore: state.shop,
  searchStore: state.search,
  appStore: state.app
});

export const mapDispatchToProps = {
  getTrendingKeywordsAction,
  getSearchHistoryAction,
  toggleSubmitSearchAction,
  searchSuggestionAction,
  magazineSearchSuggestionAction,
  getSearchBarSectionsAction,
  setLastSearchSourceAction
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export type PropsFromRedux = ConnectedProps<typeof connector>;

export default withRouter<any, any>(connector(SearchSuggestionContainer));
