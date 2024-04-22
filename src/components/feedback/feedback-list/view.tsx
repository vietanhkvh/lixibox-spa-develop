import FadeIn from '../../../container/layout/fade-in';
import MainBlock from '../../../container/layout/main-block';
import Pagination from '../../general/pagination';
import { FORM_TYPE } from '../../../constants/application/form';

import FeedbackItem from '../feedback-item';

import { IProps } from './model';
import STYLE from './style';

export function renderComponent() {
  const {
    style,
    feedbacks,
    addItemToCartAction,
    openModalAction,
    isAddCartFail,
    isAddCartSuccess,

    onSubmitEditForm,

    currentFeedbacked,
    perFeedbacked,
    totalFeedbacked,
    urlFeedbackedList,
    handleFeedbacked,
    isShowPagination,
    isCartSummaryVisible
  } = this.props as IProps;

  const feedbackedPaginationProps = {
    current: currentFeedbacked,
    per: perFeedbacked,
    total: totalFeedbacked,
    urlList: urlFeedbackedList,
    handleClick: (val) => handleFeedbacked(val)
  };

  const feedbacksProps = {
    showHeader: true,
    title: 'Đã Đánh giá',
    showViewMore: false,
    content: (
      <div>
        <FadeIn style={STYLE.row} itemStyle={STYLE.contentGroup.container}>
          {Array.isArray(feedbacks) &&
            feedbacks.map((item, index) => {
              const _item = {
                id: item.id,
                slug: item.feedbackable_slug,
                img_url: (item.feedbackable_image && item.feedbackable_image.medium_url) || '',
                name: item.feedbackable_name,
                box_id: item.feedbackable_id,
                created_at: item.created_at,
                rate: item.rate,
                review: item.review
              };

              const feedbackItemProps = {
                item: _item,
                openModalAction,
                addItemToCartAction,
                displayCartSumary: isCartSummaryVisible,
                isAddCartFail,
                isAddCartSuccess,
                handleSubmitForm: onSubmitEditForm,
                type: FORM_TYPE.EDIT
              };

              return <FeedbackItem key={`user-feedback-item-${index}`} {...feedbackItemProps} />;
            })}
        </FadeIn>
        {isShowPagination && <Pagination {...feedbackedPaginationProps} />}
      </div>
    )
  };

  return (
    <div className={'user-feedback-list'} style={Object.assign({}, STYLE.container, style)}>
      {feedbacks.length > 0 && <MainBlock {...feedbacksProps} />}
    </div>
  );
}
