import { Cart, CartItem, DiscountCode } from '../../types/api/cart';
import { ReferralSchemeValidatedDetailResponse } from '../../types/api/referral';

export interface ReferralSchemes {
  index: Array<ReferralSchemeValidatedDetailResponse>;
  fetching: boolean;
  loaded: boolean;
  errored: boolean;
}

export interface ApplyReferralScheme {
  lastId: { code: string; schemeId: number };
  applying: boolean;
  applied: boolean;
  errored: boolean;
}

export interface ToggleApplyBalanceStatus {
  processing: boolean;
  processed: boolean;
  errored: boolean;
}

export interface ConstantsStateUnboxingReward {
  coins?: number;
  balance?: number;
}
export interface ConstantsStateReferrerReward {
  coins?: number;
  balance?: number;
}

export interface ConstantsState {
  cashback_redeem_percentage?: number;
  phone?: string;
  enabled_sample?: boolean;
  enabled_onepay?: boolean;
  enabled_same_day_shipping?: boolean;
  enabled_user_pickup_shipping_package?: boolean;
  threshold_to_freeship?: number;
  threshold_to_free_gift_packing?: number;
  threshold_to_pick_sample?: number;
  threshold_to_cod?: number;
  marketing_support_shipping_fee?: number;
  cart_limit_min_item?: number;
  cart_limit_max_item?: number;
  facebook_auth_scope?: string;
  gift_message_words_limit?: number;
  delivery_note_words_limit?: number;
  gift_price?: number;
  problem_report_url?: string;
  search_input_placeholder?: string;
  accompany_services_description?: string;
  lixibox_domains?: Array<string>;
  unboxing_enabled?: boolean;
  lixicoin_share_box?: number;
  moengage_tracking_enabled?: boolean;
  referral?: {
    minimum_order_price?: number;
    referrer?: {
      balance?: number;
      coins?: number;
    };
    referred?: {
      gift_message?: string;
    };
  };
  referrer_reward?: ConstantsStateReferrerReward;
  unboxing_reward?: ConstantsStateUnboxingReward;
  box_feedback_lixicoin?: number;
  mobile_referral?: {
    gift_name?: string;
    gift_message?: string;
    reward?: number;
    minimum_order_price?: number;
    notes?: Array<string>;
    applicable_message?: string;
  };
  mobile_referrer?: {
    balance?: number;
    coins?: number;
  };
  bank_account?: {
    bank?: string;
    owner?: string;
    number?: string;
  };
  games?: {
    redeem_coins?: number;
    play_times_per_day_limit?: number;
  };
  social_login_services?: {
    apple?: {
      enabled?: boolean;
      message?: string;
    };
    google?: {
      enabled?: boolean;
      message?: string;
    };
    facebook?: {
      enabled?: boolean;
      message?: string;
    };
  };
  email_verification_popup_open_times?: number;
  email_update_popup_open_times?: number;
  phone_verification_popup_open_times?: number;
  email_verification_popup_open_times_web?: number;
  email_update_popup_open_times_web?: number;
  phone_verification_popup_open_times_web?: number;
  phone_update_popup_open_times_web?: number;
  top_bar_navigation_text?: string;
  referral_program_icon?: string;
  membership_program_icon?: string;
  birthday_program_icon?: string;
  cashback_program_icon?: string;
  freeship_program_icon?: string;
  lixicoin_program_icon?: string;
  discount_code_program_icon?: string;
}

export interface CartDiscountCodes {
  index: Array<DiscountCode> | null;
  fetching: boolean;
  loaded: boolean;
  errored: boolean;
}

export interface CartDiscountCode {
  discountCode: DiscountCode | null;
  lastId: string | null;
  fetching: boolean;
  loaded: boolean;
  errored: boolean;
}

export interface RepresentablePromotion {
  type: 'referral' | 'membership' | 'birthday' | 'discountCode' | 'cashback' | 'freeship' | 'redeemable';
  isReady: boolean;
  isApplied: boolean;
  appliedCount: number;
  isAnyActionAvailable: boolean;
}

interface CartAddToCartState {
  lastCartItemId: number | null;
  lastBoxId: number | null;
  processing: boolean;
  processed: boolean;
  errored: boolean;
}

interface CartRemoveFromCartState {
  lastCartItemId: number | null;
  lastBoxId: number | null;
  processing: boolean;
  processed: boolean;
  errored: boolean;
}

export interface CartState {
  cartDetail: Cart;
  /**
   * @deprecated Use `cartDetail.cart_items` instead
   */
  cartList: Array<CartItem>;
  constants: ConstantsState;
  referralSchemes: ReferralSchemes;
  applyReferralScheme: ApplyReferralScheme;
  toggleApplyBalanceStatus: ToggleApplyBalanceStatus;

  cartDiscountCodes: CartDiscountCodes;
  cartDiscountCode: CartDiscountCode;
  representablePromotions: RepresentablePromotion[];
  authModalState: {
    isAuthModalOpen: boolean;
    authModalInitialView: string;
  };
  promotionsViewCountSinceCheckoutMounted: number;
  addToCart: CartAddToCartState;
  removeFromCart: CartRemoveFromCartState;

  isCartSummaryVisible: boolean;
  isFetchingConfig: boolean;
  isGetConstantSuccess: boolean;
  isGetCartListSuccess: boolean;
  isAddCartLoading: boolean;
  isRemoveCartLoading: boolean;

  [key: string]: any; // TODO: Remove, and replace with exhaustive state typing
}
