import { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';

import GeneralModal from '../../../../../../../presentation-component/modal/general-modal';
import SvgIcon from '../../../../../../../presentation-component/ui/icon';
import { PAYMENT_METHOD_TYPE, PAYMENT_PHASES } from '../../../../../../../constants/application/payment';
import { usePrevious } from '../../../../../../../utils/hook';
import { generateTestId } from 'utils/test-utils';
import { PAYMENT_ICONS } from '../../../../../../../constants/application/payment';
import { navigationTracking } from '../../../tracking';
import style from './style.module.scss';

const PaymentMethodEntry = ({ method: { description, id, name, enabled, disable_reason }, selected, onClick }) => {
  const methodIcon = PAYMENT_ICONS.find((method) => method.id === id);
  const methodIconName = methodIcon ? methodIcon.icon : 'color-visa';

  return (
    <div
      className={classNames(
        style.paymentMethodEntry,
        selected && style.paymentMethodEntrySelected,
        enabled || style.paymentMethodEntryDisabled
      )}
      onClick={() => enabled && !selected && onClick(id)}
      {...generateTestId({ name: 'payment-method-entry', id })}
    >
      <div className={style.header}>
        <div className={style.iconContainer}>
          <SvgIcon name={methodIconName} className={style.icon} />
        </div>
        <div className={style.title}>{name}</div>
      </div>
      <div className={style.brief}>
        <div className={style.description}>{description}</div>
        {!enabled && (
          <div className={style.notification}>
            {disable_reason || 'Đơn hàng của bạn không đủ điều kiện để sử dụng phương thức nay'}
          </div>
        )}
      </div>
    </div>
  );
};

interface ModalProps {
  methods: Array<any>;
  currentMethod: any;
  isOpen: boolean;
  onSubmit: (val: string) => any;
  onRequestClose: () => any;
}

const PaymentMethodModal = ({ methods, currentMethod, isOpen, onSubmit, onRequestClose }: ModalProps) => {
  return (
    <GeneralModal
      isOpen={isOpen}
      title={'Phương thức thanh toán'}
      leftTitle=""
      rightIcon={'close'}
      className={style.paymentMethodModal}
      testId={{ name: 'payment-method-modal' }}
      onRightActionClick={() => onRequestClose()}
      onRequestClose={() => onRequestClose()}
    >
      <div className={style.body}>
        {methods.map((method) => (
          <PaymentMethodEntry
            key={method.id}
            method={method}
            selected={!!currentMethod && method.code === currentMethod.code}
            onClick={(id) => onSubmit(id)}
          />
        ))}
      </div>
    </GeneralModal>
  );
};

interface IProps {
  cartStore: any;
  checkout: (data: any) => any;
  updatePaymentMethodAction: (data: any) => any;
  setPaymentMethodReadiness: (readiness: boolean) => any;
  setPaymentHighlightErrorBlockAction: (data: any) => any;
  resetPaymentHighlightErrorBlockAction: () => any;
}

const PaymentMethodBlock = ({
  cartStore: {
    cartDetail,
    phaseReadiness: {
      payment: { address: addressReady }
    },
    paymentHighlightErrorBlock
  },
  updatePaymentMethodAction,
  setPaymentMethodReadiness,
  setPaymentHighlightErrorBlockAction,
  resetPaymentHighlightErrorBlockAction
}: IProps) => {
  const { available_payment_methods, payment_method } = cartDetail;
  const currentMethodId = payment_method || PAYMENT_METHOD_TYPE.COD.id;
  const [isModalOpen, setModalVisibility] = useState(false);
  const currentMethod = () =>
    available_payment_methods &&
    available_payment_methods.find((method) => method.code === currentMethodId && method.enabled);
  const enabledCurrentMethod = () => {
    const _currentMethod = currentMethod();
    return _currentMethod && _currentMethod.enabled ? _currentMethod : null;
  };
  useEffect(() => {
    setPaymentMethodReadiness(!!enabledCurrentMethod());
  }, [enabledCurrentMethod()]);
  const prevPaymentHighlightErrorBlock = usePrevious(paymentHighlightErrorBlock);
  const blockRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    prevPaymentHighlightErrorBlock !== PAYMENT_PHASES.paymentMethod.id &&
      paymentHighlightErrorBlock === PAYMENT_PHASES.paymentMethod.id &&
      blockRef.current &&
      blockRef.current.scrollIntoView({ block: 'center', behavior: 'smooth' });
  }, [paymentHighlightErrorBlock]);
  const isBlockValid = paymentHighlightErrorBlock !== PAYMENT_PHASES.paymentMethod.id;

  return (
    <>
      <div
        id={PAYMENT_PHASES.paymentMethod.id}
        ref={blockRef}
        className={classNames(style.paymentMethodBlock, isBlockValid || style.blockError)}
        onClick={() => {
          if (!addressReady) {
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
            setPaymentHighlightErrorBlockAction({ blockId: PAYMENT_PHASES.address.id });
            setTimeout(() => {
              resetPaymentHighlightErrorBlockAction();
            }, 1500);
            return;
          }
          navigationTracking('block', 'Payment');
          setModalVisibility(true);
        }}
        {...generateTestId({ name: 'payment-method-block' })}
      >
        <div className={style.header}>
          <div className={style.status}>
            <SvgIcon name="wallet" className={style.icon} />
          </div>
          <div className={classNames(style.title, 'lineClamp1')}>Phương thức thanh toán</div>
          {addressReady && (
            <div className={style.action}>
              <SvgIcon name="angle-right" className={style.icon} />
            </div>
          )}
        </div>
        {addressReady && !!enabledCurrentMethod() && (
          <div className={style.brief}>
            <div className={classNames(style.preview, 'lineClamp1')}>{enabledCurrentMethod().name}</div>
          </div>
        )}
      </div>
      {addressReady && available_payment_methods && (
        <PaymentMethodModal
          isOpen={isModalOpen}
          methods={available_payment_methods}
          currentMethod={enabledCurrentMethod()}
          onSubmit={(methodId) => {
            updatePaymentMethodAction({ paymentMethodId: methodId, enableFallbackAlert: true });
            setModalVisibility(false);
          }}
          onRequestClose={() => setModalVisibility(false)}
        />
      )}
    </>
  );
};

export default PaymentMethodBlock;
