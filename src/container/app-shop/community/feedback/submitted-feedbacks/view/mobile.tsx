import SubmittedFeedbacks from '../../../../../../presentation-component/feedback/submitted-feedbacks';
import styles from './style.module.scss';

const View = ({ feedbacks, isFetchFeedbackedSuccess, onImageClick }) => {
  return (
    <div className={styles.wrapMobileLayout}>
      <div className={styles.container}>
        <SubmittedFeedbacks
          feedbackList={feedbacks}
          isFetchFeedbackedSuccess={isFetchFeedbackedSuccess}
          onImageClick={onImageClick}
        />
      </div>
    </div>
  );
};

export default View;
