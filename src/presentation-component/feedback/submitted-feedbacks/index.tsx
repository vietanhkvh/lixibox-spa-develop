import classNames from 'classnames';

import Loading from '../../../components/ui/loading';
import MobileTabHeader from '../../../presentation-component/general/mobile-tab-header';
import NoContentPlaceholder, { NO_CONTENT_LOGO } from 'presentation-component/general/mobile/no-content-placeholder';
import { isMobileVersion } from '../../../utils/responsive';
import { FEEDBACK_TABS } from '../../../constants/application/feedback';
import SubmittedFeedback from '../submitted-feedback';
import styles from './style.module.scss';

interface SubmittedFeedbacksProps {
  feedbackList: Array<any>;
  isFetchFeedbackedSuccess: boolean;
  onImageClick?: ({ index, image, images }: { index: number; image: string; images: Array<string> }) => any;
}
const SubmittedFeedbacks = ({ feedbackList = [], isFetchFeedbackedSuccess, onImageClick }: SubmittedFeedbacksProps) => {
  const isLoading = !isFetchFeedbackedSuccess;
  const empty = !isLoading && !feedbackList.length;

  const tabs = FEEDBACK_TABS.map((tab) =>
    tab.id === 'submittedFeedbacks' ? Object.assign({}, tab, { selected: true }) : tab
  );

  return (
    <div className={classNames(styles.ratedList, isMobileVersion() || styles.ratedListDesktop)}>
      <MobileTabHeader tabs={tabs} isEqually={true} />
      {isLoading && <Loading classes={{ container: styles.loading }} />}
      {!!empty && (
        <NoContentPlaceholder
          title="Không có kết quả nào"
          info="Hãy quay lại và chọn cho mình sản phẩm yêu thích bạn nhé."
          logo={NO_CONTENT_LOGO.SHIPMENT}
          className={isMobileVersion() ? styles.noContentPlaceholderMobile : styles.noContentPlaceholderDesktop}
        />
      )}
      {!empty && (
        <div className={styles.list}>
          {Array.isArray(feedbackList) &&
            feedbackList.map((feedback, index) => (
              <SubmittedFeedback key={index} feedback={feedback} onImageClick={onImageClick} />
            ))}
        </div>
      )}
    </div>
  );
};

export default SubmittedFeedbacks;
