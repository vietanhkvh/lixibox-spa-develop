import { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';

import MobileConfirmation from '../../../../../../../components/ui/mobile-confirmation';
import SvgIcon from '../../../../../../../presentation-component/ui/icon';
import { PAYMENT_PHASES } from '../../../../../../../constants/application/payment';
import { usePrevious } from '../../../../../../../utils/hook';
import { generateTestId } from 'utils/test-utils';
import { navigationTracking } from '../../../tracking';
import InvoiceFormModal from './invoice-form-modal';
import style from './style.module.scss';

const CONFIRMATION_TYPE = Object.freeze({
  INVOICE_REMOVE: 'INVOICE_REMOVE'
});

interface IProps {
  cartStore: any;
  fetchRecentInvoiceAction: () => any;
  fetchCartInvoiceAction: () => any;
  updateInvoiceAction: (data: any) => any;
  deleteInvoiceAction: () => any;
}

const InvoiceBlock = ({
  cartStore: {
    cartDetail: { invoice_requested },
    invoice: { info: invoice },
    phaseReadiness: {
      payment: { address: addressReady }
    },
    paymentHighlightErrorBlock
  },
  fetchCartInvoiceAction,
  fetchRecentInvoiceAction,
  updateInvoiceAction,
  deleteInvoiceAction
}: IProps) => {
  const [primaryModalVisibility, setPrimaryModalVisibility] = useState(false);
  const [confirmationState, setConfirmationState] = useState<any>({
    visibility: false,
    title: 'Hủy xuất hóa đơn',
    prompt: 'Bạn có muốn hủy yêu cầu xuất hóa đơn?',
    button: { text: 'Xác nhận', icon: 'trash' },
    data: { type: CONFIRMATION_TYPE.INVOICE_REMOVE }
  });
  const updateConfirmationState = (stateUpdate) =>
    setConfirmationState((prevState) => Object.assign({}, prevState, stateUpdate));
  useEffect(() => {
    invoice_requested ? fetchCartInvoiceAction() : fetchRecentInvoiceAction();
  }, []);
  const prevPaymentHighlightErrorBlock = usePrevious(paymentHighlightErrorBlock);
  const blockRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    prevPaymentHighlightErrorBlock !== PAYMENT_PHASES.invoice.id &&
      paymentHighlightErrorBlock === PAYMENT_PHASES.invoice.id &&
      blockRef.current &&
      blockRef.current.scrollIntoView({ block: 'center', behavior: 'smooth' });
  }, [paymentHighlightErrorBlock]);
  const isBlockValid = paymentHighlightErrorBlock !== PAYMENT_PHASES.invoice.id;
  const hasInvoice = invoice.code && invoice.name && invoice.address && invoice.email && invoice_requested;

  return (
    <>
      <div
        id={PAYMENT_PHASES.invoice.id}
        ref={blockRef}
        className={classNames(style.invoiceBlock, isBlockValid || style.blockError)}
        onClick={() => {
          if (!addressReady) {
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
            return;
          }
          navigationTracking('block', 'Invoice');
          setPrimaryModalVisibility(true);
        }}
        {...generateTestId({ name: 'invoice-block' })}
      >
        <div className={style.header}>
          <div
            className={style.status}
            onClick={(event) => {
              event.stopPropagation();
              if (!addressReady) {
                window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                return;
              }
              hasInvoice ? updateConfirmationState({ visibility: true }) : setPrimaryModalVisibility(true);
            }}
          >
            <SvgIcon name={hasInvoice ? 'checkbox-checked' : 'checkbox-empty'} className={style.icon} />
          </div>
          <div className={style.title}>THÔNG TIN XUẤT HOÁ ĐƠN</div>
          {hasInvoice && <div className={style.action}>Thay đổi</div>}
        </div>

        {hasInvoice && (
          <div className={style.preview}>
            <div className={style.segment}>{invoice.name}</div>
            <div className={style.segment}>{`Mã số thuế: ${invoice.code}`}</div>
            <div className={style.segment}>{invoice.address}</div>
          </div>
        )}
      </div>
      <InvoiceFormModal
        isOpen={primaryModalVisibility}
        onSubmit={(formData) => {
          updateInvoiceAction(formData);
          setPrimaryModalVisibility(false);
        }}
        onRequestClose={() => setPrimaryModalVisibility(false)}
      />
      <MobileConfirmation
        isOpen={confirmationState.visibility}
        title={confirmationState.title}
        prompt={confirmationState.prompt}
        confirmationButton={confirmationState.button}
        data={confirmationState.data}
        testId={{ name: 'invoice-confirmation-modal' }}
        onCancel={() => updateConfirmationState({ visibility: false })}
        onConfirm={({ type }) => {
          switch (type) {
            case CONFIRMATION_TYPE.INVOICE_REMOVE:
              deleteInvoiceAction();
              break;
          }
          updateConfirmationState({ visibility: false });
        }}
      />
    </>
  );
};

export default InvoiceBlock;
