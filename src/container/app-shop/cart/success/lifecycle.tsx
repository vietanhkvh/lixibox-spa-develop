import { reportException } from '../../../../tracking/sentry';
import { trackingFacebookPixel } from '../../../../tracking/facebook-pixel';
import { trackingTiktokPixel } from '../../../../tracking/tiktok-pixel';
import { formatPhoneNumberWithCountryPrefix } from '../../../../utils/format';

import { auth } from '../../../../utils/auth';
import { ROUTING_SHOP_INDEX } from '../../../../routings/path';
import { PAYMENT_METHOD_TYPE } from '../../../../constants/application/payment';
import { storageKey } from '../../../../constants/application/client-storage';
import { gatewayTrackPurchased } from 'tracking/gateway';

export function componentDidMount() {
  try {
    const {
      cartStore: { orderInfo, guestUser },
      fetchOrderBoxCategoryAction,
      history
    } = this.props;

    auth.loggedIn() || history.push(ROUTING_SHOP_INDEX);

    const autoReloadPaymentOneTime = localStorage.getItem(storageKey.AUTO_RELOAD_PAYMENT_ONE_TIME);
    if (!!orderInfo && 6 === orderInfo.payment_method && '1' === autoReloadPaymentOneTime) {
      localStorage.removeItem(storageKey.AUTO_RELOAD_PAYMENT_ONE_TIME);
      this.handleGetMomoPaymentAddressUrl();
    }

    if (
      !!orderInfo &&
      (3 === orderInfo.payment_method || 4 === orderInfo.payment_method) &&
      '1' === autoReloadPaymentOneTime
    ) {
      localStorage.removeItem(storageKey.AUTO_RELOAD_PAYMENT_ONE_TIME);
      this.handleGetOnepayPaymentAddressUrl();
    }

    let quantityTotal = 0;
    !!orderInfo &&
      Array.isArray(orderInfo.order_boxes) &&
      orderInfo.order_boxes.forEach((item) => {
        quantityTotal += item.quantity;
      });

    if (!!orderInfo && Array.isArray(orderInfo.order_boxes)) {
      // FIXME: Temporary solution implemented as a intra-team decision, due to shortage of time. Must replace once `category` data becomes available with `box` object
      orderInfo.order_boxes.forEach((orderBoxes) =>
        fetchOrderBoxCategoryAction((orderBoxes.box && orderBoxes.box.slug) || '')
      );

      trackingFacebookPixel('Purchase', {
        num_items: quantityTotal,
        value: orderInfo.total_price,
        currency: 'VND',
        content_name: orderInfo.order_boxes.map((item) => item.box.name).join(', '),
        content_type: 'product',
        contents: orderInfo.order_boxes.map((item) => ({
          id: item.box.id,
          quantity: item.quantity
        })),
        content_ids: orderInfo.order_boxes.map((item) => item.box.id)
      });

      trackingTiktokPixel(
        guestUser && guestUser.id,
        {
          email: guestUser ? guestUser.email : '',
          phone_number: formatPhoneNumberWithCountryPrefix(orderInfo.phone)
        },
        'identify'
      );

      trackingTiktokPixel('Purchase', {
        content_type: 'product_group',
        contents:
          orderInfo.order_boxes.map((item) => ({
            content_type: 'product',
            content_id: item.box.id,
            quantity: item.quantity,
            price: item.price
          })) || [],
        value: orderInfo.total_price,
        currency: 'VND'
      });

      var enhanced_conversion_email = guestUser ? guestUser.email : '';
      var enhanced_conversion_phone = formatPhoneNumberWithCountryPrefix(orderInfo.phone);
      console.log('enhanced conversion log', {
        enhanced_conversion_email,
        enhanced_conversion_phone
      });
    }
  } catch (e) {
    reportException(e, { info: 'Container: Checkout / Success | Lifecycle | componentDidMount |' });
  }
}

