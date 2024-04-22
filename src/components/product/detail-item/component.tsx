import { Component } from 'react';

import {
  GA_TRACKING_EVENT_CATEGORY,
  GA_TRACKING_EVENT_ACTION,
  GA_TRACKING_EVENT_LABEL
} from '../../../tracking/google-analytic/type';
import { gaEventTracking } from '../../../tracking/google-analytic/ga-event-tracking';
import { ALERT_GENERAL_ERROR } from '../../../constants/application/alert';

import { auth } from '../../../utils/auth';
import { MODAL_SIGN_IN } from '../../../constants/application/modal';
import { PURCHASE_TYPE } from '../../../constants/application/purchase';
import { REDEEM_WARNING_MESSAGE } from '../../../constants/application/membership_level';
import { preLoadImage } from '../../../utils/image';
import { isCompareObject, isUndefined, isEmptyKeyObject, isEmptyObject } from '../../../utils/validate';

import { IItemProductProps, IItemProductState } from './model';
import { DEFAULT_PROPS, INITIAL_STATE } from './initialize';
import { renderComponent } from './view';
import { ViewedSource } from 'tracking/constants';

class ItemProduct extends Component<IItemProductProps, IItemProductState> {
  static defaultProps: IItemProductProps = DEFAULT_PROPS;

  constructor(props: IItemProductProps) {
    super(props);
    this.state = INITIAL_STATE;
  }

  /**
   * Calculate percent sale value
   * @param newPrice is current price ( < old price)
   * @param oldPrice is last price (maybe not exist, assigned by user)
   *
   * Divide betwen newPrice and oldPrice to calculate percent sale value
   */
  calculateSale(newPrice, oldPrice) {
    let valueSale = Math.floor(((oldPrice - newPrice) / oldPrice) * 100);
    valueSale = valueSale <= 0 ? 0 : valueSale;
    return `-${valueSale}%`;
  }

  hanleAddToCart() {
    const { addItemToCartAction, data, purchaseType, openAlertAction, authStore } = this.props;

    if (1 === purchaseType) {
      if (!auth.loggedIn()) {
        return openAlertAction(ALERT_GENERAL_ERROR({ content: REDEEM_WARNING_MESSAGE.NEED_TO_LOGIN.message }));
      }

      try {
        const isRequireBirthday = !!authStore && !isEmptyObject(authStore.userInfo) && authStore.userInfo.birthday <= 0;

        if (!!isRequireBirthday) {
          return openAlertAction(ALERT_GENERAL_ERROR({ content: REDEEM_WARNING_MESSAGE.NEED_TO_UPDATE_INFO.message }));
        }
      } catch (e) {}
    }

    this.setState(
      {
        isLoadingAddToCard: true,
        isAddedOnProduct: true
      } as IItemProductState,
      () =>
        addItemToCartAction({
          box: data,
          boxId: data.id,
          quantity: 1,
          displayCartSumary: false,
          purchaseType,
          trackingSource: ViewedSource.PRODUCT_BOXES
        })
    );
  }

  hanleAddGiftToCart() {
    const { selectGiftAction, data, handleSelectProductId } = this.props;

    this.setState(
      {
        isLoadingAddToCard: true,
        isAddedOnProduct: true
      } as IItemProductState,
      () =>
        selectGiftAction({
          discountCodeGiftId: data.id
        })
    );

    handleSelectProductId(data.slug);
  }

  handleLikeOnClick() {
    const { data, openModalAction, likedIdList, likeProductAction, unLikeProductAction } = this
      .props as IItemProductProps;

    const isLiked = true !== isUndefined(data) && auth.loggedIn() && likedIdList.indexOf(data.id) >= 0;

    auth.loggedIn()
      ? isLiked
        ? unLikeProductAction(data)
        : likeProductAction(data)
      : openModalAction(MODAL_SIGN_IN());

    gaEventTracking({
      category: GA_TRACKING_EVENT_CATEGORY.FEATURE_EFFECTIVE,
      action: GA_TRACKING_EVENT_ACTION.FEATURE_EFFECTIVE.WISH_LIST_ACTION,
      label: GA_TRACKING_EVENT_LABEL.FEATURE_EFFECTIVE.WISH_LIST_ACTION.CLICK_ON_LIST_BOX_PAGE,
      value: 1
    });
  }

  handleHoverColor(imgUrl) {
    this.setState({ imgUrl });
  }

  handleHoverItem() {
    this.setState({ isHover: true });
    // Fetch image list before hover
    const { data } = this.props;
    const colorList = Array.isArray(data.variant_options)
      ? data.variant_options.filter((variant_option) => variant_option.color_code)
      : [];
    const colorListLength = Array.isArray(colorList) ? colorList.length : 0;
    if (colorListLength > 1) {
      const offsetNumber = 4;
      const colorShowList = colorList.slice(0, offsetNumber);
      const preLoadImageList = (Array.isArray(colorShowList) && colorShowList.map((item) => item.box_picture)) || [];
      preLoadImage(preLoadImageList);
    }
  }

