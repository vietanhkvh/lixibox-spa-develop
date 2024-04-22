import classNames from 'classnames';

import { isMobileVersion } from 'utils';
import { formatCurrency } from 'utils/currency';
import { CombinedProduct } from '../../../model';
import styles from './style.module.scss';
import { generateTestId } from 'utils/test-utils';

interface PricingInfoProps {
  combinedProduct: CombinedProduct;
}
const PricingInfo = ({ combinedProduct }: PricingInfoProps) => {
  return !!combinedProduct.currentPrice && !!combinedProduct.oldPrice ? (
    <div className={classNames(styles.container, isMobileVersion() && styles.containerMobile)}>
      <div {...generateTestId({ name: 'price-item-product-detail' })} className={styles.currentPrice}>
        {formatCurrency(combinedProduct.currentPrice, { suffix: true })}
      </div>
      {combinedProduct.oldPrice > combinedProduct.currentPrice && (
        <>
          <div className={styles.oldPrice}>
            (trị giá{' '}
            {formatCurrency(combinedProduct.oldPrice, {
              suffix: true
            })}
            )
          </div>
          {/* 
            TODO: Just comment out by request from CEO
            <div className={styles.discount}>{`-${Math.floor(
              ((combinedProduct.oldPrice - combinedProduct.currentPrice) / combinedProduct.oldPrice) * 100)}%`}
            </div> 
          */}
        </>
      )}
    </div>
  ) : null;
};

export default PricingInfo;
