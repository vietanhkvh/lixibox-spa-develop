import { generateTestId } from 'utils/test-utils';
import AuthModalBlock from '../../../../../../components/auth-modal-block/desktop';
import { IState, IProps } from '../../model';
import GiftNoteBlock from '../../sub-components/desktop/gift-note-block';
import DeliveryMethodBlock from '../../sub-components/desktop/delivery-method-block';
import DeliveryNoteBlock from '../../sub-components/desktop/delivery-note-block';
import PaymentMethodBlock from '../../sub-components/desktop/payment-method-block';
import InvoiceBlock from '../../sub-components/desktop/invoice-block';
import AddressBlock from 'container/app-shop/cart/general/address-block';
import style from './style.module.scss';

const renderView = ({ props, state, onRequestModalClose }) => {
  const { location } = props as IProps;

  const { isAuthModalOpen } = state as IState;

  return (
    <div className={style.checkoutDeliveryContainer} {...generateTestId({ name: 'payment-container' })}>
      <AddressBlock />
      <DeliveryMethodBlock />
      <GiftNoteBlock />
      <PaymentMethodBlock />
      <InvoiceBlock />
      <DeliveryNoteBlock />
      <AuthModalBlock isOpen={isAuthModalOpen} onRequestClose={onRequestModalClose} referrer={location.pathname} />
    </div>
  );
};

export default renderView;
