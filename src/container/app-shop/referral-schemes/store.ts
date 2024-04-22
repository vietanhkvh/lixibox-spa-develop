import { connect } from 'react-redux';

import { openAlertAction, OpenAlertActionParams } from '../../../flows/alert/action';
import { ALERT_CLIPBOARD_SUCCESS } from '../../../constants/application/alert';
import { shareOrCopyLink } from '../../../utils/generic';
import {
  getReferralSchemesAction,
  GetReferralSchemesActionParams,
  getReferralSchemesShareLinkAction
} from '../../../flows/referral/action';
import ReferralSchemes from './component';

const mapStateToProps = (state) => ({
  referralStore: state.referral,
  authStore: state.auth
});
const mapDispatchToProps = (dispatch) => ({
  getReferralSchemesAction: (data: GetReferralSchemesActionParams) => dispatch(getReferralSchemesAction(data)),
  getReferralSchemesShareLinkAction: () => dispatch(getReferralSchemesShareLinkAction()),
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

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(ReferralSchemes);
