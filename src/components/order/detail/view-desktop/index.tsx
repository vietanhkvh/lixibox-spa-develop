import classnames from 'classnames';
import { NavLink } from 'react-router-dom';

import Image from 'presentation-component/ui/image';
import SvgIcon from 'presentation-component/ui/icon';
import OrderStatusLabel from 'presentation-component/order/order-status-label';
import SubmitButton from 'components/ui/submit-button';

import { ROUTING_SUPPORT_CENTER_PATH, ROUTING_PRODUCT_DETAIL_PATH } from 'routings/path';
import { PURCHASE_TYPE } from 'constants/application/purchase';
import { PAYMENT_METHOD_TITLE, PAYMENT_METHOD_TYPE } from 'constants/application/payment';
import { PURCHASE_TYPE_LOCALE } from '../constant';
import { ORDER_TYPE_VALUE, ORDER_TYPE, SHIPMENT_TYPE } from 'constants/application/order';
import { formatDateTime } from 'utils/date-time';
import { DATETIME_FORMAT_TYPE } from 'constants/application/global';
import { copyTextToClipboard } from 'utils/generic';
import { isMobileVersion } from 'utils/responsive';
import { CustomCurrencyType, currenyFormat } from 'utils/currency';
import { formatCurrency } from 'utils/currency';
import { isSafeData } from 'utils/check-safe-data';
import { getShippingEstimation } from 'utils/time';
import { getCartPricing } from 'utils/cart';
import { SHIPPING_TYPE } from 'constants/application/shipping';
import { ALERT_CLIPBOARD_SUCCESS } from 'constants/application/alert';
import PricingBreakdown from 'container/app-shop/cart/general/pricing-breakdown';
import { gatewayTrackViewContentFromList } from 'tracking/gateway';
import { ViewedSource } from 'tracking/constants';
import { Order } from 'types/api/order';

import { IProps } from '../model';
import * as STYLE from './style';
import styles from './style.module.scss';
import { generateTestId } from 'utils/test-utils';

const renderPurchaseType = (data) => {
  const typeMessage = PURCHASE_TYPE_LOCALE[data.purchase_type];
  if (!typeMessage) return null;

  return (
    <div className={styles.rowPurchaseType}>
      <div className={styles.content}>{typeMessage}</div>
    </div>
  );
};

const dataGroup = ({
  colorIcon = '',
  title,
  value,
  titleStyle = {},
  valueStyle = {},
  containerStyle = {},
  withBorder = false
}) => {
  const containerProps = {
    style: Object.assign(
      {},
      STYLE.dataGroup.container,
      containerStyle,
      withBorder && STYLE.dataGroup.container.withBorder
    )
  };

  const titleProps = {
    style: Object.assign({}, STYLE.dataGroup.title, titleStyle)
  };

  const valueProps = {
    style: Object.assign({}, STYLE.dataGroup.value, valueStyle)
  };

  return (
    <div {...containerProps}>
      <div {...titleProps}>{title}</div>
      <div {...valueProps}>
        {'' !== colorIcon && <span style={STYLE.dataGroup.icon(colorIcon)}></span>}
        {value}
      </div>
    </div>
  );
};

const renderCancelledTag = (title: string) => {
  if (!title) return null;

  return (
    <div className={styles.cancelledTag}>
      <div className={styles.content}>{title}</div>
    </div>
  );
};

