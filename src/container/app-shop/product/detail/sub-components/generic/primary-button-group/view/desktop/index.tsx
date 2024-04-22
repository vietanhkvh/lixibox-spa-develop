import classNames from 'classnames';
import ButtonSubmit from 'components/ui/submit-button';
import ButtonSubmit2 from 'presentation-component/ui/submit-button';
import { ViewProps } from '../../component';
import styles from './style.module.scss';
import STYLE from './style';

const View = ({ addToCartButtonProps, isLoadingLove, isLiked, onWishlistClick, classes }: ViewProps) => {
  return (
    <div className={classNames(styles.container, classes?.container)} style={STYLE.desktop.buttonGroup}>
      {/** Add to cart */}
      <ButtonSubmit2 {...addToCartButtonProps} classes={{ container: styles.addToCartButtonDesktop }} />

      {/** Add to wish list */}
      <ButtonSubmit
        {...{
          loading: isLoadingLove,
          title: isLiked ? 'Đã thích' : 'Yêu thích',
          icon: isLiked ? 'heart-full' : 'heart-line',
          color: isLiked ? 'borderBlack' : 'borderBlack',
          onSubmit: onWishlistClick,
          style: Object.assign({}, STYLE.desktop.buttonGroup.button, STYLE.desktop.buttonGroup.button.right),
          styleIcon: Object.assign(
            {},
            STYLE.desktop.buttonGroup.button.iconLove,
            true === isLiked && STYLE.desktop.buttonGroup.button.iconLove.liked
          ),
          dataTestId: 'love-button'
        }}
      />
    </div>
  );
};

export default View;
