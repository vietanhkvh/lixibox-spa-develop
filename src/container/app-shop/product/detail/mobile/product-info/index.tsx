import Icon from '../../../../../../components/ui/icon';

import { MODAL_STORE_BOXES } from '../../../../../../constants/application/modal';
import { formatDateTime } from '../../../../../../utils/date-time';
import { DATETIME_FORMAT_TYPE } from '../../../../../../constants/application/global';

import { MODAL_TIME_FEE_SHIPPING } from '../../../../../../constants/application/modal';
import { numberFormat } from '../../../../../../utils/format';
import { ORDER_TYPE } from '../../../../../../constants/application/order';

import STYLE from './style';

export const renderProductInfo = ({
  productId = 0,
  stock,
  price,
  storeBoxes,
  lixicoinBonus,
  preOrderStatus,
  openModalAction,
  currencyFormatType,
  preOrderReleaseDate,
  constants
}) => {
  const mobileProductInfo = STYLE.newMobile.mobileProductInfo;
  const currencyIconProps = {
    name: 'dollar',
    style: mobileProductInfo.currency.icon,
    innerStyle: mobileProductInfo.currency.innerIcon
  };

  const deliveryIconProps = {
    name: 'deliver',
    style: mobileProductInfo.delivery.icon,
    innerStyle: mobileProductInfo.delivery.innerIcon
  };

  const timeFeeShippingIconProps = {
    name: 'time',
    style: mobileProductInfo.timeFee.icon,
    innerStyle: mobileProductInfo.timeFee.innerIcon
  };

  const timeIconProps = {
    name: 'time',
    style: mobileProductInfo.receivingDate.icon,
    innerStyle: mobileProductInfo.receivingDate.innerIcon
  };

  const outOfStockIconProps = {
    name: 'danger',
    style: mobileProductInfo.outOfStock.icon,
    innerStyle: mobileProductInfo.outOfStock.innerIcon
  };

  const storeIconProps = {
    name: 'store',
    style: mobileProductInfo.storeAddress.icon,
    innerStyle: mobileProductInfo.storeAddress.innerIcon
  };

  const thresholdToFreeship = constants.threshold_to_freeship || 0;

  return (
    <div style={mobileProductInfo}>
      {'currency' === currencyFormatType && !!lixicoinBonus && (
        <div style={mobileProductInfo.row}>
          <Icon {...currencyIconProps} />
          <div style={mobileProductInfo.text}>
            Nhận ngay {numberFormat(lixicoinBonus)} Lixicoin khi mua sản phẩm này
          </div>
        </div>
      )}

      <div style={mobileProductInfo.row}>
        <Icon {...deliveryIconProps} />
        <div style={mobileProductInfo.text}>
          Miễn phí giao hàng {price < thresholdToFreeship && `đơn hàng từ ${numberFormat(thresholdToFreeship)} đ`}
        </div>
      </div>

      <div style={mobileProductInfo.row} onClick={() => openModalAction(MODAL_TIME_FEE_SHIPPING({ boxId: productId }))}>
        <Icon {...timeFeeShippingIconProps} />
        <div style={mobileProductInfo.text}>Xem thời gian và phí giao hàng</div>
      </div>

      {preOrderStatus === ORDER_TYPE.PENDING && (
        <div style={mobileProductInfo.row}>
          <Icon {...timeIconProps} />
          <div style={mobileProductInfo.text}>
            <span
              style={STYLE.promotionText.bold}
              title={formatDateTime(preOrderReleaseDate, DATETIME_FORMAT_TYPE.FULL_INFO)}
            >
              Dự kiến giao hàng từ ngày: {formatDateTime(preOrderReleaseDate, DATETIME_FORMAT_TYPE.DD_MM_YYYY)}
            </span>
          </div>
        </div>
      )}

      {stock <= 5 && (
        <div style={mobileProductInfo.row}>
          <Icon {...outOfStockIconProps} />
          <div style={mobileProductInfo.redText}>
            {0 === stock ? 'Sản phẩm tạm thời hết hàng' : `Chỉ còn ${stock} sản phẩm`}
          </div>
        </div>
      )}

      {Array.isArray(storeBoxes) && storeBoxes.length > 0 && (
        <div
          style={mobileProductInfo.row}
          onClick={() =>
            openModalAction(
              MODAL_STORE_BOXES({
                data: { storeBoxes, openModal: openModalAction }
              })
            )
          }
        >
          <Icon {...storeIconProps} />
          {<div style={mobileProductInfo.text}>Có bán tại cửa hàng (Xem chi tiết)</div>}
        </div>
      )}
    </div>
  );
};