const Top = ({ data, handleGetMomoPaymentAddressUrl, handleGetOnepayPaymentAddressUrl, onCopy }) => {
  if (!data) return null;

  const isShowMomoAction = 6 === data.payment_method && 'unpaid' === data.status;

  const isShowOnepayAction = (3 === data.payment_method || 4 === data.payment_method) && 'unpaid' === data.status;

  const onePayActionTitle =
    3 === data.payment_method
      ? 'Thanh toán qua thẻ ATM'
      : 4 === data.payment_method
      ? 'Thanh toán qua thẻ Quốc tế'
      : '';

  return (
    <div className={styles.topInfo}>
      <div className={classnames(styles.generalRow, styles.orderIdRow)}>
        <div className={styles.generalRowHeadingText}>
          {`Mã đơn hàng: `}
          <span className={styles.orderId}>{`#${data.number}`}</span>
        </div>
        <SvgIcon name={'copy'} className={styles.generalIconCopy} onClick={() => onCopy(data.number)} />
      </div>
      <div className={styles.generalRow}>
        <div className={styles.generalRowText} title={formatDateTime(data.created_at, DATETIME_FORMAT_TYPE.FULL_INFO)}>
          {`Ngày đặt hàng: `}
          {formatDateTime(data.created_at, DATETIME_FORMAT_TYPE.DD_MM_YYYY_HH_MM)}
        </div>
      </div>
      <OrderStatusLabel type={data.status} />
      {!!isShowMomoAction && (
        <div className={styles.buttonAction}>
          <SubmitButton
            icon={'color-momo'}
            title={'Thanh toán bằng Ví MoMo'}
            color={'borderMomo'}
            onSubmit={() => handleGetMomoPaymentAddressUrl(data.number)}
          />
        </div>
      )}

      {!!isShowOnepayAction && (
        <div className={styles.buttonAction}>
          <SubmitButton
            svgIcon={'color-onepay'}
            svgIconClass={styles.onePayButtonIcon}
            title={onePayActionTitle}
            color={'borderOnepay'}
            onSubmit={() => handleGetOnepayPaymentAddressUrl(data.number)}
          />
        </div>
      )}

      <div className={styles.generalRowText}>
        Vui lòng xác nhận thông tin cá nhân (thông qua CMND, giấy phép lái xe,…) và đồng kiểm với shipper trước khi nhận
        hàng. Mọi khiếu nại sau khi khách ký nhận sẽ không được giải quyết.
      </div>

      {/* <div style={STYLE.top.right}>
        {dataGroup({
          title: 'Trạng thái đơn hàng:',
          value: ORDER_TYPE_VALUE[data.status].title,
          withBorder: true,
          colorIcon: ORDER_TYPE_VALUE[data.status].color
        })}
        {dataGroup({
          title: 'Phương thức thanh toán:',
          value: PAYMENT_METHOD_TITLE[data.payment_method || 0],
          withBorder: true
        })}
        {dataGroup({
          title: 'Phương thức giao hàng:',
          value: data.shipping_package_name
        })}
      </div> */}
    </div>
  );
};

function Item({ itemData, index, length, data, onClick }) {
  if (!itemData || !itemData.box) return;

  const boxName = isSafeData(itemData, ['box', 'name']) ? itemData.box.name : '';
  const imageUrl = isSafeData(itemData, ['box', 'primary_picture', 'medium_url'])
    ? itemData.box.primary_picture.medium_url
    : '';
  const isOrderCancelled = data.status === 'cancelled';
  const isItemCancelled = itemData.status === 'cancelled';

  const containerProps = {
    to: `${ROUTING_PRODUCT_DETAIL_PATH}/${itemData.box.slug}`,
    onClick: () => onClick?.(),
    target: '_blank',
    style: Object.assign({}, STYLE.productItem.container, length - 1 === index && STYLE.productItem.lastItem),
    key: itemData.id
  };

  const isNotGiftOrAddOn = !(
    itemData.purchase_type === PURCHASE_TYPE.ADDON || itemData.purchase_type === PURCHASE_TYPE.GIFT
  );

  const isGift = itemData.purchase_type === PURCHASE_TYPE.GIFT;

  const price =
    itemData.purchase_type === PURCHASE_TYPE.REDEEM
      ? currenyFormat(itemData.coins, 'coin')
      : currenyFormat(itemData.price);

  return (
    <NavLink {...containerProps}>
      <div
        style={Object.assign(
          {},
          STYLE.productItem.innerContainer,
          !isOrderCancelled && isItemCancelled && STYLE.productItem.cancelledItem
        )}
      >
        <div style={STYLE.productItem.imgOuter}>
          <Image src={imageUrl} style={STYLE.productItem.img} alt={''} />
        </div>
        <div style={STYLE.productItem.outerInfoContainer}>
          <div style={STYLE.productItem.outerInfo}>
            <div style={STYLE.productItem.info}>
              <div style={STYLE.productItem.name}>{boxName}</div>
            </div>

            <div style={STYLE.productItem.price}>
              {!isGift && <span style={STYLE.productItem.quantity}>{`${itemData.quantity} x `}</span>}
              {!isGift && price}
            </div>
          </div>
          <div style={STYLE.productItem.tags}>
            {!isNotGiftOrAddOn && renderPurchaseType({ purchase_type: itemData.purchase_type })}
            {!isOrderCancelled && isItemCancelled && renderCancelledTag('Đã huỷ')}
          </div>
        </div>
      </div>
    </NavLink>
  );
}
const ProductList = ({ data, onItemClick }) => {
  const list = data.order_boxes || [];
  if (!list || !list.length) return null;

  const length = list.length;

  const iconProps = {
    name: 'cart',
    className: classnames(styles.icon, { [styles['cart']]: true })
  };

  return (
    <div className={styles.outerIconLayout}>
      <div className={styles.iconLayout}>
        <div className={styles.iconCol}>
          <SvgIcon {...iconProps} />
        </div>
        <div className={styles.mainCol}>
          <div className={styles.generalBigRow}>
            <div className={styles.generalRowHeadingText}>Thông tin đơn hàng</div>
          </div>
        </div>
      </div>
      <div className={styles.productListPanel}>
        {Array.isArray(list) &&
          list.map((item, index) => (
            <Item
              {...{
                itemData: item,
                index,
                length,
                data,
                onClick: () => onItemClick?.(item, index)
              }}
            />
          ))}
      </div>
    </div>
  );
};

