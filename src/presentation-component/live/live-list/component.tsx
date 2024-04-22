import { cloneElement } from 'react';
import classnames from 'classnames';

import { isMobileVersion } from '../../../utils/responsive';
import styles from './style.module.scss';

const generateChildSize = (index) => {
  if (isMobileVersion() && 0 !== index % 4) return 'small';
  if (!isMobileVersion() && 0 === index) return 'large';

  return 'general';
};

const generateItemLayout = (index) => {
  if (isMobileVersion()) return '100';

  if (0 === index) return '100';
  if ([1, 2, 9, 10].indexOf(index) >= 0) return '50';
  return '33';
};

function ChildItem(child, index) {
  const size = generateChildSize(index);
  const layout = generateItemLayout(index);

  const itemProprs = {
    key: child.id || index,
    className: classnames(styles.item, { [styles[`layout-${layout}`]]: !!layout })
  };

  return <div {...itemProprs}>{cloneElement(child, { size })}</div>;
}

const LiveList = ({ children }) => {
  const list = Array.isArray(children) ? children : [children];

  return <div className={styles.container}>{list && list.map(ChildItem)}</div>;
};

export default LiveList;
