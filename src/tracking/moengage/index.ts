import { generatePath } from 'react-router-dom';
import { MEMBERSHIP_LEVEL_TYPE } from '../../constants/application/membership_level';
import { GENDER_TYPE } from '../../constants/application/gender';
import { isFakeFacebookEmail } from 'utils/validate';
import { ROUTING_PRODUCT_DETAIL } from 'routings/path';
import { MoEAttributes, MoEEvents } from './constant';
import { ProductBox } from 'types/api/shop';

export const moengageUpdateUserInfo = (user, isSignup = false) => {
  try {
    if (window.Moengage && user) {
      const birthday = new Date(user.birthday * 1000);
      // TODO: Config enum
      const gender =
        user.gender === GENDER_TYPE.FEMALE.id ? 'female' : user.gender === GENDER_TYPE.MALE.id ? 'male' : 'other';
      const membershipLevelId = Number.isInteger(user.membership_level) ? user.membership_level : 0;
      const membershipLevel = MEMBERSHIP_LEVEL_TYPE[membershipLevelId]
        ? MEMBERSHIP_LEVEL_TYPE[membershipLevelId].id
        : MEMBERSHIP_LEVEL_TYPE[0].id;

      window.Moengage.add_first_name(user.first_name);
      window.Moengage.add_last_name(user.last_name);
      window.Moengage.add_user_name(user.name);
      window.Moengage.add_gender(gender);
      window.Moengage.add_birthday(birthday);
      window.Moengage.add_user_attribute(MoEAttributes.MEMBER, membershipLevel);
      window.Moengage.add_user_attribute(MoEAttributes.LIXICOIN, user.coins || 0);

      if (isSignup) {
        user.email && !isFakeFacebookEmail(user.email) && window.Moengage.add_email(user.email);
        user.phone && window.Moengage.add_mobile(user.phone);
      }
    }
  } catch (e) {}
};

interface MoengageUpdateProfileParams {
  firstName?: string;
  lastName?: string;
  birthday?: string;
  gender?: number;
}
export const moengageUpdateProfile = ({ firstName, lastName, birthday, gender }: MoengageUpdateProfileParams) => {
  try {
    if (window.Moengage) {
      firstName && window.Moengage.add_first_name(firstName);
      lastName && window.Moengage.add_last_name(lastName);
      if (gender) {
        // TODO: Config enum
        const _gender = gender === GENDER_TYPE.FEMALE.id ? 'female' : gender === GENDER_TYPE.MALE.id ? 'male' : 'other';
        window.Moengage.add_gender(_gender);
      }
      birthday && window.Moengage.add_birthday(new Date(birthday));
    }
  } catch (e) {}
};

export const moengageTrackSignin = (user, method = '') => {
  try {
    if (window.Moengage && user) {
      const uuid = user.uuid || '';
      moengageUpdateUserInfo(user);

      const properties = {
        [MoEAttributes.USER_ID]: uuid,
        [MoEAttributes.METHOD]: method
      };
      window.Moengage.track_event(MoEEvents.LOGIN, properties);
      window.Moengage.update_unique_user_id(uuid);
    }
  } catch (e) {}
};

export const moengageTrackSignup = (user, method = '') => {
  try {
    if (window.Moengage && user) {
      window.Moengage.add_unique_user_id(user.uuid || '');
      moengageUpdateUserInfo(user, true);

      const properties = {
        [MoEAttributes.USER_ID]: user.uuid || '',
        [MoEAttributes.METHOD]: method
      };
      window.Moengage.track_event(MoEEvents.SIGN_UP, properties);
    }
  } catch (e) {}
};

export const moengageTrackSignout = (user) => {
  try {
    if (window.Moengage) {
      if (user) {
        const properties = {
          [MoEAttributes.USER_ID]: user.uuid || ''
        };
        window.Moengage.track_event(MoEEvents.LOGOUT, properties);
      }
      window.Moengage.destroy_session();
    }
  } catch (e) {}
};

export const moengageTrackViewContent = ({ lixiboxId, id, name, image, price, category, contentType, currency }) => {
  try {
    if (window.Moengage && id) {
      const productUrl = name
        ? `${process.env.REACT_APP_FQDN}${generatePath(ROUTING_PRODUCT_DETAIL, { idProduct: name })}`
        : '';

      const properties = {
        [MoEAttributes.CURRENCY]: currency,
        [MoEAttributes.CONTENT_TYPE]: contentType,
        [MoEAttributes.CONTENT_NAME]: name,
        [MoEAttributes.CONTENT_ID]: lixiboxId,
        [MoEAttributes.PRODUCT_URL]: productUrl,
        [MoEAttributes.PRODUCT_IMAGE_URL]: image,
        [MoEAttributes.PRICE]: price,
        [MoEAttributes.PRODUCT_CATEGORY]: category
      };

      window.Moengage.track_event(MoEEvents.VIEW_CONTENT, properties);
    }
  } catch (e) {}
};

