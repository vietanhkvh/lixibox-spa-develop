import { ReactNode } from 'react';
import classnames from 'classnames';

import Heading from '../general-item-heading';
import { isMobileVersion } from '../../../utils/responsive';

import styles from './style.module.scss';

function ChildItem(child, index) {
  return (
    <div key={child.id || index} className={classnames(styles.child, styles[`col-${this.column}`])}>
      {child}
    </div>
  );
}

const Content = ({ children, column }) => {
  const list = Array.isArray(children) ? children : [children];

  return (
    <div className={classnames(styles.panel, { [styles.miniPanel]: children.length <= 2 })}>
      {list && list.map(ChildItem, { column })}
      {``}
    </div>
  );
};

interface ItemVerticalListProps {
  title?: string;
  viewMore?: string;
  viewMoreLink?: string;
  children: ReactNode;
  key?: number;
  className?: string;
  column?: number;
}
const ItemVerticalList = ({
  title = '',
  viewMore = '',
  viewMoreLink = '#',
  children,
  key = 0,
  className = '',
  column = 2
}: ItemVerticalListProps) => {
  const headingProps = {
    title,
    viewMoreLink,
    viewMore
  };

  const containerProps = {
    className: classnames(styles.productVerticalList, className),
    key: key || title
  };

  return (
    <div {...containerProps}>
      <Heading {...headingProps} />
      <Content column={!!isMobileVersion() ? 2 : column}>{children}</Content>
    </div>
  );
};

export default ItemVerticalList;
