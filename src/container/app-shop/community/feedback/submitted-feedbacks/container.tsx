import { useEffect } from 'react';

import { objectToHash } from '../../../../../utils/encode';
import { MODAL_BOX_DETAIL_PICTURE } from '../../../../../constants/application/modal';
import MobileView from './view/mobile';
import DesktopView from './view/desktop';
import { isMobileVersion } from 'utils';

interface SubmittedFeedbacksProps {
  feedbackStore: any;
  fetchUserBoxesToFeedbackAction: (data: any) => any;
  openModalAction: (data: any) => any;
}
const SubmittedFeedbacks = ({
  feedbackStore: { userFeedbacks, isFetchFeedbackedSuccess },
  fetchUserBoxesToFeedbackAction,
  openModalAction
}: SubmittedFeedbacksProps) => {
  const userFeedbacksPaging = { page: 1, perPage: 50 };
  const userFeedbackIndexHash = objectToHash(userFeedbacksPaging);
  useEffect(() => {
    fetchUserBoxesToFeedbackAction(userFeedbacksPaging);
  }, []);
  const feedbacks =
    !!userFeedbacks && !!userFeedbacks[userFeedbackIndexHash] ? userFeedbacks[userFeedbackIndexHash].feedbacks : [];
  const onImageClick = ({ index, images }) => {
    openModalAction(
      MODAL_BOX_DETAIL_PICTURE({
        selected: parseInt('101' + index),
        list: images.map((image) => ({ medium_url: image, large_url: image, original_url: image }))
      })
    );
  };

  const View = isMobileVersion() ? MobileView : DesktopView;

  return <View {...{ feedbacks, isFetchFeedbackedSuccess, onImageClick }} />;
};

export default SubmittedFeedbacks;
