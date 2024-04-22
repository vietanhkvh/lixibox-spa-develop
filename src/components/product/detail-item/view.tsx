import { NavLink } from 'react-router-dom';
import TrackVisibility from 'lixibox-react-on-screen';

import BadgesImage from '../badges-image';

import { auth } from '../../../utils/auth';
import RatingStar from '../../ui/rating-star';
import ButtonSubmit from '../../ui/submit-button';
import { ORDER_TYPE } from '../../../constants/application/order';
import { MODAL_QUICVIEW } from '../../../constants/application/modal';
import { isMobileVersion } from '../../../utils/responsive';
import { CDN_ASSETS_PREFIX } from '../../../utils/uri';
import { ROUTING_PRODUCT_DETAIL_PATH } from '../../../routings/path';
import { currenyFormat, isUndefined, isEmptyObject } from '../../../utils';
import Image from 'presentation-component/ui/image';
import { PURCHASE_TYPE } from '../../../constants/application/purchase';
import * as LAYOUT from '../../../style/layout';

import STYLE from './style';
import styles from './style.module.scss';
import { IItemProductState, IItemProductProps } from './model';

const renderVariantViewMore = ({ list, handleHoverColor, referrerTracking }) => {
  const colorList = (Array.isArray(list) && list.map((item) => item.color_code)) || [];

  const len = list.length;
  const backgroundStyle =
    1 < len
      ? { background: 'linear-gradient(-45deg, ' + colorList.join(',') + ')' }
      : { backgroundColor: list[0].color_code };

  const linkProps = {
    to: `${ROUTING_PRODUCT_DETAIL_PATH}/${list[0].box_slug}`,
    key: `color-item-end`,
    title: 'Xem thêm',
    style: Object.assign({}, STYLE.top.colorList.colorItem, backgroundStyle),
    onMouseEnter: () => handleHoverColor(list[0].box_picture)
  };

  return <NavLink {...linkProps}>{1 < len && <div style={STYLE.top.colorList.colorItem.number}>+{len}</div>}</NavLink>;
};

const renderTop = ({
  data,
  isShowQuickView,
  openModalAction,
  imgUrl,
  handleHoverColor,
  isHover,
  handleLoadImage,
  isLoadedImage,
  isShowImage,
  referrerTracking
}) => {
  const offsetNumber = 3;
  const colorList = Array.isArray(data.variant_options)
    ? data.variant_options.filter((variant_option) => variant_option.color_code)
    : [];
  const colorListLength = colorList.length;
  const colorShowList = Array.isArray(colorList) ? colorList.slice(0, offsetNumber) : [];
  const colorShowMoreList =
    offsetNumber < colorListLength && Array.isArray(colorList) ? colorList.slice(offsetNumber) : [];

  const quickViewProps = {
    className: 'quick-view',
    onClick: () => openModalAction(MODAL_QUICVIEW(data)),
    style: STYLE.top.quickView
  };

  let soldOutTitle = '';
  let soldOutColor = '';

  if (data.pre_order_status === ORDER_TYPE.PENDING) {
    soldOutTitle = 'ĐẶT TRƯỚC';
    soldOutColor = 'yellow';
  } else if (data.stock < 1) {
    soldOutTitle = 'TẠM HẾT';
    soldOutColor = 'yellow';
  }

  const soldOutProps = {
    title: soldOutTitle,
    color: soldOutColor,
    size: 'small',
    className: 'quick-view',
    style: Object.assign({}, STYLE.top.quickView, STYLE.top.soldOutView)
  };

  const generateColorLinkProps = ({ item, index }) => ({
    to: `${ROUTING_PRODUCT_DETAIL_PATH}/${item.box_slug}`,
    title: `${item.name} | ${data.name}`,
    key: `color-item-${index}`,
    style: Object.assign({}, STYLE.top.colorList.colorItem, {
      backgroundColor: item.color_code
    }),
    onMouseEnter: () => handleHoverColor(item.box_picture)
  });

  const isShowAllImage = isLoadedImage || isShowImage;

  return (
    <div style={STYLE.top}>
      <TrackVisibility style={STYLE.top.image} offset={200}>
        {({ isVisible }) => {
          if (!!isVisible) {
            handleLoadImage();
          }

          const mainImageProps = {
            style: Object.assign({}, STYLE.top.innerImage, { opacity: isShowAllImage ? 1 : 0 }),
            src: isShowAllImage
              ? 0 < colorListLength
                ? imgUrl
                : data && data.primary_picture && data.primary_picture.medium_url
              : ''
          };

          return (
            <>
              <Image alt={(!!data && data.name) || ''} {...mainImageProps} />
              <BadgesImage badges={data.badges} />
            </>
          );
        }}
      </TrackVisibility>
      {isHover &&
        isShowQuickView &&
        !isMobileVersion() &&
        (data.pre_order_status === ORDER_TYPE.PENDING || data.stock < 1) && <ButtonSubmit {...soldOutProps} />}

      {isShowQuickView && !isMobileVersion() && <div {...quickViewProps}>Xem nhanh</div>}

      {1 < colorShowList.length && (
        <div
          className={styles.topColorList}
          style={Object.assign({}, LAYOUT.flexContainer.center, STYLE.top.colorList)}
        >
          {Array.isArray(colorShowList) &&
            colorShowList.map((item, index) => {
              const linkProps = generateColorLinkProps({ item, index });
              return <NavLink {...linkProps} />;
            })}
          {0 < colorShowMoreList.length &&
            renderVariantViewMore({
              list: colorShowMoreList,
              handleHoverColor,
              referrerTracking
            })}
        </div>
      )}
    </div>
  );
};

