import Image from 'presentation-component/ui/image';
import { CDN_ASSETS_PREFIX } from '../../../utils/uri';
import styles from './style.module.scss';
const emptySearchIcon = CDN_ASSETS_PREFIX('/search/empty-search.png');

const FAQNotFound = () => (
  <div className={styles.container}>
    <Image alt={''} src={emptySearchIcon} className={styles.image} />
    <div className={styles.content}>
      <div className={styles.title}>Không tìm thấy</div>
      <div className={styles.description}>Vui lòng thử lại với chủ đề khác.</div>
    </div>
  </div>
);

export default FAQNotFound;
