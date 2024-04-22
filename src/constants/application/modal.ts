import { getDeviceVersion } from '../../utils/responsive';
import * as VARIABLE from '../../style/variable';

/** Modal sign in */
export const MODAL_SIGN_IN = () => ({
  type: 'MOBILE_ALERT',
  isPushLayer: true,
  isFixScroll: false,
  canShowHeaderMobile: true,
  childComponent: 'SignIn',
  modalStyle: {
    container: {},
    ovelay: {},
    content: {
      width: 780,
      borderRadius: 8,
      paddingLeft: 0,
      paddingRight: 0,
      paddingTop: 0,
      paddingBottom: 0
    }
  }
});

/**
 * Modal quick view product
 *
 * @param {Obejct} data data for child prop
 */
export const MODAL_QUICVIEW = (data) => ({
  title: 'Mô tả Sản phẩm',
  isPushLayer: false,
  isFixScroll: true,
  canShowHeaderMobile: true,
  childComponent: 'QuickView',
  childProps: { data },
  modalStyle: {
    container: {},
    ovelay: {},
    content: {
      width: 900,
      paddingLeft: 0,
      paddingRight: 0,
      paddingTop: 0,
      paddingBottom: 0
    }
  }
});

/**
 * Modal add or edit review rating
 *
 * @param {Obejct} data data for child prop
 */
export const MODAL_ADD_EDIT_REVIEW_RATING = ({ data, title, isShowDesktopTitle }) => ({
  title,
  isShowDesktopTitle,
  isPushLayer: false,
  isFixScroll: false,
  canShowHeaderMobile: true,
  childComponent: 'ReviewForm',
  childProps: { data },
  modalStyle: {
    container: {},
    ovelay: {},
    content: { width: 450 }
  }
});

/**
 * Modal order cart payment
 *
 * @param {Obejct} data data for child prop
 */
export const MODAL_ORDER_PAYMENT = ({ data }) => {
  const switchPaddingStyle = {
    MOBILE: '0 5px',
    DESKTOP: '0 20px'
  };

  return {
    title: 'Ưu đãi hôm nay',
    isShowDesktopTitle: true,
    isPushLayer: false,
    isFixScroll: true,
    canShowHeaderMobile: true,
    childComponent: 'OrderPaymentForm',
    childProps: { data },
    modalStyle: {
      container: {},
      ovelay: {},
      content: {
        width: 960,
        padding: switchPaddingStyle[getDeviceVersion()]
      }
    }
  };
};

/**
 * Modal gift cart payment
 *
 * @param {Obejct} data data for child prop
 */
export const MODAL_GIFT_PAYMENT = (data) => {
  const switchPaddingStyle = {
    MOBILE: '0 5px',
    DESKTOP: '0 20px'
  };

  const switchTitle = {
    MOBILE: 'Chọn 1 quà tặng',
    DESKTOP: 'Chọn 1 quà tặng bên dưới'
  };

  return {
    title: switchTitle[getDeviceVersion()],
    isShowDesktopTitle: true,
    isPushLayer: true,
    isFixScroll: true,
    canShowHeaderMobile: true,
    childComponent: 'GiftPaymentForm',
    childProps: { data },
    modalStyle: {
      container: {},
      ovelay: {},
      content: {
        width: 850,
        padding: switchPaddingStyle[getDeviceVersion()]
      }
    }
  };
};

/**
 * Modal map store
 *
 * @param {Obejct} data data for child prop
 */
export const MODAL_MAP_STORE = (data) => ({
  title: 'Cửa hàng Lixibox',
  isPushLayer: true,
  isFixScroll: true,
  canShowHeaderMobile: true,
  childComponent: 'StoreMapForm',
  childProps: { data },
  modalStyle: {
    container: {},
    ovelay: {},
    content: {
      width: 1170,
      paddingLeft: 0,
      paddingRight: 0,
      paddingTop: 0,
      paddingBottom: 0
    }
  }
});

/**
 * Modal show product detail
 *
 * @param {Obejct} data data for child prop
 */
export const MODAL_PRODUCT_DETAIL = ({ title, isShowDesktopTitle, data }) => ({
  title,
  isShowDesktopTitle,
  isPushLayer: false,
  isFixScroll: true,
  canShowHeaderMobile: true,
  childComponent: 'ProductDetail',
  childProps: { data },
  modalStyle: {
    container: {},
    ovelay: {},
    content: {
      width: 900,
      height: 500,
      maxHeight: `100%`,
      display: VARIABLE.display.flex,
      overflow: `hidden`,
      paddingLeft: 0,
      paddingRight: 0,
      paddingTop: 0,
      paddingBottom: 0
    }
  }
});

/**
 * Modal choose an address (province, district, ward) on mobile
 *
 * @param {Obejct} data data for child prop
 */
