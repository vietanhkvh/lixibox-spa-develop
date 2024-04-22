/* eslint react-hooks/rules-of-hooks: 0 */
// TODO: Refactor component and enable eslint rule

import { MouseEvent, useState } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

import { ROUTING_PRODUCT_DETAIL_PATH } from '../../../routings/path';
import { currenyFormat } from '../../../utils';
import { formatCurrency, CustomCurrencyType } from '../../../utils/currency';
import RatingStar from '../../../components/ui/rating-star';
import BadgesImage from '../../../components/product/badges-image';
import Image from 'presentation-component/ui/image';
import { ProductBox } from 'types/api/shop';
import styles from './style.module.scss';
import { generateTestId } from 'utils/test-utils';

function ColorItem(item, index) {
  if (!item) return null;

  const props = {
    key: index,
    className: styles.colorItem,
    onMouseEnter: (e) => {
      e.preventDefault();
      index !== -1 && this.onSelect(item);
    },
    style: {
      backgroundColor: item.color_code,
      backgroundImage: `url(${item.image_url})`
    }
  };

  return <div {...props}>{!!item.title && <div className={styles.colorItemTitle}>{item.title}</div>}</div>;
}
const Colors = ({ colors, onSelect }) => {
  if (!colors || !colors.length) return null;

  const isShowMore = colors.length >= 5;
  const remainingColor = isShowMore ? colors.length - 3 : 0;

  return (
    <div className={styles.colorList}>
      {colors.filter((_, index) => index <= (isShowMore ? 2 : 3)).map(ColorItem, { onSelect })}
      {!!isShowMore &&
        ColorItem(
          {
            ...colors[3],
            title: `+${remainingColor}`
          },
          -1
        )}
    </div>
  );
};

const Top = ({
  isOutOfStock,
  stock,
  storeStock,
  preOrderStatus,
  selectedImageUrl,
  badge,
  badges,
  name,
  colors,
  outOfStockLabel,
  onSelectColor,
  isShowVariants
}) => {
  const imgProps = {
    src: selectedImageUrl,
    alt: name,
    className: styles.topImg,
    dataTestId: 'img-item-home'
  };

  const isShowOutOfStock =
    typeof isOutOfStock !== 'undefined' ? !!isOutOfStock : 0 === stock + storeStock && 'pending' !== preOrderStatus;

  return (
    <div className={styles.top}>
      <Image {...imgProps} />
      {!isShowOutOfStock && <BadgesImage badge={badge} badges={badges} />}
      {!!isShowOutOfStock && <div className={styles.outOfStock}>{outOfStockLabel}</div>}
      {!!isShowVariants && <Colors colors={colors} onSelect={onSelectColor} />}
    </div>
  );
};

const Rating = ({ rating }) => {
  if (!rating) return null;

  const ratingStarProps = {
    value: (rating && rating.avg_rate) || 0,
    style: {},
    starStyle: { color: '#202020' },
    starStyleInner: {},
    dataTestId: 'star-item'
  };

  return (
    <div className={styles.rating}>
      <RatingStar {...ratingStarProps} className={styles.ratingValue} />
      {!!rating && !!rating.count && <div className={styles.ratingCount}>{`(${rating.count})`}</div>}
    </div>
  );
};

const Pricing = ({
  originalPrice,
  price,
  tag,
  isCoinRedeemable,
  isShowDiscountPercentage,
  isOriginalPriceHidden,
  classes
}: any) => {
  // TODO: Just comment out by request from CEO
  // const percentValue = Math.floor(((originalPrice - price) / originalPrice) * 100);
  // const percent = originalPrice > price ? `-${percentValue}%` : 0;
  // const discountPercentageVisible = !isShowDiscountPercentage
  //   ? !isCoinRedeemable && !!percent && 0 !== price
  //   : isShowDiscountPercentage;

  return (
    <div className={styles.price}>
      <div className={classNames(styles.saleOffPriceGroup, classes?.salePriceGroup)}>
        <div {...generateTestId({ name: 'price-item-home' })} className={styles.saleOffPrice}>
          {formatCurrency(price, { suffix: isCoinRedeemable ? CustomCurrencyType.LIXICOIN : true })}
        </div>
        {/* 
          TODO: Just comment out by request from CEO
          {discountPercentageVisible && <div className={styles.percent}>{percent}</div>} 
        */}
        {tag && <div className={styles.tag}>{tag}</div>}
      </div>
      {!isOriginalPriceHidden && (
        <div {...generateTestId({ name: 'real-price-item-home' })} className={styles.originalPrice}>
          {originalPrice !== price ? `(trị giá ${currenyFormat(originalPrice)})` : ''}
        </div>
      )}
    </div>
  );
};