const bottom = ({ data }) => {
  const {
    viewSpecificSubtotalPriceFormatted,
    viewSpecificSubtotalCoins,
    viewSpecificSubtotalCoinsFormatted,
    viewSpecificShippingPriceFormatted,
    viewSpecificServicesPrice,
    viewSpecificServicesPriceFormatted,
    viewSpecificDiscountAndPromotionsPrice,
    viewSpecificDiscountAndPromotionsPriceFormatted,
    viewSpecificDiscountOrReferralCode,
    viewSpecificBalanceUsed,
    viewSpecificBalanceUsedFormatted,
    viewSpecificLixicoinBonusFormatted,
    viewSpecificCashbackBonusFormatted,
    viewSpecificTotalPriceFormatted
  } = getCartPricing({ cartDetail: data, isOrderDetailView: true });

  return (
    <div style={STYLE.bottom.container}>
      {dataGroup({
        title: 'Tiền hàng',
        value: viewSpecificSubtotalPriceFormatted
      })}
      {!!viewSpecificSubtotalCoins &&
        dataGroup({
          title: 'Dùng Lixicoin',
          value: viewSpecificSubtotalCoinsFormatted
        })}
      {dataGroup({
        title: 'Phí giao hàng',
        value: viewSpecificShippingPriceFormatted
      })}
      {!!viewSpecificServicesPrice &&
        dataGroup({
          title: 'Phí dịch vụ kèm theo',
          value: viewSpecificServicesPriceFormatted
        })}
      {!!viewSpecificDiscountAndPromotionsPrice &&
        dataGroup({
          title: 'Giảm giá',
          value: viewSpecificDiscountAndPromotionsPriceFormatted,
          valueStyle: STYLE.dataGroup.valueHighlightBlue
        })}
      {!!viewSpecificDiscountOrReferralCode &&
        dataGroup({
          title: 'Mã giảm giá',
          value: viewSpecificDiscountOrReferralCode,
          valueStyle: STYLE.dataGroup.valueHighlightBlue
        })}
      {!!viewSpecificBalanceUsed &&
        dataGroup({
          title: 'Dùng số dư tài khoản',
          value: viewSpecificBalanceUsedFormatted
        })}
      <div className={styles.solidDivider} />
      {dataGroup({
        title: 'Tổng tiền',
        value: viewSpecificTotalPriceFormatted,
        titleStyle: STYLE.dataGroup.bigTitle,
        valueStyle: STYLE.dataGroup.bigValue
      })}
      <div className={styles.dashedDivider} />
      {dataGroup({
        title: 'Lixicoin nhận được',
        value: viewSpecificLixicoinBonusFormatted,
        valueStyle: STYLE.dataGroup.valueHighlightGreen
      })}
      {dataGroup({
        title: 'Hoàn tiền',
        value: viewSpecificCashbackBonusFormatted,
        valueStyle: STYLE.dataGroup.valueHighlightGreen
      })}
    </div>
  );
};

