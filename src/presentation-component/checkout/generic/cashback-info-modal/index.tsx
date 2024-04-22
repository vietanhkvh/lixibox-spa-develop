import classNames from 'classnames';
import { isMobileVersion } from 'utils';
import { formatCurrency } from 'utils/currency';
import StickyActionButton from 'components/ui/sticky-action-button';
import GeneralModal from 'presentation-component/modal/general-modal';
import PriceSegment from 'presentation-component/checkout/generic/price-segment';
import styles from './style.module.scss';

interface CashbackInfoModalProps {
  isOpen: boolean;
  totalBalance: number;
  cashbackRedeemPercentage: number;
  onRequestClose: () => void;
}

const CashbackInfoModal = ({
  isOpen,
  totalBalance,
  cashbackRedeemPercentage,
  onRequestClose
}: CashbackInfoModalProps) => {
  return (
    <GeneralModal
      isOpen={isOpen}
      title={'Chi tiết về số dư'}
      leftTitle=""
      rightIcon={'close'}
      className={classNames(styles.cashbackInfoModal, !isMobileVersion() && styles.cashbackInfoModalDesktop)}
      testId={{ name: 'cashback-info-modal' }}
      onRightActionClick={() => onRequestClose()}
      onRequestClose={() => onRequestClose()}
    >
      <div className={styles.body}>
        <PriceSegment
          label={'Dùng số dư'}
          value={formatCurrency(totalBalance, { suffix: true })}
          classes={{ container: styles.balanceSection }}
        />
        <div className={styles.dashedDivider} />
        <div className={styles.descriptionSection}>
          <div className={styles.title}>THÔNG TIN CHI TIẾT</div>
          <div className={styles.content}>
            <div className={styles.paragraph}>
              Số dư là đơn vị tiền tệ tại Lixibox, được dùng để giảm giá cho đơn hàng tại bước thanh toán.
            </div>
            <div className={styles.spacing} />
            <div className={styles.paragraph}>Cách để sử dụng số dư:</div>
            <div className={styles.paragraph}>- Bật nút “Dùng số dư” để sử dụng.</div>
            {!!cashbackRedeemPercentage && (
              <div className={styles.paragraph}>
                - Giảm trực tiếp {cashbackRedeemPercentage}% trên giá trị đơn hàng.
              </div>
            )}
            <div className={styles.spacing} />
            <div className={styles.paragraph}>Cách để nhận số dư:</div>
            <div className={styles.paragraph}>- Mua hàng tại Lixibox và tích luỹ số dư hoàn tiền.</div>
          </div>
        </div>
      </div>
      <StickyActionButton
        action={{ text: 'Xác nhận' }}
        buttonClass={styles.primaryButton}
        onClick={() => onRequestClose()}
      />
    </GeneralModal>
  );
};

export default CashbackInfoModal;