interface MoengageTrackViewContentListParams {
  id: number | string;
  name: string;
  type: 'category' | 'brand' | 'theme' | 'discount_code';
}
export const moengageTrackViewContentList = ({ id, name, type }: MoengageTrackViewContentListParams) => {
  try {
    window.Moengage &&
      window.Moengage.track_event(MoEEvents.VIEW_CONTENT_LIST, {
        [MoEAttributes.CONTENT_ID]: String(id),
        [MoEAttributes.CONTENT_TYPE]: type || '',
        [MoEAttributes.CONTENT_NAME]: name || ''
      });
  } catch (e) {}
};

interface MoengageTrackViewMagazineParams {
  magazine: any;
}
export const moengageTrackViewMagazine = ({ magazine }: MoengageTrackViewMagazineParams) => {
  try {
    if (window.Moengage && magazine) {
      const properties = {
        [MoEAttributes.CONTENT_TYPE]: 'magazine',
        [MoEAttributes.CONTENT_NAME]: magazine.title || '',
        [MoEAttributes.CONTENT_ID]: magazine.slug || '',
        [MoEAttributes.MAGAZINE_CATEGORY]: magazine.category?.slug || '',
        [MoEAttributes.PRODUCT_CATEGORY]: (magazine.category && magazine.category.slug) || ''
      };
      window.Moengage.track_event(MoEEvents.VIEW_MAGAZINE, properties);
    }
  } catch (e) {}
};

interface MoengageTrackCompleteMagazineParams {
  magazine: any;
  scrollPercentage: number;
}
export const moengageTrackCompleteMagazine = ({ magazine, scrollPercentage }: MoengageTrackCompleteMagazineParams) => {
  try {
    if (window.Moengage && magazine) {
      const properties = {
        [MoEAttributes.CONTENT_TYPE]: 'magazine',
        [MoEAttributes.CONTENT_NAME]: magazine.title || '',
        [MoEAttributes.CONTENT_ID]: magazine.slug || '',
        [MoEAttributes.PRODUCT_CATEGORY]: (magazine.category && magazine.category.slug) || '',
        [MoEAttributes.SCROLL_PERCENTAGE]: scrollPercentage
      };
      window.Moengage.track_event(MoEEvents.COMPLETE_MAGAZINE, properties);
    }
  } catch (e) {}
};

interface MoengageTrackAddToCartParams {
  box: any;
  quantity: number;
}
export const moengageTrackAddToCart = ({ box, quantity }: MoengageTrackAddToCartParams) => {
  try {
    if (window.Moengage && box) {
      const productUrl = box.slug
        ? `${process.env.REACT_APP_FQDN}${generatePath(ROUTING_PRODUCT_DETAIL, { idProduct: box.slug })}`
        : '';
      window.Moengage.track_event(MoEEvents.ADD_TO_CART, {
        [MoEAttributes.CONTENT_ID]: box.lixibox_id || '',
        [MoEAttributes.CONTENT_NAME]: box.name || '',
        [MoEAttributes.PRODUCT_CATEGORY]: box.tracking?.category_key || '',
        [MoEAttributes.PRODUCT_URL]: productUrl,
        [MoEAttributes.PRODUCT_IMAGE_URL]: box.primary_picture?.original_url || '',
        [MoEAttributes.CURRENCY]: 'VND',
        [MoEAttributes.PRICE]: box.price || 0,
        [MoEAttributes.QUANTITY]: quantity
      });
    }
  } catch (e) {}
};

interface MoengageTrackRemoveFromCartParams {
  box: any;
  quantity: number;
}
export const moengageTrackRemoveFromCart = ({ box, quantity }: MoengageTrackRemoveFromCartParams) => {
  try {
    window.Moengage &&
      box &&
      window.Moengage.track_event(MoEEvents.REMOVE_FROM_CART, {
        [MoEAttributes.CONTENT_ID]: box.lixibox_id || '',
        [MoEAttributes.CONTENT_NAME]: box.name || '',
        [MoEAttributes.CURRENCY]: 'VND',
        [MoEAttributes.PRICE]: box.price || 0,
        [MoEAttributes.QUANTITY]: quantity
      });
  } catch (e) {}
};

