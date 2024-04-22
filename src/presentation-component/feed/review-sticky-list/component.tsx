import classnames from 'classnames';

import Image from 'presentation-component/ui/image';
import FeedList from '../../../components/container/feed-list';
import SeparateLine from '../../../presentation-component/ui/separate-line';
import { isMobileDevice } from '../../../utils/responsive';
import styles from './style.module.css';

function Sticky({ name, image, stickyPosition }) {
  return (
    <div className={classnames(styles.sticky, { [styles.desktop]: !isMobileDevice() })} style={{ top: stickyPosition }}>
      <Image className={styles.image} src={image} alt={''} />
      <div className={styles.name}>{name}</div>
    </div>
  );
}

function Item(item, index) {
  const feedListProps = {
    list: item.feeds,
    style: {}
  };

  return (
    <>
      <Sticky name={item.name} image={item.primary_picture_medium_url} stickyPosition={this.stickyPosition} />
      <SeparateLine />
      <FeedList {...feedListProps} />
    </>
  );
}

interface ReviewStickyListProps {
  list: Array<any>;
  stickyPosition: number;
}
const ReviewStickyList = ({ list, stickyPosition }: ReviewStickyListProps) => {
  return <div className={styles.container}>{list.map(Item, { stickyPosition })}</div>;
};

export default ReviewStickyList;
