import { connect } from 'react-redux';

import {
  getReferralSchemeDetailAction,
  GetReferralSchemeDetailActionParams,
  getReferralSchemeShareLinkAction,
  GetReferralSchemeShareLinkActionParams
} from '../../../flows/referral/action';
import { openAlertAction, OpenAlertActionParams } from '../../../flows/alert/action';
import { shareOrCopyLink } from '../../../utils/generic';
import { ALERT_CLIPBOARD_SUCCESS } from '../../../constants/application/alert';
import ReferralDetail from './component';

const mapStateToProps = (state) => ({
  authStore: state.auth,
  referralStore: state.referral
});
const mapDispatchToProps = (dispatch) => ({
  getReferralSchemeDetailAction: (data: GetReferralSchemeDetailActionParams) =>
    dispatch(getReferralSchemeDetailAction(data)),
  getReferralSchemeShareLinkAction: (data: GetReferralSchemeShareLinkActionParams) =>
    dispatch(getReferralSchemeShareLinkAction(data)),
  openAlertAction: (data: OpenAlertActionParams) => dispatch(openAlertAction(data)),
  copyTextToClipboard: (link: string) =>
    shareOrCopyLink(
      link,
      () => dispatch(openAlertAction(ALERT_CLIPBOARD_SUCCESS)),
      () => {
        /** TODO: Provide error handling */
      }
    )
});

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(ReferralDetail);
