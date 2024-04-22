import { DiscountCode } from 'types/api/gwp';
import DiscountBlock from '../../../components/ui/discount-block';
import styles from './style.module.scss';
import STYLE from './style';

interface DiscountCoupon2Props {
  discountCode: DiscountCode;
  classes?: { container?: string };
  onClick?: (discountCode: DiscountCode) => void;
}
const DiscountCoupon2 = ({ discountCode, classes, onClick }: DiscountCoupon2Props) => {
  return (
    <DiscountBlock
      {...{
        onClick: () => onClick?.(discountCode),
        style: STYLE.discountCountCodeList.item,
        innerStyle: STYLE.discountCountCodeList.innerItem,
        className: classes?.container || ''
      }}
    >
      <div style={STYLE.discountCountCodeList.code}>{discountCode?.code || ''}</div>
      <div className={styles.disountCodeItemDescription} style={STYLE.discountCountCodeList.description}>
        {discountCode?.description || ''}
      </div>
    </DiscountBlock>
  );
};

export default DiscountCoupon2;
