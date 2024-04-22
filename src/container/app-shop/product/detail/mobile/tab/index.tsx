import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import TrackVisibility from 'lixibox-react-on-screen';

import Image from 'presentation-component/ui/image';
import { CDN_ASSETS_PREFIX } from '../../../../../../utils/uri';
import ProductInfo from '../../../../../../components/product/info';
import ProductVideo from '../../../../../../components/product/video';
import ProductSlider from '../../../../../../components/product/slider';
import MagazineCategory from '../../../../../../components/magazine/category';
import TestimonailSlider from '../../../../../../components/testimonial/slider';
import ProductInstagram from '../../../../../../components/product/instagram';
import ProductShopToLook from '../../../../../../components/product/shop-to-look';
import SeparateLine from '../../../../../../presentation-component/ui/separate-line';
import ProductItem from '../../../../../../presentation-component/product/product-item';
import ItemCarousel from '../../../../../../presentation-component/item-list-hoc/item-carousel';
import { objectToHash } from '../../../../../../utils/encode';
import { isUndefined, isEmptyObject } from '../../../../../../utils/validate';
import { ROUTING_BRAND_DETAIL_PATH } from '../../../../../../routings/path';
import { MAGAZINE_CATEGORY_TYPE } from '../../../../../../constants/application/magazine-category';
import {
  handleFetchRelatedBox,
  handleFetchWatchedList,
  handleFetchMagazineForBox,
  handleFetchLoveBox,
  handleFetchShopTheLook
} from '../../handler-fetch-data';
import componentStyles from '../../../../../../style/component.module.scss';
import STYLE from './style';
import { renderMobileDiscussion } from '../discussion';
import MobileFeedback from '../feedback';

