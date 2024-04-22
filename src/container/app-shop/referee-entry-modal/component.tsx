import { useMemo, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { objectToHash } from '../../../utils';
import { auth } from '../../../utils/auth';
import { ApplyReferralCodeActionParams, GetRefereeSchemesByCodeActionParams } from '../../../flows/referral/action';
import { CloseSharedModalActionParams, OpenSharedModalActionParams } from '../../../flows/shared-modal/action';
import { ReferralState } from '../../../flows/referral/types';
import { SharedModalState } from '../../../flows/shared-modal/types';
import { SHARED_MODAL_ID } from '../../../constants/application/shared-modal';
import { ROUTING_AUTH_SIGN_UP } from '../../../routings/path';
import {
  RefereeSchemeModalInvocationMode,
  REFEREE_SCHEME_MODAL_INVOCATION_MODE
} from '../../../constants/application/referral';
import { storageKey } from '../../../constants/application/client-storage';
import RefereeEntryModal from '../../../presentation-component/referral/referee-entry-modal';
import { usePrevious } from '../../../utils/hook';

export interface RefereeEntryModalContainerProps {
  referralStore: ReferralState;
  sharedModalStore: SharedModalState;
  openSharedModalAction: (data: OpenSharedModalActionParams) => any;
  closeSharedModalAction: (data: CloseSharedModalActionParams) => any;
  getRefereeSchemesByCodeAction: (data: GetRefereeSchemesByCodeActionParams) => any;
  applyReferralCodeAction: (data: ApplyReferralCodeActionParams) => any;
  copyTextToClipboard: (text: string) => any;
}
const RefereeEntryModalContainer = ({
  referralStore: { refereeSchemes },
  sharedModalStore: { byId: sharedModalById },
  openSharedModalAction,
  closeSharedModalAction,
  getRefereeSchemesByCodeAction,
  applyReferralCodeAction,
  copyTextToClipboard
}: RefereeEntryModalContainerProps) => {
  const history = useHistory();
  const [isSchemeLoadFailed, setIsSchemeLoadFailed] = useState(false);
  const wasSchemeFetching = usePrevious(refereeSchemes.fetching);
  useEffect(() => {
    wasSchemeFetching && !refereeSchemes.fetching && setIsSchemeLoadFailed(refereeSchemes.errored);
  }, [refereeSchemes.fetching]);
  const thisModalState = sharedModalById[SHARED_MODAL_ID.RefereeEntryModal];
  const code = (thisModalState && thisModalState.data.code) || '';
  const mode: RefereeSchemeModalInvocationMode = thisModalState?.data?.mode;
  const isRefereeEntryModalOpen = thisModalState && thisModalState.isVisible;
  const apiQuery = { code };
  const apiQueryHash = objectToHash(apiQuery);
  const schemes = refereeSchemes.byQuery[apiQueryHash];
  useMemo(() => {
    if (isRefereeEntryModalOpen) {
      if (mode === REFEREE_SCHEME_MODAL_INVOCATION_MODE.INITIAL) {
        auth.loggedIn() && applyReferralCodeAction({ code });
      }
      schemes || getRefereeSchemesByCodeAction(apiQuery);
    }
  }, [isRefereeEntryModalOpen]);
  const onRetry = () => {
    setIsSchemeLoadFailed(false);
    getRefereeSchemesByCodeAction(apiQuery);
  };

  return (
    <RefereeEntryModal
      {...{
        code,
        referrerName: schemes && schemes.referrer.first_name,
        schemes: schemes && schemes.schemes,
        button: auth.loggedIn()
          ? {
              title: 'Copy mã',
              onClick: () => copyTextToClipboard(code)
            }
          : {
              title: 'Tạo tài khoản',
              onClick: () => {
                code &&
                  localStorage.setItem(
                    storageKey.REFERRAL_MODAL_TO_OPEN,
                    JSON.stringify({
                      id: SHARED_MODAL_ID.RefereeEntryModal,
                      code
                    })
                  );
                history.push(ROUTING_AUTH_SIGN_UP);
                closeSharedModalAction({ id: SHARED_MODAL_ID.RefereeEntryModal });
              }
            },
        isLoaded: !!thisModalState && refereeSchemes.loaded && !!schemes,
        isLoadFailed: isSchemeLoadFailed,
        isOpen: !!isRefereeEntryModalOpen,
        onCopy: () => copyTextToClipboard(code),
        onSchemeClick: (scheme) =>
          openSharedModalAction({
            id: SHARED_MODAL_ID.RefereeSchemeDetailModal,
            data: {
              code,
              schemeId: scheme.id,
              mode: REFEREE_SCHEME_MODAL_INVOCATION_MODE.INTERACTION,
              invokedBy: {
                id: SHARED_MODAL_ID.RefereeEntryModal,
                mode
              }
            }
          }),
        onRequestClose: () => closeSharedModalAction({ id: SHARED_MODAL_ID.RefereeEntryModal }),
        onRetry
      }}
    />
  );
};

export default RefereeEntryModalContainer;
