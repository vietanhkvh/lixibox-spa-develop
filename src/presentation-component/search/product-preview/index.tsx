import { generatePath } from 'react-router-dom';
import AdLink from 'presentation-component/ui/ad-link';
import classNames from 'classnames';
import Image from 'presentation-component/ui/image';
import StarRating from 'presentation-component/ui/star-rating';
import { StarRatingValue } from 'presentation-component/ui/star-rating/component';
import { ROUTING_PRODUCT_DETAIL } from 'routings/path';
import { ProductBox } from 'types/api/shop';
import styles from './style.module.scss';

interface ProductPreviewProps {
  box: ProductBox;
  classes?: { container?: string };
  onClick?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, path: string) => void;
}
const ProductPreview = ({ box, classes, onClick }: ProductPreviewProps) => {
  const productPath = box?.slug ? generatePath(ROUTING_PRODUCT_DETAIL, { idProduct: box.slug }) : '#';
  const rating = Math.floor((box?.avg_rate as any) || 0) as StarRatingValue;
  const ratingCount = box?.rating_count || 0;

  return (
    <AdLink
      {...{
        className: classNames(styles.productPreview, classes?.container),
        to: productPath,
        onClick: (e) => onClick?.(e, productPath)
      }}
    >
      <div className={styles.leftSection}>
        <Image src={box?.primary_picture?.thumb_url} alt={'No image'} className={styles.image} />
      </div>
      <div className={styles.rightSection}>
        <div className={classNames(styles.title, 'lineClamp2')}>{box?.name}</div>
        <div className={styles.review}>
          <StarRating rating={rating} classes={{ container: styles.rating, star: styles.star }} />
          {!!ratingCount && <div className={styles.reviewCount}>({ratingCount})</div>}
        </div>
      </div>
    </AdLink>
  );
};

export default ProductPreview;