export const support = ({
  data,
  handleCancelOrder,
  cancellable,
  orderStore: { confirmOrderReceived },
  confirmOrderReceivedAction
}) => {
  const isCustomerConfirmable =
    data.payment_method !== PAYMENT_METHOD_TYPE.COD.id &&
    data.status === ORDER_TYPE.SHIPPED &&
    !!data.shipments.length &&
    data.shipments.every((shipment) => shipment.status === SHIPMENT_TYPE.SHIPPED);
  const isCustomerConfirmableButtonLoading =
    data.number === confirmOrderReceived.orderId && confirmOrderReceived.confirming;

  const receivedButtonProps = {
    title: 'Đã nhận hàng',
    onSubmit: () => {
      confirmOrderReceivedAction({ orderId: data.number });
    },
    loading: isCustomerConfirmableButtonLoading,
    color: 'borderBlack',
    style: STYLE.support.link
  };
  const cancelButtonProps = {
    title: 'Hủy đơn hàng',
    onSubmit: handleCancelOrder,
    color: 'borderBlack',
    style: STYLE.support.link
  };

  const supportButtonProps = {
    title: 'Gửi yêu cầu hỗ trợ',
    type: 'link',
    link: `${ROUTING_SUPPORT_CENTER_PATH}?order-number=${data.number}`,
    linkTarget: '_blank',
    color: 'borderBlack',
    style: STYLE.support.link
  };

  return (
    (!!isCustomerConfirmable || !!cancellable || !isMobileVersion()) && (
      <div style={STYLE.support.container}>
        {isCustomerConfirmable && <SubmitButton {...receivedButtonProps} />}
        {!!cancellable && <SubmitButton {...cancelButtonProps} />}

        {!isMobileVersion() && <SubmitButton {...supportButtonProps} />}
      </div>
    )
  );
};

const IconLayout = ({ icon, children }) => {
  const iconProps = {
    name: icon,
    className: classnames(styles.icon, { [styles[icon]]: true })
  };

  return (
    <div className={classnames(styles.iconLayout, { [styles.desktop]: !isMobileVersion() })}>
      <div className={styles.iconCol}>
        <SvgIcon {...iconProps} />
      </div>
      <div className={styles.mainCol}>
        {children}
        {''}
      </div>
    </div>
  );
};

