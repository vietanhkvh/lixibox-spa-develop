import { useParams } from 'react-router-dom';

import { isMobileVersion } from '../../../utils/responsive';
import DiscountCodeBoxCategoryDetail from '../../../components/discount-code/box-category-detail';
import styles from './style.module.scss';

const DiscountCodeBoxCategoryDetailContainer = () => {
  const { discountCode, boxCategory } = useParams<{ discountCode: string; boxCategory: string }>();

  return (
    <DiscountCodeBoxCategoryDetail
      code={discountCode}
      boxCategory={boxCategory}
      classes={{ container: isMobileVersion() && styles.container }}
    />
  );
};

export default DiscountCodeBoxCategoryDetailContainer;
