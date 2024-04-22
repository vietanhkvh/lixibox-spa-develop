import { NavLink } from 'react-router-dom';

import Icon from '../../ui/icon';

import { ORDER_TYPE } from '../../../constants/application/order';
import { ROUTING_INFO_RECEIVE_AND_REDEEM } from '../../../routings/path';
import { numberFormat } from '../../../utils/format';
import { formatDateTime } from '../../../utils/date-time';
import { getProductStockNotice } from '../../../utils/model/product';
import { DATETIME_FORMAT_TYPE } from '../../../constants/application/global';
import { ROUTING_LIXI_COIN } from '../../../routings/path';
import { MODAL_TIME_FEE_SHIPPING, MODAL_STORE_BOXES } from '../../../constants/application/modal';

import STYLE from './style';
import * as LAYOUT from '../../../style/layout';
import { IProductSummaryProps } from './model';

export function renderComponent() {
  const {
    box,
    style,
    openModal,
    storeBoxes,
    constants,
    currencyFormatType,
    preOrderReleaseDate,
    lixicoinBonus,
    price = 0,
    preOrderStatus = '',
    boxId
  } = this.props as IProductSummaryProps;

  const thresholdToFreeship = (!!constants && constants.threshold_to_freeship) || 0;
  const { shouldShow: shouldShowProductStockNotice, notice: stockNotice } = getProductStockNotice({ box });

  return (
    <div style={Object.assign({}, STYLE.container, style)}>
      {/** 2. promotion text*/}
      {/** 2.1. lixicoint */}
      <div style={STYLE.promotionWrap}>
        {'currency' === currencyFormatType && !!lixicoinBonus && (
          <div
            style={Object.assign(
              {},
              LAYOUT.flexContainer.left,
              LAYOUT.flexContainer.verticalCenter,
              STYLE.promotionText
            )}
          >
            <Icon
              name={'dollar'}
              style={STYLE.promotionText.iconDollar}
              innerStyle={STYLE.promotionText.iconDollar.inner}
            />
            <div style={STYLE.promotionText.text}>
              Nhận ngay
              <NavLink
                to={ROUTING_LIXI_COIN}
                style={Object.assign({}, STYLE.promotionText.bold, STYLE.promotionText.link) as any}
              >
                {` ${numberFormat(lixicoinBonus)}`} Lixicoin
              </NavLink>
              khi mua sản phẩm này
            </div>
          </div>
        )}

        <div
          style={Object.assign({}, LAYOUT.flexContainer.left, LAYOUT.flexContainer.verticalCenter, STYLE.promotionText)}
        >
          <Icon name={'info'} style={STYLE.promotionText.iconFee} innerStyle={STYLE.promotionText.iconFee.inner} />
          <div style={STYLE.promotionText.text}>
            {`Xem chính sách `}
            <a
              href={ROUTING_INFO_RECEIVE_AND_REDEEM}
              target={'_blank'}
              rel="noreferrer"
              style={Object.assign({}, STYLE.promotionText.bold, { cursor: 'pointer' })}
            >
              Nhận hàng và Đổi trả
            </a>
          </div>
        </div>

        {/** 2.2. free delivery */}
        <div
          style={Object.assign({}, LAYOUT.flexContainer.left, LAYOUT.flexContainer.verticalCenter, STYLE.promotionText)}
        >
          <Icon
            name={'deliver'}
            style={STYLE.promotionText.iconDeliver}
            innerStyle={STYLE.promotionText.iconDeliver.inner}
          />
          <div style={STYLE.promotionText.text}>
            <span style={STYLE.promotionText.bold as any}>Miễn phí giao hàng</span>
            {price < thresholdToFreeship && `đơn hàng từ ${numberFormat(thresholdToFreeship)} đ`}
          </div>
        </div>

        {/** 2.2.1 Calculate time and fee of delivery */}
        <div
          style={Object.assign({}, LAYOUT.flexContainer.left, LAYOUT.flexContainer.verticalCenter, STYLE.promotionText)}
          onClick={() => openModal(MODAL_TIME_FEE_SHIPPING({ boxId: boxId }))}
        >
          <Icon name={'time'} style={STYLE.promotionText.iconFee} innerStyle={STYLE.promotionText.iconFee.inner} />
          <div style={STYLE.promotionText.text}>
            <span style={Object.assign({}, STYLE.promotionText.bold, { cursor: 'pointer' })}>
              Xem thời gian và phí giao hàng
            </span>
          </div>
        </div>

        {/** 2.3. Pre order release date */}
        {preOrderStatus === ORDER_TYPE.PENDING && (
          <div
            style={Object.assign(
              {},
              LAYOUT.flexContainer.left,
              LAYOUT.flexContainer.verticalCenter,
              STYLE.promotionText
            )}
          >
            <Icon
              name={'time'}
              style={STYLE.promotionText.iconPreOrder}
              innerStyle={STYLE.promotionText.iconPreOrder.inner}
            />
            <div style={STYLE.promotionText.text}>
              <span
                style={STYLE.promotionText.bold as any}
                title={formatDateTime(preOrderReleaseDate, DATETIME_FORMAT_TYPE.FULL_INFO)}
              >
                Dự kiến giao hàng từ ngày: {formatDateTime(preOrderReleaseDate, DATETIME_FORMAT_TYPE.DD_MM_YYYY)}
              </span>
            </div>
          </div>
        )}

        {!!shouldShowProductStockNotice && !!stockNotice && (
          <div
            style={Object.assign(
              {},
              LAYOUT.flexContainer.left,
              LAYOUT.flexContainer.verticalCenter,
              STYLE.promotionText
            )}
          >
            <Icon
              name={'danger'}
              style={STYLE.promotionText.iconDanger}
              innerStyle={STYLE.promotionText.iconDanger.inner}
            />
            <div style={STYLE.promotionText.red}>
              <span style={STYLE.promotionText.red}>{stockNotice}</span>
            </div>
          </div>
        )}
        {Array.isArray(storeBoxes) && storeBoxes.length > 0 && (
          <div
            style={Object.assign(
              {},
              LAYOUT.flexContainer.left,
              LAYOUT.flexContainer.verticalCenter,
              STYLE.promotionText
            )}
            onClick={() => openModal(MODAL_STORE_BOXES({ data: { storeBoxes, openModal } }))}
          >
            <Icon
              name={'store'}
              style={STYLE.promotionText.iconStore}
              innerStyle={STYLE.promotionText.iconStore.inner}
            />
            {
              <div style={STYLE.promotionText.text}>
                <span style={Object.assign({}, STYLE.promotionText.bold, { cursor: 'pointer' })}>
                  Có bán tại cửa hàng (Xem chi tiết)
                </span>
              </div>
            }
          </div>
        )}
      </div>
    </div>
  );
}
