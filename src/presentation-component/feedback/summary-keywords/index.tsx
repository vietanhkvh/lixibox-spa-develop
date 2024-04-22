import classNames from 'classnames';
import { FeedbackSummaryKeywordResponse } from 'types/api/shop';
import styles from './style.module.scss';

interface FeedbackSummaryKeywordsProps {
  keywords: Array<FeedbackSummaryKeywordResponse>;
  classes?: { container?: string; title?: string };
}
const FeedbackSummaryKeywords = ({ keywords, classes }: FeedbackSummaryKeywordsProps) => {
  return (
    <div className={classNames(styles.container, classes?.container)}>
      <div className={classNames(styles.title, classes?.title)}>Đánh giá phổ biến</div>
      <div className={styles.keywords}>
        {keywords
          .filter((keyword) => keyword?.keyword)
          .map((keyword, index) => (
            <div key={index} className={styles.keyword}>
              # {keyword.keyword}
            </div>
          ))}
      </div>
    </div>
  );
};

export default FeedbackSummaryKeywords;
