import { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import Icon from 'presentation-component/ui/icon';
import styles from './style.module.scss';

interface ChildrenOrientedExpanderProps {
  children: React.ReactNode[];
  defaultVisibleChildrenCount: number;
  expanderLabel?: { expanded?: string; collapsed?: string };
  classes?: { container?: string; children?: string; indicator?: string };
}
const ChildrenOrientedExpander = ({
  children,
  defaultVisibleChildrenCount,
  expanderLabel,
  classes
}: ChildrenOrientedExpanderProps) => {
  const childrenRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const [isTriggered, setIsTriggered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [childrenHeight, setChildrenHeight] = useState(0);

  useEffect(() => {
    if (!children) {
      setIsTriggered(false);
      return;
    }

    setIsTriggered(children.length > defaultVisibleChildrenCount);
  }, [children]);

  // calculate height of children
  useEffect(() => {
    if (childrenRef.current && isTriggered) {
      let height = 0;
      if (isExpanded) {
        // calculate the total height of all children
        height = Array.from(childrenRef.current.children).reduce(
          (acc, child) => acc + (child as any).offsetHeight || 0,
          0
        );
      } else {
        // calculate the height of the first defaultVisibleChildrenCount children
        height = Array.from(childrenRef.current.children)
          .slice(0, defaultVisibleChildrenCount)
          .reduce((acc, child) => acc + (child as any).offsetHeight || 0, 0);
      }
      setChildrenHeight(height);
    }
  }, [isExpanded, isTriggered, childrenRef.current, defaultVisibleChildrenCount, children]);

  return (
    <div className={classNames(styles.container, classes?.container)}>
      <div
        className={classNames(styles.children, classes?.children)}
        style={Object.assign({}, isTriggered ? { height: `${childrenHeight}px` } : {})}
        ref={childrenRef}
      >
        {children}
      </div>
      {isTriggered && (
        <div
          className={classNames(styles.indicator, classes?.indicator)}
          onClick={() => setIsExpanded((prevState) => !prevState)}
          ref={indicatorRef}
        >
          <div className={styles.indicatorLabel}>
            {isExpanded ? expanderLabel?.expanded || 'Thu gọn' : expanderLabel?.collapsed || 'Xem thêm'}
          </div>
          <Icon name={isExpanded ? 'angle-up' : 'angle-down'} className={styles.indicatorIcon} />
        </div>
      )}
    </div>
  );
};

export default ChildrenOrientedExpander;
