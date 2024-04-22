import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

import SvgIcon from '../../../../../../../presentation-component/ui/icon';
import { formatCurrency } from '../../../../../../../utils/currency';
import { usePrevious } from '../../../../../../../utils/hook';
import { formatEstimatedShippingTimeline } from '../../../../../../../utils/time';
import { generateTestId } from 'utils/test-utils';
import { SHIPPING_TYPE } from '../../../../../../../constants/application/shipping';
import { PAYMENT_PHASES } from '../../../../../../../constants/application/payment';
import { navigationTracking } from '../../../tracking';
import style from './style.module.scss';
import Loading from 'components/ui/loading';

const DeliveryMethodEntry = ({ method, selected, onClick }) => {
  const { code, name, enabled, disable_reason, price } = method;
  const estimatedShipping = formatEstimatedShippingTimeline({
    min: method.time.min,
    max: method.time.max,
    isSameDayShipping: method.code === SHIPPING_TYPE.SAME_DAY
  });

  return (
    <div
      className={classNames(
        style.deliveryMethodEntry,
        selected && style.deliveryMethodEntrySelected,
        enabled || style.deliveryMethodEntryDisabled
      )}
      onClick={() => enabled && !selected && onClick(code)}
      {...generateTestId({ name: 'delivery-method-entry' })}
    >
      <div className={style.header}>
        <div className={style.iconContainer}>
          <SvgIcon
            name={selected ? 'radio-checked' : 'radio-empty'}
            className={classNames(style.icon, selected && style.iconSelected)}
          />
        </div>
        <div className={style.title}>
          {name}
          {price ? (
            <span className={style.paid}>{formatCurrency(price, { suffix: true })}</span>
          ) : (
            <span className={style.free}>Miễn phí</span>
          )}
        </div>
      </div>
      <div className={style.brief}>
        {estimatedShipping && (
          <div className={style.timeline}>
            Thời gian dự kiến:<span>{estimatedShipping}</span>
          </div>
        )}
        {!enabled && disable_reason && <div className={style.notification}>{disable_reason}</div>}
      </div>
    </div>
  );
};

interface IProps {
  cartStore: any;
  checkout: (data: any) => any;
  checkSameDayShippingAction: (data: any) => any;
  deliverySetDeliveryMethod: (data: any) => any;
  setPaymentHighlightErrorBlockAction: (data: any) => any;
  resetPaymentHighlightErrorBlockAction: () => any;
}

const DeliveryMethodBlock = ({
  cartStore: {
    cartDetail,
    constants,
    deliveryConfig,
    isCheckoutDeliveryMethodSuccess,
    phaseReadiness: {
      payment: { address: addressReady }
    },
    paymentHighlightErrorBlock
  },
  checkout,
  checkSameDayShippingAction,
  deliverySetDeliveryMethod,
  setPaymentHighlightErrorBlockAction,
  resetPaymentHighlightErrorBlockAction
}: IProps) => {
  const [collapsed, setCollapsed] = useState(true);
  const { available_shipping_packages, first_name, last_name, phone } = cartDetail;
  const prevPaymentHighlightErrorBlock = usePrevious(paymentHighlightErrorBlock);
  const blockRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    prevPaymentHighlightErrorBlock !== PAYMENT_PHASES.deliveryMethod.id &&
      paymentHighlightErrorBlock === PAYMENT_PHASES.deliveryMethod.id &&
      blockRef.current &&
      blockRef.current.scrollIntoView({ block: 'center', behavior: 'smooth' });
  }, [paymentHighlightErrorBlock]);
  const isBlockValid = paymentHighlightErrorBlock !== PAYMENT_PHASES.deliveryMethod.id;
  const currentMethod =
    available_shipping_packages &&
    available_shipping_packages.find((method) => method.code === deliveryConfig.shippingPackage);
  // FIXME: User pickup is not currently supported (update store state, when available_shipping_packages change)
  const onShippingMethodChange = (methodCode) => {
    deliverySetDeliveryMethod({ deliveryMethod: methodCode });
    checkout({
      saveNewAddress: true,
      firstName: first_name || '',
      lastName: last_name || '',
      phone: phone || '',
      addressId: deliveryConfig.addressId,
      shippingPackage: methodCode,
      note: deliveryConfig.noteMessage,
      isGift: !!deliveryConfig.giftMessage,
      giftMessage: deliveryConfig.giftMessage
    });
    // TODO: Refactor (`districtId` isn't used anymore. Obsolete logic)
    constants.enabled_same_day_shipping && checkSameDayShippingAction({ districtId: 0 });
  };
  const estimatedShipping = currentMethod
    ? formatEstimatedShippingTimeline({
        min: currentMethod.time?.min,
        max: currentMethod.time?.max,
        isSameDayShipping: currentMethod.code === SHIPPING_TYPE.SAME_DAY
      })
    : '';

  return (
    <>
      <div
        id={PAYMENT_PHASES.deliveryMethod.id}
        className={classNames(
          style.deliveryMethodBlock,
          !addressReady && style.deliveryMethodBlockCollapsed,
          isBlockValid || style.blockError
        )}
        ref={blockRef}
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
        {...generateTestId({ name: 'delivery-method-block' })}
      >
        <div
          className={style.header}
          onClick={(event) => {
            if (addressReady && !!available_shipping_packages?.length && available_shipping_packages.length > 1) {
              event.stopPropagation();
              setCollapsed((prevState) => !prevState);
            }
          }}
          {...generateTestId({ name: 'deliver-checkout' })}
        >
          <div className={style.status}>
            <SvgIcon name="delivery" className={style.icon} />
          </div>
          <div className={style.title}>PHƯƠNG THỨC GIAO HÀNG</div>
          {addressReady && !!available_shipping_packages?.length && available_shipping_packages.length > 1 && (
            <div className={style.action}>
              {collapsed ? 'Thay đổi' : <SvgIcon name="minus" className={style.icon} />}
            </div>
          )}
        </div>
        {addressReady && !!currentMethod && collapsed && (
          <div className={classNames(style.brief, collapsed || style.noDisplay)}>
            {!!estimatedShipping && (
              <div className={style.timeline}>
                Dự kiến:<span>{estimatedShipping}</span>
              </div>
            )}
            {!currentMethod.price && (
              <>
                (<div className={style.free}>Miễn phí</div>)
              </>
            )}
          </div>
        )}
        {addressReady &&
          !collapsed &&
          (isCheckoutDeliveryMethodSuccess ? (
            <div className={style.body}>
              <div className={style.methods}>
                {available_shipping_packages.map((method) => (
                  <DeliveryMethodEntry
                    key={method.id}
                    method={method}
                    selected={!!currentMethod && method.code === currentMethod.code}
                    onClick={(methodCode) => {
                      navigationTracking('block', 'Delivery');
                      onShippingMethodChange(methodCode);
                    }}
                  />
                ))}
              </div>
              <div className={style.currentMethodNote}>Giao hàng giờ hành chính từ Thứ 2 đến Thứ 7</div>
            </div>
          ) : (
            <Loading style={{ height: 'initial' }} />
          ))}
      </div>
    </>
  );
};

export default DeliveryMethodBlock;
