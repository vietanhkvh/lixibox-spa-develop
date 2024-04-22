import classNames from 'classnames';
import WrapLayout from 'container/layout/wrap/container';
import styles from './style.module.scss';

interface BrandExclusiveProps {
  children: JSX.Element;
  title?: string;
  classes?: { container?: string; childrenContainer?: string };
}
const BrandExclusive = ({ title, children, classes }: BrandExclusiveProps) => {
  return (
    <div className={classNames(styles.container, classes?.container)}>
      {!!title && (
        <WrapLayout>
          <div className={classNames(styles.title, 'sticky')}>
            {title}
            <span />
            <span />
          </div>
        </WrapLayout>
      )}
      <div className={classNames(styles.childrenContainer, classes?.childrenContainer)}>{children}</div>
    </div>
  );
};
BrandExclusive.defaultProps = {
  title: '',
  id: ''
};

export default BrandExclusive;
