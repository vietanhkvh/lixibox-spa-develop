import { NavLink } from 'react-router-dom';
import TrackVisibility from 'lixibox-react-on-screen';

import ProductItem from '../../../../../../presentation-component/product/product-item';
import ItemVerticalList from '../../../../../../presentation-component/item-list-hoc/item-vertical-list';
import GeneralModal from '../../../../../../presentation-component/modal/general-modal';
import SvgIcon from '../../../../../../presentation-component/ui/icon';
import { isMobileVersion } from '../../../../../../utils/responsive';
import { ROUTING_BRAND_DETAIL_PATH } from '../../../../../../routings/path';
import { MODAL_BOX_DETAIL_PICTURE } from '../../../../../../constants/application/modal';
import { ADD_DISCOUNT_CODE } from '../../../../../../flows/cart/type';
import Page404 from '../../../../../exception/404';
import ProductImage from '../../../../../../components/product/image';
import { currenyFormat } from '../../../../../../utils/currency';
import { getGlobalErrorMessage } from '../../../../../../utils/exception';
import AddressModal from '../../../../../../components/address/modal';
import ProductName from '../../../../../../components/product/name';
import SizeGuide from '../../../../../../components/product/size-guide';
import ProductVariants from '../../../../../../components/product/variants';
import Loading from '../../../../../../components/ui/loading';
import OverlayLoader from '../../../../../../presentation-component/ui/overlay-loader';
import SeparateLine from '../../../../../../presentation-component/ui/separate-line';
import Image from 'presentation-component/ui/image';
import StoreBoxes from '../../../../../../components/modal/store-boxes';
import StoreMap from '../../../../../../components/modal/store-map';
import LandingPageComponent from '../../../../../../presentation-component/landing-page/index';
import { APP_VERSION } from '../../../../../../constants/application/global';
import { objectToHash, stringToHash } from '../../../../../../utils/encode';
import { isUndefined } from '../../../../../../utils/validate';
import Tag from 'presentation-component/ui/tag';
import CashbackInstruction from 'presentation-component/user/cashback-instruction';
import BadgeBlock from 'components/product/badge-block';
import { decorateCashbackRebate } from 'utils/product';
import DiscountCodeModalMobile from '../../../../cart/check-out/view/mobile/discount-code-modal';
import { handleFetchSavingBox } from '../../handler-fetch-data';
import { IProductDetailContainerProps, IProductDetailContainerState } from '../../model';
import RatingGroup from '../../sub-components/generic/rating-group';
import DeliveryStatus from '../../sub-components/generic/delivery-status';
import ProductNote from '../../sub-components/generic/product-note';
import NewProductInfo from '../../sub-components/generic/new-product-info';
import { renderProductInfoTab } from '../../mobile/tab';
import MetaInfoComposite from '../../sub-components/generic/meta-info-composite';
import PricingInfo from '../../sub-components/generic/pricing-info';
import SizeGuideSection from '../../sub-components/generic/size-guide-section';
import DiscountCodeSection from '../../sub-components/generic/discount-code-section';
import PrimaryButtonGroup from '../../sub-components/generic/primary-button-group';
import {
  gatewayTrackReactBoxFeedback,
  gatewayTrackViewContentFromList,
  gatewayTrackViewedMagazineFromList
} from 'tracking/gateway';
import { ViewedSource } from 'tracking/constants';
import STYLE from './style';
import styles from './style.module.scss';

