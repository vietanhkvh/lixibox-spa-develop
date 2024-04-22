import { useState } from 'react';
import classNames from 'classnames';

import CODSuggestion from '../../generic/cod-suggestion';
import InlineConfirmation from '../../../../../../../presentation-component/general/desktop/inline-confirmation';
import { generateTestId } from 'utils/test-utils';
import style from './style.module.scss';

const CONFIRMATION_TYPE = Object.freeze({
  CONVERT_PAYMENT_TO_COD: 'CONVERY_PAYMENT_TO_COD'
});

interface CODSuggestionBlockProps {
  className: string;

  cartStore: any;
  copyTextToClipboard: (text: string) => any;
  onClickCODPayment: ({ orderNumber: string }) => any;
}
const CODSuggestionBlock = ({
  className,
  cartStore: {
    orderInfo: { number }
  },
  onClickCODPayment
}: CODSuggestionBlockProps) => {
  const [confirmationState, setConfirmationState] = useState<any>({
    visibility: false,
    title: 'Đổi phương thức thanh toán?',
    button: { text: 'Xác nhận', icon: '' },
    data: { type: CONFIRMATION_TYPE.CONVERT_PAYMENT_TO_COD }
  });
  const updateConfirmationState = (stateUpdate) =>
    setConfirmationState((prevState) => Object.assign({}, prevState, stateUpdate));

  return (
    <div
      className={classNames(style.bankTransferBlock, className)}
      {...generateTestId({ name: 'cod-suggestion-block' })}
    >
      <CODSuggestion onClickCODPayment={() => updateConfirmationState({ visibility: true })} />
      <InlineConfirmation
        promptMessage={confirmationState.title}
        className={style.confirmationPrompt}
        visible={confirmationState.visibility}
        confirmationAction={{
          title: 'Xác nhận',
          icon: '',
          onClick: () => {
            onClickCODPayment({ orderNumber: number });
            updateConfirmationState({ visibility: false });
          }
        }}
        cancelAction={{ title: 'Huỷ', icon: '', onClick: () => updateConfirmationState({ visibility: false }) }}
      />
    </div>
  );
};
CODSuggestionBlock.defaultProps = {
  className: ''
};

export default CODSuggestionBlock;
