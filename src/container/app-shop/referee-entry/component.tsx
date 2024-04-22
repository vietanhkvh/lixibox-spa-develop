import { Redirect, useLocation, useParams } from 'react-router-dom';

import { ROUTING_SHOP_INDEX } from '../../../routings/path';
import { OpenSharedModalActionParams } from '../../../flows/shared-modal/action';
import { SHARED_MODAL_ID } from '../../../constants/application/shared-modal';
import { REFEREE_SCHEME_MODAL_INVOCATION_MODE } from '../../../constants/application/referral';

export interface RefereeEntryProps {
  openSharedModalAction: (data: OpenSharedModalActionParams) => any;
}
const RefereeEntry = ({ openSharedModalAction }: RefereeEntryProps) => {
  const location = useLocation();
  const { referalCode } = useParams<{ referalCode: string }>();
  const query = new URLSearchParams(location.search);
  const schemeId = query.get('scheme_id');

  const modalIdToOpen = referalCode
    ? schemeId
      ? SHARED_MODAL_ID.RefereeSchemeDetailModal
      : SHARED_MODAL_ID.RefereeEntryModal
    : '';
  if (modalIdToOpen) {
    openSharedModalAction({
      id: modalIdToOpen,
      surviveSingleRouteChange: true,
      data: { code: referalCode, schemeId, mode: REFEREE_SCHEME_MODAL_INVOCATION_MODE.INITIAL }
    });
  }

  return <Redirect to={ROUTING_SHOP_INDEX} />;
};

export default RefereeEntry;
