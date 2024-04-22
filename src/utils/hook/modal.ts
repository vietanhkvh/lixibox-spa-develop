import { useEffect } from 'react';
import { SHARED_MODAL_ID } from '../../constants/application/shared-modal';
import { SharedModalState } from '../../flows/shared-modal/types';
import { usePrevious } from '.';

export const useConfirmationModal = (
  onConfirmed: (data: any) => any,
  onCancelled: (data: any) => any,
  sharedModalStore: SharedModalState
) => {
  const confirmationModal = sharedModalStore.byId[SHARED_MODAL_ID.ConfirmationModal];

  const prevAction = usePrevious(confirmationModal?.data?.action);
  const action = confirmationModal?.data?.action;

  useEffect(() => {
    if (action && !prevAction !== action) {
      switch (action) {
        case 'confirmed':
          onConfirmed(confirmationModal?.data);
          break;
        case 'cancelled':
        default:
          onCancelled(confirmationModal?.data);
      }
    }
  }, [action, prevAction]);
};
