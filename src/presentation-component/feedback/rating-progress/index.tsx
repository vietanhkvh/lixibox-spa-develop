import classNames from 'classnames';
import { roundNumber } from 'utils/format';
import styles from './style.module.scss';

interface RatingWithProgressProps {
  /**
   * The rating value (0-5)
   */
  rating: number;
  classes?: { container?: string };
}
const RatingWithProgress = ({ rating, classes }: RatingWithProgressProps) => {
  return (
    <div className={classNames(styles.container, classes?.container)}>
      <div className={styles.progressBar}>
        <div className={styles.progress} style={{ width: `${(rating / 5) * 100}%` }} />
      </div>
      <div className={styles.ratingText}>{roundNumber(rating || 0, 1)}</div>
    </div>
  );
};

export default RatingWithProgress;
