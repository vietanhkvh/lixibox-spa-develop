import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import Loading from '../../components/ui/loading';
import ReferralDetail from '../../presentation-component/referral/referral-detail';
import { objectToHash } from '../../utils';
import { ReferralState } from '../../flows/referral/types';
import { OpenAlertActionParams } from '../../flows/alert/action';
import { GetReferralSchemesActionParams, GetReferralSchemeShareLinkActionParams } from '../../flows/referral/action';
import { usePrevious } from '../../utils/hook';
import { auth } from '../../utils/auth';
import { setReferrer } from 'utils/navigate';
import { ROUTING_AUTH_SIGN_IN } from '../../routings/path';
import { ALERT_REFERRAL_SCHEMES_SHARE_LINK_FETCH_ERROR } from '../../constants/application/alert';

interface InvitationProps {
  classes?: { container?: string; scoop?: string; button?: string };

  referralStore: ReferralState;
  authStore: any;
  copyTextToClipboard: (text: string) => any;
  openAlertAction: (data: OpenAlertActionParams) => any;
  getReferralSchemesAction: (params: GetReferralSchemesActionParams) => any;
  getReferralSchemeShareLinkAction: (data: GetReferralSchemeShareLinkActionParams) => any;
}
const Invitation = ({
  classes,
  referralStore: { availableSchemes, schemeShareLink },
  authStore: { userInfo },
  copyTextToClipboard,
  openAlertAction,
  getReferralSchemesAction,
  getReferralSchemeShareLinkAction
}: InvitationProps) => {
  const history = useHistory();
  const schemeIndexQuery = { status: 'available' as const };
  const schemeIndexQueryHash = objectToHash(schemeIndexQuery);
  useEffect(() => {
    getReferralSchemesAction(schemeIndexQuery);
  }, []);
  const schemes = availableSchemes.byQuery[schemeIndexQueryHash];
  const scheme = schemes && schemes[0];
  const thisSchemeShareLink = scheme && schemeShareLink.byQuery[scheme.id];
  const [isPrimaryButtonLoading, setIsPrimaryButtonLoading] = useState<boolean>(false);
  const wasFetchingSchemeShareLink = usePrevious(schemeShareLink.fetching);

  useEffect(() => {
    if (wasFetchingSchemeShareLink && !schemeShareLink.fetching) {
      setIsPrimaryButtonLoading(false);
      if (schemeShareLink.errored) {
        openAlertAction(ALERT_REFERRAL_SCHEMES_SHARE_LINK_FETCH_ERROR);
      } else {
        thisSchemeShareLink && copyTextToClipboard(thisSchemeShareLink.web_url);
      }
    }
  }, [schemeShareLink.fetching]);

  const code = userInfo.referral_code || 'Đăng nhập để xem mã giới thiệu';
  const onPrimaryButtonClick = () => {
    if (thisSchemeShareLink) {
      copyTextToClipboard(thisSchemeShareLink.web_url);
    } else {
      if (scheme) {
        getReferralSchemeShareLinkAction({ id: scheme.id });
        setIsPrimaryButtonLoading(true);
      }
    }
  };
  const onCopy = () => {
    if (auth.loggedIn()) {
      copyTextToClipboard(code);
    } else {
      setReferrer();
      history.push(ROUTING_AUTH_SIGN_IN);
    }
  };

  return !!scheme ? (
    <ReferralDetail
      scheme={scheme}
      button={{
        title: 'Chia sẻ ngay',
        loading: isPrimaryButtonLoading,
        onClick: onPrimaryButtonClick
      }}
      copyButton={{ title: code, withIcon: true, onClick: onCopy }}
      classes={classes}
    />
  ) : (
    <Loading />
  );
};

export default Invitation;
