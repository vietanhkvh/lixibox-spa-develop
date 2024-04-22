import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { SIGN_IN_STATE } from 'constants/application/global';
import { BalanceAndLixicoinDashboardTab } from 'constants/application/user-transaction';
import { ConstantsState } from 'flows/cart/types';
import { MembershipLevel } from 'flows/lixicoin/types';
import { ROUTING_REDEEM_PATH, ROUTING_USER_TRANSACTIONS_LIXICOIN } from 'routings/path';
import { User } from 'types/api/auth';
import { ProductBox } from 'types/api/shop';
import { TabParams } from 'types/generic';
import { Pagination } from 'types/paging';
import { isMobileVersion } from 'utils';
import { CustomCurrencyType, formatCurrency } from 'utils/currency';
import { usePaginationState } from 'utils/hook/pagination';
import { getTotalPages, readPage } from 'utils/page';

import { PropsFromRedux } from './store';
import DesktopView from './view/desktop';
import MobileView from './view/mobile';

interface TabState extends TabParams {
  selected?: boolean;
}
interface ViewProps {
  user: User;
  coinsExpireAt: number;
  tabs: Array<TabState>;
  onTabSwitch?: (tab: any) => void;
  boxes?: ProductBox[];
  isBoxesLoading: boolean;
  isBoxesLoadingFailed: boolean;
  pagination: Pagination;
  membershipInfo: string;
  isAuthenticatedSession: boolean;
  earnRate?: number;
  isEarningInstructionLoading: boolean;
  constants: ConstantsState;
  onRedeemClick?: () => void;
  onTransactionsLinkClick?: () => void;
  membershipLevels: MembershipLevel[];
}
interface LixicoinDashboardProps extends PropsFromRedux {}
const LixicoinDashboard = ({
  authStore: { signInStatus, profile: user },
  cartStore: { constants, isFetchingConfig },
  lixicoinStore: { membershipInfo, isFetchMembershipInfo },
  shopStore: { redeemable },
  userStore: { userMembershipInfo, isFetchUserMembershipInfo },
  fetchRedeemLatestBoxesAction,
  fetchUserProfileAction,
  getMembershipAction,
  getUserMembershipAction
}: LixicoinDashboardProps) => {
  const isAuthenticatedSession = signInStatus === SIGN_IN_STATE.LOGIN_SUCCESS;
  const boxesPerPage = 12;
  const earnRate = membershipInfo?.[user?.membership_level]?.benefits?.lixicoin_earn_rate;
  const history = useHistory();
  const [pagination, { setTotalPages }] = usePaginationState({ perPage: boxesPerPage });
  const totalPages = getTotalPages({ pageable: redeemable?.latest, perPage: boxesPerPage }) || 1;
  const boxes = readPage({
    pageable: redeemable?.latest,
    page: pagination.currentPage,
    perPage: boxesPerPage
  }) as ProductBox[];
  const [tabs] = useState<Array<TabState>>([
    { ...BalanceAndLixicoinDashboardTab.BALANCE, selected: false },
    { ...BalanceAndLixicoinDashboardTab.LIXICOIN, selected: true },
    { ...BalanceAndLixicoinDashboardTab.MEMBERSHIP, selected: false }
  ]);
  const [membershipInfoStr, setMembershipInfoStr] = useState('');
  useEffect(() => {
    getMembershipAction();
  }, []);
  useEffect(() => {
    if (isAuthenticatedSession) {
      if (!user) {
        fetchUserProfileAction();
      }
      getUserMembershipAction();
    }
  }, [isAuthenticatedSession]);
  useEffect(() => {
    fetchRedeemLatestBoxesAction({ page: pagination.currentPage, perPage: boxesPerPage });
  }, [pagination.currentPage, pagination.perPage]);
  useEffect(() => {
    totalPages && setTotalPages(totalPages);
  }, [totalPages]);
  useEffect(() => {
    if (membershipInfo && user) {
      const info = earnRate
        ? `Nhận được ${formatCurrency(earnRate, { suffix: CustomCurrencyType.LIXICOIN })} cho mỗi ${formatCurrency(
            1000,
            { suffix: true }
          )} khi mua hàng.`
        : '';
      info && setMembershipInfoStr(info);
    }
  }, [earnRate, user]);

  const isEarningInstructionLoading = isFetchingConfig || isFetchMembershipInfo || isFetchUserMembershipInfo;

  const View = isMobileVersion() ? MobileView : DesktopView;
  return (
    <View
      user={user}
      coinsExpireAt={userMembershipInfo?.lixicoins_expired_at}
      tabs={tabs}
      onTabSwitch={(tab) => history.push(tab?.path || '#')}
      boxes={boxes}
      isBoxesLoading={redeemable?.latest?.fetching}
      isBoxesLoadingFailed={redeemable?.latest?.errored}
      pagination={pagination}
      membershipInfo={membershipInfoStr}
      membershipLevels={membershipInfo}
      isAuthenticatedSession={isAuthenticatedSession}
      constants={constants}
      earnRate={earnRate}
      isEarningInstructionLoading={isEarningInstructionLoading}
      onRedeemClick={() => history.push(ROUTING_REDEEM_PATH)}
      onTransactionsLinkClick={() => history.push(ROUTING_USER_TRANSACTIONS_LIXICOIN)}
    />
  );
};

export type { ViewProps, LixicoinDashboardProps, TabState };
export default LixicoinDashboard;