const getBtnTextByPurchaseType = (purchaseType) => {
  switch (purchaseType) {
    case PURCHASE_TYPE.ADDON:
      return 'MUA';
    case PURCHASE_TYPE.GIFT:
      return 'CHỌN';
    case PURCHASE_TYPE.SAMPLE:
      return 'CHỌN';
    case PURCHASE_TYPE.REDEEM:
      return 'ĐỔI';
    default:
      return 'MUA';
  }
};

const renderBottom = ({
  data,
  isLiked,
  likeOnClick,
  type,
  isShowLike,
  isShowQuickBuy,
  isLoadingAddToCard,
  hanleAddToCart,
  isAddedOnProduct,
  hanleAddGiftToCart,
  handleAddSpecialAddOn,
  isShowCurrentPrice,
  isShowRating,
  lineTextNumber,
  purchaseType,
  referrerTracking,
  isSpecialAddOn
}) => {
  const referrerTrackingQuery = generateReferrerObjectTypeQuery({
    referrerTracking
  });

  const mainLinkProps = {
    title: data.name,
    style: STYLE.bottom.overlay,
    to: `${ROUTING_PRODUCT_DETAIL_PATH}/${data.slug}${referrerTrackingQuery}`
  };

  const iconLikeProps = {
    src: CDN_ASSETS_PREFIX(`/icons/heart/${isLiked ? 'full-black' : 'line-grey'}.png`),
    className: 'product-item-detail-like',
    style: STYLE.top.wishList,
    onClick: isShowLike ? likeOnClick : () => {}
  };

  const ratingStarProps = {
    value: (data.rating && data.rating.avg_rate) || 0,
    style: STYLE.bottom.rating.style,
    starStyle: STYLE.bottom.rating.star,
    starStyleInner: STYLE.bottom.rating.startInner
  };

  const currencyFormatType = purchaseType === PURCHASE_TYPE.REDEEM ? 'coin' : 'currency';

  const combinedPrice =
    purchaseType === PURCHASE_TYPE.REDEEM
      ? data.coins_price
      : purchaseType === PURCHASE_TYPE.ADDON
      ? data.add_on_price
      : data.price;

  const suffixBtnText = getBtnTextByPurchaseType(purchaseType);

  const isShowMainLink =
    purchaseType !== PURCHASE_TYPE.GIFT &&
    purchaseType !== PURCHASE_TYPE.ADDON &&
    purchaseType !== PURCHASE_TYPE.REDEEM &&
    !isShowQuickBuy;

  const brandGroupStyle = Object.assign({}, STYLE.bottom.brandGroup, {
    height: !isEmptyObject(data.brand) ? 'auto' : 0
  });
  const brandNameStyle = Object.assign(
    {},
    STYLE.bottom.brand,
    !isEmptyObject(data.brand) ? { height: 18, marginBottom: 5 } : { height: 0, marginBottom: 0 }
  );
  const nameStyle = Object.assign(
    {},
    {
      maxHeight: lineTextNumber * 18,
      WebkitLineClamp: lineTextNumber
    },
    STYLE.bottom.name,
    { height: lineTextNumber * 18 }
  );

  const isShowRatingCount = data.rating && 0 !== data.rating.count;

  const isShowCurrentPriceAddOn = purchaseType === PURCHASE_TYPE.ADDON && data.price > data.add_on_price;
  const isShowOldPrice =
    purchaseType !== PURCHASE_TYPE.ADDON && !isShowCurrentPrice && data.original_price > data.price;

  // Get gift cart for checkout
  const isSoldOutGiftCartCheckout = purchaseType === PURCHASE_TYPE.GIFT && data && data.stock < 1;

  const action =
    purchaseType === PURCHASE_TYPE.GIFT
      ? hanleAddGiftToCart
      : !!isSpecialAddOn && purchaseType === PURCHASE_TYPE.ADDON
      ? handleAddSpecialAddOn
      : hanleAddToCart;

  const submitButtonProps = {
    loading: isLoadingAddToCard && purchaseType !== PURCHASE_TYPE.GIFT,
    color:
      isAddedOnProduct && (purchaseType === PURCHASE_TYPE.GIFT || purchaseType === PURCHASE_TYPE.ADDON)
        ? 'red'
        : 'borderBlack',
    title: isSoldOutGiftCartCheckout
      ? 'HẾT HÀNG'
      : isAddedOnProduct && (purchaseType === PURCHASE_TYPE.GIFT || purchaseType === PURCHASE_TYPE.ADDON)
      ? `ĐÃ ${suffixBtnText}`
      : `${suffixBtnText} NGAY`,
    size: 'small',
    disabled:
      isSoldOutGiftCartCheckout ||
      (isAddedOnProduct && (purchaseType === PURCHASE_TYPE.GIFT || purchaseType === PURCHASE_TYPE.ADDON)),
    onSubmit: action,
    style: STYLE.btnAddToCart
  };

  return (
    <div style={STYLE.bottom}>
      {isShowMainLink && <NavLink {...mainLinkProps} />}
      {(purchaseType === PURCHASE_TYPE.GIFT || purchaseType === PURCHASE_TYPE.ADDON) && (
        <div
          style={Object.assign({}, STYLE.bottom.overlay, !!isAddedOnProduct && STYLE.bottom.overlay.withBorder)}
          onClick={!isAddedOnProduct ? action : null}
        />
      )}

      <div style={brandGroupStyle}>
        <div style={brandNameStyle}>{data && data.brand && data.brand.name}</div>
        {purchaseType !== PURCHASE_TYPE.GIFT && purchaseType !== PURCHASE_TYPE.SAMPLE && (
          <Image alt="" {...iconLikeProps} />
        )}
      </div>

      <div style={nameStyle}>{data && data.name && data.name.toLowerCase()}</div>
      {isShowRating && (
        <div style={STYLE.ratingGroup}>
          {!window.isInsightsBot && <RatingStar {...ratingStarProps} />}
          {isShowRatingCount && <span style={STYLE.ratingGroup.ratingCount}>({data.rating.count})</span>}
        </div>
      )}

      {'full' === type && purchaseType !== PURCHASE_TYPE.GIFT && purchaseType !== PURCHASE_TYPE.SAMPLE && (
        <div style={STYLE.bottom.price} className={styles.bottomPrice}>
          {currenyFormat(combinedPrice, currencyFormatType)}
          {isShowCurrentPriceAddOn && (
            <span style={Object.assign({}, STYLE.bottom.priceAddOn)}>
              {currenyFormat(data.original_price, currencyFormatType)}
            </span>
          )}
          {isShowOldPrice && (
            <span style={Object.assign({}, STYLE.bottom.priceAddOn)}>
              {currenyFormat(data.original_price, currencyFormatType)}
            </span>
          )}
          {isShowCurrentPrice && data.price > 0 && (
            <span style={Object.assign({}, STYLE.bottom.priceAddOn)}>{currenyFormat(data.price, 'currency')}</span>
          )}
        </div>
      )}

      {isShowQuickBuy && <ButtonSubmit {...submitButtonProps} />}
    </div>
  );
};

