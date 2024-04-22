import classNames from 'classnames';
import styles from './style.module.scss';
import { isMobileVersion } from 'utils';

interface SectionHeaderProps {
  title: string;
  classes?: { container?: string };
}
const SectionHeader: React.FC<SectionHeaderProps> = ({ title, classes }) => {
  return (
    <div className={classNames(styles.container, !isMobileVersion() && styles.desktopLayout, classes?.container)}>
      <div className={styles.horizontalLine} />
      <div className={styles.title}>{title}</div>
    </div>
  );
};

export default SectionHeader;