  handleLeaveHoverItem() {
    this.setState({ isHover: false });
  }

  checkItemRender({ cartDetail, prevStatus = false, nextStatus = true, purchaseType, slug = '' }) {
    const list =
      isEmptyKeyObject(cartDetail, 'cart_items') || !Array.isArray(cartDetail.cart_items)
        ? []
        : cartDetail.cart_items.filter((item) => slug === item.box.slug && item.purchase_type === purchaseType) || [];

    !prevStatus &&
      nextStatus &&
      0 === list.length &&
      this.setState({ isLoadingAddToCard: false, isAddedOnProduct: false });
  }

  handleLoadImage() {
    const { isLoadedImage } = this.state;
    if (!!isLoadedImage) {
      return;
    }

    this.setState({ isLoadedImage: true });
  }

  componentDidMount() {
    const { cartStore, data, purchaseType, productIdSelected } = this.props;

    this.setState({
      imgUrl: (data && data.primary_picture && data.primary_picture.medium_url) || ''
    });

    const itemSlug = !isEmptyKeyObject(data, 'slug') ? data.slug : '';
    const cartList =
      !isEmptyKeyObject(cartStore, 'cartDetail') && !isEmptyKeyObject(cartStore.cartDetail, 'cart_items')
        ? cartStore.cartDetail.cart_items
        : [];

    purchaseType === PURCHASE_TYPE.ADDON && this.checkExistedList(itemSlug, cartList, PURCHASE_TYPE.ADDON);
    purchaseType === PURCHASE_TYPE.REDEEM && this.checkExistedList(itemSlug, cartList, PURCHASE_TYPE.REDEEM);

    if (purchaseType === PURCHASE_TYPE.GIFT) {
      productIdSelected
        ? this.setState({
            isLoadingAddToCard: false,
            isAddedOnProduct: productIdSelected === itemSlug
          }) // Check open gift list slider, choose a gift and render slider again
        : this.checkExistedList(itemSlug, cartList, PURCHASE_TYPE.GIFT); // Check the product that chose for gift
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps, nextState) {
    const { cartStore, closeModalAction, showHideCartSumaryLayoutAction } = this.props;
    const isPrevSelectedGiftCart = !isEmptyKeyObject(cartStore, 'isSelectedGiftCart') && cartStore.isSelectedGiftCart;
    const isPrevAddCartFail = !isEmptyKeyObject(cartStore, 'isAddCartFail') && cartStore.isAddCartFail;
    const isPrevRemoveCartSuccess =
      !isEmptyKeyObject(cartStore, 'isRemoveCartSuccess') && cartStore.isRemoveCartSuccess;
    const prevCartDetail = (!isEmptyKeyObject(cartStore, 'cartDetail') && cartStore.cartDetail) || {};
    const prevCartList = (!isEmptyKeyObject(prevCartDetail, 'cart_items') && prevCartDetail.cart_items) || [];

    const isNextSelectedGiftCart =
      !isEmptyKeyObject(nextProps.cartStore, 'isSelectedGiftCart') && nextProps.cartStore.isSelectedGiftCart;
    const isNextAddCartFail =
      !isEmptyKeyObject(nextProps.cartStore, 'isAddCartFail') && nextProps.cartStore.isAddCartFail;
    const isNextRemoveCartSuccess =
      !isEmptyKeyObject(nextProps.cartStore, 'isRemoveCartSuccess') && nextProps.cartStore.isRemoveCartSuccess;
    const nextCartDetail =
      (!isEmptyKeyObject(nextProps.cartStore, 'cartDetail') && nextProps.cartStore.cartDetail) || {};
    const nextCartList = (!isEmptyKeyObject(nextCartDetail, 'cart_items') && nextCartDetail.cart_items) || [];

    // DESKTOP: When user choose a gift (not Checkout page) => show a summary cart
    isNextSelectedGiftCart &&
      nextProps.isShowCartSummary &&
      nextProps.purchaseType === PURCHASE_TYPE.GIFT &&
      setTimeout(() => {
        closeModalAction();
        showHideCartSumaryLayoutAction?.(true);
      }, 500);

    ((this.state.isAddedOnProduct && prevCartList.length !== nextCartList.length) ||
      (!isPrevAddCartFail && isNextAddCartFail) ||
      (!isPrevSelectedGiftCart && isNextSelectedGiftCart) ||
      !isCompareObject(prevCartList, nextCartList)) &&
      this.setState({ isLoadingAddToCard: false });

    // Check render when user buy product by coin error
    nextProps.purchaseType === PURCHASE_TYPE.REDEEM &&
      this.checkItemRender({
        cartDetail: nextCartDetail,
        prevStatus: isPrevAddCartFail,
        nextStatus: isNextAddCartFail,
        purchaseType: PURCHASE_TYPE.REDEEM,
        slug: nextProps.data.slug || ''
      });
    // End

    //Check render when user buy product by add on error
    nextProps.purchaseType === PURCHASE_TYPE.ADDON &&
      this.checkItemRender({
        cartDetail: nextCartDetail,
        prevStatus: isPrevAddCartFail,
        nextStatus: isNextAddCartFail,
        purchaseType: PURCHASE_TYPE.ADDON,
        slug: nextProps.data.slug || ''
      });
    // End

    // Check render when user choose gift product
    if (!isPrevSelectedGiftCart && isNextSelectedGiftCart && nextProps.purchaseType === PURCHASE_TYPE.GIFT) {
      this.checkItemRender({
        cartDetail: nextCartDetail,
        prevStatus: isPrevSelectedGiftCart,
        nextStatus: isNextSelectedGiftCart,
        purchaseType: PURCHASE_TYPE.GIFT,
        slug: this.props.data.slug || ''
      });
    }
    // End

    // Render status button when remove items on cart list => allow user choose again
    if (!isPrevRemoveCartSuccess && isNextRemoveCartSuccess && nextProps.purchaseType === PURCHASE_TYPE.NORMAL) {
      // Add cart is normal, not need to update status quick buy button
      this.checkItemRender({
        cartDetail: nextCartDetail,
        purchaseType: nextProps.purchaseType,
        slug: nextProps.data.slug || ''
      });
    }
    // End

    if (
      nextProps.purchaseType === PURCHASE_TYPE.GIFT &&
      (nextProps.productIdSelected !== this.props.data.slug || nextProps.productIdSelected !== nextProps.data.slug)
    ) {
      this.setState({ isLoadingAddToCard: false, isAddedOnProduct: false });
    }
  }

  checkExistedList(id, list, type) {
    // Check product gift list
    const itemList =
      list.filter((item) => (id === item.box.slug || id === item.box.id) && item.purchase_type === type) || [];
    this.setState({
      isLoadingAddToCard: false,
      isAddedOnProduct: itemList.length > 0
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (!isCompareObject(this.props.data, nextProps.data)) {
      return true;
    }
    if (!isCompareObject(this.props.cartStore, nextProps.cartStore)) {
      return true;
    }

    if (
      (this.props.likedIdList &&
        nextProps.likedIdList &&
        this.props.likedIdList.length !== nextProps.likedIdList.length &&
        !this.props.likedIdList.includes(this.props.data.id) &&
        nextProps.likedIdList.includes(nextProps.data.id)) ||
      (this.props.likedIdList.includes(this.props.data.id) && !nextProps.likedIdList.includes(nextProps.data.id))
    ) {
      return true;
    }

    if (this.props.isShowQuickView !== nextProps.isShowQuickView) return true;
    if (this.props.isShowQuickBuy !== nextProps.isShowQuickBuy) return true;
    if (this.props.isShowLike !== nextProps.isShowLike) return true;
    if (this.props.displayCartSumaryOption !== nextProps.displayCartSumaryOption) return true;
    if (this.props.isShowCurrentPrice !== nextProps.isShowCurrentPrice) return true;
    if (this.props.isShowRating !== nextProps.isShowRating) return true;
    if (this.props.isShowImage !== nextProps.isShowImage) return true;
    if (this.props.purchaseType !== nextProps.purchaseType) return true;
    if (this.props.productIdSelected !== nextProps.productIdSelected) return true;
    if (this.props.isShowCartSummary !== nextProps.isShowCartSummary) return true;

    if (this.state.isLoadingAddToCard !== nextState.isLoadingAddToCard) return true;
    if (this.state.isAddedOnProduct !== nextState.isAddedOnProduct) return true;
    if (this.state.imgUrl !== nextState.imgUrl) return true;
    if (this.state.isHover !== nextState.isHover) return true;
    if (this.state.isLoadedImage !== nextState.isLoadedImage) return true;
    if (this.state.isLoadedImage !== nextState.isLoadedImage) return true;

    return false;
  }

  handleAddSpecialAddOn() {
    const { data, selectSpecialAddOnAction, handleSelectProductId } = this.props;

    this.setState(
      {
        isAddedOnProduct: true
      } as IItemProductState,
      () =>
        !!selectSpecialAddOnAction &&
        selectSpecialAddOnAction({
          discountCodeAddOnId: data.id
        })
    );

    handleSelectProductId(data.id);
  }

  render() {
    const renderViewProps = {
      state: this.state,
      props: this.props,
      likeOnClick: this.handleLikeOnClick.bind(this),
      hanleAddToCart: this.hanleAddToCart.bind(this),
      hanleAddGiftToCart: this.hanleAddGiftToCart.bind(this),
      handleHoverColor: this.handleHoverColor.bind(this),
      handleHoverItem: this.handleHoverItem.bind(this),
      handleLeaveHoverItem: this.handleLeaveHoverItem.bind(this),
      handleLoadImage: this.handleLoadImage.bind(this),
      handleAddSpecialAddOn: this.handleAddSpecialAddOn.bind(this)
    };

    return renderComponent.bind(this)(renderViewProps);
  }
}

export default ItemProduct;
