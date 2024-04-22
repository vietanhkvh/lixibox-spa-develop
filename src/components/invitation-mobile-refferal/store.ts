import { connect } from 'react-redux';

import { openAlertAction } from '../../flows/alert/action';
import { ALERT_CLIPBOARD_SUCCESS } from '../../constants/application/alert';
import { copyTextToClipboard, shareOrCopyLink } from '../../utils/generic';
import { ROUTING_REFERAL_PATH } from '../../routings/path';
import Invitation from './component';

export const mapStateToProps = (state) => ({ authStore: state.auth, cartStore: state.cart });
export const mapDispatchToProps = (dispatch) => ({
  copyTextToClipboard: (text: string) =>
    copyTextToClipboard(
      text,
      () => dispatch(openAlertAction(ALERT_CLIPBOARD_SUCCESS)),
      () => {
        /** TODO: Provide error handling */
      }
    ),
  shareOrCopyLink: (link: string) =>
    shareOrCopyLink(
      link,
      ({ type }) => type === 'copy' && dispatch(openAlertAction(ALERT_CLIPBOARD_SUCCESS)),
      () => {
        /** TODO: Provide error handling */
      }
    )
});
const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
  invitationURL: (referralCode) => `${process.env.REACT_APP_FQDN}${ROUTING_REFERAL_PATH}/${referralCode}`
});

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps, mergeProps)(Invitation);
