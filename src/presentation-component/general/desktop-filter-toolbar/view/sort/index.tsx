import classnames from 'classnames';

import SvgIcon from '../../../../ui/icon';
import styles from './style.module.scss';

function SortItem(item, index) {
  const tickIconProps = {
    name: 'tick',
    className: styles.tickIcon
  };

  const itemProps = {
    className: styles.sortItem,
    key: item.id || index,
    onClick: () => this.onSelect(item.key)
  };

  return (
    <div {...itemProps}>
      {item.selected && <SvgIcon {...tickIconProps} />}
      <div className={styles.sortItemTitle}>{item.title}</div>
    </div>
  );
}

export const SortPanel = ({ isOpenSort, sortList, onSelect, onClickOverlay }) => {
  if (!sortList.length) return null;

  return (
    <div className={classnames(styles.sortPanel, { [styles.isOpen]: !!isOpenSort })}>
      <div className={styles.sortOverlay} onClick={onClickOverlay} />
      <div className={styles.sortList}>{sortList.map(SortItem, { onSelect })}</div>
    </div>
  );
};