export const MODAL_ADDRESS = (showTimeAndFeeShip = false, boxId = 0) => {
  const switchStyle = {
    MOBILE: {
      width: 650,
      height: '100%',
      padding: 0
    },

    DESKTOP: {
      width: 400,
      height: 650,
      padding: 0
    }
  };

  return {
    canShowHeaderMobile: false,
    isPushLayer: true,
    isFixScroll: true,
    childComponent: 'AddressForm',
    childProps: { data: { showTimeAndFeeShip, boxId } },
    modalStyle: {
      container: {},
      ovelay: {},
      content: switchStyle[getDeviceVersion()]
    }
  };
};

/**
 * Modal choose an address (province, district, ward) on mobile
 *
 * @param {Obejct} data data for child prop
 */
export const MODAL_TIME_FEE_SHIPPING = ({ boxId }) => {
  const switchStyle = {
    MOBILE: {
      width: 650,
      height: '100%',
      padding: 0
    },

    DESKTOP: {
      width: 400,
      height: 650,
      padding: 0
    }
  };

  return {
    isPushLayer: true,
    isFixScroll: true,
    isShowDesktopTitle: true,
    canShowHeaderMobile: true,
    childComponent: 'TimeFeeShippingForm',
    childProps: { data: { boxId } },
    modalStyle: {
      container: {},
      ovelay: {},
      content: switchStyle[getDeviceVersion()]
    }
  };
};

/**
 * Modal choose an address (province, district, ward) on mobile
 *
 * @param {Obejct} data data for child prop
 */
export const MODAL_LANDING_LUSTRE_PRODUCT = ({ data }) => {
  const switchStyle = {
    MOBILE: {
      width: 650,
      height: '100%',
      padding: 0
    },

    DESKTOP: {
      width: 800,
      height: 650,
      padding: 0
    }
  };

  return {
    title: 'SHOP THE LOOK',
    isShowDesktopTitle: false,
    canShowHeaderMobile: true,
    isPushLayer: true,
    isFixScroll: true,
    childComponent: 'LandingLustreProduct',
    childProps: { data },
    modalStyle: {
      container: {},
      ovelay: {},
      content: switchStyle[getDeviceVersion()]
    }
  };
};

/**
 * Modal instagram
 *
 * @param {Obejct} data data for child prop
 */
export const MODAL_INSTAGRAM = (data) => ({
  title: 'Instagram',
  isPushLayer: false,
  isFixScroll: true,
  canShowHeaderMobile: true,
  childComponent: 'Instagram',
  childProps: { data },
  modalStyle: {
    container: {},
    ovelay: {},
    content: {
      width: 400,
      paddingLeft: 0,
      paddingRight: 0,
      paddingTop: 0,
      paddingBottom: 0
    }
  }
});

/** Modal birthday */
export const MODAL_BIRTHDAY = ({ data }) => ({
  type: 'MOBILE_ALERT',
  isPushLayer: true,
  isFixScroll: true,
  canShowHeaderMobile: true,
  childComponent: 'Birthday',
  title: 'Thông tin Quà tặng',
  isShowDesktopTitle: false,
  childProps: { data },
  modalStyle: {
    container: {},
    ovelay: {},
    content: {
      width: 720,
      paddingLeft: 0,
      paddingRight: 0,
      paddingTop: 0,
      paddingBottom: 0
    }
  }
});

/** Modal feed item community */
export const MODAL_FEED_ITEM_COMMUNITY = (data) => {
  const switchStyle = {
    MOBILE: {
      width: '100%',
      height: '100%',
      padding: 0
    },

    DESKTOP: {
      maxWidth: '90vw',
      maxHeight: '90vh',
      paddingLeft: 0,
      paddingRight: 0,
      paddingTop: 0,
      paddingBottom: 0,
      width: ''
    }
  };

  return {
    isPushLayer: false,
    isFixScroll: true,
    canShowHeaderMobile: true,
    childComponent: 'FeedItemCommunity',
    childProps: { data },
    title: '',
    isShowDesktopTitle: false,
    modalStyle: {
      container: {},
      ovelay: {},
      content: switchStyle[getDeviceVersion()]
    }
  };
};

/**
 * Modal reason cancel order
 *
 * @param {Obejct} data data for child prop
 */
export const MODAL_REASON_CANCEL_ORDER = (data) => ({
  title: 'Chọn lý do hủy đơn hàng',
  isPushLayer: false,
  isFixScroll: true,
  isShowDesktopTitle: true,
  canShowHeaderMobile: true,
  childComponent: 'ReasonCancelOrder',
  childProps: { data },
  modalStyle: {
    container: {},
    ovelay: {},
    content: {
      width: 650,
      paddingLeft: 0,
      paddingRight: 0,
      paddingTop: 0,
      paddingBottom: 0
    }
  }
});

/** Modal discount code */
export const MODAL_STORE_BOXES = ({ data }) => ({
  isPushLayer: true,
  isFixScroll: true,
  canShowHeaderMobile: true,
  isShowDesktopTitle: true,
  title: 'Cửa hàng',
  childComponent: 'StoreBoxes',
  childProps: { data },
  modalStyle: {
    container: {},
    ovelay: {},
    content: {
      width: 1280,
      paddingLeft: 0,
      paddingRight: 0,
      paddingTop: 0,
      paddingBottom: 0
    }
  }
});

