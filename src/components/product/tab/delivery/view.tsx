import Image from 'presentation-component/ui/image';
import DeliverCalculator from '../../../delivery/calculator';
import * as TYPOGRAPHY from '../../../../style/typography';
import STYLE from './style';

import { CDN_ASSETS_PREFIX } from '../../../../utils/uri';
let IMAGE_BANK_LIST = CDN_ASSETS_PREFIX('/product/bank-list.jpg');

export function renderComponent() {
  const { data } = this.props;

  return (
    <div style={STYLE.container}>
      {/** 1. Top info */}
      <div style={STYLE.top}>
        <div style={TYPOGRAPHY.title.normal}>Giao hàng trên toàn quốc</div>
        <div style={TYPOGRAPHY.bodyText.normal}>
          Để biết thời gian giao hàng và dự kiến, vui lòng nhập thông tin về địa điểm nhận hàng:
        </div>
      </div>

      {/** 2. Select box for country + calculate price */}
      <DeliverCalculator style={STYLE.deliverCalculator} boxId={data.boxId || 0} />

      {/** 3. Bottom info */}
      <div style={TYPOGRAPHY.title.normal}>THANH TOÁN ONLINE TIỆN LỢI, AN TOÀN</div>
      <div style={TYPOGRAPHY.bodyText.normal}>
        Nhận thanh toán trực tiếp qua COD (tiền mặt), thẻ ATM, thẻ tín dụng VISA, MasterCard qua cổng OnePay hoặc chuyển
        khoản qua ngân hàng.
      </div>

      <Image alt={''} style={STYLE.bankList} src={IMAGE_BANK_LIST} />
    </div>
  );
}
