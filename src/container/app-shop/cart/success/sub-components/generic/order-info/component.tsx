import classNames from 'classnames';
import { withRouter } from 'react-router-dom';
import { useNavigate } from 'react-router-dom-v5-compat';

import SubmitButton from 'components/ui/submit-button';
import SvgIcon from 'presentation-component/ui/icon';
import { CDN_ASSETS_PREFIX } from 'utils/uri';
import { CustomCurrencyType, formatCurrency } from 'utils/currency';
import { PAYMENT_METHOD_TITLE, PAYMENT_METHOD_TYPE } from 'constants/application/payment';
import { ORDER_TYPE_VALUE, ORDER_TYPE } from 'constants/application/order';
import { SHIPPING_TYPE } from 'constants/application/shipping';
import { isMobileVersion } from 'utils';
import { generateTestId } from 'utils/test-utils';
import * as ROUTINGS from 'routings/path';
import { Order } from 'types/api/order';
import STYLE from './style';
import style from './style.module.scss';

const orderInfoBackground = CDN_ASSETS_PREFIX('/checkout/done.jpg');

const ThankYouMesssage = withRouter(({ history }) => {
  return (
    <div className={style.thankYouMessage} {...generateTestId({ name: 'thank-you-message' })}>
      <SvgIcon name="tick" className={style.icon} onClick={() => history.push(ROUTINGS.ROUTING_SHOP_INDEX)} />
      <div className={style.title}>Đặt Hàng Thành Công</div>
    </div>
  );
});

const OrderDetails = ({
  order: { number, name, phone, address, price, paymentMethod, status, deliveryType },
  copyTextToClipboard,
  onClickOrderTracking,
  onClickPaymentWithMomo
}) => {
  const orderType = ORDER_TYPE_VALUE[status];
  const orderTitle =
    PAYMENT_METHOD_TYPE.COD.id === paymentMethod && status === ORDER_TYPE.UNPAID
      ? 'Đang chờ xác nhận'
      : orderType.title;

  return (
    <div className={style.orderDetails} {...generateTestId({ name: 'order-details', id: number })}>
      <div className={style.title}>Thông tin đơn hàng</div>
      <div className={style.details}>
        <table className={style.properties}>
          <tbody>
            <tr className={style.row}>
              <td className={style.key}>Mã đơn hàng</td>
              <td className={style.value}>
                <div
                  {...generateTestId({ name: 'code-success-order' })}
                  className={classNames(style.text, style.highlight)}
                >
                  {number}
                </div>
                <SvgIcon name="copy" className={style.copyAction} onClick={() => copyTextToClipboard(number)} />
              </td>
            </tr>
            <tr className={style.row}>
              <td className={style.key}>Người nhận</td>
              <td {...generateTestId({ name: 'name-receiver-success-order' })} className={style.value}>
                {name}
              </td>
            </tr>
            <tr className={style.row}>
              <td className={style.key}>Điện thoại</td>
              <td {...generateTestId({ name: 'phone-receiver-success-order' })} className={style.value}>
                {phone}
              </td>
            </tr>
            <tr className={style.row}>
              <td className={style.key}>Địa chỉ</td>
              <td {...generateTestId({ name: 'address-receiver-success-order' })} className={style.value}>
                {address}
              </td>
            </tr>
            <tr className={style.row}>
              <td className={style.key}>Tổng tiền</td>
              <td {...generateTestId({ name: 'payment-amount1-success-order' })} className={style.value}>
                {formatCurrency(price, { suffix: true })}
              </td>
            </tr>
            <tr className={style.row}>
              <td className={style.key}>Thanh toán</td>
              <td {...generateTestId({ name: 'payment_method_success_order' })} className={style.value}>
                {PAYMENT_METHOD_TITLE[paymentMethod]}
              </td>
            </tr>
            <tr className={style.row}>
              <td className={style.key}>Trạng thái</td>
              <td className={style.value}>
                <div
                  {...generateTestId({ name: 'status_success_order' })}
                  className={classNames(style.label, style[`label-${orderType.colorType}`])}
                >
                  {orderTitle}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div className={style.notes}>
          {status === ORDER_TYPE.PAID && (
            <div className={style.note}>
              LIXIBOX sẽ thông báo về tình trạng đơn hàng trong vòng 24 tiếng nữa qua email của bạn.
            </div>
          )}
          {status === ORDER_TYPE.PAYMENT_PENDING && (
            <div className={style.note}>
              Bạn đã đặt hàng thành công. Lixibox đang chờ ngân hàng xác thực thanh toán.
            </div>
          )}

          {deliveryType !== SHIPPING_TYPE.USER_PICKUP && (
            <div className={style.note}>
              Vui lòng xác nhận thông tin cá nhân (thông qua CMND, giấy phép lái xe,…) và đồng kiểm với shipper trước
              khi nhận hàng. Mọi khiếu nại sau khi khách ký nhận sẽ không được giải quyết.
            </div>
          )}
        </div>
      </div>
      <div className={style.actions}>
        {paymentMethod === PAYMENT_METHOD_TYPE.MOMO.id && status === ORDER_TYPE.UNPAID && (
          <SubmitButton
            style={Object.assign({}, STYLE.button, STYLE.buttonMomo)}
            titleStyle={STYLE.button.titleStyle}
            title="Thanh toán bằng ví MoMo"
            icon="color-momo"
            onSubmit={() => onClickPaymentWithMomo()}
          />
        )}
        <SubmitButton
          style={Object.assign({}, STYLE.button, STYLE.buttonTrack)}
          titleStyle={STYLE.button.titleStyle}
          title="Theo dõi đơn hàng"
          onSubmit={() => onClickOrderTracking(number)}
        />
      </div>
    </div>
  );
};

