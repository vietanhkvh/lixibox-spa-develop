import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { objectToHash } from '../../../utils';
import {
  ApplyReferralCodeActionParams,
  GetRefereeSchemeByCodeActionParams,
  GetReferralSchemeValidatedDetailActionParams
} from '../../../flows/referral/action';
import { CloseSharedModalActionParams, OpenSharedModalActionParams } from '../../../flows/shared-modal/action';
import { ReferralState } from '../../../flows/referral/types';
import { SharedModalState } from '../../../flows/shared-modal/types';
import { CartState } from '../../../flows/cart/types';
import { ApplyCartReferralSchemeActionParams } from '../../../flows/cart/action';
import { auth } from '../../../utils/auth';
import { usePrevious } from '../../../utils/hook';
import { SHARED_MODAL_ID } from '../../../constants/application/shared-modal';
import {
  RefereeSchemeModalInvocationMode,
  REFEREE_SCHEME_MODAL_INVOCATION_MODE
} from '../../../constants/application/referral';
import { storageKey } from '../../../constants/application/client-storage';
import RefereeSchemeDetailModal from '../../../presentation-component/referral/referee-scheme-detail-modal';
import MobileConfirmation from '../../../presentation-component/ui/mobile-confirmation';
import { ROUTING_AUTH_SIGN_UP, ROUTING_CHECK_OUT } from '../../../routings/path';

