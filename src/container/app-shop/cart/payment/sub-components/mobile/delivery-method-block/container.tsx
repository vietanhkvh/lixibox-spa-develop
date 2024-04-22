import { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';

import GeneralModal from 'presentation-component/modal/general-modal';
import SvgIcon from 'presentation-component/ui/icon';
import { PAYMENT_PHASES } from 'constants/application/payment';
import { usePrevious } from 'utils/hook';
import { formatCurrency } from 'utils/currency';
import { formatEstimatedShippingTimeline } from 'utils/time';
import { generateTestId } from 'utils/test-utils';
import { SHIPPING_TYPE } from 'constants/application/shipping';
import { navigationTracking } from 'container/app-shop/cart/payment/tracking';
import style from './style.module.scss';

const DeliveryMethodEntry = ({ method, selected, onClick }) => {
  const { description, code, name, enabled, disable_reason, price } = method;
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
      {...generateTestId({ name: 'delivery-method-entry', id: code })}
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
        <div className={style.timeline}>
          Thời gian dự kiến:<span>{estimatedShipping}</span>
        </div>
        <div className={style.description}>{description}</div>
        {!enabled && disable_reason && <div className={style.notification}>{disable_reason}</div>}
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

const DeliveryMethodModal = ({ methods, currentMethod, isOpen, onSubmit, onRequestClose }: ModalProps) => {
  return (
    <GeneralModal
      isOpen={isOpen}
      title={'Chọn phương thức giao hàng'}
      leftTitle=""
      rightIcon={'close'}
      className={style.deliveryMethodModal}
      testId={{ name: 'delivery-method-modal' }}
      onRightActionClick={() => onRequestClose()}
      onRequestClose={() => onRequestClose()}
    >
      <div className={style.body}>
        {methods.map((method) => (
          <DeliveryMethodEntry
            key={method.id}
            method={method}
            selected={currentMethod && method.code === currentMethod.code}
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
  checkSameDayShippingAction: (data: any) => any;
  deliverySetDeliveryMethod: (data: any) => any;
  setPaymentHighlightErrorBlockAction: (data: any) => any;
  resetPaymentHighlightErrorBlockAction: () => any;
}

const DeliveryMethodBlock = ({
  cartStore: {
    cartDetail: { available_shipping_packages, first_name, last_name, phone },
    constants,
    deliveryConfig,
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
  const [isModalOpen, setModalVisibility] = useState(false);
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
        className={classNames(style.deliveryMethodBlock, isBlockValid || style.blockError)}
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
          if (currentMethod) {
            navigationTracking('block', 'Delivery');
            setModalVisibility(true);
          }
        }}
        {...generateTestId({ name: 'delivery-method-block' })}
      >
        <div className={style.header}>
          <div className={style.status}>
            <SvgIcon name="delivery" className={style.icon} />
          </div>
          <div className={style.title}>
            {addressReady && currentMethod ? currentMethod.name : 'Phương thức giao hàng'}
          </div>
          {addressReady && (
            <div className={style.action}>
              <SvgIcon name="angle-right" className={style.icon} />
            </div>
          )}
        </div>
        {addressReady && !!currentMethod && (
          <div className={style.brief}>
            {/* <div className={style.header}>
              {currentMethod.name}
              {!!currentMethod.price && <span>({formatCurrency(currentMethod.price, { suffix: true })})</span>}
            </div> */}
            {estimatedShipping && (
              <div className={style.timeline}>
                Dự kiến:<span>{estimatedShipping}</span>
              </div>
            )}
            {!currentMethod.price && (
              <>
                (<div className={style.free}>Miễn phí</div>)
              </>
            )}
            {false && currentMethod.code !== SHIPPING_TYPE.SAME_DAY && (
              <div className={style.hint}>Giao hàng giờ hành chính từ Thứ 2 đến Thứ 7</div>
            )}
          </div>
        )}
      </div>
      {currentMethod && (
        <DeliveryMethodModal
          isOpen={isModalOpen}
          methods={available_shipping_packages}
          currentMethod={currentMethod}
          onSubmit={(methodCode) => {
            onShippingMethodChange(methodCode);
            setModalVisibility(false);
          }}
          onRequestClose={() => setModalVisibility(false)}
        />
      )}
    </>
  );
};

export default DeliveryMethodBlock;
