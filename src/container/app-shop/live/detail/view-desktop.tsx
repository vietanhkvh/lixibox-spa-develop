import GeneralModal from '../../../../presentation-component/modal/general-modal';
import DesktopDetailPanel from '../../../../presentation-component/live/desktop-detail-panel';
import Video from '../../../../presentation-component/live/video';
import Message from '../../../../presentation-component/live/message';
import DiscountCode from '../../../../presentation-component/live/discount-code';
import Product from '../../../../presentation-component/live/product';

import { tranformCommentList, tranformProductList } from './module';
import { AddToCartSuccessModalContent } from './view-general';

function render() {
  const {
    authStore: { userInfo, signInStatus },
    liveDetailStore: liveDetail,
    liveCommentListStore: liveCommentList,
    liveRepliesCommentListStore: liveRepliesCommentList,
    receiveNewCommentStore: receiveNewComment,
    receiveNewRelyCommentStore: receiveNewRelyComment,
    isCreatingLiveCommentStore: isCreatingLiveComment,
    isFetchLiveCommentListStore: isFetchLiveCommentList
  } = this.props;

  const { isShowAddToCartSuccessModal, selectedProduct } = this.state;

  const containerProps = {
    style: {
      minHeight: 400,
      paddingTop: 10,
      paddingBottom: 30
    }
  };

  const tranformedLiveCommentList = tranformCommentList(liveCommentList);
  const messageProps = {
    commentList: tranformedLiveCommentList,
    isFetchLiveCommentList: isFetchLiveCommentList,
    liveRepliesCommentList:
      (!!liveRepliesCommentList.replies && tranformCommentList(liveRepliesCommentList.replies, true)) || [],
    receiveNewComment,
    receiveNewRelyComment,
    userInfo,
    signInStatus,
    isSubmitLoading: isCreatingLiveComment,
    onSubmit: this.handleCreateNewComment.bind(this),
    onRequestLogin: this.handleRequestLogin.bind(this),
    onOpenThread: this.handleOpenThread.bind(this)
  };

  const discountCodeList = liveDetail.discount_codes || [];
  const discountCodeProps = {
    discountCodeList,
    onAddDiscountCode: this.handleAddDiscountCode.bind(this)
  };

  const productList = tranformProductList(liveDetail.boxes) || [];
  const productProps = {
    productList,
    onAddToCart: this.handleAddToCart.bind(this)
  };

  const videoProps = {
    videoUrl: liveDetail.video_link,
    coverImageUrl: liveDetail.image_url,
    ratioType: liveDetail.ratio_type
  };

  const addToCartSuccessModalProps = {
    title: 'Đã thêm vào giỏ hàng',
    isOpen: !!isShowAddToCartSuccessModal,
    leftTitle: '',
    rightIcon: 'close',
    fullHeight: true,
    isShowHeading: true,
    onRightActionClick: () => this.setState({ isShowAddToCartSuccessModal: false }),
    onRequestClose: () => this.setState({ isShowAddToCartSuccessModal: false })
  };

  return (
    <div {...containerProps}>
      <DesktopDetailPanel
        video={<Video {...videoProps} />}
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
