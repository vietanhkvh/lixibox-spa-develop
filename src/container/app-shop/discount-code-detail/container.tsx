import { useParams } from 'react-router-dom';

import { isMobileVersion } from '../../../utils/responsive';
import DiscountCodeDetail from '../../../components/discount-code/detail';
import styles from './style.module.scss';

const DiscountCodeDetailContainer = () => {
  const { discountCode } = useParams<{ discountCode: string }>();

  return <DiscountCodeDetail code={discountCode} classes={{ container: isMobileVersion() && styles.container }} />;
};

export default DiscountCodeDetailContainer;
