import { isMobileVersion } from 'utils';
import { auth } from 'utils/auth';
import { MODAL_SIGN_IN } from 'constants/application/modal';
import DesktopView from './view/desktop';
import MobileView from './view/mobile';
import { BoxFeedback } from 'types/api/shop';
import { PropsFromRedux } from './store';

interface ViewProps {
  boxFeedback: BoxFeedback;
  isFirstItem?: boolean;
  isLikeActionProcessing?: boolean;
  onFeedbackImageClick?: (params: { pictures: Array<any>; index: number; layout: 'desktop' | 'mobile' }) => void;
  onActionLike?: () => void;
}
interface ListFeedbackItemProps extends PropsFromRedux {
  boxFeedback: BoxFeedback;
  isFirstItem?: boolean;
  onFeedbackImageClick?: (params: { pictures: Array<any>; index: number; layout: 'desktop' | 'mobile' }) => void;
  onReact?: (params: { feedback: BoxFeedback; isLiked: boolean }) => void;
}
const ListFeedbackItem = ({
  boxFeedback,
  isFirstItem,
  shopStore: { likeAFeedback, unlikeAFeedback },
  likeAFeedbackAction,
  unlikeAFeedbackAction,
  openModalAction,
  onFeedbackImageClick,
  onReact
}: ListFeedbackItemProps) => {
  const likeAFeedbackState = likeAFeedback?.[boxFeedback?.id];
  const unlikeAFeedbackState = unlikeAFeedback?.[boxFeedback?.id];
  const isLikeActionProcessing = likeAFeedbackState?.processing || unlikeAFeedbackState?.processing;

  // TODO: Merge into a single view as both views are mostly same
  const View = isMobileVersion() ? MobileView : DesktopView;

  return (
    <View
      {...{
        boxFeedback,
        isFirstItem,
        isLikeActionProcessing,
        onFeedbackImageClick,
        onActionLike: () => {
          if (!auth.loggedIn()) {
            openModalAction(MODAL_SIGN_IN());
            return;
          }
          if (boxFeedback?.liked) {
            const feedbackState = likeAFeedback?.[boxFeedback?.id];
            if (!feedbackState || (feedbackState && !feedbackState.processing)) {
              unlikeAFeedbackAction?.({ feedbackId: boxFeedback?.id });
              onReact?.({ feedback: boxFeedback, isLiked: false });
            }
          } else {
            const feedbackState = unlikeAFeedback?.[boxFeedback?.id];
            if (!feedbackState || (feedbackState && !feedbackState.processing)) {
              likeAFeedbackAction?.({ feedbackId: boxFeedback?.id });
              onReact?.({ feedback: boxFeedback, isLiked: true });
            }
          }
        }
      }}
    />
  );
};

export type { ViewProps };
export default ListFeedbackItem;
