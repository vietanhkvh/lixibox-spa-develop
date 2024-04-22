import { connect } from 'react-redux';

import {
  fetchSpecialDealListAction,
  clearDataSpecialDealAction,
  clearDataSpecialDealListAction
} from '../../../../flows/special-deals/action';

import SpecialDealsPanelContainer from './container';

const mapStateToProps = (state) => ({
  specialDealStore: state.specialDeals
});

const mapDispatchToProps = (dispatch) => ({
  fetchSpecialDealList: ({ page = 1, perPage = 10 }) => dispatch(fetchSpecialDealListAction({ page, perPage })),
  clearDataSpecialDealAction: () => dispatch(clearDataSpecialDealAction()),
  clearDataSpecialDealListAction: () => dispatch(clearDataSpecialDealListAction())
});

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(SpecialDealsPanelContainer);