function renderMobileVersion() {
  const {
    feedbackPerPage,
    shopStore: { productDetail, landingPagesData, boxSavingSets, storeBoxes, boxFeedback },
    match: {
      params: { idProduct }
    },
    cartStore: { suggestionDiscountCodes, addDiscountCode },
    errorStore: { index: errorIndex },

    openModalAction,
    history,
    addDiscountCodeAction,
    discountCodeStore: { discountCodesBoxes },
    fetchShipFeeByDistrictIdAction,
    popErrorAction,
    cartStore: {
      cartDetail,
      addDiscountCode: { code: applyingCode, loading: isApplyingCode }
    },
    shopStore: { productDetailsFetching, productDetailsLoaded, productDetailsErrored }
  } = this.props as IProductDetailContainerProps;

  const {
    idProductHash,
    feedbackPage,
    isPriceBtnOnTop,
    isFetchSavingBox,
    isPriorotyBlock,
    isOpenStoreModal,
    isOpenStoreMapModal,
    storeMapUrl,
    isOpenCitySelectionModal,
    isOpenSizeGuideModal,
    isOpenDiscountCodeModal,
    isOpenSavingBoxModal,
    isOpenCashbackInfoModal,
    nextVariantId
  } = this.state as IProductDetailContainerState;

  const isThisProductFetching = productDetailsFetching.includes(idProductHash);
  const isThisProductErrored = productDetailsErrored.includes(idProductHash);
  const shouldDisplayLoader = !productDetailsLoaded.includes(idProductHash) && isThisProductFetching;
  const shouldDisplayOverlayLoader = !!nextVariantId;

  const appliedCode = !!cartDetail ? cartDetail.discount_code : '';

  const product = productDetail[idProductHash];
  const combinedProduct = this.getCombinedProduct();

  const productNameProps = {
    slug: combinedProduct.slug,
    name: combinedProduct.name
  };

  const preOrderReleaseDate = (product && product.box && product.box.pre_order_release_date) || 0;
  const preOrderStatus = (product && product.box && product.box.pre_order_status) || '';

  const keyHashDiscountCode = objectToHash({ productId: idProduct });
  const discountCodeList = discountCodesBoxes?.[keyHashDiscountCode] || [];

  let boxSaveList: Array<any> = [];

  if (!!product && !!product.box && product.box.is_individual) {
    const savingSetsParam = {
      productId: product.box.slug,
      page: 1,
      perPage: 10
    };
    const keyHash = objectToHash(savingSetsParam);

    boxSaveList = (boxSavingSets && !isUndefined(boxSavingSets[keyHash]) && boxSavingSets[keyHash].saving_sets) || [];
  }

  const savingBoxValue = (!!product && !!product.box && product.box.saving_bundle_value) || 0;
  const firstSavingBoxImage =
    (!!boxSaveList &&
      !!boxSaveList[0] &&
      !!boxSaveList[0].primary_picture &&
      boxSaveList[0].primary_picture.medium_url) ||
    '';

  const productIdHash = stringToHash(!!product && !!product.box ? product.box.slug : '');
  const landingPagesFilteredData = landingPagesData[productIdHash] || null;

  const params = {
    productId: idProduct,
    page: 1,
    perPage: 10
  };

  const keyHash = objectToHash(params);
  const list = (boxFeedback && boxFeedback[keyHash]) || [];
  const sourceId = combinedProduct?.lixibox_id || combinedProduct?.box?.lixibox_id || '';

  return isThisProductErrored ? (
    <Page404 />
  ) : shouldDisplayLoader ? (
    <div className={styles.productDetailLoader}>
      <Loading style={{ height: '100%' }} />
    </div>
  ) : (
    <div style={STYLE.newMobile.container}>
      <div id={'product-detail'} className={styles.productDetail}>
        <ProductImage
          box={combinedProduct.box}
          onSelect={({ selected }) => {
            openModalAction(
              MODAL_BOX_DETAIL_PICTURE({
                selected,
                list: combinedProduct.picture,
                boxFeedbackPicture: [],
                video: !!combinedProduct.video && !!combinedProduct.video.length ? combinedProduct.video : []
              })
            );
          }}
          list={combinedProduct.picture}
          badges={!!product && !!product.box && product.box.badges}
          boxFeedbackPicture={[]}
          video={!!combinedProduct.video && !!combinedProduct.video.length ? combinedProduct.video : []}
        />
        {!!product && !!product.box && (
          <MetaInfoComposite
            {...{
              productId: idProduct,
              page: feedbackPage,
              perPage: feedbackPerPage,
              combinedProduct,
              product
            }}
          />
        )}
        {!!product?.box && <BadgeBlock box={product.box} classes={{ container: styles.badgeBlock }} />}
        {!!product &&
          !!product.box.is_individual &&
          !!product.box.box_products &&
          !!product.box.box_products[0] &&
          !!product.box.box_products[0].product &&
          !!product.box.box_products[0].product.brand && (
            <NavLink
              style={STYLE.newBrandName}
              to={`${ROUTING_BRAND_DETAIL_PATH}/${product.box.box_products[0].product.brand.slug}`}
            >
              {product.box.box_products[0].product.brand.name}
            </NavLink>
          )}
        <ProductName {...productNameProps} />
        <RatingGroup
          {...{
            rating: combinedProduct.rating,
            love: combinedProduct.love,
            onClick: this.handleScrollToFeedback
          }}
        />
        <PricingInfo {...{ combinedProduct }} />
        {!!product?.box?.cashback_rebate && product?.box?.price && (
          <Tag
            label={`Hoàn tiền lên đến ${decorateCashbackRebate({
              rebate: product?.box?.cashback_rebate || 0,
              price: product?.box?.price || 0
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
          <div style={STYLE.newMobile.mobileProductColor}>
            <ProductVariants
              history={history}
              version={APP_VERSION.MOBILE}
              boxSlug={idProduct || ''}
              optionTypes={product?.option_types || []}
              boxVariants={product?.box_variants || []}
              onSelected={(slug) => this.onVariantSelect(slug)}
            />
          </div>
        )}
        {!!product?.box?.size_guides?.length && (
          <SizeGuideSection onClick={() => this.handleDisplaySizeGuideModal(true)} />
        )}
        <SeparateLine />
        <NewProductInfo
          {...{
            product,
            combinedProduct,
            onClickStore: () => this.handleDisplayStoreModal(true),
            onClickDeliveryCalc: () => this.handleDisplayCitySelectionModal(true)
          }}
        />

        <SeparateLine />
        {!!discountCodeList?.length && (
          <>
            <DiscountCodeSection
              {...{
                onDiscountCodeClick: () => this.handleDisplayDiscountModal(true),
                list: discountCodeList
              }}
            />
            <SeparateLine />
          </>
        )}
        <SeparateLine />
        {!!product && !!product.box && (
          <TrackVisibility offset={200}>
            {({ isVisible }) => {
              !!isVisible && !isFetchSavingBox && !!handleFetchSavingBox && handleFetchSavingBox.bind(this)();

              return (
                boxSaveList &&
                boxSaveList.length > 0 &&
                !!product.box.saving_bundle_value && (
                  <>
                    <div className={styles.savingSet} onClick={() => this.handleDisplaySavingBoxModal(true)}>
                      <div className={styles.info}>
                        <div className={styles.title}>Mua theo Beauty Box</div>
                        <div className={styles.desc}>
                          Để tiết kiệm từ <span>{currenyFormat(savingBoxValue)}</span>
                        </div>
                      </div>
                      <Image alt={''} src={firstSavingBoxImage} className={styles.img} />
                      <SvgIcon name={'angle-right'} className={styles.icon} />
                    </div>
                    <SeparateLine />
                  </>
                )
              );
            }}
          </TrackVisibility>
        )}
        {landingPagesFilteredData && (
          <LandingPageComponent data={landingPagesFilteredData} rating={(list && list.feedbacks) || []} />
        )}

        {!isPriorotyBlock ? (
          <div>
            {renderProductInfoTab.bind(this)({
              product,
              props: this.props,
              state: this.state,
              handleFetchListFeedback: this.handleFetchListFeedback.bind(this),
              handlePaginationClick: this.handleFeedbackPaginationClick.bind(this),
              handleSetOpenFeedbackModal: this.handleSetOpenFeedbackModal.bind(this),
              handleSetOpenDiscussionModal: this.handleSetOpenDiscussionModal.bind(this),
              onBundleItemClick: (box, index) => {
                // FIXME: This event will not work as `box` is not a ProductBox type. Contact with backend to get the correct type.
                gatewayTrackViewContentFromList({
                  source: ViewedSource.PRODUCT_BOXES,
                  sourceId,
                  box,
                  index
                });
              },
              onRelatedProductItemClick: (product, index) => {
                gatewayTrackViewContentFromList({
                  source: ViewedSource.BOX_DETAIL_RELATED_BOXES,
                  sourceId,
                  box: product,
                  index
                });
              },
              onRecentlyViewedProductItemClick: (product, index) => {
                gatewayTrackViewContentFromList({
                  source: ViewedSource.BOX_DETAIL_RECENT_VIEWED,
                  sourceId,
                  box: product,
                  index
                });
              },
              onRelatedTestimonialItemClick: (box, index) => {
                gatewayTrackViewContentFromList({
                  source: ViewedSource.BOX_DETAIL_RELATED_TESTIMONIAL_BOXES,
                  sourceId,
                  index,
                  box
                });
              },
              onRelatedMagazineItemClick: (magazine, index) => {
                gatewayTrackViewedMagazineFromList({
                  source: ViewedSource.BOX_DETAIL_RELATED_MAGAZINES,
                  sourceId,
                  index,
                  magazine
                });
              },
              onFeedbackReact: ({ isLiked }) => {
                gatewayTrackReactBoxFeedback({
                  box: product?.box,
                  liked: isLiked
                });
              }
            })}
          </div>
        ) : (
          <Loading style={{ height: 400 }} />
        )}
      </div>
      {/* ============== MODAL ============== */}
      <OverlayLoader isVisible={shouldDisplayOverlayLoader} />
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
      <GeneralModal
        isOpen={isOpenStoreMapModal && !!storeMapUrl && !!storeMapUrl.length}
        title={'Chi tiết cửa hàng'}
        leftTitle=""
        rightIcon={'close'}
        className={styles.storeMapModal}
        onRightActionClick={() => this.handleDisplayStoreMapModal(false)}
        onRequestClose={() => this.handleDisplayStoreMapModal(false)}
      >
        <StoreMap data={storeMapUrl} />
      </GeneralModal>
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
      {isMobileVersion() && suggestionDiscountCodes && addDiscountCode && (
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
      {boxSaveList && boxSaveList.length > 0 && (
        <GeneralModal
          isOpen={isOpenSavingBoxModal}
          title={'Mua theo Beauty Box'}
          rightIcon={'close'}
          onRightActionClick={() => this.handleDisplaySavingBoxModal(false)}
          onRequestClose={() => this.handleDisplaySavingBoxModal(false)}
        >
          <ItemVerticalList className={styles.savingBoxList}>
            {boxSaveList.map((box, index) => (
              <ProductItem
                key={box.id || index}
                product={box}
                isFullPadding
                onClick={() => {
                  gatewayTrackViewContentFromList({
                    source: ViewedSource.BOX_DETAIL_RELATED_SAVINGS_BOXES,
                    sourceId,
                    box,
                    index
                  });
                }}
              />
            ))}
          </ItemVerticalList>
        </GeneralModal>
      )}
      <GeneralModal
        isOpen={isOpenCashbackInfoModal}
        title={'Hướng dẫn tích lũy hoàn tiền'}
        rightIcon={'close'}
        onRightActionClick={() => this.handleDisplayCashbackInfoModal(false)}
        onRequestClose={() => this.handleDisplayCashbackInfoModal(false)}
      >
        <CashbackInstruction />
      </GeneralModal>
      <div style={STYLE.mobile.priceContainer}>
        <PrimaryButtonGroup {...{ product, combinedProduct, isPriceBtnOnTop }} />
      </div>
    </div>
  );
}

export default renderMobileVersion;
