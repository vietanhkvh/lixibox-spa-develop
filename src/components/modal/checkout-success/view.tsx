import Icon from '../../../components/ui/icon';
import { formatPhoneNumber } from '../../../utils/format';
import { ROUTING_CHECK_OUT_SUCCESS } from '../../../routings/path';
import { PAYMENT_METHOD_TYPE, PAYMENT_METHOD_TITLE, PAYMENT_STATUS } from '../../../constants/application/payment';

import { ORDER_NOTE_FOR_USER } from '../../../constants/application/order';

import STYLE from './style';
import { IProps } from './model';

const renderItemData = (title, data, style = {}, id = '') => (
  <div style={STYLE.successTable.row}>
    <div style={STYLE.successTable.row.title}>{title}</div>
    <div style={Object.assign({}, STYLE.successTable.row.data, style)} id={id}>
      {data}
    </div>
  </div>
);

const renderOrderContent = ({ phone, number, paymentType, address, paymentStatus }) => (
  <div style={STYLE.successTable.container}>
    {renderItemData('Mã đơn hàng', number, {}, 'checkour-success-order-id')}
    {renderItemData('Số điện thoại', formatPhoneNumber(phone), STYLE.successTable.row.phone)}
    {renderItemData('Thanh toán', PAYMENT_METHOD_TITLE[paymentType])}
    {(paymentType === PAYMENT_METHOD_TYPE.ONEPAY_SUCCESS.id || paymentType === PAYMENT_METHOD_TYPE.ATM.id) &&
      renderItemData('Trạng thái', PAYMENT_STATUS[paymentStatus])}
    {renderItemData('Địa chỉ', address)}
    {paymentType === PAYMENT_METHOD_TYPE.COD.id &&
      renderItemData(
        ORDER_NOTE_FOR_USER.CHECK_ID.TITLE,
        ORDER_NOTE_FOR_USER.CHECK_ID.MESSAGE,
        STYLE.successTable.row.phone
      )}
    {renderItemData(
      ORDER_NOTE_FOR_USER.CHECK_PRODUCT.TITLE,
      ORDER_NOTE_FOR_USER.CHECK_PRODUCT.MESSAGE,
      STYLE.successTable.row.phone
    )}
  </div>
);

const renderThankyouMessage = () => (
  <div style={STYLE.footerOrder.panel}>
    <div style={STYLE.footerOrder.container}>
      <Icon name={'logo-line'} style={STYLE.thankyouHeading.icon} innerStyle={STYLE.thankyouHeading.innerIcon} />
      {renderTxt({
        text: 'CẢM ƠN BẠN ĐÃ LỰA CHỌN LIXIBOX',
        style: STYLE.footerOrder.container.txtInfo
      })}
      {renderTxt({
        text: 'Kênh mua sắm mỹ phẩm, làm đẹp được các chuyên gia lựa chọn và giới thiệu những sản phẩm yêu thích và chất lượng đến khách hàng và người hâm mộ',
        style: STYLE.footerOrder.container.txtInfo
      })}
    </div>
  </div>
);

const renderOrder = ({ phone, number, history, paymentType, address, paymentStatus, totalPrice, bankAccount }) => (
  <div style={STYLE.blockContainer(true, paymentType === PAYMENT_METHOD_TYPE.BANK.id)}>
    {renderThankyouMessage()}
    {renderOrderContent({ phone, number, paymentType, address, paymentStatus })}
    {paymentType === PAYMENT_METHOD_TYPE.BANK.id && renderPaymentInfo({ number, bankAccount, totalPrice })}
    {renderDetailBtn({ history })}
  </div>
);

const renderTxt = ({ text, style }) => <div style={style}>{text}</div>;

const renderPaymentInfo = ({ number, bankAccount, totalPrice }) => (
  <div style={STYLE.paymentInfo}>
    {renderTxt({
      text: 'Thông tin chuyển khoản',
      style: STYLE.paymentInfo.title
    })}
    <div style={Object.assign({}, STYLE.successTable.container, STYLE.paymentInfo.container)}>
      {renderItemData('Ngân hàng', (bankAccount && bankAccount.bank) || '')}
      {renderItemData('Người nhận', (bankAccount && bankAccount.owner) || '')}
      {renderItemData('Số tài khoản', (bankAccount && bankAccount.number) || '')}
      {renderItemData('Nội dung', number || '')}
      {renderItemData('Số tiền', totalPrice || '')}
    </div>
    {renderTxt({
      text: '* Lưu ý: bạn cần ghi rõ nội dung khi chuyển khoản là mã đơn hàng để Lixibox có thể xác nhận thanh toán cho đơn hàng của bạn.',
      style: STYLE.paymentInfo.text
    })}
  </div>
);

const renderDetailBtn = ({ history }) => (
  <div style={STYLE.detailBtn} onClick={() => history.push(ROUTING_CHECK_OUT_SUCCESS)}>
    <div style={STYLE.detailBtn.btn}>Xem chi tiết</div>
  </div>
);

export function renderComponent({ props }) {
  const {
    data: {
      orderInfo: { number, full_address, payment_method, total_price, phone },
      paymentStatus,
      constants
    },
    history
  } = props as IProps;

  return (
    <div className={'check-out-success-container'} style={STYLE.container}>
      {renderOrder({
        phone,
        number,
        history,
        paymentStatus,
        address: full_address,
        totalPrice: total_price,
        paymentType: payment_method,
        bankAccount: (constants && constants.bank_account) || ''
      })}
    </div>
  );
}
