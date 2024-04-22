import { reportException } from '../../../../../../tracking/sentry';
import { PAYMENT_METHOD_TYPE } from '../../../../../../constants/application/payment';
import { ORDER_TYPE } from '../../../../../../constants/application/order';
import Invitation from '../../../../../../components/invitation';
import { generateTestId } from 'utils/test-utils';
import OrderInfoBlock from '../../sub-components/generic/order-info';
import BankTransferBlock from '../../sub-components/mobile/bank-transfer-block';
import style from './style.module.scss';
import { IProps } from '../../model';

function renderComponent({ props }) {
  try {
    const {
      cartStore: {
        orderInfo: { payment_method, status }
      }
    } = props as IProps;

    const bankTransferBlockVisible = payment_method === PAYMENT_METHOD_TYPE.BANK.id && status === ORDER_TYPE.UNPAID;

    return (
      <>
        <div className={style.checkoutSuccess} {...generateTestId({ name: 'cart-success' })}>
          <OrderInfoBlock />
          {bankTransferBlockVisible && <BankTransferBlock />}
          <Invitation classes={{ container: style.invitationBlock }} />
        </div>
      </>
    );
  } catch (e) {
    reportException(e, { info: 'Container: Checkout / Success | View | renderComponent |' });
    return null;
  }
}

export default renderComponent;
