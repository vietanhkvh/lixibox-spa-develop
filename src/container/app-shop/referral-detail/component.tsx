import { useEffect, useState } from 'react';
import { generatePath, useHistory, useParams } from 'react-router-dom';

import { isMobileVersion } from '../../../utils/responsive';
import { usePrevious } from '../../../utils/hook';
import { auth } from '../../../utils/auth';
import { setCustomReferrer } from 'utils/navigate';
import { ROUTING_AUTH_SIGN_IN, ROUTING_USER_INVITE_DETAIL } from '../../../routings/path';
import { ReferralSchemeDetailResponse } from '../../../types/api/referral';
import { ReferralState } from '../../../flows/referral/types';
import { ReferralDetailButtonProps } from '../../../presentation-component/referral/referral-detail';
import { ALERT_REFERRAL_SCHEMES_SHARE_LINK_FETCH_ERROR } from '../../../constants/application/alert';
import {
  GetReferralSchemeDetailActionParams,
  GetReferralSchemeShareLinkActionParams
} from '../../../flows/referral/action';
import { OpenAlertActionParams } from '../../../flows/alert/action';
import DesktopView from './view/desktop';
import MobileView from './view/mobile';

interface ViewProps {
  scheme: ReferralSchemeDetailResponse | null;
  button: ReferralDetailButtonProps;
  copyButton?: { title: string; withIcon: boolean; onClick: (scheme: ReferralSchemeDetailResponse) => any };
  genericNote: string;
}
interface ReferralDetailContainerProps {
  authStore: any;
  referralStore: ReferralState;
  getReferralSchemeDetailAction: (data: GetReferralSchemeDetailActionParams) => any;
  getReferralSchemeShareLinkAction: (params: GetReferralSchemeShareLinkActionParams) => any;
  copyTextToClipboard: (text: string) => any;
  openAlertAction: (data: OpenAlertActionParams) => any;
}
const ReferralDetailContainer = ({
  authStore: { userInfo },
  referralStore: { schemeDetail, schemeShareLink },
  getReferralSchemeDetailAction,
  getReferralSchemeShareLinkAction,
  openAlertAction,
  copyTextToClipboard
}: ReferralDetailContainerProps) => {
  const isLoggedIn = auth.loggedIn();
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  useEffect(() => {
    getReferralSchemeDetailAction({ id });
  }, []);
  const [isPrimaryButtonLoading, setIsPrimaryButtonLoading] = useState<boolean>(false);
  const wasFetchingSchemeShareLink = usePrevious(schemeShareLink.fetching);
  const thisSchemeShareLink = schemeShareLink.byQuery[id];
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
  const scheme = schemeDetail.byQuery[id];
  const genericNote =
    '*Vui lòng không chia sẻ, bình luận có chứa mã giới thiệu của bạn hoặc nội dung có liên quan đến chương trình trên các kênh của Lixibox (Lixibox Facebook Fanpage, Lixibox Feed, Mục thảo luận, Đánh giá sản phẩm)';
  const onPrimaryButtonClick = () => {
    if (thisSchemeShareLink) {
      copyTextToClipboard(thisSchemeShareLink.web_url);
    } else {
      getReferralSchemeShareLinkAction({ id });
      setIsPrimaryButtonLoading(true);
    }
  };

  const View = isMobileVersion() ? MobileView : DesktopView;

  return (
    <View
      scheme={scheme}
      button={
        isLoggedIn &&
        scheme?.status === 'available' && {
          title: isMobileVersion() ? 'Chia sẻ ngay' : 'Sao chép link giới thiệu',
          loading: isPrimaryButtonLoading,
          onClick: onPrimaryButtonClick
        }
      }
      copyButton={
        isLoggedIn
          ? userInfo.referral_code && {
              title: userInfo.referral_code,
              withIcon: true,
              onClick: () => copyTextToClipboard(userInfo.referral_code || '')
            }
          : {
              title: 'Đăng nhập để xem mã giới thiệu',
              withIcon: false,
              onClick: () => {
                setCustomReferrer({ value: generatePath(ROUTING_USER_INVITE_DETAIL, { id }) });
                history.push(ROUTING_AUTH_SIGN_IN);
              }
            }
      }
      genericNote={genericNote}
    />
  );
};

export type { ViewProps };
export default ReferralDetailContainer;
