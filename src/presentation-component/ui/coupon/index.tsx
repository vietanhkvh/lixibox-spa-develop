import classNames from 'classnames';
import Icon from 'presentation-component/ui/icon';
import DiscountBlock from 'presentation-component/ui/discount-block';
import * as VARIABLE from 'style/variable';
import styles from './style.module.scss';

interface CouponProps {
  code: string;
  color?: string;
  classes?: { container?: string; innerContainer?: string; content?: string; copyIcon?: string };
  onCopy?: (code: string) => void;
  withoutCopyIcon?: boolean;
  isCentered?: boolean;
}
const Coupon = ({ code, color, classes, withoutCopyIcon, isCentered, onCopy }: CouponProps) => {
  return (
    <DiscountBlock
      classes={{
        container: classNames(styles.container, !!onCopy && styles.clickable, classes?.container),
        content: classNames(styles.innerContainer, isCentered && styles.centered, classes?.innerContainer)
      }}
      edgeColor={color}
      onClick={() => onCopy?.(code)}
    >
      <div className={classNames(styles.content, isCentered && styles.centered, classes?.content)}>{code}</div>
      {!isCentered && !withoutCopyIcon && !!onCopy && (
        <Icon name="copy" className={classNames(styles.copyButton, classes?.copyIcon)} />
      )}
    </DiscountBlock>
  );
};
Coupon.defaultProps = {
  color: VARIABLE.colorWhite
};

export default Coupon;
