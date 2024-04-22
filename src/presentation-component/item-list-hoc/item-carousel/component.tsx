import classnames from 'classnames';
import { generateTestId } from 'utils/test-utils';
import Heading from '../general-item-heading';

import styles from './style.module.css';

function ChildItem(child, index) {
  return (
    <div
      key={child.id || index}
      className={classnames(styles.child, { [styles.isSection]: !!this.isSection }, this.classes && this.classes.child)}
    >
      {child}
    </div>
  );
}

const Content = ({ isSection, children, classes, id, onScroll }) => {
  const list = Array.isArray(children) ? children : [children];

  return (
    <div className={classnames(styles.panel, classes?.listContainer, { [styles.miniPanel]: children.length <= 2 })}>
      <div
        id={id}
        onScroll={onScroll}
        className={classnames(styles.carousel, { [styles.isSection]: !!isSection }, classes?.list)}
      >
        {list && list.map(ChildItem, { isSection, classes })}
      </div>
    </div>
  );
};

const ItemCarousel = ({
  title = '',
  titleIcon = null,
  viewMore = '',
  viewMoreLink = '#',
  children,
  key = 0,
  isSection = false,
  className = null,
  classes,
  testId = { name: '', id: '' },
  onViewMoreClick = () => {},
  onScrollPercentage,
  id
}: {
  isSection?: boolean;
  title?: string;
  titleIcon?: any;
  viewMore?: string;
  viewMoreLink?: string;
  children?: any;
  key?: number;
  className?: any;
  classes?: {
    container?: string;
    header?: string;
    listContainer?: string;
    list?: string;
    child?: string;
  };
  testId?: { name: string; id?: string };
  onViewMoreClick?: () => any;
  onScrollPercentage?: any;
  id?: string;
}) => {
  const headingProps = {
    title,
    titleIcon,
    viewMoreLink,
    viewMore,
    classes: { container: classes?.header },
    onViewMoreClick
  };

  let timeout = null;
  const onScroll = (e) => {
    timeout && clearTimeout(timeout);
    timeout = setTimeout(onScrollTimeout, 1000);
  };

  const onScrollTimeout = () => {
    const elm = document.getElementById(`ItemCarousel-${key}`);
    if (!elm) return;
    const scrollPercentage = parseInt((100 * (elm.scrollLeft + elm.clientWidth)) / elm.scrollWidth + '');
    onScrollPercentage && onScrollPercentage(scrollPercentage);
  };

  const containerProps = {
    className: classnames(styles.productCarousel, className, classes && classes.container),
    key
  };

  return (
    <div id={id} {...containerProps} {...generateTestId(testId)}>
      <Heading {...headingProps} />
      <Content isSection={isSection} classes={classes} id={`ItemCarousel-${key}`} onScroll={onScroll}>
        {children}
      </Content>
    </div>
  );
};

export default ItemCarousel;
