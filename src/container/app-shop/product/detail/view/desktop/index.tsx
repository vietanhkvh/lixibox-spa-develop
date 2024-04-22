import TrackVisibility from 'lixibox-react-on-screen';
import classNames from 'classnames';

import ProductSlider from '../../../../../../presentation-component/general/desktop/product-slider-with-heading';
import ProductItem from '../../../../../../presentation-component/product/product-item';
import AddressModal from '../../../../../../components/address/modal';
import GeneralModal from '../../../../../../presentation-component/modal/general-modal';
import Page404 from '../../../../../exception/404';
import WrapLayout from '../../../../../layout/wrap';
import ProductName from '../../../../../../components/product/name';
import ProductInfo from '../../../../../../components/product/info';
import ProductVariants from '../../../../../../components/product/variants';
import ProductVideo from '../../../../../../components/product/video';
import ProductInstagram from '../../../../../../components/product/instagram';
import TestimonailSlider from '../../../../../../components/testimonial/slider';
import ProductShopToLook from '../../../../../../components/product/shop-to-look';
import SizeGuide from '../../../../../../components/product/size-guide';
import ProductDiscussion from '../../../../../../components/product/discussion';
import MagazineImageSlider from '../../../../../../components/magazine/image-slider';
import ContainerListFeedback from '../../../../../../components/container/list-feedback';
import StoreBoxes from '../../../../../../components/modal/store-boxes';
import Loading from '../../../../../../components/ui/loading';
import LandingPageComponent from '../../../../../../presentation-component/landing-page/index';
import DiscountCodeModalMobile from '../../../../cart/check-out/view/mobile/discount-code-modal';
import { getGlobalErrorMessage } from '../../../../../../utils/exception';
import { ADD_DISCOUNT_CODE } from '../../../../../../flows/cart/type';

import { isUndefined, isEmptyObject } from '../../../../../../utils/validate';
import { APP_VERSION } from '../../../../../../constants/application/global';
import { objectToHash, stringToHash } from '../../../../../../utils/encode';
import { formatCurrency } from '../../../../../../utils/currency';
import { MODAL_BOX_DETAIL_PICTURE } from '../../../../../../constants/application/modal';
import NewProductInfo from '../../sub-components/generic/new-product-info';
import RatingGroup from '../../sub-components/generic/rating-group';
import DiscountCodeSection from '../../sub-components/generic/discount-code-section';
import DeliveryStatus from '../../sub-components/generic/delivery-status';
import ProductNote from '../../sub-components/generic/product-note';
import {
  handleFetchSavingBox,
  handleFetchRelatedBox,
  handleFetchWatchedList,
  handleFetchMagazineForBox,
  handleFetchLoveBox,
  handleFetchShopTheLook
} from '../../handler-fetch-data';
// import BreadcrumbComposite from '../../sub-components/desktop/breadcrumb-composite';
import ProductImageComposite from '../../sub-components/desktop/product-image-composite';
import PlaceholderSummary from '../../sub-components/desktop/placeholder-summary';
import AdminEditButton from '../../sub-components/desktop/admin-edit-button';
import BrandName from '../../sub-components/desktop/brand-name';
import Toolbar from '../../sub-components/desktop/toolbar';
import Sticky from '../../sub-components/desktop/sticky';
import BrandExclusive from '../../sub-components/desktop/brand-exclusive';
import MetaInfoComposite from '../../sub-components/generic/meta-info-composite';
import PricingInfo from '../../sub-components/generic/pricing-info';
import SizeGuideSection from '../../sub-components/generic/size-guide-section';
import PrimaryButtonGroup from '../../sub-components/generic/primary-button-group';
import { decorateCashbackRebate } from 'utils/product';
import Tag from 'presentation-component/ui/tag';
import CashbackInstruction from 'presentation-component/user/cashback-instruction';
import SubmitButton from 'components/ui/submit-button';
import BadgeBlock from 'components/product/badge-block';
import {
  gatewayTrackReactBoxFeedback,
  gatewayTrackViewContentFromList,
  gatewayTrackViewedBoxFeedbacks,
  gatewayTrackViewedMagazineFromList
} from 'tracking/gateway';
import { ViewedSource } from 'tracking/constants';

