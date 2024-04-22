import AuthModalBlock from 'components/auth-modal-block/desktop';
import { IState, IProps } from '../../model';

import { generateTestId } from 'utils/test-utils';
import PricingBreakdown from 'presentation-component/checkout/generic/pricing-breakdown';
import AddressBlock from 'container/app-shop/cart/general/address-block';
import DeliveryMethodBlock from '../../sub-components/mobile/delivery-method-block';
import PaymentMethodBlock from '../../sub-components/mobile/payment-method-block';
import GiftNoteBlock from '../../sub-components/mobile/gift-note-block';
import InvoiceBlock from '../../sub-components/mobile/invoice-block';
import DeliveryNoteBlock from '../../sub-components/mobile/delivery-note-block';
import CartContentPreview from './cart-content-preview';
import style from './style.module.scss';

const renderView = ({ props, state, onRequestModalClose }) => {
  const {
    location,
    cartStore: { cartDetail }
  } = props as IProps;

  const { isAuthModalOpen } = state as IState;

  return (
    <div className={style.checkoutDeliveryContainer} {...generateTestId({ name: 'payment-container' })}>
      {Object.keys(cartDetail).length && (
        <>
          <AddressBlock />
          <DeliveryMethodBlock />
          <GiftNoteBlock />
          <PaymentMethodBlock />
          <InvoiceBlock />
          <DeliveryNoteBlock />
          {<CartContentPreview content={cartDetail.cart_items} />}
          <PricingBreakdown className={style.pricingBreakdown} />
        </>
      )}
      <AuthModalBlock isOpen={isAuthModalOpen} onRequestClose={onRequestModalClose} referrer={location.pathname} />
    </div>
  );
};

export default renderView;
