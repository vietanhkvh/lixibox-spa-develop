import FeedbackNewInnerBlock from '../../feedback-new-inner-block';
import MobileAutoDisplayHeader from '../../../../../../presentation-component/general/mobile-auto-display-header';
import MobileTabHeader from '../../../../../../presentation-component/general/mobile-tab-header';

const View = ({ tabs }) => {
  return (
    <>
      <MobileAutoDisplayHeader row={1}>
        <MobileTabHeader tabs={tabs} />
      </MobileAutoDisplayHeader>
      <FeedbackNewInnerBlock />
    </>
  );
};

export default View;
