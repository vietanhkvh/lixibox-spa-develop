import ProductDiscussion from '../../../../../../components/product/discussion';
import SubmitButton from '../../../../../../components/ui/submit-button';
import SeparateLine from '../../../../../../presentation-component/ui/separate-line';
import GeneralModal from '../../../../../../presentation-component/modal/general-modal';

import { IProductDetailContainerProps, IProductDetailContainerState } from '../../model';
import STYLE from './style';
import styles from './style.module.scss';

const HEADER_BAR_HEIGHT = 50;

export function renderMobileDiscussion({ props, state, handleSetOpenDiscussionModal }) {
  const {
    shopStore: { productDetail }
  } = props as IProductDetailContainerProps;
  const { isOpenDiscussionModal, idProductHash, discussionPosition = 0 } = state as IProductDetailContainerState;
  const product = productDetail[idProductHash];

  const productDiscussionProps = {
    productId: (product && product.box && product.box.slug) || '',
    scrollToElementNum: discussionPosition - HEADER_BAR_HEIGHT,
    onReply: () => handleSetOpenDiscussionModal(true)
  };

  return (
    <>
      <div style={STYLE.mobile.tabs.comment}>
        {product && product.box && (
          <div id={'product-detail-discussion'}>
            <div className={styles.discussionHeading}>Hỏi đáp về sản phẩm</div>
            <ProductDiscussion {...productDiscussionProps} />
            <SubmitButton
              title={'Đặt câu hỏi cho sản phẩm'}
              color={'borderBlack'}
              svgIcon={'message-question'}
              svgIconClass={''}
              onSubmit={() => handleSetOpenDiscussionModal(true)}
            />
          </div>
        )}
      </div>
      <SeparateLine />
      <GeneralModal
        isOpen={isOpenDiscussionModal}
        title="Hỏi đáp về sản phẩm"
        leftTitle=""
        rightIcon={'close'}
        fullHeight
        onRightActionClick={() => handleSetOpenDiscussionModal(false)}
        onRequestClose={() => handleSetOpenDiscussionModal(false)}
      >
        <div style={{ padding: 16 }}>
          <ProductDiscussion {...productDiscussionProps} isOnModal={true} />
        </div>
      </GeneralModal>
    </>
  );
}
