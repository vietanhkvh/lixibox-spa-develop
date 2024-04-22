import { ROUTING_PRODUCT_DETAIL_PATH } from '../../routings/path';

import SignIn from '../../components/auth/sign-in';
import QuickView from '../../components/modal/quick-view';
import ReviewForm from '../../components/feedback/review-form';
import OrderPaymentForm from '../app-shop/cart/order-payment-modal';
import ProductGift from '../app-shop/cart/gift-modal';
import StoreMap from '../../components/modal/store-map';
import ProductDetail from '../../components/product/detail-modal';
import AddressModal from '../../components/address/modal';
import TimeFeeShipping from '../../components/product/tab/delivery';
import LandingLustreProduct from '../../components/modal/landing-lustre-product';
import Instagram from '../../components/modal/instagram';
import UserBirthday from '../../components/modal/user-birthday';
import FeedItemCommunity from '../../components/modal/feed-item-community';
import ReasonCancelOrder from '../../components/modal/reason-cancel-order';
import StoreBoxes from '../../components/modal/store-boxes';
import CheckoutSuccess from '../../components/modal/checkout-success';
import AddToCartSuccessAlert from '../../components/product/add-to-cart-success-alert';
import DiscountCodeMobileAlert from '../../components/modal/discount-code-mobile-alert';
import NotificationOrder from '../../components/modal/notification-order';
import SuggestionFeedbackCreate from '../../components/community/suggestion-feedback-create';
import GuideSizeModal from '../../components/product/size-guide-modal';
import BoxDetailPicture from '../../components/product/box-detail-picture';
import DiscountCodeDetailModal from '../../components/product/discount-code-detail-modal';

import { IModalProps } from './model';

const renderContent = (props: IModalProps, modalIndex: number, handleCloseMobileAlert = () => {}) => {
  const { data, history, pushStateWhenOpeningModalAction, closeModal } = props;
  const childComponent = data[modalIndex].childComponent;
  const childProps = data[modalIndex].childProps;

  switch (childComponent) {
    /** Sign Popup */
    case 'SignIn':
      return <SignIn onLoginSuccess={() => closeModal()} />;

    /**
     * Quick view to view product information
     * @prop {Object} data Short information product
     */
    case 'QuickView':
      const link = `${ROUTING_PRODUCT_DETAIL_PATH}/${childProps.data.slug}`;
      const title = childProps.data.name;
      pushStateWhenOpeningModalAction({ link, title });
      return <QuickView data={childProps.data} />;

    /**
     * Modal show add or edit review rating
     * @prop {Object} data Short information product
     */
    case 'ReviewForm':
      return <ReviewForm data={childProps.data} />;

    /**
     * Modal order payment
     * @prop {Object} data Short information product
     */
    case 'OrderPaymentForm':
      return <OrderPaymentForm data={childProps.data} />;

    /**
     * Modal gift payment
     * @prop {Object} data Short information product
     */
    case 'GiftPaymentForm':
      return <ProductGift data={childProps.data} />;

    /**
     * Modal store map
     * @prop {Object} data Short information product
     */
    case 'StoreMapForm':
      return <StoreMap data={childProps.data} />;

    /**
     * Modal product detail
     * @prop {Object} data Short information product
     */
    case 'ProductDetail':
      return <ProductDetail data={childProps.data} />;

    /**
     * Modal choose an address (province, district, ward) on mobile
     * @prop {Object} data Short information address
     */
    case 'AddressForm':
      return <AddressModal data={childProps.data} />;

    /**
     * Modal find time and fee shipping
     * @prop {Object} data Show time and fee shipping
     */
    case 'TimeFeeShippingForm':
      return <TimeFeeShipping data={childProps.data} />;

    /**
     * Modal landing page of lustre product
     * @prop {Object} data Show lustre product
     */
    case 'LandingLustreProduct':
      return <LandingLustreProduct data={childProps.data} />;

    /**
     * Modal instagram
     * @prop {Object} data instagram link
     */
    case 'Instagram':
      return <Instagram data={childProps.data} />;

    /**
     * Modal birthday
     */
    case 'Birthday':
      return <UserBirthday closeModal={handleCloseMobileAlert} data={childProps.data} />;

    /**
     * Modal feed item community
     * @prop {Object} data instagram link
     */
    case 'FeedItemCommunity':
      return <FeedItemCommunity data={childProps.data} />;

    /**
     * Modal reason cancel order
     * @prop {Object} data reason cancel order
     */
    case 'ReasonCancelOrder':
      return <ReasonCancelOrder closeModal={handleCloseMobileAlert} data={childProps.data} />;

    /**
     * Modal store boxes
     * @prop {Object} data store boxes
     */
    case 'StoreBoxes':
      return <StoreBoxes data={childProps.data} />;

    /**
     * Modal checkout success
     * @prop {Object} data checkout success
     */
    case 'CheckoutSuccess':
      return <CheckoutSuccess data={childProps.data} history={history} />;

    /**
     * Mobile alert Add to cart Success
     * @prop {Object} data
     */
    case 'ProductAddToCartSuccessAlert':
      return <AddToCartSuccessAlert closeModal={handleCloseMobileAlert} data={childProps.data} history={history} />;

    /**
     * Mobile alert discount code
     * @prop {Object} data
     */
    case 'DiscountCodeMobileAlert':
      return <DiscountCodeMobileAlert closeModal={handleCloseMobileAlert} data={childProps.data} />;

    /**
     * Notification order
     * @prop {Object} data
     */
    case 'NotificationOrder':
      return <NotificationOrder closeModal={handleCloseMobileAlert} data={childProps.data} />;

    /**
     * Notification order
     * @prop {Object} data
     */
    case 'SuggestionFeedbackCreate':
      return SuggestionFeedbackCreate({
        isInModal: true,
        closeModal: handleCloseMobileAlert,
        listBoxNeedToFeedback: childProps.data.listBoxNeedToFeedback,
        limit: childProps.data.limit
      });

    /**
     * Guide size modal
     * @prop {Object} data
     */
    case 'SizeGuideModal':
      return GuideSizeModal({
        closeModal: handleCloseMobileAlert,
        image: childProps.data.image
      });

    /**
     *  Box detail picture modal
     * @prop {Object} data
     */
    case 'BoxDetailPictureModal':
      const boxDetailPictureModalProps = {
        closeModal: props.closeModal,
        list: childProps.data.list,
        selected: childProps.data.selected,
        boxFeedbackPicture: childProps.data.boxFeedbackPicture,
        video: childProps.data.video
      };

      return <BoxDetailPicture {...boxDetailPictureModalProps} />;

    /**
     * Discount Code Modal
     */
    case 'DiscountCodeDetailModal':
      const discountCodeModalProps = {
        closeModal: props.closeModal,
        data: childProps.data
      };
      return <DiscountCodeDetailModal {...discountCodeModalProps} />;

    default:
      return null;
  }
};

export default renderContent;
