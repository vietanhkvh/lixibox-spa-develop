import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import Icon from 'presentation-component/ui/icon';
import styles from './style.module.scss';

interface DashboardLinkProps {
  title: string;
  icon: string;
  path?: string;
  onClick?: () => void;
  classes?: { container?: string };
}
const DashboardLink = ({ title, icon, path, onClick, classes }: DashboardLinkProps) => {
  return (
    <NavLink to={path || '#'} className={classNames(styles.dashboardLink, classes?.container)} onClick={onClick}>
      <Icon name={icon} className={styles.dashboardLinkIcon} />
      <span className={styles.dashboardLinkTitle}>{title}</span>
      <Icon name="arrow-right" className={styles.dashboardLinkArrow} />
    </NavLink>
  );
};

export default DashboardLink;
