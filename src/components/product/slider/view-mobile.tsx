import ProductDetailItem from '../detail-item';

import * as LAYOUT from '../../../style/layout';
import componentStyles from '../../../style/component.module.scss';
import STYLE from './style';

export const renderMobile = ({
  props,
  type,
  isShowLike,
  isShowImage,
  isShowRating,
  productList,
  isShowViewMore,
  isShowQuickBuy,
  purchaseType,
  lineTextNumber,
  isShowQuickView,
  isShowHorizontal,
  isShowCurrentPrice
}) => {
  const {
    cartStore,
    likedIdList,
    openAlertAction,
    openModalAction,
    selectGiftAction,
    likeProductAction,
    unLikeProductAction,
    addItemToCartAction,
    handleSelectProductId,
    productIdSelected,
    referrerTracking,
    isSpecialAddOn
  } = props;

  const generateItemProps = (product) => ({
    key: product.id,
    style: STYLE.column[isShowHorizontal ? 3 : 2]
  });

  return (
    <div
      className={componentStyles.blockContent}
      style={Object.assign({}, STYLE.mobileWrap.container(isShowHorizontal))}
    >
      <div style={Object.assign({}, LAYOUT.flexContainer.noWrap, STYLE.mobileWrap.panel(isShowHorizontal))}>
        {Array.isArray(productList) &&
          productList.map((product) => {
            const itemProps = generateItemProps(product);
            const productDetailItemProps = {
              data: product,
              type: type,
              isShowQuickView,
              isShowLike,
              isShowViewMore,
              isShowQuickBuy,
              lineTextNumber,
              isShowCurrentPrice,
              isShowRating,
              isShowImage: true,
              cartStore,
              likedIdList,
              openAlertAction,
              openModalAction,
              selectGiftAction,
              likeProductAction,
              unLikeProductAction,
              addItemToCartAction,
              purchaseType,
              handleSelectProductId,
              productIdSelected,
              referrerTracking,
              isSpecialAddOn
            };

            return (
              <div {...itemProps}>
                <ProductDetailItem {...productDetailItemProps} />
              </div>
            );
          })}
      </div>
    </div>
  );
};