interface MoengageTrackViewCartParams {
  cartDetail: any;
}
export const moengageTrackViewCart = ({ cartDetail }: MoengageTrackViewCartParams) => {
  try {
    if (window.Moengage && cartDetail && Array.isArray(cartDetail.cart_items)) {
      cartDetail.cart_items.forEach(({ box, price, quantity }) => {
        const properties = {
          [MoEAttributes.CONTENT_ID]: box.lixibox_id || '',
          [MoEAttributes.CONTENT_NAME]: box.name || '',
          [MoEAttributes.CURRENCY]: 'VND',
          [MoEAttributes.PRICE]: price || 0,
          [MoEAttributes.QUANTITY]: quantity || 1,

          [MoEAttributes.TOTAL_PRICE]: cartDetail.total_price || 0
        };

        window.Moengage.track_event(MoEEvents.VIEW_CART, properties);
      });
    }
  } catch (e) {}
};

interface MoengageTrackBeginCheckoutParams {
  cartDetail: any;
}
export const moengageTrackBeginCheckout = ({ cartDetail }: MoengageTrackBeginCheckoutParams) => {
  try {
    if (window.Moengage && cartDetail && Array.isArray(cartDetail.cart_items)) {
      cartDetail.cart_items.forEach(({ box, price, quantity }) => {
        const properties = {
          [MoEAttributes.CONTENT_ID]: box.lixibox_id || '',
          [MoEAttributes.CONTENT_NAME]: box.name || '',
          [MoEAttributes.CURRENCY]: 'VND',
          [MoEAttributes.PRICE]: price || 0,
          [MoEAttributes.QUANTITY]: quantity || 1,

          [MoEAttributes.TOTAL_PRICE]: cartDetail.total_price || 0,
          [MoEAttributes.COUPON]: cartDetail.discount_code || ''
        };

        window.Moengage.track_event(MoEEvents.BEGIN_CHECKOUT, properties);
      });
    }
  } catch (e) {}
};

interface MoengageTrackCancelOrderParams {
  order: any;
}
export const moengageTrackCancelOrder = ({ order }: MoengageTrackCancelOrderParams) => {
  try {
    if (window.Moengage && order && Array.isArray(order.order_boxes)) {
      order.order_boxes.forEach(({ box, price, quantity }) => {
        const properties = {
          [MoEAttributes.CURRENCY]: 'VND',
          [MoEAttributes.CONTENT_NAME]: box.name || '',
          [MoEAttributes.CONTENT_ID]: box.lixibox_id || '',
          [MoEAttributes.PRICE]: price || 0,
          [MoEAttributes.QUANTITY]: quantity || 1,

          [MoEAttributes.TOTAL_PRICE]: order.total_price || 0,
          [MoEAttributes.SHIPPING]: order.shipping_price || 0,
          [MoEAttributes.COUPON]: order.discount_code || ''
        };

        window.Moengage.track_event(MoEEvents.CANCEL_ORDER, properties);
      });
    }
  } catch (e) {}
};

interface MoengageTrackSearchParams {
  searchTerm: string;
}
export const moengageTrackSearch = ({ searchTerm }: MoengageTrackSearchParams) => {
  try {
    window.Moengage &&
      searchTerm &&
      window.Moengage.track_event(MoEEvents.SEARCH, {
        [MoEAttributes.SEARCH_TERM]: searchTerm
      });
  } catch (e) {}
};

interface MoengageTrackRateProductParams {
  box: ProductBox;
  rating: number;
}
export const moengageTrackRateProduct = ({ box, rating }: MoengageTrackRateProductParams) => {
  try {
    if (window.Moengage && box) {
      const properties = {
        [MoEAttributes.CONTENT_ID]: box.lixibox_id || '',
        [MoEAttributes.CONTENT_NAME]: box.name || '',
        [MoEAttributes.RATING_VALUE]: rating || 0
      };

      window.Moengage.track_event(MoEEvents.RATE_PRODUCT, properties);
    }
  } catch (e) {}
};

