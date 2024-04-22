import classNames from 'classnames';

import { UpdateSharedModalActionParams } from '../../../../flows/shared-modal/action';
import { SharedModalState } from '../../../../flows/shared-modal/types';
import { isMobileVersion } from '../../../../utils/responsive';
import { SHARED_MODAL_ID } from '../../../../constants/application/shared-modal';
import GeneralModal from '../../../../presentation-component/modal/general-modal/component';
import SubmitButton from '../../../../presentation-component/ui/submit-button';
import style from './style.module.scss';

export interface ConfirmationModalContainerProps {
  sharedModalStore: SharedModalState;
  updateSharedModalAction: (data: UpdateSharedModalActionParams) => any;
}
const ConfirmationModalContainer = ({
  sharedModalStore: { byId: sharedModalById },
  updateSharedModalAction
}: ConfirmationModalContainerProps) => {
  const thisModalState = sharedModalById[SHARED_MODAL_ID.ConfirmationModal];
  const title = thisModalState?.data?.title;
  const message = thisModalState?.data?.message;
  const button = thisModalState?.data?.button || { title: '' };
  const classes = thisModalState?.data?.classes;
  const isConfirmationModalOpen = thisModalState?.isVisible;

  const onRequestClose = () => {
    updateSharedModalAction({ id: SHARED_MODAL_ID.ConfirmationModal, data: { action: 'cancelled' } });
  };

  return (
    <GeneralModal
      isOpen={!!isConfirmationModalOpen}
      title={title}
      fullHeight={false}
      leftTitle=""
      rightIcon={'close'}
      classes={{ overlay: classNames(style.modalBaseOverlay, classes?.overlay) }}
      className={classNames(
        style.confirmationModal,
        isMobileVersion() || style.confirmationModalDesktop,
        classes && classes.modal
      )}
      onRightActionClick={onRequestClose}
      onRequestClose={onRequestClose}
    >
      <div className={classNames(style.confirmation, classes?.confirmation)}>
        <div className={classNames(style.message, classes?.message)}>{message}</div>
        <SubmitButton
          title={button.title || ''}
          color={button.color || 'pink'}
          loading={!!button.loading}
          disabled={!!button.disabled}
          classes={Object.assign({ container: style.primaryButton }, classes?.button)}
          onSubmit={() => {
            updateSharedModalAction({ id: SHARED_MODAL_ID.ConfirmationModal, data: { action: 'confirmed' } });
          }}
        />
      </div>
    </GeneralModal>
  );
};

export default ConfirmationModalContainer;
