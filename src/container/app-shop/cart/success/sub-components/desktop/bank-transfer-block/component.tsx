import classNames from 'classnames';

import { CDN_ASSETS_PREFIX } from '../../../../../../../utils/uri';
import { generateTestId } from 'utils/test-utils';
import TransferDetails from '../../generic/transfer-details';
import style from './style.module.scss';

const orderInfoBackground = CDN_ASSETS_PREFIX('/checkout/done.jpg');

interface BankTransferBlockProps {
  className: string;

  cartStore: any;
  copyTextToClipboard: (text: string) => any;
}
const BankTransferBlock = ({
  className,
  cartStore: {
    constants: { bank_account },
    orderInfo: { number, total_price, payment_qr }
  },
  copyTextToClipboard
}: BankTransferBlockProps) => {
  return (
    <div
      className={classNames(style.bankTransferBlock, className)}
      style={{ backgroundImage: `url(${orderInfoBackground})` }}
      {...generateTestId({ name: 'bank-transfer-block' })}
    >
      <TransferDetails
        bankAccount={bank_account}
        order={{ number, price: total_price, paymentQr: payment_qr }}
        onCopyTextToClipboard={copyTextToClipboard}
        className={style.transferDetails}
      />
    </div>
  );
};
BankTransferBlock.defaultProps = {
  className: ''
};

export default BankTransferBlock;
