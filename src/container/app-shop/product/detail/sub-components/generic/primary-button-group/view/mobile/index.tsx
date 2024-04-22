import { useHistory } from 'react-router-dom';
import classNames from 'classnames';
import ButtonSubmit from 'components/ui/submit-button';
import ButtonSubmit2 from 'presentation-component/ui/submit-button';
import Icon from 'components/ui/icon';
import { ROUTING_CHECK_OUT } from 'routings/path';
import * as LAYOUT from 'style/layout';
import { ViewProps } from '../../component';
import styles from './style.module.scss';
import STYLE from './style';

const CartButton = ({ cartItems, isPriceBtnOnTop }) => {
  const history = useHistory();
  let totalQuantity = 0;
  Array.isArray(cartItems) && cartItems.map((item) => (totalQuantity += item.quantity));

  return (
    <div
      {...{
        onClick: () => (Array.isArray(cartItems) && cartItems.length > 0 ? history.push(ROUTING_CHECK_OUT) : {}),
        style: Object.assign(
          {},
          LAYOUT.flexContainer.verticalCenter,
          STYLE.shoppingCart,
          isPriceBtnOnTop && STYLE.shoppingCart.show
        )
      }}
    >
      <Icon
        {...{
          name: 'cart',
          style: STYLE.menuIcon,
          innerStyle: STYLE.menuIcon.inner
        }}
      />
      {!!isPriceBtnOnTop && !!cartItems && cartItems.length > 0 && (
        <span style={STYLE.shoppingCart.value}>{totalQuantity}</span>
      )}
    </div>
  );
};

const View = ({
  addToCartButtonProps,
  isLiked,
  isLoadingLove,
  classes,
  onWishlistClick,
  isPriceBtnOnTop,
  cartItems
}: ViewProps) => {
  return (
    <div
      {...{
        id: 'product-detail-group-btn',
        onTouchMove: (e) => e.preventDefault(),
        className: classNames('bottom-fixed-element', styles.container, classes?.container)
      }}
    >
      <ButtonSubmit
        loading={isLoadingLove}
        title={' '}
        icon={isLiked ? 'heart-full' : 'heart-line'}
        color={'lightGrey'}
        onSubmit={onWishlistClick}
        style={STYLE.mobileRatingGroup.loveAction.button}
        styleIcon={Object.assign(
          {},
          STYLE.mobileRatingGroup.loveAction.icon,
          !!isLiked && STYLE.mobileRatingGroup.loveAction.likedIcon
        )}
      />

      {/** Add to cart */}
      <ButtonSubmit2 {...addToCartButtonProps} classes={{ container: styles.addToCartButtonMobile }} />
      <CartButton {...{ cartItems, isPriceBtnOnTop }} />
    </div>
  );
};

export default View;
