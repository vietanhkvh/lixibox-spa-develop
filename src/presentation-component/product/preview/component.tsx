import classNames from 'classnames';

import Image from 'presentation-component/ui/image';
import styles from './style.module.scss';
import { formatCurrency } from '../../../utils/currency';

interface ProductPreviewProps {
  product: { [key: string]: any };
  classes?: { container?: string };
}
const ProductPreview = ({ product, classes }: ProductPreviewProps) => {
  const { name, primary_picture, price: _price, original_price: _original_price } = product;
  const image = primary_picture.thumb_url;
  const original_price = _original_price || 0;
  const price = _price || 0;
  const discount = original_price - price;
  const discountPercentage = original_price ? Math.ceil(100 - (100 / original_price) * discount) : 0;

  return (
    <div className={classNames(styles.container, classes && classes.container)}>
      {!!image && (
        <div className={styles.image}>
          <Image alt={name} src={image} />
        </div>
      )}
      <div className={styles.summary}>
        <div className={styles.title}>{name}</div>
        <div className={styles.meta}>
          <div className={styles.price}>{formatCurrency(price, { suffix: true })}</div>
          {!!discount && (
            <>
              <div className={styles.originalPrice}>{formatCurrency(original_price, { suffix: true })}</div>
              <div className={styles.discountPercentage}>
                <div className={styles.content}>-{discountPercentage}%</div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductPreview;
