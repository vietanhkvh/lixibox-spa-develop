import Image from 'presentation-component/ui/image';
import { CDN_ASSETS_PREFIX } from '../../../utils/uri';
import styles from './style.module.scss';
const COVER_IMAGE = CDN_ASSETS_PREFIX('/info/cover.png');

const FAQCover = ({ title = 'Thông tin', selectedTopicName = '' }: { title?: string; selectedTopicName?: string }) => {
  return (
    <div className={styles.container}>
      <Image src={COVER_IMAGE} />
      <div className={styles.content}>
        {!!title && <div className={styles.title}>{title}</div>}
        {!!selectedTopicName && <div className={styles.description}>{selectedTopicName}</div>}
      </div>
    </div>
  );
};

export default FAQCover;