interface AccumulationsFromOrderProps {
  order: Order | null;
  classes?: { container?: string; accumulations?: string };
}
const AccumulationsFromOrder = ({ order, classes }: AccumulationsFromOrderProps) => {
  const navigate = useNavigate();

  const lixicoinAccumulation = order?.lixicoin_bonus;
  const cashbackAccumulation = order?.cashback?.bonus;

  return (
    (!!lixicoinAccumulation || !!cashbackAccumulation) && (
      <div className={classNames(style.accumulationsFromOrder, classes?.container)}>
        <div className={style.header}>🎉 Bạn nhận được:</div>
        <div className={classNames(style.accumulations, classes?.accumulations)}>
          {!!lixicoinAccumulation && (
            <div className={style.accumulation}>
              <div className={style.title} onClick={() => navigate(ROUTINGS.ROUTING_LIXI_COIN)}>
                Lixicoin
              </div>
              <SvgIcon name="info" className={style.icon} onClick={() => navigate(ROUTINGS.ROUTING_LIXI_COIN)} />
              <div className={style.value}>
                +{formatCurrency(lixicoinAccumulation, { suffix: CustomCurrencyType.LIXICOIN })}
              </div>
            </div>
          )}
          {!!cashbackAccumulation && (
            <div className={style.accumulation}>
              <div className={style.title} onClick={() => navigate(ROUTINGS.ROUTING_BALANCE)}>
                Hoàn tiền
              </div>
              <SvgIcon name="info" className={style.icon} onClick={() => navigate(ROUTINGS.ROUTING_BALANCE)} />
              <div className={style.value}>+{formatCurrency(cashbackAccumulation, { suffix: true })}</div>
            </div>
          )}
        </div>
      </div>
    )
  );
};

interface OrderInfoBlockProps {
  cartStore: any;
  copyTextToClipboard: (text: string) => any;
  onClickOrderTracking: (orderNumber: string) => any;
  onClickPaymentWithMomo: () => any;
}
const OrderInfo = ({
  cartStore: {
    orderInfo,
    orderInfo: {
      number,
      first_name,
      last_name,
      full_address,
      payment_method,
      total_price,
      phone,
      status,
      shipping_method
    }
  },
  copyTextToClipboard,
  onClickOrderTracking,
  onClickPaymentWithMomo
}: OrderInfoBlockProps) => {
  return (
    <div
      className={classNames(style.orderInfoBlock, !isMobileVersion() && style.orderInfoBlockDesktop)}
      style={Object.assign({}, !isMobileVersion() && { backgroundImage: `url(${orderInfoBackground})` })}
      {...generateTestId({ name: 'order-info' })}
    >
      <ThankYouMesssage />
      <AccumulationsFromOrder order={orderInfo} classes={{ container: style.accumulationsFromOrderBlock }} />
      {!!Object.keys(orderInfo).length && (
        <OrderDetails
          order={{
            number,
            name: `${first_name} ${last_name}`,
            phone,
            address: full_address,
            price: total_price,
            paymentMethod: payment_method,
            status,
            deliveryType: shipping_method
          }}
          copyTextToClipboard={copyTextToClipboard}
          onClickOrderTracking={onClickOrderTracking}
          onClickPaymentWithMomo={onClickPaymentWithMomo}
        />
      )}
      {/* TODO: Refactor into ::before or backdrop-filter */}
      <div className={style.overlay} style={{ backgroundImage: `url(${orderInfoBackground})` }} />
    </div>
  );
};

export default OrderInfo;