export function renderComponent({
  props,
  state,
  likeOnClick,
  hanleAddToCart,
  handleAddSpecialAddOn,
  hanleAddGiftToCart,
  handleHoverColor,
  handleHoverItem,
  handleLeaveHoverItem,
  handleLoadImage
}) {
  const {
    data,
    type,
    openModalAction,
    likedIdList,
    isShowQuickView,
    isShowQuickBuy,
    isShowLike,
    isShowCurrentPrice,
    isShowRating,
    isShowImage,
    purchaseType,
    lineTextNumber = 2,
    referrerTracking,
    isSpecialAddOn,
    onClick
  } = props as IItemProductProps;

  const { isLoadingAddToCard, isAddedOnProduct, imgUrl, isHover, isLoadedImage } = state as IItemProductState;

  const isLiked = !isUndefined(data) && auth.loggedIn() && likedIdList.indexOf(data.id) >= 0;

  const containerProps = {
    key: data.id,
    style: STYLE.container,
    className: 'product-detail-item',
    onMouseEnter: handleHoverItem,
    onMouseLeave: handleLeaveHoverItem,
    onClick: (e) => onClick?.(e, data)
  };

  const renderTopProps = {
    data,
    isShowQuickView,
    openModalAction,
    imgUrl,
    isHover,
    handleHoverColor,
    handleLoadImage,
    isLoadedImage,
    referrerTracking,
    isShowImage
  };
  const renderBottomProps = {
    data,
    isLiked,
    likeOnClick,
    type,
    isShowLike,
    isShowQuickBuy,
    isLoadingAddToCard,
    hanleAddToCart,
    handleAddSpecialAddOn,
    isAddedOnProduct,
    hanleAddGiftToCart,
    openModalAction,
    isShowCurrentPrice,
    lineTextNumber: lineTextNumber || 2,
    isShowRating,
    purchaseType,
    referrerTracking,
    isSpecialAddOn
  };

  return (
    <div {...containerProps}>
      {renderTop(renderTopProps)}
      {renderBottom(renderBottomProps)}
    </div>
  );
}

const generateReferrerObjectTypeQuery = ({ referrerTracking }) => {
  const isFallback =
    isEmptyObject(referrerTracking) || !referrerTracking.referrerObjectType || !referrerTracking.referrerObjectId;

  if (!!isFallback) return '';

  const referrerObjectTypeQuery = 'referrer_object_type=' + referrerTracking.referrerObjectType;
  const referrerObjectIdQuery = '&referrer_object_id=' + referrerTracking.referrerObjectId;

  return `?${referrerObjectTypeQuery}${referrerObjectIdQuery}`;
};
