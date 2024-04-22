import { generatePath, useHistory } from 'react-router-dom';

import { objectToHash } from '../../../../../utils/encode';
import { isMobileVersion } from '../../../../../utils/responsive';
import { FEEDBACK_TABS } from '../../../../../constants/application/feedback';
import { ROUTING_COMMUNITY_NEW_FEEDBACK } from '../../../../../routings/path';
import MobileView from './view/mobile';
import DesktopView from './view/desktop';

interface FeedbacksToSubmitProps {
  feedbackStore?: any;
}
const FeedbacksToSubmit = ({ feedbackStore: { userBoxesToFeedback, isWaiting } }: FeedbacksToSubmitProps) => {
  const tabs = FEEDBACK_TABS.map((tab) =>
    tab.id === 'feedbacksToSubmit' ? Object.assign({}, tab, { selected: true }) : tab
  );
  const history = useHistory();
  const userBoxesToFeedbackHash = objectToHash({ page: 1, perPage: 30 });
  const boxesToFeedback =
    (!!userBoxesToFeedback &&
      !!userBoxesToFeedback[userBoxesToFeedbackHash] &&
      userBoxesToFeedback[userBoxesToFeedbackHash].boxes) ||
    null;
  const onBoxClick = (boxId) => {
    const newFeedPath = generatePath(ROUTING_COMMUNITY_NEW_FEEDBACK, { productId: boxId });
    history.push(newFeedPath);
  };

  const View = isMobileVersion() ? MobileView : DesktopView;

  return <View {...{ tabs, boxesToFeedback, isWaiting, onBoxClick }} />;
};

export default FeedbacksToSubmit;
