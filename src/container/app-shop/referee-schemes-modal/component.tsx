import { useEffect, useState } from 'react';

import { CloseSharedModalActionParams, OpenSharedModalActionParams } from '../../../flows/shared-modal/action';
import { SharedModalState } from '../../../flows/shared-modal/types';
import { CartState } from '../../../flows/cart/types';
import { ApplyCartReferralSchemeActionParams } from '../../../flows/cart/action';
import { usePrevious } from '../../../utils/hook';
import { SHARED_MODAL_ID } from '../../../constants/application/shared-modal';
import {
  RefereeSchemesModalInvocationMode,
  REFEREE_SCHEMES_MODAL_INVOCATION_MODE,
  REFEREE_SCHEME_MODAL_INVOCATION_MODE
} from '../../../constants/application/referral';
import RefereeSchemesModal from '../../../presentation-component/referral/referee-schemes-modal';
import MobileConfirmation from '../../../presentation-component/ui/mobile-confirmation';
import { ReferralSchemeValidatedDetailResponse } from '../../../types/api/referral';

const CONFIRMATION_MODAL_MODE = Object.freeze({
  SCHEME_APPLY_ERROR: 'SCHEME_APPLY_ERROR',
  SCHEME_SELECTION_SKIP: 'SCHEME_SELECTION_SKIP'
});
interface ConfirmationModalState {
  mode: string;
  isOpen: boolean;
  title: string;
  prompt: string;
  buttonText: string;
}
export interface RefereeSchemeDetailModalContainerProps {
  cartStore: CartState;
  sharedModalStore: SharedModalState;
  openSharedModalAction: (data: OpenSharedModalActionParams) => any;
  closeSharedModalAction: (data: CloseSharedModalActionParams) => any;
  getCartReferralSchemesAction: () => any;
  applyReferralSchemeAction: (data: ApplyCartReferralSchemeActionParams) => any;
}
const RefereeSchemeDetailModalContainer = ({
  cartStore: { cartDetail, applyReferralScheme, referralSchemes },
  sharedModalStore: { byId: sharedModalById },
  openSharedModalAction,
  closeSharedModalAction,
  getCartReferralSchemesAction,
  applyReferralSchemeAction
}: RefereeSchemeDetailModalContainerProps) => {
  const [confirmationModalState, setConfirmationModalState] = useState<ConfirmationModalState>({
    mode: '',
    isOpen: false,
    title: '',
    prompt: '',
    buttonText: ''
  });
  const updateConfirmationModalState = (update) =>
    setConfirmationModalState((state) => Object.assign({}, state, update));
  const [isSchemeApplying, setIsSchemeApplying] = useState(false);
  const thisModalState = sharedModalById[SHARED_MODAL_ID.RefereeSchemesModal];

  const wasApplyingScheme = usePrevious(applyReferralScheme.applying);
  const code = (thisModalState && thisModalState.data.code) || '';
  const mode: RefereeSchemesModalInvocationMode = thisModalState?.data?.mode;
  const isRefereeSchemesModalOpen = thisModalState && thisModalState.isVisible;
  useEffect(() => {
    if (isRefereeSchemesModalOpen) {
      getCartReferralSchemesAction();
    }
  }, [isRefereeSchemesModalOpen]);
  useEffect(() => {
    if (wasApplyingScheme && !applyReferralScheme.applying) {
      setIsSchemeApplying(false);
      if (applyReferralScheme.errored) {
        updateConfirmationModalState({
          mode: CONFIRMATION_MODAL_MODE.SCHEME_APPLY_ERROR,
          isOpen: true,
          title: 'Thông báo',
          prompt: 'Không thể áp dụng chương trình giới thiệu.',
          buttonText: 'OK'
        });
      } else {
        if (mode === REFEREE_SCHEMES_MODAL_INVOCATION_MODE.WITHOUT_BUTTON) {
          closeSharedModalAction({ id: SHARED_MODAL_ID.RefereeSchemesModal });
        }
      }
    }
  }, [applyReferralScheme.applying]);
  const appliedScheme = cartDetail.referral?.applied_scheme;
  const openRefereeSchemeDetailModal = (scheme: ReferralSchemeValidatedDetailResponse) => {
    openSharedModalAction({
      id: SHARED_MODAL_ID.RefereeSchemeDetailModal,
      data: {
        code,
        schemeId: scheme.id,
        mode: REFEREE_SCHEME_MODAL_INVOCATION_MODE.INTERACTION,
        invokedBy: {
          id: SHARED_MODAL_ID.RefereeSchemesModal,
          mode
        }
      }
    });
  };
  const isSchemeAppliable = (scheme: ReferralSchemeValidatedDetailResponse): boolean => {
    return (
      typeof scheme.conditions?.count !== 'undefined' &&
      scheme.conditions?.count === scheme.conditions?.matched_count &&
      appliedScheme?.id !== scheme.id
    );
  };

  return (
    <>
      <RefereeSchemesModal
        {...{
          code,
          mode,
          schemes: referralSchemes.index,
          appliedScheme,
          applyingId:
            applyReferralScheme.lastId.code === code && isSchemeApplying ? applyReferralScheme.lastId.schemeId : null,
          isLoaded: referralSchemes.loaded,
          isOpen: !!isRefereeSchemesModalOpen,
          primaryButton: {
            title: 'Xác nhận',
            onSubmit: () => {
              if (appliedScheme) {
                closeSharedModalAction({ id: SHARED_MODAL_ID.RefereeSchemesModal });
                // history.push(ROUTING_CHECK_OUT_PAYMENT);
              } else {
                updateConfirmationModalState({
                  mode: CONFIRMATION_MODAL_MODE.SCHEME_SELECTION_SKIP,
                  isOpen: true,
                  title: 'Chọn chương trình giới thiệu',
                  prompt:
                    'Bạn chưa chọn chương trình ưu đãi nào từ bạn bè. Bạn có muốn tiếp tục quá trình thanh toán đơn hàng?',
                  buttonText: 'Tiếp tục'
                });
              }
            }
          },
          onRequestClose: () => closeSharedModalAction({ id: SHARED_MODAL_ID.RefereeSchemesModal }),
          onSchemeClick: (scheme) => openRefereeSchemeDetailModal(scheme),
          onSchemeApply: (scheme) => {
            if (isSchemeAppliable(scheme)) {
              applyReferralSchemeAction({ code, schemeId: scheme.id });
              setIsSchemeApplying(true);
            } else {
              openRefereeSchemeDetailModal(scheme);
            }
          }
        }}
      />
      <MobileConfirmation
        {...{
          title: confirmationModalState.title,
          prompt: confirmationModalState.prompt,
          confirmationButton: {
            text: confirmationModalState.buttonText,
            color: 'black'
          },
          isOpen: confirmationModalState.isOpen,
          onConfirm: () => {
            switch (confirmationModalState.mode) {
              case CONFIRMATION_MODAL_MODE.SCHEME_APPLY_ERROR: {
                updateConfirmationModalState({ isOpen: false });
                return;
              }
              case CONFIRMATION_MODAL_MODE.SCHEME_SELECTION_SKIP: {
                updateConfirmationModalState({ isOpen: false });
                setTimeout(() => {
                  closeSharedModalAction({ id: SHARED_MODAL_ID.RefereeSchemesModal });
                }, 400);
                // history.push(ROUTING_CHECK_OUT_PAYMENT);
                return;
              }
            }
          },
          onCancel: () => {
            switch (confirmationModalState.mode) {
              case CONFIRMATION_MODAL_MODE.SCHEME_APPLY_ERROR: {
                updateConfirmationModalState({ isOpen: false });
                return;
              }
              case CONFIRMATION_MODAL_MODE.SCHEME_SELECTION_SKIP: {
                updateConfirmationModalState({ isOpen: false });
                return;
              }
            }
          }
        }}
      />
    </>
  );
};

export default RefereeSchemeDetailModalContainer;
