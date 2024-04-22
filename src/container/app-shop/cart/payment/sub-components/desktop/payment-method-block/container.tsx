// TODO: Enable and verify tracking
import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

import SvgIcon from '../../../../../../../presentation-component/ui/icon';
import { PAYMENT_ICONS, PAYMENT_METHOD_TYPE } from '../../../../../../../constants/application/payment';
import { PAYMENT_PHASES } from '../../../../../../../constants/application/payment';
import { navigationTracking } from '../../../tracking';
import { usePrevious } from '../../../../../../../utils/hook';
import { generateTestId } from 'utils/test-utils';
import style from './style.module.scss';

const PaymentMethod = ({ method, method: { id, name, enabled }, selected, onSelect, onMouseEnter, onMouseLeave }) => {
  const methodIcon = PAYMENT_ICONS.find((method) => method.id === id);
  const methodIconName = methodIcon ? methodIcon.icon : 'color-visa';

  return (
    <div
      className={classNames(
        style.paymentMethod,
        selected && style.paymentMethodSelected,
        enabled || style.paymentMethodDisabled
      )}
      onClick={() => enabled && !selected && onSelect(id)}
      onMouseEnter={() => onMouseEnter(method)}
      onMouseLeave={() => onMouseLeave(method)}
    >
      <SvgIcon name={selected ? 'radio-checked' : 'radio-empty'} className={style.statusIcon} />
      <SvgIcon name={methodIconName} className={style.methodIcon} />
      <div className={style.name}>{name}</div>
    </div>
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
  const [collapsed, setCollapsed] = useState(true);
  const { available_payment_methods, payment_method } = cartDetail;
  const currentMethodId = payment_method || PAYMENT_METHOD_TYPE.COD.id;
  const currentMethod = available_payment_methods?.find((method) => method.code === currentMethodId && method.enabled);
  const enabledCurrentMethod = currentMethod && currentMethod.enabled ? currentMethod : null;
  const configureMethodHint = () =>
    enabledCurrentMethod
      ? setMethodHint({
          name: enabledCurrentMethod.name,
          message: enabledCurrentMethod.description,
          isMethodDisabled: false
        })
      : setMethodHint({ name: '', message: '', isMethodDisabled: false });
  const [methodHint, setMethodHint] = useState({ name: '', message: '', isMethodDisabled: false });
  useEffect(() => {
    setPaymentMethodReadiness(!!enabledCurrentMethod);
    configureMethodHint();
  }, [enabledCurrentMethod]);
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
        className={classNames(
          style.paymentMethodBlock,
          !addressReady && style.paymentMethodBlockCollapsed,
          isBlockValid || style.blockError
        )}
        onClick={() => {
          if (!addressReady) {
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });

            setPaymentHighlightErrorBlockAction({ blockId: PAYMENT_PHASES.address.id });
            setTimeout(() => {
              resetPaymentHighlightErrorBlockAction();
            }, 1500);

            return;
          }
        }}
        {...generateTestId({ name: 'payment-method-block' })}
      >
        <div
          className={style.header}
          onClick={(event) => {
            if (!addressReady) {
              return;
            }

            event.stopPropagation();
            setCollapsed((prevState) => !prevState);
          }}
          {...generateTestId({ name: 'payment-method-checkout' })}
        >
          <div className={style.status}>
            <SvgIcon name="wallet" className={style.icon} />
          </div>
          <div className={classNames(style.title, 'lineClamp1')}>
            PHƯƠNG THỨC THANH TOÁN
            {!!currentMethod?.name && (
              <>
                {' '}
                (<span>{currentMethod.name}</span>)
              </>
            )}
          </div>
          {addressReady && (
            <div className={style.action}>
              {collapsed ? 'Thay đổi' : <SvgIcon name="minus" className={style.icon} />}
            </div>
          )}
        </div>

        {addressReady && !collapsed && (
          <div className={style.body}>
            <div className={style.methods}>
              {available_payment_methods?.map((method) => (
                <PaymentMethod
                  key={method.id}
                  method={method}
                  selected={!!enabledCurrentMethod && method.code === enabledCurrentMethod.code}
                  onSelect={(methodId) => {
                    navigationTracking('block', 'Payment');
                    updatePaymentMethodAction({ paymentMethodId: methodId, enableFallbackAlert: true });
                  }}
                  onMouseEnter={(method) =>
                    setMethodHint({
                      name: method.name,
                      message: (method.enabled ? method.description : method.disable_reason) || '',
                      isMethodDisabled: !method.enabled
                    })
                  }
                  onMouseLeave={configureMethodHint}
                />
              ))}
            </div>
            {methodHint.name && methodHint.message ? (
              <>
                <div
                  className={classNames(
                    style.currentMethodNote,
                    methodHint.isMethodDisabled && style.hoveringMethodErrorNote
                  )}
                >
                  <span>{methodHint.name}:</span>
                  {methodHint.message}
                </div>
              </>
            ) : (
              <div className={classNames(style.currentMethodNote, style.hint)}>
                Vui lòng chọn phương thức thanh toán
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default PaymentMethodBlock;