interface MoengageTrackPurchaseParams {
  order: any;
}
export const moengageTrackPurchase = ({ order }: MoengageTrackPurchaseParams) => {
  try {
    if (window.Moengage && order && Array.isArray(order.order_boxes)) {
      order.order_boxes.forEach(({ box, price, quantity }) => {
        const productUrl = box.slug
          ? `${process.env.REACT_APP_FQDN}${generatePath(ROUTING_PRODUCT_DETAIL, { idProduct: box.slug })}`
          : '';
        const properties = {
          [MoEAttributes.CURRENCY]: 'VND',
          [MoEAttributes.CONTENT_NAME]: box.name || '',
          [MoEAttributes.CONTENT_ID]: box.lixibox_id || '',
          [MoEAttributes.PRODUCT_URL]: productUrl,
          [MoEAttributes.PRODUCT_IMAGE_URL]: box.primary_picture?.original_url || '',
          [MoEAttributes.PRICE]: price || 0,
          [MoEAttributes.QUANTITY]: quantity || 1,

          [MoEAttributes.TOTAL_PRICE]: order.total_price || 0,
          [MoEAttributes.SHIPPING]: order.shipping_price || 0,
          [MoEAttributes.COUPON]: order.discount_code || ''
        };

        window.Moengage.track_event(MoEEvents.PURCHASE, properties);
      });
    }
  } catch (e) {}
};

interface MoengageTrackAddToWishlistParams {
  box: any;
}
export const moengageTrackAddToWishlist = ({ box }: MoengageTrackAddToWishlistParams) => {
  try {
    if (window.Moengage && box) {
      const properties = {
        [MoEAttributes.CURRENCY]: 'VND',
        [MoEAttributes.CONTENT_ID]: box.lixibox_id || '',
        [MoEAttributes.CONTENT_NAME]: box.name || '',
        [MoEAttributes.PRICE]: box.price || 0,
        [MoEAttributes.QUANTITY]: 1
      };
      window.Moengage.track_event(MoEEvents.ADD_TO_WAIT_LIST, properties);
    }
  } catch (e) {}
};

interface MoengageTrackRemoveFromWishlistParams {
  box: any;
}
export const moengageTrackRemoveFromWishlist = ({ box }: MoengageTrackRemoveFromWishlistParams) => {
  try {
    if (window.Moengage && box) {
      const properties = {
        [MoEAttributes.CURRENCY]: 'VND',
        [MoEAttributes.CONTENT_ID]: box.lixibox_id || '',
        [MoEAttributes.CONTENT_NAME]: box.name || '',
        [MoEAttributes.PRICE]: box.price || 0,
        [MoEAttributes.QUANTITY]: 1
      };
      window.Moengage.track_event(MoEEvents.REMOVE_FROM_WISHLIST, properties);
    }
  } catch (e) {}
};

interface MoengageTrackAddToWaitlistParams {
  box: any;
}
export const moengageTrackAddToWaitlist = ({ box }: MoengageTrackAddToWaitlistParams) => {
  try {
    if (window.Moengage && box) {
      const properties = {
        [MoEAttributes.CURRENCY]: 'VND',
        [MoEAttributes.CONTENT_ID]: box.lixibox_id || '',
        [MoEAttributes.CONTENT_NAME]: box.name || '',
        [MoEAttributes.PRICE]: box.price || 0,
        [MoEAttributes.QUANTITY]: 1
      };
      window.Moengage.track_event(MoEEvents.ADD_TO_WAIT_LIST, properties);
    }
  } catch (e) {}
};

interface MoengageTrackRemoveFromWaitlistParams {
  box: any;
}
export const moengageTrackRemoveFromWaitlist = ({ box }: MoengageTrackRemoveFromWaitlistParams) => {
  try {
    if (window.Moengage && box) {
      const properties = {
        [MoEAttributes.CURRENCY]: 'VND',
        [MoEAttributes.CONTENT_ID]: box.lixibox_id || '',
        [MoEAttributes.CONTENT_NAME]: box.name || '',
        [MoEAttributes.PRICE]: box.price || 0,
        [MoEAttributes.QUANTITY]: 1
      };
      window.Moengage.track_event(MoEEvents.REMOVE_FROM_WAIT_LIST, properties);
    }
  } catch (e) {}
};

interface MoengageTrackShareParams {
  id: string | number;
  type: 'product' | 'magazine';
  name: string;
  provider?: string;
}
export const moengageTrackShare = ({ id, type, name, provider }: MoengageTrackShareParams) => {
  try {
    if (window.Moengage) {
      const properties = {
        [MoEAttributes.PROVIDER]: provider || '',
        [MoEAttributes.CONTENT_ID]: String(id),
        [MoEAttributes.CONTENT_NAME]: name || '',
        [MoEAttributes.CONTENT_TYPE]: type || ''
      };
      window.Moengage.track_event(MoEEvents.SHARE, properties);
    }
  } catch (e) {}
};
