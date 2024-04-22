import { CustomCurrencyType, formatCurrency } from 'utils/currency';
import Pagination from 'presentation-component/ui/pagination';
import LoadingPlaceholder from 'presentation-component/ui/loading-placeholder';
import NoContentPlaceholder, { NO_CONTENT_LOGO } from 'presentation-component/general/mobile/no-content-placeholder';
import TransactionHistoryTabCapsule from '../../sub-components/transaction-history-tab-capsule';
import Transaction, {
  TransactionViewType,
  isLixicoinTransaction,
  mapTransactionTypeToViewType
} from '../../sub-components/transaction';
import { ViewProps, ViewType } from '../../component';
import styles from './style.module.scss';

const View = ({
  viewType,
  availableBalance,
  availableCoin,
  transactions,
  pagination,
  isLoading,
  isErrored,
  onTabChange,
  onRetry
}: ViewProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.headerSection}>
        <TransactionHistoryTabCapsule
          icon="wallet"
          title="Số dư"
          value={formatCurrency(availableBalance)}
          isActive={viewType === ViewType.BALANCES}
          classes={{ container: styles.tabCapsule }}
          onClick={() => onTabChange?.(ViewType.BALANCES)}
        />
        <div className={styles.verticalDivider} />
        <TransactionHistoryTabCapsule
          icon="dollar"
          title="LixiCoin"
          value={formatCurrency(availableCoin)}
          isActive={viewType === ViewType.LIXICOIN}
          classes={{ container: styles.tabCapsule }}
          onClick={() => onTabChange?.(ViewType.LIXICOIN)}
        />
      </div>
      <div className={styles.transactionsSection}>
        {isLoading ? (
          Array.from({ length: 5 }).map((_, index) => (
            <LoadingPlaceholder key={index} className={styles.transactionSkeleton} />
          ))
        ) : isErrored ? (
          <NoContentPlaceholder
            title="Đã có lỗi xảy ra"
            info="Mã giới thiệu bị lỗi"
            logo={NO_CONTENT_LOGO.ROBOT}
            action={{ text: 'Thử lại' }}
            onClick={() => onRetry?.()}
            classes={{ container: styles.placeholder, logo: styles.logo }}
          />
        ) : !transactions?.length ? (
          <NoContentPlaceholder
            title="Không có kết quả nào"
            logo={NO_CONTENT_LOGO.SHIPMENT}
            classes={{ container: styles.placeholder, logo: styles.logo }}
          />
        ) : (
          transactions.map((transaction) => {
            const transactionViewType = mapTransactionTypeToViewType(transaction);
            const isCoinTransaction = isLixicoinTransaction(transaction);

            return (
              <Transaction
                key={transaction.id}
                title={transaction.message}
                id={transaction.order_number}
                timestamp={transaction.created_at}
                delta={`${transactionViewType === TransactionViewType.ADDITION ? '+' : ''}${formatCurrency(
                  transaction.amount || 0,
                  { suffix: isCoinTransaction ? CustomCurrencyType.LIXICOIN : true }
                )}`}
                currentValue={formatCurrency(transaction.amount_after || 0, {
                  suffix: isCoinTransaction ? CustomCurrencyType.LIXICOIN : true
                })}
                boxes={transaction.boxes || []}
                viewType={transactionViewType}
                icon={isCoinTransaction ? 'dollar' : 'wallet'}
              />
            );
          })
        )}
      </div>
      {!isLoading && !isErrored && !!transactions?.length && pagination?.totalPages && pagination?.totalPages > 1 && (
        <Pagination {...pagination} classes={{ container: styles.pagination }} />
      )}
    </div>
  );
};

export default View;
