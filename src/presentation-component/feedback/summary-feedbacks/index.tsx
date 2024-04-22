import classNames from 'classnames';
import { capitalize } from 'utils/string';
import { FeedbackSummaryFeedbackResponse } from 'types/api/shop';
import styles from './style.module.scss';

interface FeedbackSummaryFeedbacksProps {
  feedbacks: Array<FeedbackSummaryFeedbackResponse>;
  classes?: { container?: string; title?: string };
}
const FeedbackSummaryFeedbacks = ({ feedbacks, classes }: FeedbackSummaryFeedbacksProps) => {
  return (
    <div className={classNames(styles.container, classes?.container)}>
      <div className={classNames(styles.title, classes?.title)}>Tổng hợp đánh giá (từ trợ lý AI)</div>
      <div className={styles.feedbacks}>
        {feedbacks
          .filter((feedback) => feedback?.review && feedback?.title)
          .map((feedback, index) => (
            <div key={index} className={styles.feedback}>
              <span className={styles.feedbackTitle}>{capitalize(feedback.title)}:</span>
              <span className={styles.feedbackReview}>{capitalize(feedback.review)}</span>
            </div>
          ))}
      </div>
    </div>
  );
};

export default FeedbackSummaryFeedbacks;
