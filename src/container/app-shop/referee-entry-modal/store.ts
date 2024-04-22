import { connect } from 'react-redux';

import { openAlertAction } from '../../../flows/alert/action';
import { ALERT_CLIPBOARD_SUCCESS } from '../../../constants/application/alert';
import { shareOrCopyLink } from '../../../utils/generic';
import {
  applyReferralCodeAction,
  ApplyReferralCodeActionParams,
  getRefereeSchemesByCodeAction,
  GetRefereeSchemesByCodeActionParams
} from '../../../flows/referral/action';
import {
  closeSharedModalAction,
  CloseSharedModalActionParams,
  openSharedModalAction,
  OpenSharedModalActionParams
} from '../../../flows/shared-modal/action';
import RefereeEntryModal from './component';

const mapStateToProps = (state) => ({
  referralStore: state.referral,
  sharedModalStore: state.sharedModal
});
const mapDispatchToProps = (dispatch) => ({
  openSharedModalAction: (data: OpenSharedModalActionParams) => dispatch(openSharedModalAction(data)),
  closeSharedModalAction: (data: CloseSharedModalActionParams) => dispatch(closeSharedModalAction(data)),
  getRefereeSchemesByCodeAction: (data: GetRefereeSchemesByCodeActionParams) =>
    dispatch(getRefereeSchemesByCodeAction(data)),
  applyReferralCodeAction: (data: ApplyReferralCodeActionParams) => dispatch(applyReferralCodeAction(data)),
  copyTextToClipboard: (link: string) =>
    shareOrCopyLink(
      link,
      () => dispatch(openAlertAction(ALERT_CLIPBOARD_SUCCESS)),
      () => {
        /** TODO: Provide error handling */
      }
    )
});

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(RefereeEntryModal);
