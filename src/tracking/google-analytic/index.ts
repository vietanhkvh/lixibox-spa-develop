import { Currency } from 'tracking/constants';

interface GATrackAddToCartParams {
  box: any;
  quantity: number;
}
export const gaTrackAddToCart = ({ box, quantity }: GATrackAddToCartParams) => {
  try {
    if (window.gtag && box) {
      const price = box?.price || 0;

      window.gtag('event', 'add_to_cart', {
        currency: Currency.DEFAULT,
        value: price,
        items: [
          {
            item_id: box?.lixibox_id || '',
            item_name: box?.slug || '',
            affiliation: '',
            coupon: '',
            discount: 0,
            index: 0,
            item_brand: '',
            item_category: box?.tracking?.category_key || '',
            item_category2: '',
            item_category3: '',
            item_category4: '',
            item_category5: '',
            item_list_id: '',
            item_list_name: '',
            item_variant: '',
            location_id: '',
            price: price,
            quantity: quantity || 1
          }
        ]
      });
    }
  } catch (e) {}
};
