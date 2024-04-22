import FeedbackEditInnerBlock from '../../feedback-edit-inner-block';
import styles from './style.module.scss';

const View = ({ feedbackId }) => {
  return (
    <div className={styles.wrapMobileLayout}>
      <div className={styles.container}>
        <FeedbackEditInnerBlock {...{ feedbackId }} />
      </div>
    </div>
  );
};

export default View;
