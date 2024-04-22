import { connect, ConnectedProps } from 'react-redux';
import { updateUrlParamsAction } from 'flows/app/action';
import { getGwpSchemeDetailAction, GetGwpSchemeDetailActionParams } from 'flows/gwp/action';
import { updateMetaInfoAction } from 'flows/meta/action';
import { openAlertAction } from 'flows/alert/action';
import {
  fetchDataHotDealAction,
  FetchDataHotDealActionProps,
  fetchProductByCategoryAction,
  FetchProductByCategoryActionProps
} from 'flows/shop/action';
import { shareOrCopyLink } from 'utils/generic';
import { ALERT_CLIPBOARD_SUCCESS } from 'constants/application/alert';
import { fetchGwpSchemeExclusiveBoxesAction, FetchGwpSchemeExclusiveBoxesActionParams } from 'flows/theme/action';
import { RootState } from 'types/redux';
import GwpDetail from './component';

const mapStateToProps = (state: RootState) => ({
  gwpStore: state.gwp,
  shopStore: state.shop,
  themeStore: state.theme
});
const mapDispatchToProps = (dispatch) => ({
  getGwpSchemeDetailAction: (data: GetGwpSchemeDetailActionParams) => dispatch(getGwpSchemeDetailAction(data)),
  updateMetaInfoAction: (data) => dispatch(updateMetaInfoAction(data)),
  updateUrlParamsAction: (data: any) => dispatch(updateUrlParamsAction(data)),
  fetchDataHotDealAction: (data: FetchDataHotDealActionProps) => dispatch(fetchDataHotDealAction(data)),
  fetchProductByCategoryAction: (data: FetchProductByCategoryActionProps) =>
    dispatch(fetchProductByCategoryAction(data)),
  fetchGwpSchemeExclusiveBoxesAction: (data: FetchGwpSchemeExclusiveBoxesActionParams) =>
    dispatch(fetchGwpSchemeExclusiveBoxesAction(data)),
  copyTextToClipboard: (content: string) =>
    shareOrCopyLink(
      content,
      () => dispatch(openAlertAction(ALERT_CLIPBOARD_SUCCESS)),
      () => {
        /** TODO: Provide error handling */
      }
    )
});

const connector = connect(mapStateToProps, mapDispatchToProps);
export type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(GwpDetail);
