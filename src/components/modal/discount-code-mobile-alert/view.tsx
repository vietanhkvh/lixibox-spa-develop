import { NavLink } from 'react-router-dom';

import { currenyFormat } from '../../../utils/currency';
import { ROUTING_DISCOUNT_CODE_PATH } from '../../../routings/path';
import Icon from '../../../components/ui/icon';

import STYLE from './style';

const discountCodeStyle = STYLE.container.discountCodeList.discountCode;

function _renderDiscountCode(item) {
  return (
    <div style={discountCodeStyle.wrap} key={`discount-code-item-${item.id}`}>
      <div style={discountCodeStyle.container} className={'bg-gift-code'}>
        <div style={discountCodeStyle.inner}>
          <div
            style={Object.assign(
              {},
              discountCodeStyle.icon,
              this.subtotalPrice < item.order_price_min && discountCodeStyle.icon.disabled
            )}
          />
          {this.subtotalPrice < item.order_price_min ? (
            <div style={discountCodeStyle.content}>
              Mua thêm{' '}
              <span style={discountCodeStyle.content.price}>
                {currenyFormat(item.order_price_min - this.subtotalPrice)}
              </span>{' '}
              để được {item.description}
            </div>
          ) : (
            <div style={discountCodeStyle.content}>
              {item.description}
              {` khi nhập mã `}
              <NavLink to={`${ROUTING_DISCOUNT_CODE_PATH}/${item.code}`} style={discountCodeStyle.content.code}>
                {item.code}
              </NavLink>
              .{' '}
              <div
                style={discountCodeStyle.content.link}
                onClick={() =>
                  this.addDiscountCodeAction({
                    discountCode: item.code.toUpperCase(),
                    isOpenCartSummary: false,
                    whereAdded: 'Discount code mobile alert'
                  })
                }
              >
                Áp dụng
              </div>
            </div>
          )}
          <div
            style={Object.assign(
              {},
              discountCodeStyle.progressBar,
              this.subtotalPrice < item.order_price_min && discountCodeStyle.progressBar.disabled
            )}
            className={'prbar'}
          >
            <div
              style={{
                width: `${(this.subtotalPrice / item.order_price_min) * 100}%`
              }}
              className={'prpos'}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export function renderComponent({ props }) {
  const {
    closeModal,
    data: { suggestionDiscountCodes, cartDetail, addDiscountCodeAction }
  } = props;

  const subtotalPrice = (cartDetail && cartDetail.subtotal_price) || 0;

  const closeIconProps = {
    name: 'close',
    style: STYLE.wrap.header.close.icon,
    innerStyle: STYLE.wrap.header.close.innerIcon,
    onClick: closeModal
  };

  return (
    <div style={STYLE.wrap}>
      <div style={STYLE.wrap.header}>
        <div style={STYLE.wrap.header.title}>NHẬP MÃ - NHẬN QUÀ</div>
        <Icon {...closeIconProps} />
      </div>
      <div style={STYLE.wrap.list}>
        <div style={STYLE.wrap.list.panel}>
          {Array.isArray(suggestionDiscountCodes) &&
            !!suggestionDiscountCodes.length &&
            suggestionDiscountCodes.map(_renderDiscountCode, {
              subtotalPrice,
              addDiscountCodeAction
            })}
        </div>
      </div>
    </div>
  );
}
