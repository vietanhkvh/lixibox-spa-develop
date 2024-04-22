import { ViewedSource } from 'tracking/constants';
import {
  CartItemSourceManager,
  CartItemSource,
  CartItemSourceManagerAddParams,
  CartItemSourceManagerRemoveParams
} from 'utils/tracking/cart-item-source-manager';

describe('CartItemSourceManager', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('add', () => {
    it('should add a new item to the cart if it does not exist', () => {
      const params: CartItemSourceManagerAddParams = { boxId: 1, quantity: 2, source: ViewedSource.PRODUCT_BOXES };
      CartItemSourceManager.add(params);
      const expected: CartItemSource[] = [{ boxId: 1, quantity: 2, source: ViewedSource.PRODUCT_BOXES, sourceId: '' }];
      const result = CartItemSourceManager.get();
      expect(result).toEqual(expected);
    });

    it('should increase the quantity of an existing item in the cart', () => {
      const params1: CartItemSourceManagerAddParams = { boxId: 1, quantity: 2, source: ViewedSource.PRODUCT_BOXES };
      const params2: CartItemSourceManagerAddParams = { boxId: 1, quantity: 3, source: ViewedSource.PRODUCT_BOXES };
      CartItemSourceManager.add(params1);
      CartItemSourceManager.add(params2);
      const expected: CartItemSource[] = [{ boxId: 1, quantity: 5, source: ViewedSource.PRODUCT_BOXES, sourceId: '' }];
      const result = CartItemSourceManager.get();
      expect(result).toEqual(expected);
    });
  });

  describe('remove', () => {
    it('should remove an item from the cart if the quantity is reduced to 0', () => {
      const params1: CartItemSourceManagerAddParams = { boxId: 1, quantity: 2, source: ViewedSource.PRODUCT_BOXES };
      const params2: CartItemSourceManagerRemoveParams = { boxId: 1, quantity: 2 };
      CartItemSourceManager.add(params1);
      CartItemSourceManager.remove(params2);
      const expected: CartItemSource[] = [];
      const result = CartItemSourceManager.get();
      expect(result).toEqual(expected);
    });

    it('should reduce the quantity of an existing item in the cart', () => {
      const params1: CartItemSourceManagerAddParams = { boxId: 1, quantity: 5, source: ViewedSource.PRODUCT_BOXES };
      const params2: CartItemSourceManagerRemoveParams = { boxId: 1, quantity: 2 };
      CartItemSourceManager.add(params1);
      CartItemSourceManager.remove(params2);
      const expected: CartItemSource[] = [{ boxId: 1, quantity: 3, source: ViewedSource.PRODUCT_BOXES, sourceId: '' }];
      const result = CartItemSourceManager.get();
      expect(result).toEqual(expected);
    });

    it('should not remove an item from the cart if the quantity is greater than 0', () => {
      const params1: CartItemSourceManagerAddParams = { boxId: 1, quantity: 2, source: ViewedSource.PRODUCT_BOXES };
      const params2: CartItemSourceManagerRemoveParams = { boxId: 1, quantity: 1 };
      CartItemSourceManager.add(params1);
      CartItemSourceManager.remove(params2);
      const expected: CartItemSource[] = [{ boxId: 1, quantity: 1, source: ViewedSource.PRODUCT_BOXES, sourceId: '' }];
      const result = CartItemSourceManager.get();
      expect(result).toEqual(expected);
    });
  });

  describe('get', () => {
    it('should return an empty array if there are no items in the cart', () => {
      const expected: CartItemSource[] = [];
      const result = CartItemSourceManager.get();
      expect(result).toEqual(expected);
    });

    it('should return the items in the cart', () => {
      const params1: CartItemSourceManagerAddParams = { boxId: 1, quantity: 2, source: ViewedSource.PRODUCT_BOXES };
      const params2: CartItemSourceManagerAddParams = { boxId: 2, quantity: 3, source: ViewedSource.WISHLIST };
      CartItemSourceManager.add(params1);
      CartItemSourceManager.add(params2);
      const expected: CartItemSource[] = [
        { boxId: 1, quantity: 2, source: ViewedSource.PRODUCT_BOXES, sourceId: '' },
        { boxId: 2, quantity: 3, source: ViewedSource.WISHLIST, sourceId: '' }
      ];
      const result = CartItemSourceManager.get();
      expect(result).toEqual(expected);
    });
  });

  describe('_setCartItemSources', () => {
    it('should set the items in the cart', () => {
      const cartItemSources: CartItemSource[] = [
        { boxId: 1, quantity: 2, source: ViewedSource.PRODUCT_BOXES, sourceId: '' },
        { boxId: 2, quantity: 3, source: ViewedSource.WISHLIST, sourceId: '' }
      ];
      CartItemSourceManager._setCartItemSources(cartItemSources);
      const expected: CartItemSource[] = cartItemSources;
      const result = CartItemSourceManager.get();
      expect(result).toEqual(expected);
    });
  });
});
