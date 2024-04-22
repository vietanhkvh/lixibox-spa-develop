import { useEffect, useState, useRef } from 'react';
import classNames from 'classnames';

import style from './style.module.scss';

export type Position = 'top' | 'right' | 'bottom' | 'left';
interface IProps {
  children: any;
  classes: { container?: string; tooltip?: string; text?: string };
  position: Position;
  tip: string;
}
const Tooltip = ({ tip, children, classes, position }: IProps) => {
  const containerRef = useRef<any>();
  const tooltipRef = useRef<any>();
  const [left, setLeft] = useState(0);
  const [hovering, setHovering] = useState(false);
  useEffect(() => {
    if (hovering && position === 'bottom' && containerRef && containerRef.current && tooltipRef && tooltipRef.current) {
      setLeft(containerRef.current.clientWidth / 2 - tooltipRef.current.clientWidth / 2);
    }
  }, [hovering]);

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      className={classNames(style.container, classes.container)}
    >
      {children}
      <div
        ref={tooltipRef}
        className={classNames(style.tooltip, style[position], classes.tooltip)}
        style={Object.assign({}, position === 'bottom' && { left })}
      >
        <div className={style.group}>
          <div className={classNames(style.text, classes.text)}>{tip}</div>
          <div className={classNames(style.indicator)} />
        </div>
      </div>
    </div>
  );
};
Tooltip.defaultProps = {
  classes: { container: '', tooltip: '' },
  position: 'top'
};

export default Tooltip;
