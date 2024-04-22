import { isMobileVersion } from 'utils';
import GeneralModal from 'presentation-component/modal/general-modal';
import GiftNoteBlock from 'container/app-shop/cart/payment/sub-components/mobile/gift-note-block';
import DeliveryNoteBlock from 'container/app-shop/cart/payment/sub-components/mobile/delivery-note-block';
import InvoiceBlock from 'container/app-shop/cart/payment/sub-components/mobile/invoice-block';
import styles from './style.module.scss';
import classNames from 'classnames';

interface ServicesModalProps {
  isOpen: boolean;
  onRequestClose?: () => void;
}
const ServicesModal = ({ isOpen, onRequestClose }: ServicesModalProps) => {
  return (
    <>
      <GeneralModal
        isOpen={isOpen}
        title={'Khác (xuất hoá đơn, gói quà, ghi chú...)'}
        leftTitle=""
        rightIcon={'close'}
        className={classNames(styles.servicesModal, !isMobileVersion() && styles.servicesModalDesktop)}
        testId={{ name: 'services-method-modal' }}
        onRightActionClick={() => onRequestClose?.()}
        onRequestClose={() => onRequestClose?.()}
      >
        <div className={styles.body}>
          <GiftNoteBlock />
          <InvoiceBlock />
          <DeliveryNoteBlock />
        </div>
      </GeneralModal>
    </>
  );
};

export default ServicesModal;
