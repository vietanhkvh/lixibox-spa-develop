import { connect } from 'react-redux';

import { openAlertAction } from '../../../flows/alert/action';
import { ALERT_CLIPBOARD_SUCCESS } from '../../../constants/application/alert';
import { shareOrCopyLink } from '../../../utils/generic';
import {
  applyReferralCodeAction,
  ApplyReferralCodeActionParams,
  getRefereeSchemeByCodeAction,
  GetRefereeSchemeByCodeActionParams,
  getReferralSchemeValidatedDetailAction,
  GetReferralSchemeValidatedDetailActionParams
} from '../../../flows/referral/action';
import {
  closeSharedModalAction,
  CloseSharedModalActionParams,
  openSharedModalAction,
  OpenSharedModalActionParams
} from '../../../flows/shared-modal/action';
import { applyCartReferralSchemeAction, ApplyCartReferralSchemeActionParams } from '../../../flows/cart/action';
import RefereeSchemeDetailModal from './component';

const mapStateToProps = (state) => ({
  cartStore: state.cart,
  referralStore: state.referral,
  sharedModalStore: state.sharedModal
});
const mapDispatchToProps = (dispatch) => ({
  openSharedModalAction: (data: OpenSharedModalActionParams) => dispatch(openSharedModalAction(data)),
  closeSharedModalAction: (data: CloseSharedModalActionParams) => dispatch(closeSharedModalAction(data)),
  getRefereeSchemeByCodeAction: (data: GetRefereeSchemeByCodeActionParams) =>
    dispatch(getRefereeSchemeByCodeAction(data)),
  getReferralSchemeValidatedDetailAction: (data: GetReferralSchemeValidatedDetailActionParams) =>
    dispatch(getReferralSchemeValidatedDetailAction(data)),
  applyReferralCodeAction: (data: ApplyReferralCodeActionParams) => dispatch(applyReferralCodeAction(data)),
  applyReferralSchemeAction: (data: ApplyCartReferralSchemeActionParams) =>
    dispatch(applyCartReferralSchemeAction(data)),
  copyTextToClipboard: (link: string) =>
    shareOrCopyLink(
      link,
      () => dispatch(openAlertAction(ALERT_CLIPBOARD_SUCCESS)),
      () => {
        /** TODO: Provide error handling */
      }
    )
});

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(RefereeSchemeDetailModal);
