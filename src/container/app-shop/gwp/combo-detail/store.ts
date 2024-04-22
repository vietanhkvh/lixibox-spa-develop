import { connect } from 'react-redux';
import { updateUrlParamsAction } from 'flows/app/action';
import { getGwpSchemeDetailAction, GetGwpSchemeDetailActionParams } from 'flows/gwp/action';
import { fetchBundledItemsAction } from 'flows/shop/action';
import GwpDetail from './component';

const mapStateToProps = (state) => ({
  gwpStore: state.gwp,
  shopStore: state.shop
});
const mapDispatchToProps = (dispatch) => ({
  getGwpSchemeDetailAction: (data: GetGwpSchemeDetailActionParams) => dispatch(getGwpSchemeDetailAction(data)),
  updateUrlParamsAction: (data: any) => dispatch(updateUrlParamsAction(data)),
  fetchBundledItemsAction: (data: any) => dispatch(fetchBundledItemsAction(data))
});

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(GwpDetail);
