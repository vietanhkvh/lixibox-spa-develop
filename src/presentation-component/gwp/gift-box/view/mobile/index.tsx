import classNames from 'classnames';
import { getBoxPrice } from 'utils/gwp';
import { formatCurrency } from 'utils/currency';
import Icon from 'presentation-component/ui/icon';
import { ViewProps } from '../..';
import styles from './style.module.scss';

const View = ({ box, classes, onBodyClick, onDetailButtonClick }: ViewProps) => {
  return (
    <div className={classNames(styles.container, classes?.container)} onClick={() => onBodyClick?.({ box })}>
      <div className={styles.sectionLeft}>
        <div className={styles.imageContainer}>
          {!box?.stock && <div className={styles.outOfStockLabel}>Hết quà</div>}
          <div className={styles.banner} style={{ backgroundImage: `url(${box?.primary_picture?.large_url})` }} />
        </div>
      </div>
      <div className={styles.sectionRight}>
        <div className={classNames(styles.title, 'lineClamp2')}>{box?.name || ''}</div>
        <div className={styles.value}>
          <Icon {...{ name: 'dollar', className: styles.valueIcon }} />
          <div className={styles.valueText}>trị giá {formatCurrency(getBoxPrice(box), { suffix: true })}</div>
        </div>
        {!!box?.is_bundle && (
          <div
            className={classNames(styles.button, !box?.stock && styles.buttonDisabled)}
            onClick={() => onDetailButtonClick?.({ box })}
          >
            <Icon {...{ name: 'gift', className: styles.buttonIcon }} />
            <div className={styles.buttonText}>Combo quà tặng</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default View;
