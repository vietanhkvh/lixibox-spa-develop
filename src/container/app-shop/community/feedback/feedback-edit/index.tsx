import { useParams } from 'react-router';

import { isMobileVersion } from '../../../../../utils/responsive';
import DesktopView from './view/desktop';
import MobileView from './view/mobile';

const FeedbackEdit = () => {
  const { feedbackId } = useParams<{ feedbackId: string }>();

  const View = isMobileVersion() ? MobileView : DesktopView;

  return <View {...{ feedbackId }} />;
};

export default FeedbackEdit;
