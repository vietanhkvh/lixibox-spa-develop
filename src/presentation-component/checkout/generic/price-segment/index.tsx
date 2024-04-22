import classNames from 'classnames';
import { generateTestId } from 'utils/test-utils';
import styles from './style.module.scss';

interface PriceSegmentProps {
  label: string | React.ReactNode;
  value: string;
  isDisabled?: boolean;
  classes?: { container?: string; label?: string; value?: string };
  testId?: string;
}
const PriceSegment = ({ label, value, isDisabled, classes, testId }: PriceSegmentProps) => (
  <div className={classNames(styles.price, isDisabled && styles.priceDisabled, classes?.container)}>
    <div className={classNames(styles.type, classes?.label)}>{label}</div>
    <div {...generateTestId({ name: testId })} className={classNames(styles.value, classes?.value)}>
      {value}
    </div>
  </div>
);

export default PriceSegment;
