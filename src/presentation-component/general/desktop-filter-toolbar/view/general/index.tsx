import classnames from 'classnames';

import SvgIcon from '../../../../ui/icon';
import styles from './style.module.scss';

export const HeadingItem = ({ className = '', title, value, onClick, isLeftAlign = false }) => {
  const angleIconProps = {
    name: 'angle-left',
    className: styles.angleIcon
  };

  return (
    <div className={classnames(styles.headingPanel, { [styles.left]: !!isLeftAlign }, className)} onClick={onClick}>
      <div className={styles.heading}>
        {title}
        <SvgIcon {...angleIconProps} />
      </div>
      <div className={styles.title}>{value}</div>
    </div>
  );
};
