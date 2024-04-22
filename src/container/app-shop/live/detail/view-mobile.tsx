import GeneralModal from '../../../../presentation-component/modal/general-modal';
import MobileDetailPanel from '../../../../presentation-component/live/mobile-detail-panel';
import Video from '../../../../presentation-component/live/video';
import Message from '../../../../presentation-component/live/message';
import DiscountCode from '../../../../presentation-component/live/discount-code';
import Product from '../../../../presentation-component/live/product';
import HighLightInfo from '../../../../presentation-component/live/high-light-info';

import { tranformCommentItem, tranformCommentList, tranformProductList } from './module';
import { AddToCartSuccessModalContent } from './view-general';

function render() {
  const {
    authStore: { userInfo, signInStatus },
    liveDetailStore: liveDetail,
    liveCommentListStore: liveCommentList,
    liveRepliesCommentListStore: liveRepliesCommentList,
    receiveNewCommentStore: receiveNewComment,
    isFetchLiveCommentListStore: isFetchLiveCommentList,
    isCreatingLiveCommentStore: isCreatingLiveComment
  } = this.props;
  const { isShowMobileTabModal, isShowAddToCartSuccessModal, selectedProduct } = this.state;

  const containerProps = {
    style: {}
  };

  const messageProps = {
    commentList: tranformCommentList(liveCommentList),
    isFetchLiveCommentList,
    liveRepliesCommentList:
      (!!liveRepliesCommentList.replies && tranformCommentList(liveRepliesCommentList.replies, true)) || [],
    receiveNewComment,
    userInfo,
    signInStatus,
    isSubmitLoading: isCreatingLiveComment,
    onSubmit: ({ content }) => console.log(content),
    onRequestLogin: this.handleRequestLogin.bind(this),
    onOpenThread: this.handleOpenThread.bind(this)
  };

  const discountCodeList = liveDetail.discount_codes || [];
  const discountCodeProps = {
    discountCodeList,
    isShowFullList: true,
    onAddDiscountCode: this.handleAddDiscountCode.bind(this)
  };

  const videoProps = {
    videoUrl: liveDetail.video_link,
    coverImageUrl: liveDetail.image_url,
    ratioType: liveDetail.ratio_type
  };

  const productList = tranformProductList(liveDetail.boxes) || [];
  const productProps = { productList, isShowFullList: true, onAddToCart: this.handleAddToCart.bind(this) };

  const highLightInfoProps = {
    topComment:
      (!!liveCommentList && !!liveCommentList.length && tranformCommentItem(liveCommentList.slice(-1)[0])) || null,
    topDiscountCode:
      (!!liveDetail &&
        !!liveDetail.discount_codes &&
        !!liveDetail.discount_codes.length &&
        liveDetail.discount_codes.slice(-1)[0]) ||
      null,
    topBox: (!!liveDetail && !!liveDetail.boxes && !!liveDetail.boxes.length && liveDetail.boxes.slice(-1)[0]) || null,
    onSelect: this.handleOnSelectHighLightInfo.bind(this)
  };

  const addToCartSuccessModalProps = {
    title: 'Đã thêm vào giỏ hàng',
    isOpen: !!isShowAddToCartSuccessModal,
    rightIcon: 'close',
    fullHeight: false,
    isShowHeading: true,
    onRightActionClick: () => this.setState({ isShowAddToCartSuccessModal: false }),
    onRequestClose: () => this.setState({ isShowAddToCartSuccessModal: false })
  };

  return (
    <div {...containerProps}>
      <MobileDetailPanel
        isShowMobileTabModal={isShowMobileTabModal}
        onChangeMobileTabModal={this.handleOnSelectHighLightInfo.bind(this)}
        highLightInfo={<HighLightInfo {...highLightInfoProps} />}
        video={<Video {...videoProps} />}
        videoRatioType={liveDetail.ratio_type}
        message={<Message {...messageProps} />}
        discountCode={<DiscountCode {...discountCodeProps} />}
        product={<Product {...productProps} />}
        numberOfItem={{
          discountCode: (!!discountCodeList && discountCodeList.length) || 0,
          product: (!!productList && productList.length) || 0
        }}
      />
      <GeneralModal {...addToCartSuccessModalProps}>
        <AddToCartSuccessModalContent product={selectedProduct} />
      </GeneralModal>
    </div>
  );
}

export default render;
