import SvgIcon from '../../ui/icon';
import styles from './style.module.css';

const Heading = ({ subTitle, title, isShowIcon, onClick }) => {
  const iconProps = {
    name: 'angle-left',
    className: styles.icon
  };

  return (
    <div className={styles.heading} onClick={onClick}>
      <div className={styles.titleGroup}>
        {!!subTitle && !!subTitle.length && <div className={styles.subTitle}>{subTitle}</div>}
        {!!title && <div className={styles.title}>{title}</div>}
      </div>
      {!!isShowIcon && <SvgIcon {...iconProps} />}
    </div>
  );
};

const MobileScreenHeader = ({ title, subTitle = '', isShowIcon = false, onClick = () => {} }) => {
  if (!title && !subTitle) return null;

  return <div className={styles.container}>{Heading({ subTitle, title, isShowIcon, onClick })}</div>;
};

export default MobileScreenHeader;