import { IProductDetailContainerProps, IProductDetailContainerState } from '../../model';
import * as LAYOUT from '../../../../../../style/layout';
import { ProductBox } from 'types/api/shop';
import { TrackInViewport } from 'utils/visibility';
import STYLE from './style';
import styles from './style.module.scss';

const renderContentMOdalFeedBack = ({ boxFeedbackable, handleSetOpenFeedbackModal }) => {
  if (boxFeedbackable.reviewed) {
    return (
      <div className={styles.feedbackReviewModal}>
        <p className={styles.feedbackReviewModalContent}>
          {`Bạn không thể gửi thêm đánh giá cho sản phẩm này.`}
          <br /> {`Cảm ơn bạn.`}
        </p>
        <div className={styles.feedbackReviewModalSubmit}>
          <SubmitButton
            type={'submit'}
            title={'Tiếp tục mua sắm'}
            svgIconClass={styles.actionButtonIcon}
            color={'black'}
            className={styles.buttonSubmit}
            onSubmit={() => handleSetOpenFeedbackModal(false)}
          />
        </div>
      </div>
    );
  } else if (!boxFeedbackable.canReview) {
    return (
      <div className={styles.feedbackReviewModal}>
        <p className={styles.feedbackReviewModalContent}>
          {`Bạn hãy mua hàng và quay trở lại để đánh giá`}
          <br /> {` sau khi sử dụng sản phẩm`}
        </p>
        <div className={styles.feedbackReviewModalSubmit}>
          <SubmitButton
            type={'submit'}
            title={'Tiếp tục mua sắm'}
            svgIconClass={styles.actionButtonIcon}
            color={'black'}
            className={styles.buttonSubmit}
            onSubmit={() => handleSetOpenFeedbackModal(false)}
          />
        </div>
      </div>
    );
  }
};

interface ICombinedProductSlider {
  isShowVariants?: boolean;
  dataList: Array<any>;
  title: string;
  viewMoreTitle?: string;
  viewMoreLink?: string;
  isShowViewMore?: boolean;
  onItemClick?: (box: ProductBox, index: number) => void;
}
const CombinedProductSlider = ({ isShowVariants = true, dataList, onItemClick, ...props }: ICombinedProductSlider) => {
  const dataProps = dataList.map((product, index) => ({
    key: product.id,
    product,
    isShowVariants,
    onClick: () => onItemClick?.(product, index)
  }));

  return <ProductSlider data={dataProps} template={ProductItem} {...props} />;
};

