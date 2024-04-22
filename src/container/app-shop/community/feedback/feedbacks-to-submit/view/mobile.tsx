import MobileAutoDisplayHeader from '../../../../../../presentation-component/general/mobile-auto-display-header';
import MobileTabHeader from '../../../../../../presentation-component/general/mobile-tab-header';
import FeedbacksToSubmit from '../../../../../../presentation-component/feedback/feedbacks-to-submit';

const View = ({ tabs, boxesToFeedback, isWaiting, onBoxClick }) => {
  return (
    <>
      <MobileAutoDisplayHeader row={1}>
        <MobileTabHeader tabs={tabs} />
      </MobileAutoDisplayHeader>
      <FeedbacksToSubmit {...{ boxesToFeedback, isWaiting, onBoxClick }} />
    </>
  );
};

export default View;
