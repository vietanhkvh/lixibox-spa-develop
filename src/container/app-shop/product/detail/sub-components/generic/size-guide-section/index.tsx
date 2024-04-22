import { MouseEventHandler } from 'react';
import classNames from 'classnames';
import SvgIcon from 'presentation-component/ui/icon';
import styles from './style.module.scss';

interface SizeGuideSectionProps {
  classes?: { container?: string };
  onClick?: MouseEventHandler<HTMLDivElement>;
}
const SizeGuideSection = ({ classes, onClick }: SizeGuideSectionProps) => {
  return (
    <div className={classNames(styles.container, classes?.container)} onClick={onClick}>
      <SvgIcon name={'size-guide'} className={styles.sizeGuideIcon} />
      Hướng dẫn chọn kích thước
    </div>
  );
};

export default SizeGuideSection;
