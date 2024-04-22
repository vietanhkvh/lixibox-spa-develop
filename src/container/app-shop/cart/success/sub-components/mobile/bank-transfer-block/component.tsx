import { useState } from 'react';
import classNames from 'classnames';

import { generateTestId } from 'utils/test-utils';
import MobileConfirmation from '../../../../../../../components/ui/mobile-confirmation';
import TransferDetails from '../../generic/transfer-details';
import CODSuggestion from '../../generic/cod-suggestion';
import style from './style.module.scss';

const CONFIRMATION_TYPE = Object.freeze({
  CONVERT_PAYMENT_TO_COD: 'CONVERY_PAYMENT_TO_COD'
});

interface BankTransferBlockProps {
  className: string;

  cartStore: any;
  copyTextToClipboard: (text: string) => any;
  onClickCODPayment: ({ orderNumber }: { orderNumber: string }) => any;
}
const BankTransferBlock = ({
  className,
  cartStore: {
    constants: { bank_account },
    orderInfo: { number, total_price, payment_qr }
  },
  onClickCODPayment,
  copyTextToClipboard
}: BankTransferBlockProps) => {
  const [confirmationState, setConfirmationState] = useState<any>({
    visibility: false,
    title: 'Đổi phương thức thanh toán',
    prompt:
      'Bạn sẽ thanh toán bằng tiền mặt cho nhân viên khi giao hàng.\nVui lòng kiểm tra số lượng, tình trạng sản phẩm và số tiền trong đơn hàng khi thanh toán.',
    button: { text: 'Xác nhận', icon: '' },
    data: { type: CONFIRMATION_TYPE.CONVERT_PAYMENT_TO_COD }
  });
  const updateConfirmationState = (stateUpdate) =>
    setConfirmationState((prevState) => Object.assign({}, prevState, stateUpdate));

  return (
    <div
      className={classNames(style.bankTransferBlock, className)}
      {...generateTestId({ name: 'bank-transfer-block' })}
    >
      <TransferDetails
        bankAccount={bank_account}
        order={{ number, price: total_price, paymentQr: payment_qr }}
        onCopyTextToClipboard={copyTextToClipboard}
      />
      <CODSuggestion onClickCODPayment={() => updateConfirmationState({ visibility: true })} />
      <MobileConfirmation
        isOpen={confirmationState.visibility}
        title={confirmationState.title}
        prompt={confirmationState.prompt}
        confirmationButton={confirmationState.button}
        data={confirmationState.data}
        classes={{ prompt: style.promptText, button: style.promptPrimaryButton }}
        onCancel={() => updateConfirmationState({ visibility: false })}
        onConfirm={({ type }) => {
          switch (type) {
            case CONFIRMATION_TYPE.CONVERT_PAYMENT_TO_COD:
              onClickCODPayment({ orderNumber: number });
              break;
          }
          updateConfirmationState({ visibility: false });
        }}
      />
    </div>
  );
};
BankTransferBlock.defaultProps = {
  className: ''
};

export default BankTransferBlock;
