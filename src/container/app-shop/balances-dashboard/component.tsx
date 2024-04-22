import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { SIGN_IN_STATE } from 'constants/application/global';
import { BalanceAndLixicoinDashboardTab } from 'constants/application/user-transaction';
import { Banner } from 'flows/banner/types';
import { MembershipLevel } from 'flows/lixicoin/types';
import { User } from 'types/api/auth';
import { ProductBox } from 'types/api/shop';
import { TabParams } from 'types/generic';
import { Pagination } from 'types/paging';
import { isMobileVersion, objectToHash } from 'utils';
import { usePaginationState } from 'utils/hook/pagination';

import { PropsFromRedux } from './store';
import DesktopView from './view/desktop';
import MobileView from './view/mobile';

const BANNER_FETCH_META = { idBanner: 'cashback', limit: 2 };

interface TabState extends TabParams {
  selected?: boolean;
}
interface ViewProps {
  user: User;
  mainBanner?: Banner;
  infoBanner?: Banner;
  tabs: Array<TabState>;
  onTabSwitch?: (tab: any) => void;
  boxes?: ProductBox[];
  isBoxesLoading: boolean;
  isBoxesLoadingFailed: boolean;
  isBannerFetching: boolean;
  pagination: Pagination;
  membershipInfo: string;
  membershipLevels: MembershipLevel[];
  isAuthenticatedSession: boolean;
}
interface BalancesDashboardProps extends PropsFromRedux {}
const BalancesDashboard = ({
  authStore: { signInStatus, profile: user },
  bannerStore: { bannerList, banner: bannerState },
  lixicoinStore: { membershipInfo },
  userStore: { cashbackBoxes },
  fetchBannerAction,
  fetchUserExclusiveCashbackBoxesAction,
  fetchUserProfileAction,
  getMembershipAction
}: BalancesDashboardProps) => {
  const isAuthenticatedSession = signInStatus === SIGN_IN_STATE.LOGIN_SUCCESS;
  const boxesPerPage = 12;
  const bannerMetaHash = objectToHash(BANNER_FETCH_META);
  const mainBanner = bannerList[bannerMetaHash]?.[0];
  const cashbackPercentage = membershipInfo?.[user?.membership_level]?.benefits?.cashback_percentage;
  const history = useHistory();
  const [pagination, { setTotalPages }] = usePaginationState({ perPage: boxesPerPage });
  const cashbackBoxesByQuery =
    cashbackBoxes.byQuery?.[objectToHash({ page: pagination.currentPage, perPage: boxesPerPage })];
  const boxes = cashbackBoxesByQuery?.boxes || [];
  const boxesPaging = cashbackBoxesByQuery?.paging;
  const [tabs] = useState<Array<TabState>>([
    { ...BalanceAndLixicoinDashboardTab.BALANCE, selected: true },
    { ...BalanceAndLixicoinDashboardTab.LIXICOIN, selected: false },
    { ...BalanceAndLixicoinDashboardTab.MEMBERSHIP, selected: false }
  ]);
  const [membershipInfoStr, setMembershipInfoStr] = useState('');
  useEffect(() => {
    fetchBannerAction(BANNER_FETCH_META);
    getMembershipAction();
  }, []);
  useEffect(() => {
    if (isAuthenticatedSession) {
      if (!user) {
        fetchUserProfileAction();
      }
    }
  }, [isAuthenticatedSession]);
  useEffect(() => {
    fetchUserExclusiveCashbackBoxesAction({ page: pagination.currentPage, perPage: boxesPerPage });
  }, [pagination.currentPage, pagination.perPage]);
  useEffect(() => {
    boxesPaging?.total_pages && setTotalPages(boxesPaging.total_pages);
  }, [boxesPaging]);
  useEffect(() => {
    if (membershipInfo && user) {
      const earnRate = membershipInfo?.[user?.membership_level]?.benefits?.lixicoin_earn_rate;
      const info = cashbackPercentage ? `Hoàn tiền đến ${cashbackPercentage}% khi mua hàng` : '';
      earnRate && setMembershipInfoStr(info);
    }
  }, [membershipInfo, user]);

  const View = isMobileVersion() ? MobileView : DesktopView;
  return (
    <View
      user={user}
      mainBanner={mainBanner}
      tabs={tabs}
      onTabSwitch={(tab) => history.push(tab?.path || '#')}
      boxes={boxes}
      isBoxesLoading={cashbackBoxes.fetching}
      isBoxesLoadingFailed={cashbackBoxes.errored}
      isBannerFetching={bannerState.fetching}
      pagination={pagination}
      membershipInfo={membershipInfoStr}
      membershipLevels={membershipInfo}
      isAuthenticatedSession={isAuthenticatedSession}
    />
  );
};

export type { ViewProps, BalancesDashboardProps, TabState };
export default BalancesDashboard;
