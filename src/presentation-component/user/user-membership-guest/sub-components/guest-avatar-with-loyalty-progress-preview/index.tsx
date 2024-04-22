import classNames from 'classnames';
import Image from 'presentation-component/ui/image';
import { CDN_ASSETS_PREFIX } from 'utils/uri';
import styles from './style.module.scss';

interface GuestAvatarWithLoyaltyProgressPreviewProps {
  isSmallView?: boolean;
  classes?: { container?: string };
}
const GuestAvatarWithLoyaltyProgressPreview = ({
  isSmallView,
  classes
}: GuestAvatarWithLoyaltyProgressPreviewProps) => {
  return (
    <div className={classNames(styles.avatarWrapper, classes?.container)}>
      <div className={styles.avatarSplitter} style={{ transform: 'rotate(0deg)' }} />
      <div className={styles.avatarSplitter} style={{ transform: 'rotate(45deg)' }} />
      <div className={styles.avatarSplitter} style={{ transform: 'rotate(90deg)' }} />
      <div className={styles.avatarSplitter} style={{ transform: 'rotate(135deg)' }} />
      <Image
        src={CDN_ASSETS_PREFIX('/user/avatar-female.jpg')}
        alt="avatar"
        className={classNames(styles.avatar, isSmallView && styles.avatarSmallView)}
      />
    </div>
  );
};

export default GuestAvatarWithLoyaltyProgressPreview;
