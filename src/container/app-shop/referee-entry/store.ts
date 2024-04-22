import { connect } from 'react-redux';

import { openSharedModalAction, OpenSharedModalActionParams } from '../../../flows/shared-modal/action';
import RefereeEntry from './component';

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({
  openSharedModalAction: (data: OpenSharedModalActionParams) => dispatch(openSharedModalAction(data))
});

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(RefereeEntry);