/** Modal checkout success */
export const MODAL_CHECKOUT_SUCCESS = ({ data }) => ({
  isPushLayer: true,
  isFixScroll: true,
  canShowHeaderMobile: true,
  isShowDesktopTitle: true,
  title: 'Mua hàng thành công',
  childComponent: 'CheckoutSuccess',
  childProps: { data },
  modalStyle: {
    container: {},
    ovelay: {},
    content: {
      width: 650,
      paddingLeft: 0,
      paddingRight: 0,
      paddingTop: 0,
      paddingBottom: 0
    }
  }
});

/** Modal checkout success */
export const MOBILE_ALERT_ADD_TO_CART_SUCCESS = ({ data }) => ({
  type: 'MOBILE_ALERT',
  isPushLayer: true,
  isFixScroll: true,
  canShowHeaderMobile: false,
  isShowDesktopTitle: false,
  childComponent: 'ProductAddToCartSuccessAlert',
  childProps: { data },
  modalStyle: {
    container: {},
    ovelay: {},
    content: {}
  }
});

/** Modal checkout success */
export const MOBILE_ALERT_DISCOUNT_CODE_SUCCESS = ({ data }) => ({
  type: 'MOBILE_ALERT',
  isPushLayer: true,
  isFixScroll: true,
  canShowHeaderMobile: false,
  isShowDesktopTitle: false,
  childComponent: 'DiscountCodeMobileAlert',
  childProps: { data },
  modalStyle: {
    container: {},
    ovelay: {},
    content: {}
  }
});

/** Modal notification order */
export const MODAL_NOTIFICATION_ORDER = (data) => ({
  type: 'MOBILE_ALERT',
  isPushLayer: true,
  isFixScroll: true,
  canShowHeaderMobile: true,
  childComponent: 'NotificationOrder',
  childProps: { data },
  modalStyle: {
    container: {},
    ovelay: {},
    content: {
      width: 650,
      paddingLeft: 0,
      paddingRight: 0,
      paddingTop: 0,
      paddingBottom: 0
    }
  }
});

/** Modal notification order */
export const SUGGESTION_FEEDACK_CREATE_MOBILE_ALERT = (data) => ({
  type: 'MOBILE_ALERT',
  isPushLayer: true,
  isFixScroll: true,
  canShowHeaderMobile: true,
  childComponent: 'SuggestionFeedbackCreate',
  childProps: { data },
  modalStyle: {
    container: {},
    ovelay: {},
    content: {
      width: 650,
      paddingLeft: 0,
      paddingRight: 0,
      paddingTop: 0,
      paddingBottom: 0
    }
  }
});

/** Modal size guidie */
export const MODAL_SIZE_GUIDE = (data) => ({
  type: 'MOBILE_ALERT',
  isPushLayer: true,
  isFixScroll: true,
  canShowHeaderMobile: true,
  childComponent: 'SizeGuideModal',
  childProps: { data },
  modalStyle: {
    container: {},
    ovelay: {},
    content: {
      width: 960,
      paddingLeft: 0,
      paddingRight: 0,
      paddingTop: 0,
      paddingBottom: 0
    }
  }
});

/** picture box detail image */
export const MODAL_BOX_DETAIL_PICTURE = (data) => {
  const switchStyle = {
    MOBILE: {
      width: '100%',
      height: '100%',
      padding: 0
    },

    DESKTOP: {
      width: '100vw',
      height: 'calc(100vh - var(--sticky-top-banner-height, 0px))',
      maxWidth: '100vw',
      maxHeight: '100vh',
      paddingLeft: 0,
      paddingRight: 0,
      paddingTop: 0,
      paddingBottom: 0
    }
  };

  return {
    isPushLayer: false,
    isFixScroll: true,
    canShowHeaderMobile: false,
    childComponent: 'BoxDetailPictureModal',
    childProps: { data },
    title: '',
    isShowDesktopTitle: false,
    modalStyle: {
      container: {},
      ovelay: {},
      content: switchStyle[getDeviceVersion()],
      contentOuter: { background: VARIABLE.colorBlack07 }
    }
  };
};

/** Modal Discount Code */
export const MODAL_DISCOUNT_CODE_DETAIL = (data) => ({
  type: 'MOBILE_ALERT',
  isShowDesktopTitle: false,
  isPushLayer: true,
  isFixScroll: true,
  canShowHeaderMobile: true,
  childComponent: 'DiscountCodeDetailModal',
  childProps: { data },
  modalStyle: {
    container: {},
    ovelay: {},
    content: {
      width: 350,
      paddingLeft: 0,
      paddingRight: 0,
      paddingTop: 0,
      paddingBottom: 0
    }
  }
});
