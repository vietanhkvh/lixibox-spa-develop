import { useState } from 'react';
import classnames from 'classnames';
import TrackVisibility from 'lixibox-react-on-screen';

import GeneralModal from '../../../../../../presentation-component/modal/general-modal';
import SeparateLine from '../../../../../../presentation-component/ui/separate-line';
import ContainerListFeedback from '../../../../../../components/container/list-feedback';
import SvgIcon from '../../../../../../presentation-component/ui/icon';
import Image from 'presentation-component/ui/image';
import Expander from 'presentation-component/ui/expander';
import FeedbackSummaryRatings from 'presentation-component/feedback/summary-ratings';
import FeedbackSummaryKeywords from 'presentation-component/feedback/summary-keywords';
import FeedbackSummaryFeedbacks from 'presentation-component/feedback/summary-feedbacks';

import { scrollElement } from '../../../../../../utils/scroll';
import { objectToHash } from '../../../../../../utils/encode';
import RatingStar from '../../../../../../components/ui/rating-star';
import SubmitButton from 'components/ui/submit-button';
import { TrackInViewport } from 'utils/visibility';
import { gatewayTrackViewedBoxFeedbacks } from 'tracking/gateway';
import { IProductDetailContainerProps, IProductDetailContainerState } from '../../model';
import styles from './style.module.scss';

const HEADER_BAR_HEIGHT = 50;

const Modal = ({
  typeModal,
  boxFeedbackable,
  isOpenFeedbackModal,
  handleSetOpenFeedbackModal,
  summaryInfo,
  feedbackPicture,
  feedbackListProps,
  boxFeedbackSummary
}) => {
  return (
    <GeneralModal
      isOpen={isOpenFeedbackModal}
      fullHeight={'review' !== typeModal}
      title={
        'review' === typeModal
          ? boxFeedbackable?.reviewed
            ? 'Bạn đã đánh giá box'
            : !boxFeedbackable?.canReview
            ? 'Bạn chưa mua box'
            : ''
          : 'Đánh giá sản phẩm'
      }
      leftTitle=""
      rightIcon={'close'}
      onRightActionClick={() => handleSetOpenFeedbackModal(false)}
      onRequestClose={() => handleSetOpenFeedbackModal(false)}
    >
      {'review' === typeModal ? (
        <div className={styles.feedbackBlock}>
          {renderContentMOdalFeedBack({ boxFeedbackable, handleSetOpenFeedbackModal })}
        </div>
      ) : (
        <div className={styles.feedbackBlock}>
          <Heading isOnModal={true} onViewMoreClick={() => handleSetOpenFeedbackModal(true)} />
          {!!summaryInfo && (
            <Summary
              summaryInfo={summaryInfo}
              feedbackPicture={feedbackPicture}
              boxFeedbackSummary={boxFeedbackSummary}
            />
          )}
          <ContainerListFeedback {...feedbackListProps} isOnModal={true} />
        </div>
      )}
    </GeneralModal>
  );
};

const MobileFeedback = ({
  props,
  state,
  handleClick,
  handleFetchListFeedback,
  handleSetOpenFeedbackModal,
  onFeedbackReact
}) => {
  const {
    shopStore: { productDetail, boxFeedback, boxFeedbackPicture, boxFeedbackSummary, boxFeedbackable },
    cartStore: {
      constants: { box_feedback_lixicoin }
    },
    feedbackPerPage,
    openModalAction
  } = props as IProductDetailContainerProps;

  const {
    idProduct,
    feedbackPage,
    feedbackUrlList,
    feedbackPosition = 0,
    isLoadingFeedback,
    idProductHash,
    isOpenFeedbackModal
  } = state as IProductDetailContainerState;

  const product = productDetail[idProductHash];
  const summaryInfo = !!product && !!product.box ? product.box.rating : null;
  const [typeModal, setTypeModal] = useState('view');

  const feedbackPicture = boxFeedbackPicture[idProductHash];

  const params = {
    productId: idProduct,
    page: feedbackPage,
    perPage: feedbackPerPage
  };
  const keyHash = objectToHash(params);
  const list = (boxFeedback && boxFeedback[keyHash]) || [];
  const { current_page, per_page, total_pages } = (!!list && list.paging) || {
    current_page: 0,
    per_page: 0,
    total_pages: 0
  };
  const _urlList = list.feedbacks && !!list.feedbacks.length ? feedbackUrlList : [];

  const feedbackListProps = {
    openModal: openModalAction,
    list: (list && list.feedbacks) || [],
    current: current_page,
    per: per_page,
    total: total_pages,
    urlList: _urlList,
    canScrollToTop: false,
    isLoading: isLoadingFeedback,
    scrollToElementNum: feedbackPosition - HEADER_BAR_HEIGHT,
    productId: product ? product.box.id : 0,
    boxFeedbackable,
    boxFeedbackSummary,
    handleClick: (val) => handleClick(val),
    handleSetOpenFeedbackModal: (val: boolean) => handleSetOpenFeedbackModal(val),
    setTypeModal: (val: string) => setTypeModal(val),
    lixicoinPerFeedback: box_feedback_lixicoin,
    onFeedbackReact
  };

  const isExistFeedback = (list && list.feedbacks && list.feedbacks.length) || false;

  const modalProps = {
    typeModal,
    boxFeedbackable,
    isOpenFeedbackModal,
    handleSetOpenFeedbackModal,
    summaryInfo,
    feedbackPicture,
    feedbackListProps,
    boxFeedbackSummary
  };

  return (
    <>
      <div id={'product-detail-feedback'} className={styles.feedbackBlock}>
        <TrackVisibility once>
          <TrackInViewport onVisible={() => gatewayTrackViewedBoxFeedbacks({ box: product?.box })}>
            <Heading
              onViewMoreClick={() => {
                handleSetOpenFeedbackModal(true);
                setTypeModal('view');
              }}
              isShowViewAll={isExistFeedback}
            />
          </TrackInViewport>
        </TrackVisibility>
        {!!isExistFeedback && !!summaryInfo && (
          <Summary
            summaryInfo={summaryInfo}
            feedbackPicture={feedbackPicture}
            boxFeedbackSummary={boxFeedbackSummary}
          />
        )}
        <ContainerListFeedback {...feedbackListProps} />
        <Modal {...modalProps} />
      </div>
      <SeparateLine />
    </>
  );
};

