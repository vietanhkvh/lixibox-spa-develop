import { connect } from 'react-redux';
import { fetchBannerAction, FetchBannerActionParams } from 'flows/banner/action';
import { getGwpSchemesAction } from 'flows/gwp/action';
import { updateMetaInfoAction } from 'flows/meta/action';
import { updateUrlParamsAction } from 'flows/app/action';
import { shareOrCopyLink } from 'utils/generic';
import { openAlertAction } from 'flows/alert/action';
import { ALERT_CLIPBOARD_SUCCESS } from 'constants/application/alert';
import { RootState } from 'types/redux';
import GwpIndex from './component';

const mapStateToProps = (state: RootState) => ({
  bannerStore: state.banner,
  gwpStore: state.gwp
});
const mapDispatchToProps = (dispatch) => ({
  fetchBannerAction: (data: FetchBannerActionParams) => dispatch(fetchBannerAction(data)),
  getGwpSchemesAction: () => dispatch(getGwpSchemesAction()),
  updateMetaInfoAction: (data) => dispatch(updateMetaInfoAction(data)),
  updateUrlParamsAction: (data: any) => dispatch(updateUrlParamsAction(data)),
  copyTextToClipboard: (content: string) =>
    shareOrCopyLink(
      content,
      () => dispatch(openAlertAction(ALERT_CLIPBOARD_SUCCESS)),
      () => {
        /** TODO: Provide error handling */
      }
    )
});

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(GwpIndex);
