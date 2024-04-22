import classNames from 'classnames';
import WrapLayout from 'container/layout/wrap/container';
import styles from './style.module.scss';

interface StickyProps {
  children: JSX.Element;
  title?: string;
  id?: string;
  classes?: { container?: string; childrenContainer?: string };
}
const Sticky = ({ title, children, id, classes }: StickyProps) => {
  return (
    <WrapLayout>
      <div className={classNames(styles.container, classes?.container)} id={id}>
        {!!title && <div className={classNames(styles.title, 'sticky', 'headline-typo')}>{title}</div>}
        <div className={classNames(styles.childrenContainer, classes?.childrenContainer)}>{children}</div>
      </div>
    </WrapLayout>
  );
};
Sticky.defaultProps = {
  title: '',
  id: ''
};

export default Sticky;