export default MobileFeedback;
const renderContentMOdalFeedBack = ({ boxFeedbackable, handleSetOpenFeedbackModal }) => {
  if (boxFeedbackable?.reviewed) {
    return (
      <div>
        <p className={styles.feedbackReviewModalContent}>
          Bạn không thể gửi thêm đánh giá cho sản phẩm này.
          <br /> Cảm ơn bạn.
        </p>
        <SubmitButton
          type={'submit'}
          title={'Tiếp tục mua hàng'}
          svgIconClass={styles.actionButtonIcon}
          color={'black'}
          onSubmit={() => {
            handleSetOpenFeedbackModal(false);
          }}
        />
      </div>
    );
  } else if (!boxFeedbackable?.canReview) {
    return (
      <div>
        <p className={styles.feedbackReviewModalContent}>
          Bạn hãy mua hàng và quay trở lại để đánh giá sau khi sử dụng sản phẩm.
        </p>

        <SubmitButton
          type={'submit'}
          title={'Tiếp tục mua hàng'}
          svgIconClass={styles.actionButtonIcon}
          color={'black'}
          onSubmit={() => {
            handleSetOpenFeedbackModal(false);
          }}
        />
      </div>
    );
  }
};

const Heading = ({ onViewMoreClick, isOnModal = false, isShowViewAll = true }) => {
  return (
    <div className={classnames(styles.feedbackBlockHeading, { [styles.isOnModal]: isOnModal })}>
      Đánh giá sản phẩm
      {!!isShowViewAll && (
        <div className={styles.viewMore} onClick={onViewMoreClick}>
          Xem tất cả
          <SvgIcon name={'angle-right'} className={styles.icon} />
        </div>
      )}
    </div>
  );
};

const Summary = ({ summaryInfo, feedbackPicture, boxFeedbackSummary }) => {
  const [isOpenPictureModal, setDisplayPictureModal] = useState(false);
  const [isOpenFullScreenPicture, setDisplayFullScreenPicture] = useState(false);

  const handleCloseModal = () => {
    setDisplayFullScreenPicture(false);
    setDisplayPictureModal(false);
  };

  const handleDisplayFullScreenPicture = (index) => {
    const element = document.getElementById('fb-image-carousel');
    const SCROLL_TO = window.innerWidth * (index - 1);
    setTimeout(() => scrollElement({ x: SCROLL_TO, y: 0, element, isAnimation: true }), 1000);
    setDisplayFullScreenPicture(!!index);
  };

  return (
    <div className={styles.feedbackSummary}>
      <div className={styles.info}>
        <div className={styles.avg}>{summaryInfo.avg_rate}</div>
        <div className={styles.count}>
          <RatingStar value={summaryInfo.avg_rate} style={{ marginBottom: 3 }} />
          <div className={styles.countValue}>{summaryInfo.count} đánh giá</div>
        </div>
      </div>
      <div className={styles.divider} />
      {!!boxFeedbackSummary?.detail?.rates?.length && (
        <>
          <FeedbackSummaryRatings ratings={boxFeedbackSummary.detail.rates} />
          <div className={styles.divider} />
        </>
      )}
      {!!boxFeedbackSummary?.detail?.keyword_list?.length && (
        <>
          <Expander height={104}>
            <FeedbackSummaryKeywords keywords={boxFeedbackSummary.detail.keyword_list} />
          </Expander>
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
          <div className={styles.panel} onClick={() => setDisplayPictureModal(true)}>
            {feedbackPicture.map(PictureSummaryItem, { total: feedbackPicture.length })}
          </div>
        </div>
      )}

      <GeneralModal
        isOpen={isOpenPictureModal}
        title={'Hình ảnh từ người dùng'}
        rightIcon={'close'}
        fullHeight={true}
        onRightActionClick={handleCloseModal}
        onRequestClose={handleCloseModal}
      >
        <div className={classnames(styles.pictureListModal, { [styles.isFullScreen]: !!isOpenFullScreenPicture })}>
          <div className={styles.panel} id={'fb-image-carousel'}>
            {feedbackPicture.map(FullPictureSummaryItem, { onClick: handleDisplayFullScreenPicture })}
          </div>
        </div>
      </GeneralModal>
    </div>
  );
};

function PictureSummaryItem(item, index) {
  if (index >= 5) return null;

  return (
    <div className={styles.pictureItem}>
      <div className={styles.pictureItemInner}>
        <Image alt={''} src={item.url} />
        {this.total > 5 && 4 === index && <div>{this.total - 4}+</div>}
      </div>
    </div>
  );
}

function FullPictureSummaryItem(item, index) {
  return (
    <div className={styles.pictureItem} onClick={() => this.onClick(index + 1)}>
      <div className={styles.pictureItemInner}>
        <Image alt={''} src={item.url} />
      </div>
    </div>
  );
}
