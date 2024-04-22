import classNames from 'classnames';
import * as VARIABLE from 'style/variable';
import styles from './style.module.scss';

interface DiscountBlockProps {
  children?: React.ReactNode;
  edge?: Array<'dottedTop' | 'dottedRight' | 'dottedBottom' | 'dottedLeft'>;
  edgeColor?: string;
  backgroundColorIsEdgeColor?: boolean;
  classes?: { container?: string; content?: string };
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}
const DiscountBlock = ({
  children,
  edge,
  edgeColor,
  backgroundColorIsEdgeColor,
  classes,
  onClick
}: DiscountBlockProps) => {
  return (
    <div className={classNames(styles.couponContainer, classes?.container)} onClick={(e) => onClick?.(e)}>
      <div
        className={classNames(styles.coupon, classes?.content)}
        style={Object.assign({}, backgroundColorIsEdgeColor && { backgroundColor: edgeColor })}
      >
        {children}
      </div>
      {!!edge.includes('dottedTop') && (
        <div
          className={styles.couponTop}
          style={{ backgroundImage: `radial-gradient(circle at 3px 0px, transparent 3px, ${edgeColor} 3px)` }}
        />
      )}
      {!!edge.includes('dottedRight') && (
        <div
          className={styles.couponRight}
          style={{ backgroundImage: `radial-gradient(circle at 6px 3px, transparent 3px, ${edgeColor} 3px)` }}
        />
      )}
      {!!edge.includes('dottedBottom') && (
        <div
          className={styles.couponBottom}
          style={{ backgroundImage: `radial-gradient(circle at 3px 6px, transparent 3px, ${edgeColor} 3px)` }}
        />
      )}
      {!!edge.includes('dottedLeft') && (
        <div
          className={styles.couponLeft}
          style={{ backgroundImage: `radial-gradient(circle at 0px 3px, transparent 3px, ${edgeColor} 3px)` }}
        />
      )}
    </div>
  );
};

DiscountBlock.defaultProps = {
  edge: ['dottedTop', 'dottedRight', 'dottedBottom', 'dottedLeft'],
  dottedEdge: ['dottedTop', 'dottedRight', 'dottedBottom', 'dottedLeft'],
  edgeColor: VARIABLE.colorPrimary,
  backgroundColorIsEdgeColor: true
};

export default DiscountBlock;
