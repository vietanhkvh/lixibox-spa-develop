import classNames from 'classnames';

import { isMobileVersion } from '../../../utils/responsive';
import Loading from '../../../components/ui/loading';
import NoContentPlaceholder, { NO_CONTENT_LOGO } from 'presentation-component/general/mobile/no-content-placeholder';
import FeedbackToSubmit from '../feedback-to-submit';
import styles from './style.module.scss';

interface FeedbacksToSubmitProps {
  boxesToFeedback: Array<any>;
  isWaiting: boolean;
  onBoxClick: (data: any) => any;
}
const FeedbacksToSubmit = ({ boxesToFeedback, isWaiting, onBoxClick }: FeedbacksToSubmitProps) => {
  return (
    <div
      className={classNames(
        styles.container,
        isMobileVersion() ? styles.containerMobile : styles.containerDesktop,
        styles.fullModeContaier,
        styles.boxToFeedback
      )}
    >
      <div
        className={classNames(
          styles.editContainer,
          isMobileVersion() || styles.editContainerDesktop,
          styles.editContainerFull
        )}
      >
        {!boxesToFeedback || !boxesToFeedback.length ? (
          <NoContentPlaceholder
            title="Không có kết quả nào"
            info="Hãy quay lại và chọn cho mình sản phẩm yêu thích bạn nhé."
            logo={NO_CONTENT_LOGO.SHIPMENT}
            className={isMobileVersion() ? styles.noContentPlaceholderMobile : styles.noContentPlaceholderDesktop}
          />
        ) : !!isWaiting ? (
          <div className={styles.loading}>
            <Loading classes={{ container: styles.icon }} />
          </div>
        ) : Array.isArray(boxesToFeedback) && !boxesToFeedback.length ? (
          <div className={styles.empty}>Bạn không có sản phẩm nào để đánh giá</div>
        ) : (
          <div className={styles.list}>
            {Array.isArray(boxesToFeedback) &&
              boxesToFeedback.map((box, index) => <FeedbackToSubmit key={index} box={box} onClick={onBoxClick} />)}
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedbacksToSubmit;