const CONFIRMATION_MODE = Object.freeze({
  SCHEME_APPLY_VIA_CODE_SUCCESS: 'SCHEME_APPLY_VIA_CODE_SUCCESS'
});
interface ConfirmationModalState {
  isOpen: boolean;
  mode?: string;
  title: string;
  prompt: string;
  buttonText: string;
}
export interface RefereeSchemeDetailModalContainerProps {
  cartStore: CartState;
  referralStore: ReferralState;
  sharedModalStore: SharedModalState;
  openSharedModalAction: (data: OpenSharedModalActionParams) => any;
  closeSharedModalAction: (data: CloseSharedModalActionParams) => any;
  getRefereeSchemeByCodeAction: (data: GetRefereeSchemeByCodeActionParams) => any;
  getReferralSchemeValidatedDetailAction: (data: GetReferralSchemeValidatedDetailActionParams) => any;
  applyReferralCodeAction: (data: ApplyReferralCodeActionParams) => any;
  applyReferralSchemeAction: (data: ApplyCartReferralSchemeActionParams) => any;
  copyTextToClipboard: (text: string) => any;
}
const RefereeSchemeDetailModalContainer = ({
  cartStore: { cartDetail, applyReferralScheme },
  referralStore: { refereeScheme, validatedSchemeDetail },
  sharedModalStore: { byId: sharedModalById },
  getRefereeSchemeByCodeAction,
  getReferralSchemeValidatedDetailAction,
  openSharedModalAction,
  closeSharedModalAction,
  applyReferralCodeAction,
  applyReferralSchemeAction,
  copyTextToClipboard
}: RefereeSchemeDetailModalContainerProps) => {
  const history = useHistory();
  const location = useLocation();
  const [isSchemeLoadFailed, setIsSchemeLoadFailed] = useState(false);
  const wasSchemeFetching = usePrevious(refereeScheme.fetching);
  useEffect(() => {
    wasSchemeFetching && !refereeScheme.fetching && setIsSchemeLoadFailed(refereeScheme.errored);
  }, [refereeScheme.fetching]);
  const [confirmationModalState, setConfirmationModalState] = useState<ConfirmationModalState>({
    isOpen: false,
    title: '',
    prompt: '',
    buttonText: ''
  });
  const updateConfirmationModalState = (update) =>
    setConfirmationModalState((state) => Object.assign({}, state, update));
  const [isSchemeDetailApplying, setIsSchemeDetailApplying] = useState(false);
  const thisModalState = sharedModalById[SHARED_MODAL_ID.RefereeSchemeDetailModal];
  const wasApplyingSchemeDetail = usePrevious(applyReferralScheme.applying);
  const code = thisModalState?.data.code || '';
  const mode: RefereeSchemeModalInvocationMode = thisModalState?.data?.mode;
  const invokedBy = thisModalState?.data?.invokedBy;
  const schemeId = (thisModalState && thisModalState.data.schemeId) || '';
  const apiQueryGetSchemeByCode = { code, schemeId };
  const apiQueryGetValidatedSchemeDetail = { id: schemeId };
  const isRefereeSchemeDetailModalOpen = thisModalState && thisModalState.isVisible;
  const scheme = refereeScheme.byQuery[objectToHash(apiQueryGetSchemeByCode)];
  const isSchemeApplied = scheme?.scheme.id && scheme?.scheme.id === cartDetail.referral?.applied_scheme?.id;
  useEffect(() => {
    if (isRefereeSchemeDetailModalOpen) {
      if (mode === REFEREE_SCHEME_MODAL_INVOCATION_MODE.INITIAL) {
        auth.loggedIn() && applyReferralCodeAction({ code });
      }
      scheme || getRefereeSchemeByCodeAction({ code, schemeId });
      auth.loggedIn() && getReferralSchemeValidatedDetailAction(apiQueryGetValidatedSchemeDetail);
    }
  }, [isRefereeSchemeDetailModalOpen]);
  useEffect(() => {
    if (isRefereeSchemeDetailModalOpen && wasApplyingSchemeDetail && !applyReferralScheme.applying) {
      setIsSchemeDetailApplying(false);
      if (applyReferralScheme.errored) {
        updateConfirmationModalState({
          isOpen: true,
          title: 'Thông báo',
          prompt: 'Không thể áp dụng chương trình giới thiệu.',
          buttonText: 'OK'
        });
      } else {
        switch (invokedBy?.id) {
          case SHARED_MODAL_ID.RefereeSchemesModal: {
            closeSharedModalAction({ id: SHARED_MODAL_ID.RefereeSchemeDetailModal });
            openSharedModalAction({
              id: SHARED_MODAL_ID.RefereeSchemesModal,
              data: { code, mode: invokedBy?.mode }
            });
            break;
          }
          case SHARED_MODAL_ID.RefereeEntryModal:
          default: {
            updateConfirmationModalState({
              isOpen: true,
              mode: CONFIRMATION_MODE.SCHEME_APPLY_VIA_CODE_SUCCESS,
              title: 'Chúc mừng bạn',
              prompt: `Bạn vừa áp dụng chương trình ${scheme?.scheme?.name} vào giỏ hàng`,
              buttonText: 'Xem giỏ hàng'
            });
          }
        }
      }
    }
  }, [applyReferralScheme.applying]);

  const onRetry = () => {
    setIsSchemeLoadFailed(false);
    getRefereeSchemeByCodeAction({ code, schemeId });
  };
  const validatedScheme = validatedSchemeDetail.byQuery[objectToHash(apiQueryGetValidatedSchemeDetail)];
  const isSchemeConditionsSatisfied = validatedScheme?.conditions?.items?.every(({ matched }) => matched);
  const openOriginModal = () => {
    const modalIdToOpen =
      invokedBy?.id === SHARED_MODAL_ID.RefereeSchemesModal
        ? SHARED_MODAL_ID.RefereeSchemesModal
        : SHARED_MODAL_ID.RefereeEntryModal;
    openSharedModalAction({
      id: modalIdToOpen,
      data: { code, mode: invokedBy?.mode || REFEREE_SCHEME_MODAL_INVOCATION_MODE.INTERACTION }
    });
  };

  return (
    <>
      <RefereeSchemeDetailModal
        {...{
          schemeInfo: apiQueryGetSchemeByCode,
          referrer: scheme && scheme.referrer,
          scheme: scheme && scheme.scheme,
          validatedScheme,
          codeButton: {
            title: 'Xem chương trình khác',
            onClick: () => openOriginModal()
          },
          applyButton: auth.loggedIn()
            ? {
                title: isSchemeApplied ? 'Đã áp dụng' : 'Áp dụng',
                disabled: !!isSchemeApplied,
                loading: isSchemeDetailApplying,
                onClick: () => {
                  if (!isSchemeConditionsSatisfied) {
                    updateConfirmationModalState({
                      isOpen: true,
                      title: 'Thông báo',
                      prompt: 'Bạn chưa đủ điều kiện để áp dụng chương trình này. Vui lòng kiểm tra và thử lại.',
                      buttonText: 'OK'
                    });
                  } else {
                    applyReferralSchemeAction({
                      code,
                      schemeId,
                      skipSuccessAlert: !invokedBy?.id || invokedBy?.id === SHARED_MODAL_ID.RefereeEntryModal
                    });
                    setIsSchemeDetailApplying(true);
                  }
                }
              }
            : {
                title: 'Tạo tài khoản',
                onClick: () => {
                  if (code && schemeId) {
                    code &&
                      localStorage.setItem(
                        storageKey.REFERRAL_MODAL_TO_OPEN,
                        JSON.stringify({
                          id: SHARED_MODAL_ID.RefereeSchemeDetailModal,
                          code,
                          schemeId
                        })
                      );
                  }
                  history.push(ROUTING_AUTH_SIGN_UP);
                  closeSharedModalAction({ id: SHARED_MODAL_ID.RefereeSchemeDetailModal });
                }
              },
          backAction: Object.assign(
            {},
            invokedBy?.id && {
              icon: 'angle-left',
              onClick: () => openOriginModal()
            }
          ),
          isLoadFailed: isSchemeLoadFailed,
          isLoaded: !!thisModalState && refereeScheme.loaded && !!scheme,
          isOpen: !!isRefereeSchemeDetailModalOpen,
          isLoggedIn: auth.loggedIn(),
          onCopy: () => copyTextToClipboard(code),
          onRequestClose: () => closeSharedModalAction({ id: SHARED_MODAL_ID.RefereeSchemeDetailModal }),
          onRetry
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
            if (confirmationModalState.mode === CONFIRMATION_MODE.SCHEME_APPLY_VIA_CODE_SUCCESS) {
              closeSharedModalAction({ id: SHARED_MODAL_ID.RefereeSchemeDetailModal });
              location.pathname !== ROUTING_CHECK_OUT && history.push(ROUTING_CHECK_OUT);
            } else {
            }
            updateConfirmationModalState({ isOpen: false });
          },
          onCancel: () => updateConfirmationModalState({ isOpen: false })
        }}
      />
    </>
  );
};

export default RefereeSchemeDetailModalContainer;
