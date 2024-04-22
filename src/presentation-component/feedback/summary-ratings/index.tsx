import classNames from 'classnames';
import { capitalize } from 'utils/string';
import { FeedbackSummaryRatingResponse } from 'types/api/shop';
import RatingWithProgress from '../rating-progress';
import styles from './style.module.scss';

interface FeedbackSummaryRatingsProps {
  ratings: Array<FeedbackSummaryRatingResponse>;
  classes?: { container?: string; title?: string };
}
const FeedbackSummaryRatings = ({ ratings, classes }: FeedbackSummaryRatingsProps) => {
  return (
    <div className={classNames(styles.container, classes?.container)}>
      <div className={classNames(styles.title, classes?.title)}>Đánh giá tổng thể</div>
      <div className={styles.ratings}>
        {ratings
          .filter((rating) => rating?.title)
          .map((rating, index) => (
            <div key={index} className={styles.rating}>
              <div className={styles.ratingTitle}>{capitalize(rating.title)}</div>
              <RatingWithProgress rating={rating?.score || 0} classes={{ container: styles.ratingScore }} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default FeedbackSummaryRatings;
