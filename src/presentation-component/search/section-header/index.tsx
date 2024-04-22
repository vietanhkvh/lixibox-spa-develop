import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { isMobileVersion } from 'utils';
import Icon from 'presentation-component/ui/icon';
import styles from './style.module.scss';

interface SectionHeaderProps {
  title: string;
  viewMoreLink?: {
    link: string;
    title: string;
    onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  };
  classes?: { container?: string; viewMore?: string };
}
const SectionHeader = ({ title, viewMoreLink, classes }: SectionHeaderProps) => {
  return (
    <div className={classNames(styles.sectionHeader, !isMobileVersion() && styles.desktop, classes?.container)}>
      {title}
      {!!viewMoreLink && (
        <NavLink
          className={classNames(styles.headingViewMoreLink, styles.viewMore)}
          to={viewMoreLink.link || '#'}
          onClick={viewMoreLink.onClick}
        >
          {viewMoreLink.title}
          <Icon name={'angle-right'} className={styles.icon} />
        </NavLink>
      )}
    </div>
  );
};

export default SectionHeader;
