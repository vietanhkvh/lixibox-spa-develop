import { isMobileVersion } from '../../../../../utils/responsive';

import { FEEDBACK_TABS } from '../../../../../constants/application/feedback';
import DesktopView from './view/desktop';
import MobileView from './view/mobile';

const FeedbackNew = () => {
  const tabs = FEEDBACK_TABS.map((tab) =>
    tab.id === 'feedbacksToSubmit' ? Object.assign({}, tab, { selected: true }) : tab
  );
  const View = isMobileVersion() ? MobileView : DesktopView;

  return <View {...{ tabs }} />;
};

export default FeedbackNew;