export function UNSAFE_componentWillReceiveProps(nextProps) {
  try {
    const {
      authStore: { profile },
      userStore: { isUpdateGuestPassword },
      cartStore: {
        orderInfo,
        momoPaymentAddreessUrl,
        isFetchingMomoPaymentAddreessUrl,
        onepayPaymentAddreessUrl,
        isFetchingOnepayPaymentAddreessUrl,
        orderBoxCategories
      }
    } = this.props;

    /** Update after change password */
    const isChangePasswordDone = !isUpdateGuestPassword && nextProps.userStore.isUpdateGuestPassword;
    isChangePasswordDone && this.setState({ submitLoading: false });

    /** Update after get momo address url */
    const isGetMomoPaymentAddreessUrlDone =
      !!isFetchingMomoPaymentAddreessUrl &&
      !nextProps.cartStore.isFetchingMomoPaymentAddreessUrl &&
      '' === momoPaymentAddreessUrl &&
      !!nextProps.cartStore.momoPaymentAddreessUrl.length;

    if (!!isGetMomoPaymentAddreessUrlDone) {
      window.location.href = nextProps.cartStore.momoPaymentAddreessUrl;
    }

    /** Update after get onepay address url */
    const isGetOnepayPaymentAddreessUrlDone =
      !!isFetchingOnepayPaymentAddreessUrl &&
      !nextProps.cartStore.isFetchingOnepayPaymentAddreessUrl &&
      '' === onepayPaymentAddreessUrl &&
      !!nextProps.cartStore.onepayPaymentAddreessUrl.length;

    if (!!isGetOnepayPaymentAddreessUrlDone) {
      window.location.href = nextProps.cartStore.onepayPaymentAddreessUrl;
    }

    if (
      !!orderInfo &&
      Array.isArray(orderInfo.order_boxes) &&
      !!nextProps.cartStore.orderInfo &&
      Array.isArray(nextProps.cartStore.orderInfo.order_boxes) &&
      orderBoxCategories &&
      nextProps.cartStore.orderBoxCategories &&
      !!orderInfo.order_boxes.find(
        ({ box }) => box && box.slug && orderBoxCategories[box.slug] && orderBoxCategories[box.slug].fetching
      ) &&
      !orderInfo.order_boxes.find(
        ({ box }) =>
          box &&
          box.slug &&
          nextProps.cartStore.orderBoxCategories[box.slug] &&
          nextProps.cartStore.orderBoxCategories[box.slug].fetching
      ) &&
      orderInfo.order_boxes.every(
        ({ box }) =>
          box &&
          box.slug &&
          nextProps.cartStore.orderBoxCategories[box.slug] &&
          nextProps.cartStore.orderBoxCategories[box.slug].loaded
      )
    ) {
      const order: any = nextProps.cartStore.orderInfo;

      // GA4 - GTAG
      'function' === typeof window.gtag &&
        window.gtag('event', 'purchase', {
          transaction_id: order.number, //transaction ID - mandatory
          value: order.total_price, //total including tax and shipping
          tax: 0,
          shipping: order.shipping_price || 0,
          currency: 'VND',
          coupon: order.discount_code || '', //if a coupon code was used for this order,
          items: Array.isArray(order.order_boxes)
            ? order.order_boxes.map((item, idx) => ({
                item_id: item?.box?.id || '',
                item_name: item?.box?.name || '',
                affiliation: '',
                coupon: '',
                discount: item?.box?.original_price - item?.box?.price,
                index: idx + 1,
                item_brand: item?.box?.brand_name || '',
                item_category: '',
                item_category2: '',
                item_category3: '',
                item_category4: '',
                item_category5: '',
                item_list_id: '',
                item_list_name: '',
                item_variant: '',
                location_id: '',
                price: item.price,
                quantity: item.quantity
              }))
            : []
        });

      // FIXME: Use saga to dispatch side effect in order to prevent unexpected double event triggers on page reload,
      // and to reliably dispatch side effects before invoking interrupts like off site redirect
      switch (order.payment_method) {
        case PAYMENT_METHOD_TYPE.MOMO.id:
          localStorage.setItem(storageKey.MOE_PURCHASE_BY_MOMO_TRACKING_PENDING, String(true));
          break;
        case PAYMENT_METHOD_TYPE.ATM.id:
        case PAYMENT_METHOD_TYPE.ONEPAY.id:
          break;
        default:
          gatewayTrackPurchased({ order, user: profile });
          break;
      }
    }
  } catch (e) {
    reportException(e, { info: 'Container: Checkout / Success | Lifecycle | UNSAFE_componentWillReceiveProps |' });
  }
}

export function componentWillUnmount() {
  try {
    const { clearDeliveryConfigAction } = this.props;
    // Clear delivery config
    clearDeliveryConfigAction();
  } catch (e) {
    reportException(e, { info: 'Container: Checkout / Success | Lifecycle | componentWillUnmount |' });
  }
}
