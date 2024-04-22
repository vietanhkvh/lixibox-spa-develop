import { connect } from 'react-redux';

import {
  closeConfirmationModalAction,
  closeSharedModalAction,
  CloseSharedModalActionParams,
  openConfirmationModalAction,
  OpenConfirmationModalActionParams,
  openSharedModalAction,
  OpenSharedModalActionParams
} from '../../flows/shared-modal/action';
import { SHARED_MODAL_ID } from '../../constants/application/shared-modal';
import style from './style.module.scss';
import {
  REFEREE_SCHEMES_MODAL_INVOCATION_MODE,
  REFEREE_SCHEME_MODAL_INVOCATION_MODE
} from 'constants/application/referral';
import { SharedModalState } from 'flows/shared-modal/types';

interface DummyProps {
  sharedModalStore: SharedModalState;
  openConfirmationModalAction: (data: OpenConfirmationModalActionParams) => any;
  openSharedModalAction: (data: OpenSharedModalActionParams) => any;
  closeSharedModalAction: (data: CloseSharedModalActionParams) => any;
  closeConfirmationModalAction: () => any;
}
const Dummy = ({ openConfirmationModalAction, openSharedModalAction }: DummyProps) => {
  return (
    <div className={style.dummy}>
      <div
        onClick={() =>
          openSharedModalAction({
            id: SHARED_MODAL_ID.RefereeEntryModal,
            data: { code: 'SHAKILAF9F', mode: REFEREE_SCHEME_MODAL_INVOCATION_MODE.INITIAL }
          })
        }
      >
        RefereeEntryModal
      </div>
      <div
        onClick={() =>
          openSharedModalAction({
            id: SHARED_MODAL_ID.RefereeSchemeDetailModal,
            data: { code: 'SHAKILAF9F', schemeId: 4, mode: REFEREE_SCHEME_MODAL_INVOCATION_MODE.INITIAL }
          })
        }
      >
        RefereeSchemeDetailModal
      </div>
      <div
        onClick={() =>
          openConfirmationModalAction({
            title: 'Thông báo',
            message: 'Some text',
            button: { title: 'OK', color: 'black' },
            classes: { message: style.message }
          })
        }
      >
        ConfirmationModal
      </div>
      <div
        onClick={() =>
          openSharedModalAction({
            id: SHARED_MODAL_ID.RefereeSchemesModal,
            data: { code: 'SHAKILAF9F', mode: REFEREE_SCHEMES_MODAL_INVOCATION_MODE.WITH_BUTTON }
          })
        }
      >
        RefereeSchemesModal
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  sharedModalStore: state.sharedModal
});
const mapDispatchToProps = (dispatch) => ({
  openSharedModalAction: (data: OpenSharedModalActionParams) => dispatch(openSharedModalAction(data)),
  closeSharedModalAction: (data: CloseSharedModalActionParams) => dispatch(closeSharedModalAction(data)),
  openConfirmationModalAction: (data: OpenConfirmationModalActionParams) => dispatch(openConfirmationModalAction(data)),
  closeConfirmationModalAction: () => dispatch(closeConfirmationModalAction())
});

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(Dummy);
