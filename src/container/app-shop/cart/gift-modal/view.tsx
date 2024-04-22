import { getDeviceVersion } from '../../../../utils/responsive';

import ProductSlider from '../../../../components/product/slider';
import ProductDetailItem from '../../../../components/product/detail-item';
import { PURCHASE_TYPE } from '../../../../constants/application/purchase';
import FadeIn from '../../../layout/fade-in';
import { generateTestId } from 'utils/test-utils';
import { IProps } from './model';
import STYLE from './style';

const renderProductList = (data, productIdSelected, handleSelectProductId) => {
  const {
    cartGiftList,
    cartStore,
    likedIdList,
    openModalAction,
    closeModalAction,
    selectGiftAction,
    likeProductAction,
    unLikeProductAction,
    addItemToCartAction,
    isShowCartSummary
  } = data;

  const productListProps = {
    isShowHeader: false,
    isCustomTitle: false,
    column: 5,
    data: cartGiftList || [],
    isShowViewMore: false,
    isShowQuickView: false,
    isShowQuickBuy: true,
    purchaseType: PURCHASE_TYPE.GIFT,
    lineTextNumber: 2,
    isShowPagination: true,
    isShowRating: false,
    cartStore,
    likedIdList,
    openModalAction,
    closeModalAction,
    selectGiftAction,
    likeProductAction,
    unLikeProductAction,
    addItemToCartAction,
    handleSelectProductId,
    productIdSelected,
    isShowCartSummary
  };

  return <ProductSlider {...productListProps} />;
};

const renderProductListMobile = (data, productIdSelected, handleSelectProductId) => {
  const {
    cartGiftList,
    cartStore,
    likedIdList,
    openModalAction,
    selectGiftAction,
    likeProductAction,
    unLikeProductAction,
    addItemToCartAction
  } = data;

  return (
    <div style={STYLE.wrapParent.productList}>
      <FadeIn>
        <div style={STYLE.wrapParent.row}>
          {Array.isArray(cartGiftList) &&
            cartGiftList.map((product) => {
              const productProps = {
                data: product,
                isShowQuickView: false,
                isShowQuickBuy: true,
                purchaseType: PURCHASE_TYPE.GIFT,
                lineTextNumber: 2,
                isShowRating: false,
                cartStore,
                likedIdList,
                openModalAction,
                selectGiftAction,
                likeProductAction,
                unLikeProductAction,
                addItemToCartAction,
                handleSelectProductId,
                productIdSelected
              };

              return (
                <div key={product.id} style={STYLE.itemWrap}>
                  <ProductDetailItem {...productProps} />
                </div>
              );
            })}
        </div>
      </FadeIn>
    </div>
  );
};

const renderView = (props: IProps, productIdSelected, handleSelectProductId) => {
  const { data } = props;
  const switchView = {
    MOBILE: () => renderProductListMobile(data, productIdSelected, handleSelectProductId),
    DESKTOP: () => renderProductList(data, productIdSelected, handleSelectProductId)
  };

  return (
    <div style={STYLE.wrapParent} {...generateTestId({ name: 'gift-modal' })}>
      {switchView[getDeviceVersion()]()}
    </div>
  );
};

export default renderView;
