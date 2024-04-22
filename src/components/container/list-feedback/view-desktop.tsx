import { generatePath } from 'react-router-dom';
import Pagination from '../../general/pagination';
import Loading from '../../ui/loading';
import { auth } from '../../../utils/auth';
import { MODAL_SIGN_IN } from '../../../constants/application/modal';
import { CDN_ASSETS_PREFIX } from '../../../utils/uri';
import { ROUTING_COMMUNITY_NEW_FEEDBACK } from '../../../routings/path';
import SubmitButton from '../../../components/ui/submit-button';
import Image from 'presentation-component/ui/image';
import Expander from 'presentation-component/ui/expander';
import FeedbackSummaryRatings from 'presentation-component/feedback/summary-ratings';
import FeedbackSummaryFeedbacks from 'presentation-component/feedback/summary-feedbacks';
import FeedbackSummaryKeywords from 'presentation-component/feedback/summary-keywords';
import ListFeedbackItem from 'components/container/list-feedback-item';
import RatingStar from '../../ui/rating-star';
import STYLE from './style';
import styles from './style.module.scss';

const noRatingImage = CDN_ASSETS_PREFIX('/rating/no-rating.png');

function PictureSummaryItem(item, index) {
  if (index >= 5) return null;

  return (
    <div className={styles.pictureItem} onClick={() => this.onOpen(index)} key={`img-summary-fb-${index}`}>
      <div className={styles.pictureItemInner}>
        <Image alt={''} src={item?.url} />
        {this.total > 5 && 4 === index && <div>{this.total - 4}+</div>}
      </div>
    </div>
  );
}

const renderRatingHeader = ({ rating, feedbackPicture, boxFeedbackSummary, onDisplayDesktopFullScreenImage }) => {
  const avgRate = (rating && rating.avg_rate) || 0;
  return (
    <>
      <div style={STYLE.rightCol.ratingHeader}>
        <div style={STYLE.rightCol.ratingHeader.title}>{`${avgRate}`}</div>
        <div style={STYLE.rightCol.ratingHeader.ratingGroup}>
          <RatingStar value={avgRate} style={STYLE.container.info.rating} />
          <span style={STYLE.rightCol.ratingHeader.ratingGroup.content}>{rating && `${rating.count} đánh giá`}</span>
        </div>
      </div>
      <div className={styles.divider} />
      {!!boxFeedbackSummary?.detail?.rates?.length && (
        <>
          <FeedbackSummaryRatings ratings={boxFeedbackSummary.detail.rates} />
          <div className={styles.divider} />
        </>
      )}
      {!!boxFeedbackSummary?.detail?.data?.length && (
        <>
          <FeedbackSummaryFeedbacks feedbacks={boxFeedbackSummary.detail.data} />
          <div className={styles.divider} />
        </>
      )}
      {!!feedbackPicture && !!feedbackPicture.length && (
        <div className={styles.pictureList}>
          <div className={styles.heading}>Hình ảnh từ người dùng</div>
          <div className={styles.panel}>
            {feedbackPicture.map(PictureSummaryItem, {
              total: feedbackPicture.length,
              onOpen: (index) => onDisplayDesktopFullScreenImage(feedbackPicture, index)
            })}
          </div>
        </div>
      )}
    </>
  );
};

const renderRatingFooter = ({ openModal, productId, handleSetOpenFeedbackModal, boxFeedbackable }) => (
  <div style={STYLE.rightCol.ratingFooter}>
    <div style={STYLE.rightCol.ratingFooter.desc}>Chia sẻ suy nghĩ và đánh giá của bạn về sản phẩm</div>
    <div style={STYLE.rightCol.ratingFooter.btnWrap}>
      <SubmitButton
        type={auth.loggedIn() && !boxFeedbackable?.reviewed && boxFeedbackable?.canReview ? 'link' : 'submit'}
        link={auth.loggedIn() ? generatePath(ROUTING_COMMUNITY_NEW_FEEDBACK, { productId }) : '#'}
        onSubmit={() => (!auth.loggedIn() ? openModal(MODAL_SIGN_IN()) : handleSetOpenFeedbackModal?.(true))}
        title={'Gửi đánh giá của bạn'}
        svgIcon={'star'}
        svgIconClass={styles.actionButtonIcon}
        style={{ margin: 0 }}
        color={'borderBlack'}
      />
    </div>
  </div>
);

export default function renderComponent() {
  const {
    list,
    current,
    per,
    total,
    urlList,
    handleClick,
    canScrollToTop,
    isLoading,
    elementId,
    scrollToElementNum,
    rating,
    boxFeedbackPicture,
    idProductHash,
    openModal,
    productId,
    boxFeedbackable,
    boxFeedbackSummary,
    handleSetOpenFeedbackModal,
    onFeedbackReact
  } = this.props;

  const paginationProps = {
    current,
    per,
    total,
    urlList,
    handleClick,
    canScrollToTop,
    elementId,
    scrollToElementNum
  };

  const feedbackPicture = boxFeedbackPicture[idProductHash];

  return (
    <div>
      {isLoading ? (
        <Loading style={STYLE.loading} />
      ) : !Array.isArray(list) || list.length === 0 ? (
        /** 2.1. Empty List */
        <div style={STYLE.empty}>
          <Image src={noRatingImage} style={STYLE.empty.image} alt={''} />
          <div style={STYLE.empty.content}>
            <div style={STYLE.empty.content.title}>Chưa có đánh giá</div>
            <div style={STYLE.empty.content.description}>
              Sử dụng sản phẩm và trở thành người đánh giá đầu tiên bạn nhé
            </div>
          </div>
        </div>
      ) : (
        /** 2.2. List Rating detail */
        <div style={STYLE.parent}>
          <div style={STYLE.sticky}>
            <div className={'rightSectionRef'} style={STYLE.rightCol}>
              <div style={STYLE.rightCol.ratingFooter.title}>Đánh giá sản phẩm</div>
              {renderRatingHeader({
                rating,
                feedbackPicture,
                boxFeedbackSummary,
                onDisplayDesktopFullScreenImage: this.handleDisplayDesktopFullScreenImage.bind(this)
              })}
              {renderRatingFooter({ openModal, productId, handleSetOpenFeedbackModal, boxFeedbackable })}
            </div>
          </div>
          {/* FIXME: Rewrite this component and remove non-standard DOM reference */}
          <div
            style={Object.assign({}, STYLE.leftCol, {
              marginTop: -(document.getElementsByClassName('rightSectionRef')?.[0]?.clientHeight || 0)
            })}
          >
            {!!boxFeedbackSummary?.detail?.keyword_list?.length && (
              <>
                <Expander height={104}>
                  <FeedbackSummaryKeywords keywords={boxFeedbackSummary.detail.keyword_list} />
                </Expander>
                <div className={styles.divider} />
              </>
            )}
            {Array.isArray(list) &&
              list.map((ratingItem) => (
                <ListFeedbackItem
                  {...{
                    key: `rating-item-${ratingItem.id}`,
                    boxFeedback: ratingItem,
                    onFeedbackImageClick: ({ pictures, index, layout }) => {
                      this.handleDisplayDesktopFullScreenImage(pictures, index);
                    },
                    onReact: onFeedbackReact
                  }}
                />
              ))}
            <Pagination {...paginationProps} />
          </div>
        </div>
      )}
    </div>
  );
}
