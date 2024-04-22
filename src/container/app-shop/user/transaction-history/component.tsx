import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { isMobileVersion, objectToHash } from 'utils';
import { usePaginationState } from 'utils/hook/pagination';
import { UserTransaction } from 'flows/user/types';
import { ROUTING_USER_TRANSACTIONS_BALANCE, ROUTING_USER_TRANSACTIONS_LIXICOIN } from 'routings/path';
import { Pagination } from 'types/paging';
import DesktopView from './view/desktop';
import MobileView from './view/mobile';
import { PropsFromRedux } from './store';
import { usePrevious } from 'utils/hook';

const ViewType = {
  LIXICOIN: 'lixicoin' as const,
  BALANCES: 'balances' as const,
  ALL: 'all' as const
};
type ViewTypeType = (typeof ViewType)[keyof typeof ViewType];
interface ViewProps {
  viewType: ViewTypeType;
  availableBalance: number;
  availableCoin: number;
  transactions: UserTransaction[];
  pagination: Pagination;
  isLoading: boolean;
  isErrored: boolean;
  onTabChange?: (viewType: ViewTypeType) => void;
  onRetry?: () => void;
}
interface TransactionHistoryProps extends PropsFromRedux {
  perPage?: number;
}
const TransactionHistory = ({
  perPage,
  authStore: { userInfo },
  userStore: { fetchUserTransactions, userTransactionList },
  fetchUserTransactionsAction
}: TransactionHistoryProps) => {
  const history = useHistory();
  /**
   * Derives viewType from pathname
   *
   * FIXME:
   * This should be moved to router and passed as a prop, but, currently,
   * using an arrow function in the `component` prop of `AuthenticatedRoute`
   * causing multiple renders. This section should be refactored after this
   * issue is fixed
   */
  const location = useLocation();
  let viewType: ViewTypeType = ViewType.ALL;
  if (location.pathname === ROUTING_USER_TRANSACTIONS_LIXICOIN) {
    viewType = ViewType.LIXICOIN;
  } else if (location.pathname === ROUTING_USER_TRANSACTIONS_BALANCE) {
    viewType = ViewType.BALANCES;
  }

  const type = viewType === ViewType.BALANCES ? 'balance' : viewType === ViewType.LIXICOIN ? 'lixicoin' : '';
  const prevType = usePrevious(type);
  const [pagination, { setTotalPages, setCurrentPage }] = usePaginationState({ perPage });
  const [transactions, setTransactions] = useState<UserTransaction[]>([]);
  useEffect(() => {
    if (fetchUserTransactions.processing) return;
    let _page = pagination.currentPage;
    if (prevType !== type) {
      _page = 1;
      setCurrentPage(_page);
    }
    fetchUserTransactionsAction({ type, page: _page, perPage: pagination.perPage });
  }, [pagination.currentPage, pagination.perPage, type, prevType]);
  useEffect(() => {
    const retrievedPageableTransactions =
      userTransactionList[objectToHash({ page: pagination.currentPage, perPage: pagination.perPage, type })];
    if (retrievedPageableTransactions) {
      retrievedPageableTransactions?.transactions && setTransactions(retrievedPageableTransactions.transactions);
      retrievedPageableTransactions?.paging && setTotalPages(retrievedPageableTransactions?.paging.total_pages || 1);
    }
  }, [userTransactionList, pagination, type]);

  const View = isMobileVersion() ? MobileView : DesktopView;
  return !viewType ? null : (
    <View
      viewType={viewType}
      availableBalance={userInfo?.balance || 0}
      availableCoin={userInfo?.coins || 0}
      transactions={transactions}
      pagination={pagination}
      isLoading={fetchUserTransactions.processing}
      isErrored={fetchUserTransactions.errored}
      onTabChange={(viewType) =>
        history.push(
          viewType === ViewType.LIXICOIN ? ROUTING_USER_TRANSACTIONS_LIXICOIN : ROUTING_USER_TRANSACTIONS_BALANCE
        )
      }
      onRetry={() => {
        fetchUserTransactionsAction({ type, page: pagination.currentPage, perPage: pagination.perPage });
      }}
    />
  );
};
TransactionHistory.defaultProps = {
  perPage: 20
};

export type { ViewProps, TransactionHistoryProps, ViewTypeType };
export { ViewType };
export default TransactionHistory;
