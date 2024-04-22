import RightBarCommunity from '../../../../components/community/right-bar-community';
import { NEW_PRODUCT_PARAMS } from '../../../../constants/application/product';
import { MAGAZINE_COMMUNITY_PARAMS } from '../../../../constants/application/magazine';

import { objectToHash } from '../../../../utils/encode';
import { isEmptyObject, isEmptyKeyObject, isUndefined } from '../../../../utils/validate';

import { IProps } from './model';

export function renderComponent({ props }) {
  const {
    days,
    hashtags,
    magazineList,
    productByCategory,
    hashtagSelected,
    likedIdList,
    openModalAction,
    likeProductAction,
    unLikeProductAction,
    addItemToCartAction,
    userBoxesToFeedback,
    isShowUnReview
  } = props as IProps;

  const newProductsHash = objectToHash({
    categoryId: NEW_PRODUCT_PARAMS.idCategory,
    limit: 5
  });
  const newProductList =
    (!isEmptyObject(productByCategory) &&
      !isUndefined(productByCategory[newProductsHash]) &&
      !isEmptyObject(productByCategory[newProductsHash]) &&
      !isEmptyKeyObject(productByCategory[newProductsHash], 'boxes') &&
      Array.isArray(productByCategory[newProductsHash].boxes) &&
      productByCategory[newProductsHash].boxes.slice(0, 5)) ||
    [];

  const keyHash = objectToHash({ days });
  const hashtagList = hashtags && !isUndefined(hashtags[keyHash]) ? hashtags[keyHash] : [];

  const communityMagazineKeyHash = objectToHash(MAGAZINE_COMMUNITY_PARAMS);
  const communityMagazineList =
    !isEmptyObject(magazineList) && !isUndefined(magazineList[communityMagazineKeyHash])
      ? magazineList[communityMagazineKeyHash]
      : [];

  const rightBarCommunityProps = {
    isShowUnReview,
    hashtagSelected,
    hashtagList,
    newProductList,
    likedIdList,
    openModalAction,
    likeProductAction,
    unLikeProductAction,
    addItemToCartAction,
    userBoxesToFeedback,
    magazineList: communityMagazineList
  };

  return <RightBarCommunity {...rightBarCommunityProps} />;
}

export default renderComponent;
