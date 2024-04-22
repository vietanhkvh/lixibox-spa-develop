import classNames from 'classnames';
import styles from './style.module.scss';

interface PillProps {
  children: React.ReactNode;
  color?: 'greenBold' | 'default' | 'greyOutlined' | 'primary';
  classes?: { container?: string };
}
const Pill = ({ children, color = 'default', classes }: PillProps) => {
  return <div className={classNames(styles.pill, styles[`color-${color}`], classes?.container)}>{children}</div>;
};

export default Pill;
