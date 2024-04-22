import classNames from 'classnames';
import Icon from '../../ui/icon';
import ProductDetailItem from '../detail-item';
import componentStyles from '../../../style/component.module.scss';
import STYLE from './style';

const renderSlider = ({
  sliderStyle,
  column,
  type,
  isSpecialAddOn,
  productSlideSelected,
  animating,
  isShowQuickView,
  isShowQuickBuy,
  isShowLike,
  displayCartSumaryOption,
  lineTextNumber,
  isShowCurrentPrice,
  isShowRating,
  cartStore,
  likedIdList,
  openAlertAction,
  openModalAction,
  closeModalAction,
  selectGiftAction,
  likeProductAction,
  unLikeProductAction,
  addItemToCartAction,
  purchaseType,
  handleSelectProductId,
  productIdSelected,
  isShowCartSummary,
  referrerTracking,
  selectSpecialAddOnAction
}) => {
  const generateItemProps = (product, columnValue) => ({
    key: product.id,
    data: product,
    style: STYLE.column[columnValue || 2]
  });

  const productSlideContainerStyle = Object.assign(
    {},
    STYLE.productSlide.container,
    { opacity: true === animating ? 0.5 : 1 },
    sliderStyle
  );

  return (
    <div style={productSlideContainerStyle}>
      {productSlideSelected &&
        Array.isArray(productSlideSelected.list) &&
        productSlideSelected.list.map((product) => {
          const itemProps = generateItemProps(product, column);
          const productItemProps = {
            data: product,
            type,
            isShowQuickView,
            isShowQuickBuy,
            isShowLike,
            isSpecialAddOn,
            displayCartSumaryOption,
            lineTextNumber,
            isShowCurrentPrice,
            isShowRating,
            cartStore,
            likedIdList,
            openAlertAction,
            openModalAction,
            closeModalAction,
            selectGiftAction,
            likeProductAction,
            unLikeProductAction,
            addItemToCartAction,
            purchaseType,
            handleSelectProductId,
            productIdSelected,
            isShowCartSummary,
            referrerTracking,
            selectSpecialAddOnAction
          };
          return (
            <div {...itemProps}>
              <ProductDetailItem {...productItemProps} />
            </div>
          );
        })}
    </div>
  );
};

const renderNavigation = ({ productSlide, navLeftSlide, navRightSlide }) => {
  const leftNavProps = {
    className: classNames('left-nav', componentStyles.slideNavigationLeft),
    onClick: navLeftSlide,
    style: Object.assign({}, STYLE.productSlide.navigation)
  };

  const rightNavProps = {
    className: classNames('right-nav', componentStyles.slideNavigationRight),
    onClick: navRightSlide,
    style: Object.assign({}, STYLE.productSlide.navigation)
  };

  return productSlide.length <= 1 ? null : (
    <div>
      <div {...leftNavProps}>
        <Icon name={'angle-left'} className={componentStyles.slideNavigationIcon} />
      </div>
      <div {...rightNavProps}>
        <Icon name={'angle-right'} className={componentStyles.slideNavigationIcon} />
      </div>
    </div>
  );
};

const renderPagination = ({ productSlide, selectSlide, countChangeSlide, isShowPagination }) => {
  const generateItemProps = (item, index) => ({
    key: `product-slider-${item.id}`,
    onClick: () => 'function' === typeof selectSlide && selectSlide(index),
    className: classNames(
      componentStyles.slidePaginationItem,
      index === countChangeSlide && componentStyles.slidePaginationItemActive
    )
  });

  return productSlide.length <= 1 ? null : (
    <div
      style={Object.assign({}, STYLE.productSlide.pagination, isShowPagination && STYLE.productSlide.show)}
      className={'pagination'}
    >
      {Array.isArray(productSlide) &&
        productSlide.map((item, $index) => {
          const itemProps = generateItemProps(item, $index);
          return <div {...itemProps} />;
        })}
    </div>
  );
};

export const renderDesktop = ({
  props,
  state,
  handleMouseHover,
  selectSlide,
  navLeftSlide,
  navRightSlide,
  isShowPagination
}) => {
  const { productSlide, productSlideSelected, countChangeSlide, animating } = state;
  const {
    column,
    type,
    sytle,
    sliderStyle,
    isShowQuickView,
    isShowQuickBuy,
    isShowLike,
    displayCartSumaryOption,
    lineTextNumber,
    isShowCurrentPrice,
    isShowRating,
    cartStore,
    likedIdList,
    openAlertAction,
    openModalAction,
    closeModalAction,
    selectGiftAction,
    likeProductAction,
    unLikeProductAction,
    addItemToCartAction,
    purchaseType,
    handleSelectProductId,
    productIdSelected,
    isShowCartSummary,
    referrerTracking,
    isSpecialAddOn,
    selectSpecialAddOnAction
  } = props;

  const containerProps = {
    style: Object.assign({}, STYLE.productSlide, sytle),
    onMouseEnter: handleMouseHover
  };

  return (
    <div {...containerProps} className={'product-slide-container'}>
      {renderSlider({
        sliderStyle,
        column,
        type,
        isSpecialAddOn,
        productSlideSelected,
        animating,
        isShowQuickView,
        isShowQuickBuy,
        isShowLike,
        displayCartSumaryOption,
        lineTextNumber,
        isShowCurrentPrice,
        isShowRating,
        cartStore,
        likedIdList,
        openAlertAction,
        openModalAction,
        closeModalAction,
        selectGiftAction,
        likeProductAction,
        unLikeProductAction,
        addItemToCartAction,
        purchaseType,
        handleSelectProductId,
        productIdSelected,
        isShowCartSummary,
        referrerTracking,
        selectSpecialAddOnAction
      })}
      {renderPagination({
        productSlide,
        selectSlide,
        countChangeSlide,
        isShowPagination
      })}
      {renderNavigation({ productSlide, navLeftSlide, navRightSlide })}
    </div>
  );
};
