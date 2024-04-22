import classnames from 'classnames';
import { generatePath } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom-v5-compat';
import { auth } from 'utils/auth';
import { ROUTING_AUTH_SIGN_IN, ROUTING_COMMUNITY_NEW_FEEDBACK } from '../../../routings/path';
import GeneralModal from '../../../presentation-component/modal/general-modal';
import Pagination from '../../general/pagination';
import Loading from '../../ui/loading';
import SubmitButton from '../../../components/ui/submit-button';
import Image from 'presentation-component/ui/image';
import ListFeedbackItem from 'components/container/list-feedback-item';
import STYLE from './style';
import styles from './style.module.scss';

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
    isOnModal,
    handleSetOpenFeedbackModal,
    productId,
    boxFeedbackable,
    setTypeModal,
    lixicoinPerFeedback,
    onFeedbackReact
  } = this.props;

  const { isOpenPictureModal, imgToDisplayFullScreen } = this.state;

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

  return (
    <div>
      {isLoading ? (
        <Loading style={STYLE.loading} />
      ) : list && list.length === 0 ? (
        <>
          <div style={STYLE.emptyMessage}>Gửi đánh giá đầu tiên cho sản phẩm này</div>
          <FeedbackAction
            {...{
              isOnModal,
              handleSetOpenFeedbackModal,
              productId,
              boxFeedbackable,
              setTypeModal,
              lixicoinPerFeedback
            }}
          />
        </>
      ) : (
        /** 2.2. List Rating detail */
        <div>
          {Array.isArray(list) &&
            list
              .filter((item, index) => isOnModal || index <= 2)
              .map((ratingItem, index) => (
                <ListFeedbackItem
                  {...{
                    key: `rating-item-${ratingItem.id}`,
                    boxFeedback: ratingItem,
                    onFeedbackImageClick: ({ pictures, index, layout }) => {
                      this.setImageToDisplayFullScreen(pictures);
                    },
                    onReact: onFeedbackReact
                  }}
                />
              ))}
          {!!isOnModal && <Pagination {...paginationProps} />}
          <FeedbackAction
            {...{
              isOnModal,
              handleSetOpenFeedbackModal,
              productId,
              boxFeedbackable,
              setTypeModal,
              lixicoinPerFeedback
            }}
          />
        </div>
      )}

      <GeneralModal
        isOpen={isOpenPictureModal}
        title={'Hình ảnh từ người dùng'}
        rightIcon={'close'}
        fullHeight={true}
        onRightActionClick={() => this.setDisplayPictureModal(false)}
        onRequestClose={() => this.setDisplayPictureModal(false)}
      >
        <div className={classnames(styles.pictureListModal, styles.isFullScreen)}>
          <div className={styles.panel}>{imgToDisplayFullScreen.map(FullPictureSummaryItem)}</div>
        </div>
      </GeneralModal>
    </div>
  );
}

function FullPictureSummaryItem(item, index) {
  return (
    <div key={index} className={styles.pictureItem}>
      <div className={styles.pictureItemInner}>
        <Image alt={''} src={item?.url} />
      </div>
    </div>
  );
}

const FeedbackAction = ({
  isOnModal,
  handleSetOpenFeedbackModal,
  productId,
  boxFeedbackable,
  setTypeModal,
  lixicoinPerFeedback
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <div style={!!isOnModal ? STYLE.bottomAction.onModal : STYLE.bottomAction}>
      <div style={!!isOnModal ? STYLE.bottomAction.fixed : {}}>
        <SubmitButton
          type={!boxFeedbackable?.reviewed && boxFeedbackable?.canReview ? 'link' : 'submit'}
          link={generatePath(ROUTING_COMMUNITY_NEW_FEEDBACK, { productId })}
          title={
            isOnModal
              ? lixicoinPerFeedback
                ? `Gửi đánh giá và có thêm ${lixicoinPerFeedback} Lixicoin`
                : ''
              : 'Gửi đánh giá của bạn'
          }
          svgIcon={'star'}
          svgIconClass={styles.actionButtonIcon}
          style={{ margin: 0 }}
          color={isOnModal ? 'black' : 'borderBlack'}
          onSubmit={() => {
            if (!auth.loggedIn()) {
              navigate({ pathname: ROUTING_AUTH_SIGN_IN }, { state: { referrer: location?.pathname } });
            } else {
              handleSetOpenFeedbackModal(true);
              setTypeModal('review');
            }
          }}
        />
      </div>
    </div>
  );
};
