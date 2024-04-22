import { NavLink } from 'react-router-dom';
import { ROUTING_BRAND_DETAIL_PATH } from 'routings/path';
import { CombinedProduct } from '../../../model';
import styles from './style.module.scss';

interface BrandNameProps {
  combinedProduct: CombinedProduct;
}
const BrandName = ({ combinedProduct }: BrandNameProps) => {
  const path = `${ROUTING_BRAND_DETAIL_PATH}/${combinedProduct.brandUrl}`;

  return 0 !== combinedProduct.brand.length ? (
    <div className={styles.container}>
      <NavLink to={path} className={styles.navLink}>
        {combinedProduct.brand}
      </NavLink>
    </div>
  ) : null;
};

export default BrandName;