function renderTop() {
  const {
    match,
    history,
    feedbackPerPage,
    openModalAction,
    addDiscountCodeAction,
    discountCodeStore: { discountCodesBoxes },
    shopStore: {
      productDetail,
      landingPagesData,
      boxFeedback,
      boxFeedbackable,
      boxFeedbackSummary,
      boxFeedbackPicture
    },
    cartStore: { suggestionDiscountCodes, addDiscountCode },
    errorStore: { index: errorIndex },
    popErrorAction,
    cartStore: {
      cartDetail,
      addDiscountCode: { code: applyingCode, loading: isApplyingCode },
      constants: { box_feedback_lixicoin }
    }
  } = this.props as IProductDetailContainerProps;

  const appliedCode = !!cartDetail ? cartDetail.discount_code : '';

  const {
    idProduct,
    feedbackPage,
    idProductHash,
    isFixedToolbar,
    feedbackUrlList,
    isPriorotyBlock,
    isLoadingFeedback,
    isOpenSizeGuideModal,
    isOpenDiscountCodeModal,
    isOpenFeedbackModal,
    isOpenCashbackInfoModal
  } = this.state as IProductDetailContainerState;

  const product = productDetail[idProductHash];
  const combinedProduct = this.getCombinedProduct();

  const params = {
    productId: idProduct,
    page: feedbackPage,
    perPage: feedbackPerPage
  };

  const keyHash = objectToHash(params);
  const list = (boxFeedback && boxFeedback[keyHash]) || [];

  const { current_page, per_page, total_pages } = (!!list && list.paging) || {
    current_page: 0,
    per_page: 0,
    total_pages: 0
  };
  const _urlList = !!list && list.feedbacks && !!list.feedbacks.length ? feedbackUrlList : [];

  const feedbackListProps = {
    openModal: openModalAction,
    list: (list && list.feedbacks) || [],
    rating: combinedProduct.rating,
    current: current_page,
    per: per_page,
    total: total_pages,
    urlList: _urlList,
    canScrollToTop: false,
    isLoading: isLoadingFeedback,
    boxFeedbackPicture,
    boxFeedbackable,
    boxFeedbackSummary,
    idProductHash,
    productId: product ? product.box.id : 0,
    handleClick: (val) => this.handleFeedbackPaginationClick(val),
    handleSetOpenFeedbackModal: (val) => this.handleSetOpenFeedbackModal(val),
    onOpenImage: (list, index) => {
      const formatedList = list.map((imgItem) => {
        return {
          index: parseInt('101' + index),
          thumb_url: imgItem.url,
          original_url: imgItem.url,
          optimized_url: imgItem.url,
          medium_url: imgItem.url,
          large_url: imgItem.url,
          type: 'IMAGE'
        };
      });

      openModalAction(
        MODAL_BOX_DETAIL_PICTURE({
          selected: parseInt('101' + index),
          list: formatedList,
          boxFeedbackPicture: []
        })
      );
    },
    lixicoinPerFeedback: box_feedback_lixicoin,
    onFeedbackReact: ({ isLiked }) => {
      gatewayTrackReactBoxFeedback({
        box: product?.box,
        liked: isLiked
      });
    }
  };

  const keyHashDiscountCode = objectToHash({ productId: idProduct });
  const discountCodeList = discountCodesBoxes?.[keyHashDiscountCode] || [];

  const preOrderStatus = (product && product.box && product.box.pre_order_status) || '';
  const preOrderReleaseDate = (product && product.box && product.box.pre_order_release_date) || 0;

  const productIdHash = stringToHash(!!product && !!product.box ? product.box.slug : '');
  const landingPagesFilteredData = landingPagesData[productIdHash] || null;

  return (
    <div style={STYLE.desktop}>
      {/* <BreadcrumbComposite categories={boxesCategories} /> */}
      <div
        key={`product-detail-wrap`}
        style={Object.assign({}, LAYOUT.flexContainer.justify, { paddingTop: 40 })}
        className={classNames('user-select-all', 'wrapLayout')}
      >
        <div style={STYLE.desktop.mainCol}>
          <ProductImageComposite {...{ combinedProduct, product }} />
        </div>
        {'undefined' === typeof product ? (
          <PlaceholderSummary />
        ) : (
          <div style={STYLE.desktop.rightCol}>
            <MetaInfoComposite
              {...{
                productId: idProduct,
                page: feedbackPage,
                perPage: feedbackPerPage,
                combinedProduct,
                product,
                withProductReview: true
              }}
            />
            <AdminEditButton {...{ combinedProduct }} />
            {!!product?.box && <BadgeBlock box={product.box} classes={{ container: styles.badgeBlock }} />}
            <BrandName {...{ combinedProduct }} />
            <ProductName slug={combinedProduct.slug} name={combinedProduct.name} />
            <RatingGroup
              {...{
                rating: combinedProduct.rating,
                love: combinedProduct.love,
                onClick: this.handleScrollToFeedback
              }}
            />
            <PricingInfo {...{ combinedProduct }} />
            {!!combinedProduct?.box?.cashback_rebate && combinedProduct?.box?.price && (
              <Tag
                label={`Hoàn tiền lên đến ${decorateCashbackRebate({
                  rebate: combinedProduct?.box?.cashback_rebate || 0,
                  price: combinedProduct?.box?.price || 0
                })}`}
                icon={'dollar-time'}
                onClick={function () {
                  this.handleDisplayCashbackInfoModal(true);
                }.bind(this)}
                classes={{ container: styles.cashbackTag }}
              />
            )}
            <DeliveryStatus {...{ preOrderStatus, preOrderReleaseDate }} />
            <ProductNote note={product?.box?.note || ''} />
            {Array.isArray(product?.option_types) && (
              <ProductVariants
                history={history}
                version={APP_VERSION.DESKTOP}
                boxSlug={match.params.idProduct || ''}
                optionTypes={product?.option_types || []}
                boxVariants={product?.box_variants || []}
                onSelected={(slug) => this.onVariantSelect(slug)}
              />
            )}
            {!!product?.box?.size_guides?.length && (
              <SizeGuideSection onClick={() => this.handleDisplaySizeGuideModal(true)} />
            )}
            {!!discountCodeList?.length && (
              <DiscountCodeSection
                {...{
                  onDiscountCodeClick: () => this.handleDisplayDiscountModal(true),
                  list: discountCodeList
                }}
              />
            )}
            <NewProductInfo
              {...{
                product,
                combinedProduct,
                onClickStore: () => this.handleDisplayStoreModal(true),
                onClickDeliveryCalc: () => this.handleDisplayCitySelectionModal(true)
              }}
            />
            <PrimaryButtonGroup {...{ product, combinedProduct }} />
          </div>
        )}
        <Toolbar {...{ product, combinedProduct, isFixedToolbar }} />
      </div>
      {landingPagesFilteredData && (
        <LandingPageComponent data={landingPagesFilteredData} rating={(list && list.feedbacks) || []} />
      )}
      {!isPriorotyBlock ? (
        <div style={STYLE.desktop.fulCol}>
          {renderBottom.bind(this)()}

          <Sticky {...{ id: 'product-detail-feedback', title: 'Đánh giá' }}>
            <TrackVisibility once>
              <TrackInViewport onVisible={() => gatewayTrackViewedBoxFeedbacks({ box: product?.box })}>
                <ContainerListFeedback {...feedbackListProps} />
              </TrackInViewport>
            </TrackVisibility>
          </Sticky>
          <Sticky {...{ id: 'product-detail-discussion', title: 'Thảo luận' }}>
            <ProductDiscussion productId={combinedProduct.slug} scrollId={'product-detail-discussion'} />
          </Sticky>
        </div>
      ) : (
        <Loading style={{ height: 400 }} />
      )}
      {!isLoadingFeedback && (
        <GeneralModal
          isOpen={isOpenFeedbackModal}
          title={
            boxFeedbackable.reviewed ? 'Bạn đã đánh giá box' : !boxFeedbackable.canReview ? 'Bạn chưa mua box' : ''
          }
          leftTitle=""
          rightIcon={'close'}
          onRightActionClick={() => this.handleSetOpenFeedbackModal(false)}
          onRequestClose={() => this.handleSetOpenFeedbackModal(false)}
        >
          <div className={styles.feedbackBlock}>
            {renderContentMOdalFeedBack({
              boxFeedbackable,
              handleSetOpenFeedbackModal: (val) => this.handleSetOpenFeedbackModal(val)
            })}
          </div>
        </GeneralModal>
      )}
      {!!product && !!product.box && !!product.box.size_guides && !!product.box.size_guides.length && (
        <GeneralModal
          isOpen={isOpenSizeGuideModal}
          title={'Hướng dẫn chọn kích thước'}
          rightIcon={'close'}
          onRightActionClick={() => this.handleDisplaySizeGuideModal(false)}
          onRequestClose={() => this.handleDisplaySizeGuideModal(false)}
        >
          <SizeGuide list={product.box.size_guides} onClick={this.handleSizeGuideClick.bind(this)} />
        </GeneralModal>
      )}

      {suggestionDiscountCodes && addDiscountCode && (
        <DiscountCodeModalMobile
          title={'Ưu đãi dành riêng cho bạn'}
          isDisplayDiscountCodeInput={false}
          isDisplayDiscountCodeListTitle={false}
          isOpen={isOpenDiscountCodeModal}
          toggleVisibility={(visibility: boolean) => {
            popErrorAction(ADD_DISCOUNT_CODE);
            this.handleDisplayDiscountModal(false);
          }}
          discountCodes={discountCodeList}
          status={addDiscountCode}
          error={getGlobalErrorMessage(errorIndex, ADD_DISCOUNT_CODE)}
          appliedCode={appliedCode}
          applyingCode={applyingCode}
          isApplyingCode={isApplyingCode}
          onCodeSubmit={(code) => {
            popErrorAction(ADD_DISCOUNT_CODE);
            addDiscountCodeAction({ discountCode: code, isOpenCartSummary: false, whereAdded: 'Box detail' });
          }}
          onAddSuccess={() => this.setState({ isRedeemDiscountCodeModalOpen: false })}
          onEdit={() => popErrorAction(ADD_DISCOUNT_CODE)}
          isSubmitting={addDiscountCode && addDiscountCode.loading}
        />
      )}
      <GeneralModal
        isOpen={isOpenCashbackInfoModal}
        title={'Hướng dẫn tích lũy hoàn tiền'}
        rightIcon={'close'}
        className={styles.cashbackInfoModal}
        onRightActionClick={() => this.handleDisplayCashbackInfoModal(false)}
        onRequestClose={() => this.handleDisplayCashbackInfoModal(false)}
      >
        <CashbackInstruction />
      </GeneralModal>
    </div>
  );
}

