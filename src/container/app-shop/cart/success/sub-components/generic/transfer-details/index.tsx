import classNames from 'classnames';
import SvgIcon from '../../../../../../../presentation-component/ui/icon';
import Image from 'presentation-component/ui/image/component';
import { formatCurrency } from '../../../../../../../utils/currency';
import { generateTestId } from 'utils/test-utils';
import style from './style.module.scss';

interface TransferDetailsProps {
  className: string;
  bankAccount: { bank: string; owner: string; number: string };
  order: { number: number; price: number; paymentQr?: string };
  onCopyTextToClipboard: (text: string | number) => any;
}
const TransferDetails = ({
  className,
  bankAccount: { bank: bankName, owner: accountOwner, number: accountNumber },
  onCopyTextToClipboard,
  order: { number: orderNumber, price: orderPrice, paymentQr: orderPaymentQr }
}: TransferDetailsProps) => {
  return (
    <div className={classNames(style.transferDetails, className)} {...generateTestId({ name: 'transfer-details' })}>
      <div className={style.title}>Thông tin chuyển khoản</div>
      <div className={style.details}>
        <table className={style.properties}>
          <tbody>
            <tr className={style.row}>
              <td className={style.key}>Ngân hàng</td>
              <td className={style.value}>{bankName}</td>
            </tr>
            <tr className={style.row}>
              <td className={style.key}>Chủ tài khoản</td>
              <td className={style.value}>
                <div className={style.text}>{accountOwner}</div>
                <SvgIcon name="copy" className={style.copyAction} onClick={() => onCopyTextToClipboard(accountOwner)} />
              </td>
            </tr>
            <tr className={style.row}>
              <td className={style.key}>Số tài khoản</td>
              <td className={style.value}>
                <div className={style.text}>{accountNumber}</div>
                <SvgIcon
                  name="copy"
                  className={style.copyAction}
                  onClick={() => onCopyTextToClipboard(accountNumber)}
                />
              </td>
            </tr>
            <tr className={style.row}>
              <td className={style.key}>Nội dung</td>
              <td className={style.value}>
                <div className={style.text}>{orderNumber}</div>
                <SvgIcon name="copy" className={style.copyAction} onClick={() => onCopyTextToClipboard(orderNumber)} />
              </td>
            </tr>
            <tr className={style.row}>
              <td className={style.key}>Số tiền</td>
              <td className={style.value}>
                <div className={style.text}>{formatCurrency(orderPrice, { suffix: true })}</div>
                <SvgIcon name="copy" className={style.copyAction} onClick={() => onCopyTextToClipboard(orderPrice)} />
              </td>
            </tr>
          </tbody>
        </table>
        {!!orderPaymentQr && (
          <div className={style.qrCode}>
            <div className={style.dividerContainer}>
              <div className={style.dividerText}>hoặc</div>
            </div>
            <Image src={orderPaymentQr} alt="qr-code-payment" className={style.image} />
            <span className={style.text}>Scan mã QR từ app thanh toán của bạn</span>
          </div>
        )}
        <div className={style.notes}>
          <div className={style.note}>
            * Lưu ý:
            <br />
            - Bạn cần ghi rõ nội dung khi chuyển khoản là mã đơn hàng của bạn để Lixibox có thể xác nhận thanh toán cho
            đơn hàng của bạn.
            <br />- Vui lòng chuyển khoản trong vòng 2 ngày tới để đảm bảo còn hàng cho bạn.
          </div>
        </div>
      </div>
    </div>
  );
};
TransferDetails.defaultProps = {
  className: ''
};

export default TransferDetails;