export function renderProductInfoTab({
  props,
  state,
  product,
  handlePaginationClick,
  handleFetchListFeedback,
  handleSetOpenFeedbackModal,
  handleSetOpenDiscussionModal,
  onBundleItemClick,
  onRelatedProductItemClick,
  onRecentlyViewedProductItemClick,
  onRelatedTestimonialItemClick,
  onRelatedMagazineItemClick,
  onFeedbackReact
}) {
  const {
    likedIdList,
    match: {
      params: { idProduct }
    },
    loveStore: { loveBox },
    brandStore: { productByBrandId },
    shopStore: { makeups, boxRelated, boxMagazines },
    userStore: { userWatchedList },
    openModalAction,
    likeProductAction,
    unLikeProductAction,
    addItemToCartAction
  } = props;
  const { isFetchLoveBox, isFetchMagazineForBox, isFetchRelatedBox, isFetchWatchedList, isFetchShopTheLook } = state;

  const loveBoxParam = { id: idProduct };
  const loveBoxKeyHash = objectToHash(loveBoxParam);
  const loveBoxList = (loveBox && !isUndefined(loveBox[loveBoxKeyHash]) && loveBox[loveBoxKeyHash]) || [];

  const slug = (product && product.box && product.box.slug) || '';

  const magazinesParam = { productId: slug, page: 1, perPage: 10 };
  const keyHash = objectToHash(magazinesParam);

  const magazineList = (boxMagazines && !isUndefined(boxMagazines[keyHash]) && boxMagazines[keyHash].magazines) || [];

  const watchedParam = { page: 1, perPage: 25 };
  const watchedKeyHash = objectToHash(watchedParam);

  const watchedList =
    userWatchedList[watchedKeyHash] &&
    userWatchedList[watchedKeyHash].recently_viewed_boxes &&
    0 !== userWatchedList[watchedKeyHash].recently_viewed_boxes.length
      ? userWatchedList[watchedKeyHash].recently_viewed_boxes
      : [];

  const keyHashBrand = objectToHash({ id: 'lustre', page: 1, perPage: 20 });
  const productSameBrandList =
    (productByBrandId &&
      productByBrandId[keyHashBrand] &&
      productByBrandId[keyHashBrand].boxes &&
      !!productByBrandId[keyHashBrand].boxes.length &&
      productByBrandId[keyHashBrand].boxes.slice(0, 8)) ||
    [];

  const keyHashProductRelated = objectToHash({ productId: slug });
  const productRelatedList =
    (boxRelated && !isUndefined(boxRelated[keyHashProductRelated]) && boxRelated[keyHashProductRelated]) || [];

  const boxProducts = (!!product && !!product.box && product.box.box_products) || [];
  const isIndividual = !!product && !!product.box && product.box.is_individual;
  const brandName =
    (!!boxProducts.length &&
      !!product &&
      !!product.box &&
      !!product.box.box_products &&
      !!product.box.box_products[0] &&
      !!product.box.box_products[0].product &&
      !!product.box.box_products[0].product.brand &&
      product.box.box_products[0].product.brand.slug) ||
    '';

  const video =
    (!!product && !!product.box && product.box.videos && !!product.box.videos.length && product.box.videos[0]) || {};

  let isLustreProduct = isIndividual && brandName.trim() === 'lustre';
  if (!isLustreProduct && !isIndividual) {
    // Check box lustre
    const length = boxProducts.length;

    for (let i = 0; i < length; i++) {
      const brandName =
        (boxProducts[i].product && boxProducts[i].product.brand && boxProducts[i].product.brand.slug) || '';

      if (brandName.trim() === 'lustre') {
        isLustreProduct = true;
      } else {
        isLustreProduct = false;
        break;
      }
    }
  }
  // End check lustre individual or box lustre

  const mobileFBProps = {
    props,
    state,
    handleClick: handlePaginationClick,
    handleFetchListFeedback,
    handleSetOpenFeedbackModal,
    onFeedbackReact
  };

  return (
    <div>
      <div>
        <ProductInfo product={product} openModal={openModalAction} onBundleItemClick={onBundleItemClick} />
        <SeparateLine />
        {!!product && !!product.box && <MobileFeedback {...mobileFBProps} />}
        {!!product && !!product.box && renderMobileDiscussion({ props, state, handleSetOpenDiscussionModal })}
        <TrackVisibility offset={200}>
          {({ isVisible }) => {
            !!isVisible && !isFetchWatchedList && !!handleFetchWatchedList && handleFetchWatchedList.bind(this)();

            return (
              watchedList &&
              watchedList.length > 0 && (
                <>
                  <ItemCarousel title={'Sản phẩm đã xem'}>
                    {watchedList.map((product, index) => (
                      <ProductItem
                        key={product.id || index}
                        isShowVariants={false}
                        product={product}
                        isFullPadding
                        onClick={() => onRecentlyViewedProductItemClick?.(product, index)}
                      />
                    ))}
                  </ItemCarousel>
                  <SeparateLine />
                </>
              )
            );
          }}
        </TrackVisibility>
        <TrackVisibility offset={200}>
          {({ isVisible }) => {
            !!isVisible && !isFetchRelatedBox && !!handleFetchRelatedBox && handleFetchRelatedBox.bind(this)();

            return (
              productRelatedList &&
              productRelatedList.length > 0 && (
                <>
                  <ItemCarousel title={'Sản phẩm liên quan'}>
                    {productRelatedList.map((product, index) => (
                      <ProductItem
                        key={product.id || index}
                        isShowVariants
                        product={product}
                        isFullPadding
                        onClick={() => onRelatedProductItemClick?.(product, index)}
                      />
                    ))}
                  </ItemCarousel>
                  <SeparateLine />
                </>
              )
            );
          }}
        </TrackVisibility>
        {isLustreProduct && !isEmptyObject(video) && <ProductVideo video={video} />}
        {isLustreProduct && productSameBrandList && productSameBrandList.length > 0 && (
          <ProductSameBrand title={'Sản phẩm cùng thương hiệu'}>
            <ProductSlider
              {...{
                isShowHeader: false,
                data: productSameBrandList || [],
                isShowViewMore: false,
                isShowHorizontal: true,
                likedIdList,
                openModalAction,
                likeProductAction,
                unLikeProductAction,
                addItemToCartAction
              }}
            />
          </ProductSameBrand>
        )}
        <TrackVisibility offset={200}>
          {({ isVisible }) => {
            !!isVisible && !isFetchShopTheLook && handleFetchShopTheLook?.bind(this)();

            return (
              isLustreProduct &&
              makeups &&
              !!makeups.length && <ProductShopToLook openModal={openModalAction} shopTheLooks={makeups} />
            );
          }}
        </TrackVisibility>
        {isLustreProduct && <ProductInstagram openModal={openModalAction} list={[]} />}
        {!!product && !!product.box && (
          <TrackVisibility offset={200}>
            {({ isVisible }) => {
              !!isVisible &&
                !isFetchMagazineForBox &&
                !!handleFetchMagazineForBox &&
                handleFetchMagazineForBox.bind(this)();

              return (
                magazineList &&
                magazineList.length > 0 && (
                  <MagazineCategory
                    {...{
                      title: 'Bài viết liên quan',
                      list: magazineList,
                      type: MAGAZINE_CATEGORY_TYPE.ONE.type,
                      onItemClick: onRelatedMagazineItemClick
                    }}
                  />
                )
              );
            }}
          </TrackVisibility>
        )}
        <TrackVisibility offset={200}>
          {({ isVisible }) => {
            !!isVisible && !isFetchLoveBox && !!handleFetchLoveBox && handleFetchLoveBox.bind(this)();

            return (
              !isLustreProduct &&
              loveBoxList &&
              loveBoxList.lenght > 0 && (
                <TestimonailSlider
                  {...{
                    openModal: openModalAction,
                    column: 4,
                    showHeader: true,
                    data: loveBoxList,
                    showViewMore: false,
                    title: 'Nhận xét về Lixibox',
                    onItemClick: onRelatedTestimonialItemClick
                  }}
                />
              )
            );
          }}
        </TrackVisibility>
      </div>
    </div>
  );
}

