import { PlatformType } from 'constants/api/generic';
import { ProductBox } from '../shop';
import { Ward } from '../address';

export interface OrderAccompanyExternal {
  id: number;
  name?: string;
  type?: string;
}

export interface OrderAccompanyLinkedObject {
  id: number;
  name?: string;
  type?: string;
}

export interface OrderAccompany {
  external?: OrderAccompanyExternal;
  fee?: number;
  id: number;
  linked_object?: OrderAccompanyLinkedObject;
  note?: string;
}

export interface OrderActions {
  cancellable?: boolean;
  change_to_cod?: boolean;
  invoice_editable?: boolean;
  invoice_requestable?: boolean;
  invoice_viewable?: boolean;
}

export interface OrderInvoice {
  email?: string;
  code?: string;
  name?: string;
  address?: string;
  status?: number;
}

export interface OrderBox {
  box?: ProductBox;
  coins?: number;
  created_at?: number;
  discount_price?: number;
  gift_price?: number;
  id?: number;
  is_cancelled?: boolean;
  is_pre_order?: boolean;
  note?: string | null;
  order_id?: number;
  pre_order_release_date?: number | null;
  price?: number;
  purchase_type?: number;
  quantity?: number;
  referrer_id?: number | null;
  status?: string;
  updated_at?: number;
}

export interface OrderShipment {
  external_service_url?: string | null;
  id: number;
  shipping_service?: string;
  status?: string;
  tracking_code?: string;
}

export interface ShippingMethod {
  code?: string;
  description?: string;
  id: number;
  name?: string;
  price?: number;
  time?: {};
}

export interface OrderCashback {
  balance_used?: number;
  bonus?: number;
}

export interface OrderService {
  id: number;
  name: string;
  type?: string;
  description?: string;
  required_note?: boolean;
}

export interface OrderServicePrice {
  price: number;
  service: OrderService;
}

export interface Order {
  accompanies?: Array<OrderAccompany>;
  actions?: OrderActions;
  address?: string;
  balance_used?: number;
  can_change_to_cod?: boolean;
  cancelled_at?: number | null;
  card_processor?: string | null;
  cashback?: OrderCashback;
  created_at?: number;
  discount_code?: string | null;
  discount_price?: number;
  district_id?: number;
  first_name?: string;
  fulfilled_at?: number;
  full_address?: string;
  gift_message?: string;
  gift_price?: number;
  id?: number;
  invoice?: OrderInvoice;
  ip?: string | null;
  is_freeship?: boolean;
  is_gift?: boolean;
  last_name?: string;
  lixicoin_bonus?: number;
  mobile_referral_code?: string | null;
  note?: string;
  number?: string;
  order_boxes?: Array<OrderBox>;
  original_shipping_price?: number;
  paid_at?: number;
  payment_method?: number;
  phone?: string;
  platform?: PlatformType;
  promotions_price?: number;
  province_id?: number;
  referral_code?: string | null;
  services_price?: number;
  service_prices?: Array<OrderServicePrice>;
  shipments?: Array<OrderShipment>;
  shipped_at?: number;
  shipping?: ShippingMethod;
  shipping_package_name?: string;
  shipping_price?: number;
  status?: string;
  subtotal_coins?: number;
  subtotal_price?: number;
  total_coins?: number;
  total_price?: number;
  updated_at?: number;
  user_id?: number;
  ward?: Ward;
  ward_id?: number;
}