const Bottom = ({
  name,
  brandName,
  rating,
  originalPrice,
  price,
  tag,
  isShowRating,
  isShowPricing,
  isCoinRedeemable,
  isShowDiscountPercentage,
  isBrandHidden,
  isNameHidden,
  isOriginalPriceHidden,
  classes
}) => {
  return (
    <div className={styles.bottom}>
      <div>
        {!isBrandHidden && !!brandName && <div className={styles.brandName}>{brandName}</div>}
        {!isNameHidden && (
          <div {...generateTestId({ name: 'title-item' })} className={styles.name}>
            {name}
          </div>
        )}
        {!!isShowRating && <Rating rating={rating} />}
      </div>
      {!!isShowPricing && (
        <Pricing
          originalPrice={originalPrice}
          price={price}
          tag={tag}
          isCoinRedeemable={isCoinRedeemable}
          isShowDiscountPercentage={isShowDiscountPercentage}
          isOriginalPriceHidden={isOriginalPriceHidden}
          classes={{ salePriceGroup: classes?.salePriceGroup }}
        />
      )}
    </div>
  );
};

interface IProps {
  product: ProductBox;
  tag: string;
  outOfStockLabel?: string;
  isFullPadding: boolean;
  isShowRating: boolean;
  isShowPricing: boolean;
  isOutOfStock?: boolean;
  isShowVariants: boolean;
  isPrivateMode?: boolean;
  isShowDiscountPercentage?: boolean;
  isBrandHidden?: boolean;
  isNameHidden?: boolean;
  isOriginalPriceHidden?: boolean;
  forcePriceUnit?: 'dong' | 'lixicoin';
  customPricing: { price?: number; originalPrice?: number };
  onClick?: (box: ProductBox, e: MouseEvent<HTMLElement>) => void;
  classes?: { salePriceGroup?: string };
}

const ProductItem = ({
  product,
  tag,
  outOfStockLabel,
  isFullPadding,
  isShowRating,
  isShowPricing,
  isOutOfStock,
  customPricing,
  isShowVariants,
  isShowDiscountPercentage,
  isBrandHidden,
  isNameHidden,
  isOriginalPriceHidden,
  forcePriceUnit,
  isPrivateMode = false,
  onClick,
  classes
}: IProps) => {
  if (!product) return null;

  const defaultImg = (product.primary_picture && product.primary_picture.square_url) || '';
  const previewImg = (product.preview_picture && product.preview_picture.square_url) || '';
  const isSupportPreviewImage = product.variant_options && !product.variant_options.length;

  const defaultUrl = product.slug;
  const [selectedImageUrl, setSelectedImageUrl] = useState(defaultImg);
  const [selectedUrl, setSelectedUrl] = useState(defaultUrl);
  const isCoinRedeemable = forcePriceUnit
    ? forcePriceUnit === 'lixicoin'
    : !!product.for_redeem && !product.is_saleable;

  const topProps = {
    isOutOfStock,
    stock: product.stock,
    storeStock: product.store_stock || 0,
    preOrderStatus: product.pre_order_status,
    colors: product.variant_options || [],
    selectedImageUrl,
    outOfStockLabel,
    setSelectedImageUrl,
    name: product.name,
    badge: product.badge,
    badges: product.badges,
    isShowVariants,
    onSelectColor: (item) => {
      if (!item) return;
      !!item.preview_url && setSelectedImageUrl(item.preview_url);
      !!item.box_slug && setSelectedUrl(item.box_slug);
    }
  };

  const originalPrice =
    typeof customPricing.originalPrice === 'number' ? customPricing.originalPrice : product.original_price;
  const price =
    typeof customPricing.price === 'number'
      ? customPricing.price
      : isCoinRedeemable
      ? product.coins_price
      : product.price;

  const bottomProps = {
    name: product.name,
    brandName: product.brand_name || '',
    rating: product.rating,
    originalPrice,
    price,
    tag,

    isShowRating,
    isShowPricing,
    isCoinRedeemable,
    isShowDiscountPercentage,
    isBrandHidden,
    isNameHidden,
    isOriginalPriceHidden,
    classes: { salePriceGroup: classes?.salePriceGroup }
  };

  const generalProps = {
    className: classNames(styles.productItem, { [styles.isFullPadding]: !!isFullPadding }),
    onMouseEnter: () => !!isSupportPreviewImage && !!previewImg.length && setSelectedImageUrl(previewImg),
    onMouseLeave: () => !!isSupportPreviewImage && !!previewImg.length && setSelectedImageUrl(defaultImg)
  };
  const containerProps = {
    ...generalProps,
    to: `${ROUTING_PRODUCT_DETAIL_PATH}/${selectedUrl}`,
    onClick: (e) => onClick?.(product, e)
  };

  if (!!isPrivateMode) {
    return (
      <div {...generalProps}>
        <Top {...topProps} />
        <Bottom {...bottomProps} />
      </div>
    );
  }

  return (
    <NavLink {...containerProps}>
      <Top {...topProps} />
      <Bottom {...bottomProps} />
    </NavLink>
  );
};
ProductItem.defaultProps = {
  tag: '',
  isShowRating: true,
  isShowPricing: true,
  isShowVariants: true,
  customPricing: {},
  outOfStockLabel: 'Hết hàng'
};

export default ProductItem;
