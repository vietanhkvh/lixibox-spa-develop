import { connect } from 'react-redux';

import { updateSharedModalAction, UpdateSharedModalActionParams } from '../../../../flows/shared-modal/action';
import RefereeSchemeDetailModal from './component';

const mapStateToProps = (state) => ({
  sharedModalStore: state.sharedModal
});
const mapDispatchToProps = (dispatch) => ({
  updateSharedModalAction: (data: UpdateSharedModalActionParams) => dispatch(updateSharedModalAction(data))
});

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(RefereeSchemeDetailModal);
