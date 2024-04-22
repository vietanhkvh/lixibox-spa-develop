import { MouseEventHandler } from 'react';
import classNames from 'classnames';

import Icon from 'presentation-component/ui/icon';
import RatingStar from 'components/ui/rating-star';
import { ProductBoxRating } from 'types/api/shop';
import { isMobileVersion } from 'utils';
import styles from './style.module.scss';

interface RatingProps {
  rating?: ProductBoxRating | null;
  onClick: MouseEventHandler<HTMLDivElement>;
}
const Rating = ({ rating, onClick }: RatingProps) => {
  const isShowTextContent = rating && !!rating.count;

  return (
    <div {...{ className: styles.rating, onClick }}>
      <RatingStar
        {...{
          value: null === rating ? 0 : rating.avg_rate || 0
        }}
      />
      {isShowTextContent ? (
        <div className={styles.count}>
          {rating.count} {`đánh giá `}
        </div>
      ) : (
        <div className={styles.empty}>Chưa có đánh giá</div>
      )}
      {' | '}
    </div>
  );
};

const Love = ({ love }: { love: number }) => {
  return (
    <div className={styles.love}>
      <Icon {...{ name: 'heart-full', className: styles.icon }} />
      {love} loves
    </div>
  );
};

interface RatingGroupProps {
  rating?: ProductBoxRating | null;
  love: number;
  onClick: MouseEventHandler<HTMLDivElement>;
}
const RatingGroup = ({ rating, love, onClick }: RatingGroupProps) => {
  return (
    <div className={classNames(styles.container, isMobileVersion() && styles.containerMobile)}>
      <Rating {...{ rating, onClick }} />
      <Love {...{ love }} />
    </div>
  );
};

export default RatingGroup;
