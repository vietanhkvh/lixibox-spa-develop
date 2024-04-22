import { connect } from 'react-redux';

import {
  closeSharedModalAction,
  CloseSharedModalActionParams,
  openSharedModalAction,
  OpenSharedModalActionParams
} from '../../../flows/shared-modal/action';
import {
  applyCartReferralSchemeAction,
  ApplyCartReferralSchemeActionParams,
  getCartReferralSchemesAction
} from '../../../flows/cart/action';
import RefereeSchemeDetailModal from './component';

const mapStateToProps = (state) => ({
  cartStore: state.cart,
  sharedModalStore: state.sharedModal
});
const mapDispatchToProps = (dispatch) => ({
  openSharedModalAction: (data: OpenSharedModalActionParams) => dispatch(openSharedModalAction(data)),
  closeSharedModalAction: (data: CloseSharedModalActionParams) => dispatch(closeSharedModalAction(data)),
  applyReferralSchemeAction: (data: ApplyCartReferralSchemeActionParams) =>
    dispatch(applyCartReferralSchemeAction(data)),
  getCartReferralSchemesAction: () => dispatch(getCartReferralSchemesAction())
});

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(RefereeSchemeDetailModal);