interface ProductSameBrandProps {
  title: string;
  children: JSX.Element;
}
const ProductSameBrand = ({ title, children }: ProductSameBrandProps) => {
  const productShopTheLook004 = CDN_ASSETS_PREFIX('/landing-page/lustre-makeup/product-shop-the-look-004.png');

  return (
    <div style={STYLE.mobile.relatedProduct}>
      <div style={STYLE.shopTheLook.footer.container}>
        <Image alt={''} src={productShopTheLook004} style={STYLE.shopTheLook.footer.logo} />
        <div style={STYLE.shopTheLook.footer.desc}>
          LUSTRE là hãng mỹ phẩm chuyên các dòng trang điểm chuyên nghiệp, mang tính ứng dụng cao với chất lượng sánh
          ngang các thương hiệu cao cấp như Too Faced, Marc Jacobs, Lorac… Chất lượng tốt, thiết kế sang trọng và giá
          thành hợp lý là các điểm cộng tuyệt vời khiến cho Lixibox quyết định giới thiệu em ý đến các cô nàng xinh đẹp
          của mình.
        </div>
      </div>
      <div
        className={classNames(componentStyles.blockHeading, componentStyles.blockHeadingMultiLine)}
        style={Object.assign({}, STYLE.mobile.relatedProduct.title)}
      >
        <div className={componentStyles.blockHeadingTitleMultiLine}>
          <span
            className={classNames(
              componentStyles.blockHeadingTitleText,
              componentStyles.blockHeadingTitleTextMultiLine
            )}
          >
            {title}
          </span>
        </div>
      </div>
      <div>{children}</div>
      <div style={STYLE.mobile.relatedProduct.btnWrap}>
        <NavLink to={`${ROUTING_BRAND_DETAIL_PATH}/lustre`} style={STYLE.mobile.relatedProduct.btnWrap.btn}>
          Xem tất cả
        </NavLink>
      </div>
    </div>
  );
};
