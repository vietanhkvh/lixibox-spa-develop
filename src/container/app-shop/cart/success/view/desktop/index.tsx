import Invitation from '../../../../../../components/invitation';
import { reportException } from '../../../../../../tracking/sentry';
import { ORDER_TYPE } from '../../../../../../constants/application/order';
import { PAYMENT_METHOD_TYPE } from '../../../../../../constants/application/payment';
import { generateTestId } from 'utils/test-utils';
import OrderInfoBlock from '../../sub-components/generic/order-info';
import BankTransferBlock from '../../sub-components/desktop/bank-transfer-block';

import STYLE from '../style';
import styles from './style.module.scss';
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
      <div className={styles.checkoutSuccess} style={STYLE.container} {...generateTestId({ name: 'cart-success' })}>
        <OrderInfoBlock />
        {bankTransferBlockVisible && <BankTransferBlock />}
        <Invitation classes={{ container: styles.invitationBlock, scoop: styles.scoopClass }} />
      </div>
    );
  } catch (e) {
    reportException(e, { info: 'Container: Checkout / Success | View | renderComponent |' });
    return null;
  }
}

export default renderComponent;
