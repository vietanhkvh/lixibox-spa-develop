import { objectToHash } from '../../../../utils/encode';
import FeedbackList from '../../../../components/feedback/feedback-list';

import { IState, IProps } from './model';

const renderView = ({ props, state, handleNotFeedback, handleFeedbacked }) => {
  const {
    feedbackStore: { userBoxesToFeedback, userFeedbacks },
    editFeedbackAction,
    history,
    perPageNotFeedback,
    perPageFeedbacked,
    addItemToCartAction,
    openModalAction,
    cartStore: { isAddCartFail, isAddCartSuccess, isCartSummaryVisible }
  } = props as IProps;

  const { pageNotFeedback, pageFeedbacked, urlNotFeedbackList, urlFeedbackedList } = state as IState;

  // Not feedback
  const paramNotFeedbacks = {
    page: pageNotFeedback,
    perPage: perPageNotFeedback
  };
  const keyHashNotFeedbacks = objectToHash(paramNotFeedbacks);
  const notFeedbackList = (userBoxesToFeedback && userBoxesToFeedback[keyHashNotFeedbacks]) || [];
  const currentNotFeedback =
    (0 !== notFeedbackList.length && notFeedbackList.paging && notFeedbackList.paging.current_page) || 0;
  const perNotFeedback =
    (0 !== notFeedbackList.length && notFeedbackList.paging && notFeedbackList.paging.per_page) || 0;
  const totalNotFeedback =
    (0 !== notFeedbackList.length && notFeedbackList.paging && notFeedbackList.paging.total_pages) || 0;
  const _urlNotFeedbackList = notFeedbackList.boxes && 0 !== notFeedbackList.boxes.length ? urlNotFeedbackList : [];
  const tmpUrlNotFeedbackList = totalNotFeedback !== _urlNotFeedbackList.length ? [] : _urlNotFeedbackList;

  // Feedbacked
  const paramFeedbackeds = { page: pageFeedbacked, perPage: perPageFeedbacked };
  const keyHashFeedbackeds = objectToHash(paramFeedbackeds);
  const feedbackedList = (userFeedbacks && userFeedbacks[keyHashFeedbackeds]) || [];
  const currentFeedbacked =
    (0 !== feedbackedList.length && feedbackedList.paging && feedbackedList.paging.current_page) || 0;
  const perFeedbacked = (0 !== feedbackedList.length && feedbackedList.paging && feedbackedList.paging.per_page) || 0;
  const totalFeedbacked =
    (0 !== feedbackedList.length && feedbackedList.paging && feedbackedList.paging.total_pages) || 0;
  const _urlFeedbackedList = feedbackedList.feedbacks && 0 !== feedbackedList.feedbacks.length ? urlFeedbackedList : [];
  const tmpUrlFeedbackedList = totalFeedbacked !== _urlFeedbackedList.length ? [] : _urlFeedbackedList;

  const feedbacksProps = {
    history,
    showHeader: false,
    feedbacks: (feedbackedList && feedbackedList.feedbacks) || [],
    boxesToFeedback: (notFeedbackList && notFeedbackList.boxes) || [],
    onSubmitEditForm: editFeedbackAction,
    currentNotFeedback,
    perNotFeedback,
    totalNotFeedback,
    urlNotFeedbackList: tmpUrlNotFeedbackList,
    currentFeedbacked,
    perFeedbacked,
    totalFeedbacked,
    urlFeedbackedList: tmpUrlFeedbackedList,
    handleNotFeedback,
    handleFeedbacked,
    isShowPagination: true,
    addItemToCartAction,
    openModalAction,
    isAddCartFail,
    isAddCartSuccess,
    isCartSummaryVisible
  };

  return (
    <div className={'user-feedback-container'}>
      <FeedbackList {...feedbacksProps} />
    </div>
  );
};

export default renderView;
