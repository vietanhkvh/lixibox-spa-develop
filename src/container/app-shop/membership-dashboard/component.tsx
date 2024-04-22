import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { BANNER_ID, BANNER_LIMIT_DEFAULT } from 'constants/application/default';
import { SIGN_IN_STATE } from 'constants/application/global';
import { BalanceAndLixicoinDashboardTab } from 'constants/application/user-transaction';
import { Banner } from 'flows/banner/types';
import { ROUTING_MEMBERSHIP_FAQ } from 'routings/path';
import { User } from 'types/api/auth';
import { TabParams } from 'types/generic';
import { isMobileVersion, objectToHash } from 'utils';

import { PropsFromRedux } from './store';
import DesktopView from './view/desktop';
import MobileView from './view/mobile';

const BANNER_FETCH_META = { idBanner: BANNER_ID.LIXICOIN_INFO, limit: BANNER_LIMIT_DEFAULT };

interface TabState extends TabParams {
  selected?: boolean;
}
interface ViewProps {
  user: User;
  banners: Banner[];
  isFetchingBanners: boolean;
  tabs: Array<TabState>;
  onTabSwitch?: (tab: any) => void;
  membershipInfo: any;
  isFetchingMembershipInfo: boolean;
  membershipInfoStr: string;
  isAuthenticatedSession: boolean;
  progressInfoPath: string;
}
interface LixicoinDashboardProps extends PropsFromRedux {}
const LixicoinDashboard = ({
  authStore: { signInStatus, profile: user },
  bannerStore: { bannerList, banner: bannerState },
  lixicoinStore: { membershipInfo, isFetchMembershipInfo },
  fetchBannerAction,
  fetchUserProfileAction,
  getMembershipAction,
  getUserMembershipAction
}: LixicoinDashboardProps) => {
  const isAuthenticatedSession = signInStatus === SIGN_IN_STATE.LOGIN_SUCCESS;
  const bannerMetaHash = objectToHash(BANNER_FETCH_META);
  const banners = bannerList[bannerMetaHash];
  const history = useHistory();
  const [tabs] = useState<Array<TabState>>([
    { ...BalanceAndLixicoinDashboardTab.BALANCE, selected: false },
    { ...BalanceAndLixicoinDashboardTab.LIXICOIN, selected: false },
    { ...BalanceAndLixicoinDashboardTab.MEMBERSHIP, selected: true }
  ]);
  useEffect(() => {
    getMembershipAction();
    fetchBannerAction(BANNER_FETCH_META);
  }, []);
  useEffect(() => {
    if (isAuthenticatedSession) {
      if (!user) {
        fetchUserProfileAction();
      }
      getUserMembershipAction();
    }
  }, [isAuthenticatedSession]);

  const View = isMobileVersion() ? MobileView : DesktopView;
  return (
    <View
      user={user}
      banners={banners}
      isFetchingBanners={bannerState.fetching}
      tabs={tabs}
      onTabSwitch={(tab) => history.push(tab?.path || '#')}
      membershipInfo={membershipInfo}
      isFetchingMembershipInfo={isFetchMembershipInfo}
      membershipInfoStr={'Hạng càng cao, ưu đãi càng nhiều, nhận quà mỗi khi lên hạng.'}
      isAuthenticatedSession={isAuthenticatedSession}
      progressInfoPath={ROUTING_MEMBERSHIP_FAQ}
    />
  );
};

export type { ViewProps, LixicoinDashboardProps, TabState };
export default LixicoinDashboard;
