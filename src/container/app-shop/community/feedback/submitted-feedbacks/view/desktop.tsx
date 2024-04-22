import classNames from 'classnames';

import SplitLayout from '../../../../../layout/split';
import SubmittedFeedbacks from '../../../../../../presentation-component/feedback/submitted-feedbacks';
import FeedbackRightPanel from '../../right-panel';
import styles from './style.module.scss';

const View = ({ feedbacks, isFetchFeedbackedSuccess, onImageClick }) => {
  const splitLayoutProps = {
    type: 'right',
    size: 'larger',
    subContainer: <FeedbackRightPanel />,
    mainContainer: (
      <div className={classNames(styles.container, 'user-select-all')}>
        <SubmittedFeedbacks
          feedbackList={feedbacks}
          isFetchFeedbackedSuccess={isFetchFeedbackedSuccess}
          onImageClick={onImageClick}
        />
      </div>
    )
  };

  return (
    <div className={styles.wrapLayout}>
      <SplitLayout {...splitLayoutProps} />
    </div>
  );
};

export default View;
