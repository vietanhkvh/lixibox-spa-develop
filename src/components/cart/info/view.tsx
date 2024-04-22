import SubmitButton from '../../ui/submit-button';
import Icon from '../../ui/icon';

import { ROUTING_CHECK_OUT } from '../../../routings/path';
import { currenyFormat } from '../../../utils/currency';
import { numberFormat } from '../../../utils/format';
import { generateTestId } from 'utils/test-utils';

import * as LAYOUT from '../../../style/layout';
import { ICartInfoProps, ICartInfoState } from './model';
import STYLE from './style';

export function renderComponent() {
  const { data, isAllowCollapse, isShowActionButton, showHideCartSumaryLayoutAction, history } = this
    .props as ICartInfoProps;
  const { collapse } = this.state as ICartInfoState;

  return (
    <div className={'cart-info'} style={STYLE.container(isAllowCollapse)} {...generateTestId({ name: 'cart-info' })}>
      <div style={STYLE.cart.container(isShowActionButton)}>
        {isAllowCollapse && (
          <div
            onClick={() => {
              this.toggleCollapse();
            }}
            style={Object.assign(
              {},
              LAYOUT.flexContainer.center,
              LAYOUT.flexContainer.verticalCenter,
              STYLE.iconCollapse,
              collapse && STYLE.iconCollapse.collapse
            )}
          >
            <Icon name={'angle-down'} style={STYLE.iconCollapse.icon} />
          </div>
        )}

        {!!collapse && isShowActionButton && (
          <SubmitButton
            dataTestId="btn-order-product-cart"
            title={'ĐẶT HÀNG NGAY'}
            color={'red'}
            style={STYLE.cart.button(collapse)}
            titleStyle={STYLE.cart.titleButton}
            onSubmit={() => {
              showHideCartSumaryLayoutAction?.(false);
              history.push(ROUTING_CHECK_OUT);
            }}
          />
        )}

        <div
          style={Object.assign(
            {},
            LAYOUT.flexContainer.justify,
            STYLE.cart.total,
            collapse && STYLE.cart.total.collapse
          )}
        >
          <div style={STYLE.cart.total.text}>Tạm tính:</div>
          <div {...generateTestId({ name: 'payment-amount-product-cart' })} style={STYLE.cart.total.price}>
            {currenyFormat(data.subtotal_price)}
          </div>
        </div>
        {!collapse && isShowActionButton && (
          <SubmitButton
            dataTestId="btn-order-product-cart"
            title={'ĐẶT HÀNG NGAY'}
            color={'red'}
            style={STYLE.cart.button(collapse)}
            titleStyle={STYLE.cart.titleButton}
            onSubmit={() => {
              showHideCartSumaryLayoutAction?.(false);
              history.push(ROUTING_CHECK_OUT);
            }}
          />
        )}
      </div>

      <div style={Object.assign({}, STYLE.lixicoin, collapse && STYLE.lixicoin.collapse)}>
        <div style={STYLE.lixicoin.text}>Bạn sẽ nhận được</div>
        <div style={STYLE.lixicoin.heading}>{`${numberFormat((data && data.lixicoin_bonus) || 0)} LIXICOIN`}</div>
        <div style={STYLE.lixicoin.text}>(sau khi thanh toán)</div>
        <div style={STYLE.lixicoin.text}>
          Thêm Lixicoin thêm nhiều ưu đãi cho box tiếp theo như được tặng mẫu dùng thử, mã giảm giá, free shipping, mua
          lẻ sản phẩm...
        </div>
      </div>
    </div>
  );
}