function renderBottom() {
  const {
    loveStore: { loveBox },
    userStore: { userWatchedList },
    shopStore: { storeBoxes, productDetail, boxSavingSets, boxMagazines, boxRelated, makeups },
    brandStore: { productByBrandId },
    openModalAction,
    fetchShipFeeByDistrictIdAction
  } = this.props as IProductDetailContainerProps;

  const {
    idProductHash,
    idProduct,
    isFetchLoveBox,
    isFetchMagazineForBox,
    isFetchSavingBox,
    isFetchRelatedBox,
    isFetchWatchedList,
    isFetchShopTheLook,
    isOpenCitySelectionModal,
    isOpenStoreModal
  } = this.state as IProductDetailContainerState;

  const product = productDetail[idProductHash];
  const slug = (product && product.box && product.box.slug) || '';

  // Check lustre individual or box lustre
  const isIndividual = !!product && !!product.box && product.box.is_individual;
  const boxProducts = (!!product && !!product.box && product.box.box_products) || [];

  const video =
    (product && product.box && product.box.videos && !!product.box.videos.length && product.box.videos[0]) || {};

  const brandName =
    (!!boxProducts.length &&
      product.box.box_products[0].product &&
      product.box.box_products[0].product.brand &&
      product.box.box_products[0].product.brand.slug) ||
    '';

  let isLustreProduct = isIndividual && brandName.trim() === 'lustre';

  const param = { page: 1, perPage: 25 };
  const keyHash = objectToHash(param);

  const watchedList =
    (userWatchedList && !isUndefined(userWatchedList[keyHash]) && userWatchedList[keyHash].recently_viewed_boxes) || [];

  let boxSaveList = [];
  if (!!product && !!product.box && product.box.is_individual) {
    const savingSetsParam = { productId: slug, page: 1, perPage: 10 };
    const keyHash = objectToHash(savingSetsParam);

    boxSaveList = (boxSavingSets && !isUndefined(boxSavingSets[keyHash]) && boxSavingSets[keyHash].saving_sets) || [];
  }

  const magazinesParam = { productId: slug, page: 1, perPage: 10 };
  const keyHashMagazine = objectToHash(magazinesParam);

  const magazineList =
    (boxMagazines && !isUndefined(boxMagazines[keyHashMagazine]) && boxMagazines[keyHashMagazine].magazines) || [];

  const keyHashProductRelated = objectToHash({ productId: slug });
  const productRelatedList =
    (boxRelated && !isUndefined(boxRelated[keyHashProductRelated]) && boxRelated[keyHashProductRelated]) || [];

  const loveBoxParam = { id: idProduct };
  const loveBoxKeyHash = objectToHash(loveBoxParam);
  const loveBoxList = (loveBox && !isUndefined(loveBox[loveBoxKeyHash]) && loveBox[loveBoxKeyHash]) || [];

  const keyHashBrand = objectToHash({ id: 'lustre', page: 1, perPage: 20 });
  const productSameBrandList =
    (productByBrandId &&
      productByBrandId[keyHashBrand] &&
      productByBrandId[keyHashBrand].boxes &&
      !!productByBrandId[keyHashBrand].boxes.length &&
      productByBrandId[keyHashBrand].boxes) ||
    [];

  const stickyContent = () => {
    if (!product || !product.box) return null;

    return (
      <div>
        <Sticky {...{ id: 'product-info-product-detail', title: 'Thông tin' }}>
          <ProductInfo
            product={product}
            openModal={openModalAction}
            onBundleItemClick={(box, index) => {
              // FIXME: This event will not work as `box` is not a ProductBox type. Contact with backend to get the correct type.
              gatewayTrackViewContentFromList({
                source: ViewedSource.PRODUCT_BOXES,
                sourceId: product?.box?.lixibox_id,
                index,
                box
              });
            }}
          />
        </Sticky>
        {
          <TrackVisibility offset={200}>
            {({ isVisible }) => {
              !!isVisible && !isFetchSavingBox && !!handleFetchSavingBox && handleFetchSavingBox.bind(this)();

              return (
                boxSaveList &&
                boxSaveList.length > 0 &&
                !!product.box.saving_bundle_value && (
                  <WrapLayout>
                    <CombinedProductSlider
                      dataList={boxSaveList}
                      title={`Mua theo box để được tiết kiệm từ: ${formatCurrency(product.box.saving_bundle_value, {
                        suffix: true
                      })}`}
                      onItemClick={(box, index) => {
                        gatewayTrackViewContentFromList({
                          source: ViewedSource.BOX_DETAIL_RELATED_SAVINGS_BOXES,
                          sourceId: product?.box?.lixibox_id,
                          index,
                          box
                        });
                      }}
                    />
                  </WrapLayout>
                )
              );
            }}
          </TrackVisibility>
        }

        <TrackVisibility offset={200}>
          {({ isVisible }) => {
            !!isVisible && !isFetchRelatedBox && !!handleFetchRelatedBox && handleFetchRelatedBox.bind(this)();

            return (
              productRelatedList &&
              productRelatedList.length > 0 && (
                <WrapLayout>
                  <CombinedProductSlider
                    dataList={productRelatedList}
                    title={`Sản phẩm liên quan`}
                    onItemClick={(box, index) => {
                      gatewayTrackViewContentFromList({
                        source: ViewedSource.BOX_DETAIL_RELATED_BOXES,
                        sourceId: product?.box?.lixibox_id,
                        index,
                        box
                      });
                    }}
                  />
                </WrapLayout>
              )
            );
          }}
        </TrackVisibility>

        {isLustreProduct && !isEmptyObject(video) && (
          <BrandExclusive {...{ title: 'Video về sản phẩm', classes: { childrenContainer: styles.stickyVideo } }}>
            <ProductVideo video={video} />
          </BrandExclusive>
        )}
        {isLustreProduct && productSameBrandList && productSameBrandList.length > 0 && (
          <WrapLayout>
            <CombinedProductSlider dataList={productRelatedList} title={`Sản phẩm cùng thương hiệu`} />
          </WrapLayout>
        )}
        <TrackVisibility offset={200}>
          {({ isVisible }) => {
            !!isVisible && !isFetchShopTheLook && !!handleFetchShopTheLook && handleFetchShopTheLook.bind(this)();

            return (
              isLustreProduct &&
              makeups &&
              !!makeups.length && (
                <BrandExclusive {...{ title: 'Shop the look' }}>
                  <ProductShopToLook openModal={openModalAction} shopTheLooks={makeups || []} />
                </BrandExclusive>
              )
            );
          }}
        </TrackVisibility>
        {isLustreProduct && (
          <Sticky {...{ id: 'instagram-product-detail' }}>
            <ProductInstagram openModal={openModalAction} list={[]} />
          </Sticky>
        )}
        <TrackVisibility offset={200}>
          {({ isVisible }) => {
            !!isVisible && !isFetchWatchedList && !!handleFetchWatchedList && handleFetchWatchedList.bind(this)();

            return (
              watchedList &&
              watchedList.length > 0 && (
                <WrapLayout>
                  <CombinedProductSlider
                    isShowVariants={false}
                    dataList={watchedList}
                    title={`Sản phẩm đã xem`}
                    onItemClick={(box, index) => {
                      gatewayTrackViewContentFromList({
                        source: ViewedSource.BOX_DETAIL_RECENT_VIEWED,
                        sourceId: product?.box?.lixibox_id,
                        index,
                        box
                      });
                    }}
                  />
                </WrapLayout>
              )
            );
          }}
        </TrackVisibility>

        <TrackVisibility offset={200}>
          {({ isVisible }) => {
            !!isVisible &&
              !isFetchMagazineForBox &&
              !!handleFetchMagazineForBox &&
              handleFetchMagazineForBox.bind(this)();

            return (
              magazineList &&
              magazineList.length > 0 && (
                <Sticky {...{ id: 'magazine-product-detail', title: 'Bài viết liên quan' }}>
                  <MagazineImageSlider
                    {...{
                      column: 5,
                      showHeader: false,
                      showViewMore: false,
                      isCustomTitle: false,
                      data: magazineList,
                      onItemClick: (magazine, index) => {
                        gatewayTrackViewedMagazineFromList({
                          source: ViewedSource.BOX_DETAIL_RELATED_MAGAZINES,
                          sourceId: product?.box?.lixibox_id,
                          index,
                          magazine
                        });
                      }
                    }}
                  />
                </Sticky>
              )
            );
          }}
        </TrackVisibility>

        <TrackVisibility offset={200}>
          {({ isVisible }) => {
            !!isVisible && !isFetchLoveBox && !!handleFetchLoveBox && handleFetchLoveBox.bind(this)();

            return (
              loveBoxList &&
              loveBoxList.length > 0 && (
                <Sticky
                  {...{
                    id: 'testimonial-product-detail',
                    title: 'Nhận xét về Lixibox',
                    classes: { childrenContainer: styles.stickyTestimonial }
                  }}
                >
                  <TestimonailSlider
                    {...{
                      openModal: openModalAction,
                      column: 5,
                      showHeader: false,
                      data: loveBoxList,
                      showViewMore: false,
                      isCustomTitle: false,
                      onItemClick: (box, index) => {
                        gatewayTrackViewContentFromList({
                          source: ViewedSource.BOX_DETAIL_RELATED_TESTIMONIAL_BOXES,
                          sourceId: product?.box?.lixibox_id,
                          index,
                          box
                        });
                      }
                    }}
                  />
                </Sticky>
              )
            );
          }}
        </TrackVisibility>

        <GeneralModal
          isOpen={isOpenCitySelectionModal}
          isShowHeading={false}
          className={styles.citySelectionModal}
          onRequestClose={() => this.handleDisplayCitySelectionModal(false)}
        >
          <AddressModal
            getFromDistrict={true}
            onSaveAddressSelected={({ provinceName, districtName, provinceId, districtId }) => {
              fetchShipFeeByDistrictIdAction({
                provinceName,
                districtName,
                provinceId,
                districtId,
                boxId: !!product && !!product.box ? product.box.id : 0
              });
              this.handleDisplayCitySelectionModal(false);
            }}
            onRequestClose={() => this.handleDisplayCitySelectionModal(false)}
          />
        </GeneralModal>

        <GeneralModal
          isOpen={isOpenStoreModal}
          title={'Danh sách cửa hàng'}
          leftTitle=""
          rightIcon={'close'}
          onRightActionClick={() => this.handleDisplayStoreModal(false)}
          onRequestClose={() => this.handleDisplayStoreModal(false)}
        >
          <StoreBoxes
            data={{ storeBoxes }}
            onSelectStore={({ store }) => this.handleDisplayStoreMapModal(true, store.embed_map_url)}
          />
        </GeneralModal>
      </div>
    );
  };

  return stickyContent();
}

function renderDesktopVersion() {
  const { isFetchProductDetailFail } = this.state;
  return isFetchProductDetailFail ? <Page404 /> : renderTop.bind(this)();
}

export default renderDesktopVersion;
