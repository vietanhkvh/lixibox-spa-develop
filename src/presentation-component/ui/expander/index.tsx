import { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import Icon from 'presentation-component/ui/icon';
import styles from './style.module.scss';

interface ExpanderProps {
  children: React.ReactNode;
  /**
   * 'Trigger height' of the children. If the children's height is greater than this value, the children will be collapsed.
   */
  height: number;
  classes?: { container?: string };
}
const Expander = ({ children, height, classes }: ExpanderProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isTriggered, setIsTriggered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (containerRef.current && containerRef.current.clientHeight > height) {
      setIsTriggered(true);
    }
  }, [containerRef.current]);

  return (
    <div
      className={classNames(styles.container, classes?.container)}
      style={Object.assign({}, isTriggered && !isExpanded ? { height: `${height + 24}px` } : {})}
      ref={containerRef}
    >
      {children}
      {isTriggered && !isExpanded && (
        <div className={classNames(styles.indicator)} onClick={() => setIsExpanded(true)}>
          <Icon name="angle-down" className={styles.indicatorIcon} />
        </div>
      )}
    </div>
  );
};

export default Expander;