const Delivery = ({ data }) => {
  if (!data) return null;

  return (
    <div className={styles.deliveryInfo}>
      <div className={styles.generalBigRow}>
        <div className={styles.generalRowHeadingText}>Thông tin giao hàng</div>
      </div>
      <div className={styles.checkPointContainer}>
        <div className={styles.generalSmallRow}>
          <div className={styles.generalRowBoldText}>{ORDER_TYPE_VALUE[data.status].title}</div>
        </div>
        {!!data.shipments && (
          <div className={styles.generalSmallRow}>
            {Array.isArray(data.shipments) &&
              data.shipments.map((item) => (
                <a
                  href={item.external_service_url}
                  target={'_blank'}
                  rel="noreferrer"
                  className={classnames(styles.generalRowBoldText, styles.generalRowBlueText)}
                >
                  {item.shipping_service}
                  {!!item.tracking_code && `: ${item.tracking_code}`}
                </a>
              ))}
          </div>
        )}

        {!!data.shipped_at && (
          <div className={styles.generalSmallRow}>
            <div
              className={styles.generalRowText}
              title={formatDateTime(data.shipped_at, DATETIME_FORMAT_TYPE.FULL_INFO)}
              {...generateTestId({ name: 'shipped-at-testId' })}
            >
              {`Thời gian giao hàng: ${formatDateTime(data.shipped_at, DATETIME_FORMAT_TYPE.DD_MM_YYYY_HH_MM)}`}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const Receiver = ({ data }) => {
  return (
    <div className={styles.receiverrInfo}>
      <div className={styles.generalBigRow}>
        <div className={styles.generalRowHeadingText}>Địa chỉ nhận hàng</div>
      </div>

      <div className={styles.generalSmallRow}>
        <div className={styles.generalRowBoldText}>{`${data.last_name} ${data.first_name}, ${data.phone}`}</div>
      </div>
      <div className={styles.generalSmallRow}>
        <div className={styles.generalRowText}>{data.full_address}</div>
      </div>
    </div>
  );
};

const ShippingMethod = ({ data, data: { shipping } }: any) => {
  const { estimation, shouldShow } = getShippingEstimation({
    min: shipping.time.min,
    max: shipping.time.max,
    isSameDayShipping: shipping.code === SHIPPING_TYPE.SAME_DAY,
    shippingStatus: shipping.status
  });

  return (
    <div className={styles.receiverrInfo}>
      <div className={styles.generalBigRow}>
        <div className={styles.generalRowHeadingText}>Phương thức giao hàng</div>
      </div>

      <div className={styles.generalSmallRow}>
        <div className={styles.generalRowBoldText}>{data.shipping_package_name}</div>
      </div>
      {shouldShow && (
        <>
          <div className={styles.generalSmallRow}>
            <div className={styles.generalRowText}>Thời gian giao hàng dự kiến: {estimation}</div>
          </div>
          <div className={styles.generalSmallRow}>
            <div className={styles.generalRowText}>Giao hàng giờ hành chính từ Thứ 2 đến Thứ 7</div>
          </div>
        </>
      )}
    </div>
  );
};

const AddonServices = ({ data: { accompanies }, constants }) => {
  const description = (constants && constants.accompany_services_description) || '';

  return (
    <div>
      <div className={styles.generalBigRow}>
        <div className={styles.generalRowHeadingText}>Dịch vụ kèm theo</div>
      </div>

      <div className={styles.accompanyBrief}>
        {accompanies && accompanies.length
          ? accompanies.map(({ id, external, fee, linked_object, note }) => (
              <div key={id} className={styles.accompany}>
                <div className={styles.header}>
                  {(linked_object && linked_object.name) || ''}
                  {fee ? (
                    <span className={styles.typePremium}>+{formatCurrency(fee, { suffix: true })}</span>
                  ) : (
                    <span className={styles.typeFree}>Miễn phí</span>
                  )}
                </div>
                {external && !!Object.keys(external).length && (
                  <div className={styles.preview}>Lựa chọn: {external.name}</div>
                )}
                {note && <div className={styles.preview}>{note || ''}</div>}
              </div>
            ))
          : !!description && <div className={styles.hint}>{description}</div>}
      </div>
    </div>
  );
};

const PaymentMethod = ({ data }) => {
  return (
    <div className={styles.receiverrInfo}>
      <div className={styles.generalBigRow}>
        <div className={styles.generalRowHeadingText}>Phương thức thanh toán</div>
      </div>

      <div className={styles.generalSmallRow}>
        <div className={styles.generalRowBoldText}>{PAYMENT_METHOD_TITLE[data.payment_method]}</div>
      </div>
      {/*
      TODO:
       <div className={styles.generalSmallRow}>
        <div className={styles.generalRowText}>{`Thời gian dự kiến: `}</div>
      </div> */}
    </div>
  );
};

const BankInfo = ({ data, constants, handleChangeToCOD, onCopy }) => {
  if (!constants || !constants.bank_account) return null;
  const { bank_account } = constants;

  return (
    <div className={styles.bankInfo}>
      <div className={styles.generalBigRow}>
        <div className={styles.generalRowHeadingText}>Thông tin chuyển khoản</div>
      </div>

      <div className={styles.generalTableRow}>
        <div className={styles.generalRowText}>Ngân hàng</div>
        <div className={styles.generalRowBoldText}>{bank_account.bank}</div>
      </div>
      <div className={styles.generalTableRow}>
        <div className={styles.generalRowText}>Người nhận</div>
        <div className={styles.generalRowBoldText}>
          {bank_account.owner}
          <SvgIcon name={'copy'} onClick={() => onCopy(bank_account.owner)} className={styles.generalIconCopy} />
        </div>
      </div>
      <div className={styles.generalTableRow}>
        <div className={styles.generalRowText}>Số tài khoản</div>
        <div className={styles.generalRowBoldText}>
          {bank_account.number}
          <SvgIcon name={'copy'} onClick={() => onCopy(bank_account.number)} className={styles.generalIconCopy} />
        </div>
      </div>
      <div className={styles.generalTableRow}>
        <div className={styles.generalRowText}>Nội dung</div>
        <div className={styles.generalRowBoldText}>
          {data.number}
          <SvgIcon name={'copy'} onClick={() => onCopy(data.number)} className={styles.generalIconCopy} />
        </div>
      </div>
      <div className={styles.generalTableRow}>
        <div className={styles.generalRowText}>Số tiền</div>
        <div className={styles.generalRowBoldText}>
          {currenyFormat(data.total_price)}
          <SvgIcon name={'copy'} onClick={() => onCopy(data.total_price)} className={styles.generalIconCopy} />
        </div>
      </div>
      {!!data?.payment_qr && data?.status === ORDER_TYPE.UNPAID && (
        <div className={styles.qrCode}>
          <div className={styles.dividerContainer}>
            <div className={styles.dividerText}>hoặc</div>
          </div>
          <Image src={data?.payment_qr} alt="qr-code-payment" className={styles.image} />
          <span className={styles.text}>Scan mã QR từ app thanh toán của bạn</span>
        </div>
      )}
      <div className={styles.bankInfoNote}>
        *Lưu ý: <br />
        - Bạn cần ghi rõ nội dung khi chuyển khoản là mã đơn hàng để Lixibox có thể xác nhận thanh toán cho đơn hàng của
        bạn
        <br />- Vui lòng chuyển khoản trong vòng 2 ngày tới để đảm bảo còn hàng cho bạn.
      </div>
      {!!data.can_change_to_cod && (
        <>
          <div className={styles.bankInfoNote}>Hoặc bạn có thể đổi hình thức thanh toán</div>
          <SubmitButton
            color={'black'}
            title={'Thanh toán tiền mặt (COD)'}
            onSubmit={() => handleChangeToCOD({ orderId: data.number })}
          />
        </>
      )}
    </div>
  );
};

const StoreAddress = ({ data }) => {
  return (
    <div className={styles.receiverrInfo}>
      <div className={styles.generalBigRow}>
        <div className={styles.generalRowHeadingText}>Cửa hàng</div>
      </div>
      <div className={styles.generalSmallRow}>
        <div className={styles.generalRowBoldText}>{data?.store_name}</div>
      </div>
    </div>
  );
};
const StorePaymentMethods = ({ data }) => {
  return (
    <div className={styles.receiverrInfo}>
      <div className={styles.generalBigRow}>
        <div className={styles.generalRowHeadingText}>Phương thức thanh toán</div>
      </div>
      {data &&
        Array.isArray(data.payments) &&
        data.payments.map((p) => (
          <div key={p.id} className={styles.generalSmallRow}>
            <div className={styles.generalRowSpaceBetween}>
              <div className={styles.generalRowBoldText}>{p.payment_method_name || 'Phương thức ngoài'}:</div>
              <div className={styles.generalRowBoldText}>{formatCurrency(p.amount, { suffix: true })}</div>
            </div>
          </div>
        ))}
    </div>
  );
};

const OnlineOrder = ({
  data,
  handleGetMomoPaymentAddressUrl,
  handleGetOnepayPaymentAddressUrl,
  onCopy,
  handleChangeToCOD,
  constants,
  isShowDelivery
}) => {
  return (
    <div className={classnames(styles.wrapper)}>
      <IconLayout icon={'receiver'}>
        <Top
          data={data}
          handleGetMomoPaymentAddressUrl={handleGetMomoPaymentAddressUrl}
          handleGetOnepayPaymentAddressUrl={handleGetOnepayPaymentAddressUrl}
          onCopy={onCopy}
        />
      </IconLayout>
      {2 === data.payment_method * 1 && ORDER_TYPE.UNPAID === data.status && (
        <div className={styles.bankInfo}>
          <IconLayout icon={'receiver'}>
            <BankInfo data={data} handleChangeToCOD={handleChangeToCOD} constants={constants} onCopy={onCopy} />
          </IconLayout>
        </div>
      )}
      {!!isShowDelivery && (
        <IconLayout icon={'direction'}>
          <Delivery data={data} />
        </IconLayout>
      )}
      <IconLayout icon={'mark-location'}>
        <Receiver data={data} />
      </IconLayout>
      <IconLayout icon={'delivery'}>
        <ShippingMethod data={data} />
      </IconLayout>
      {data.accompanies && !!data.accompanies.length && (
        <IconLayout icon={'gift'}>
          <AddonServices data={data} constants={constants} />
        </IconLayout>
      )}
      <IconLayout icon={'wallet'}>
        <PaymentMethod data={data} />
      </IconLayout>
    </div>
  );
};
const StoreOrder = ({ data, handleGetMomoPaymentAddressUrl, handleGetOnepayPaymentAddressUrl, onCopy }) => {
  if (!data.status) data = Object.assign({ status: ORDER_TYPE.FULFILLED }, data);
  return (
    <>
      <IconLayout icon={'receiver'}>
        <Top
          data={data}
          handleGetMomoPaymentAddressUrl={handleGetMomoPaymentAddressUrl}
          handleGetOnepayPaymentAddressUrl={handleGetOnepayPaymentAddressUrl}
          onCopy={onCopy}
        />
      </IconLayout>
      <IconLayout icon={'store'}>
        <StoreAddress data={data} />
      </IconLayout>
      <IconLayout icon={'wallet'}>
        <StorePaymentMethods data={data} />
      </IconLayout>
    </>
  );
};

interface AccumulationsFromOrderProps {
  order: Order | null;
  classes?: { container?: string; accumulations?: string };
}
const AccumulationsFromOrder = ({ order, classes }: AccumulationsFromOrderProps) => {
  const lixicoinAccumulation = order?.lixicoin_bonus;
  const cashbackAccumulation = order?.cashback?.bonus;

  return (
    (!!lixicoinAccumulation || !!cashbackAccumulation) && (
      <div className={classnames(styles.accumulationsFromOrder, classes?.container)}>
        <div className={styles.header}>
          <SvgIcon name="gift" className={styles.icon} />
          <div className={styles.title}>Tích lũy</div>
        </div>
        <div className={classnames(styles.accumulations, classes?.accumulations)}>
          {!!lixicoinAccumulation && (
            <div className={styles.accumulation}>
              <div className={styles.title}>Lixicoin</div>
              <div className={styles.value}>
                +{formatCurrency(lixicoinAccumulation, { suffix: CustomCurrencyType.LIXICOIN })}
              </div>
            </div>
          )}
          {!!cashbackAccumulation && (
            <div className={styles.accumulation}>
              <div className={styles.title}>Hoàn tiền</div>
              <div className={styles.value}>+{formatCurrency(cashbackAccumulation, { suffix: true })}</div>
            </div>
          )}
        </div>
      </div>
    )
  );
};

const view = ({
  constants,
  orderStore,
  data,
  handleGetMomoPaymentAddressUrl,
  handleGetOnepayPaymentAddressUrl,
  handleChangeToCOD,
  handleCancelOrder,
  confirmOrderReceivedAction,
  openAlertAction
}: IProps) => {
  if (!data) return null;

  const onCopy = (data) =>
    copyTextToClipboard(
      data,
      () => openAlertAction(ALERT_CLIPBOARD_SUCCESS),
      () => {}
    );

  const isShowDelivery =
    ORDER_TYPE.UNPAID !== data.status &&
    ORDER_TYPE.CANCELLED !== data.status &&
    ORDER_TYPE.RETURNED !== data.status &&
    ORDER_TYPE.REFUNDED !== data.status;
  const isOnlineOrder = !window.location.pathname.includes('store-purchases');
  const orderProps = {
    data,
    handleGetMomoPaymentAddressUrl,
    handleGetOnepayPaymentAddressUrl,
    onCopy,
    handleChangeToCOD,
    constants,
    isShowDelivery
  };

  return (
    <div style={STYLE.main.container}>
      {isOnlineOrder ? (
        <OnlineOrder {...orderProps} />
      ) : (
        <div
          className={classnames(styles.iconLayoutList, { [styles.desktop]: !isMobileVersion() })}
          {...generateTestId({ name: 'store-order-testId' })}
        >
          <StoreOrder {...orderProps} />
        </div>
      )}
      <ProductList
        data={data}
        onItemClick={(box, index) => {
          gatewayTrackViewContentFromList({
            source: ViewedSource.ORDER,
            box,
            index
          });
        }}
      />
      {false && bottom({ data })}
      <AccumulationsFromOrder order={data} classes={{ container: styles.orderAccumulationSection }} />
      <PricingBreakdown showTotal order={data} classes={{ container: styles.pricingBreakdown }} />
      {support({
        data,
        orderStore,
        confirmOrderReceivedAction,
        handleCancelOrder,
        cancellable: data.actions && data.actions.cancellable
      })}
    </div>
  );
};
export default view;
