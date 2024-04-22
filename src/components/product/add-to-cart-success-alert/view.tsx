import { currenyFormat } from '../../../utils/currency';
import { ROUTING_CHECK_OUT } from '../../../routings/path';
import SubmitButton from '../../ui/submit-button';
import Image from 'presentation-component/ui/image';
import { Heading } from 'presentation-component/modal/general-modal/component';
import DiscountCode from 'components/cart/discount-code';
import * as LAYOUT from 'style/layout';
import { IProps, IState } from './model';
import STYLE from './style';
import styles from './style.module.scss';

export function renderComponent({
  props,
  state,
  handleCloseModal,
  handleTouchStart,
  handleTouchMove,
  handleShowRemoveConfirm,
  handleRemoveCart
}) {
  const { data, closeModal } = props as IProps;
  const { isCloseCheckoutModal, isRemoveConfirmation } = state as IState;

  const contentStyle = STYLE.container.content;

  const headingProps = {
    title: 'Đã thêm vào giỏ hàng',
    rightIcon: 'close',
    onRightActionClick: closeModal
  };

  return (
    <div style={Object.assign({}, STYLE.container, true && !isCloseCheckoutModal && STYLE.container.visible)}>
      <Heading {...headingProps} />
      <div style={contentStyle}>
        <div onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} style={contentStyle.productInfo}>
          <div
            style={Object.assign(
              {},
              contentStyle.productInfo.avatarContainer,
              isRemoveConfirmation && contentStyle.productInfo.hidden
            )}
          >
            <Image src={data.product.image} style={contentStyle.productInfo.avatarContainer.img} alt={''} />
          </div>
          <div style={contentStyle.productInfo.info}>
            <div style={contentStyle.productInfo.info.name}>{data.product.name}</div>
            <div style={contentStyle.productInfo.info.price}>{currenyFormat(data.product.price)}</div>
          </div>
          <div
            style={Object.assign(
              {},
              contentStyle.productInfo.removeConfirmation,
              isRemoveConfirmation && contentStyle.productInfo.removeConfirmation.show
            )}
          >
            <div style={contentStyle.productInfo.removeConfirmation.text}>Xác nhận xóa sản phẩm?</div>
            <div
              style={Object.assign(
                {},
                LAYOUT.flexContainer.justify,
                contentStyle.productInfo.removeConfirmation.action
              )}
            >
              <SubmitButton
                title={'Xóa'}
                color={'red'}
                style={contentStyle.productInfo.removeConfirmation.action.button}
                onSubmit={handleRemoveCart}
              />
              <SubmitButton
                title={'Huỷ'}
                color={'borderWwhite'}
                style={contentStyle.productInfo.removeConfirmation.action.button}
                onSubmit={handleShowRemoveConfirm}
              />
            </div>
          </div>
        </div>
        <DiscountCode
          mode="suggestionsOnly"
          suggestionViewMode="plain"
          classes={{ container: styles.discountCodeSuggestions }}
        />
        <SubmitButton
          icon={'cart'}
          style={{ margin: '-2px 0 0' }}
          styleIcon={{ color: '#FFF' }}
          type={'link'}
          link={ROUTING_CHECK_OUT}
          title={'Xem giỏ hàng'}
        />
      </div>
    </div>
  );
}
