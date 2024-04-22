import { storageKey } from 'constants/application/client-storage';
import { ViewedSourceType } from 'tracking/constants';

export interface CartItemSource {
  boxId: number;
  quantity: number;
  source: ViewedSourceType;
  sourceId: string;
}
export interface CartItemSourceManagerAddParams {
  boxId: number;
  quantity: number;
  source: string;
  sourceId?: string;
}
export interface CartItemSourceManagerRemoveParams {
  boxId: number;
  quantity: number;
}
export const CartItemSourceManager = Object.freeze({
  add: ({ boxId, quantity, source, sourceId }: CartItemSourceManagerAddParams) => {
    const cartItemSources = CartItemSourceManager.get();
    let newCartItemSources = [];
    if (!!cartItemSources.find((item) => item.boxId === boxId)) {
      // increase quantity
      newCartItemSources = cartItemSources.map((item) => {
        if (item.boxId === boxId) {
          item.quantity += quantity;
        }
        return item;
      });
    } else {
      // add new item
      newCartItemSources = [...cartItemSources, { boxId, quantity, source, sourceId: sourceId || '' }];
    }

    CartItemSourceManager._setCartItemSources(newCartItemSources);
  },
  remove: ({ boxId, quantity }: CartItemSourceManagerRemoveParams) => {
    const cartItemSources = CartItemSourceManager.get();
    const newCartItemSources = cartItemSources
      .map((item) => {
        if (item.boxId === boxId) {
          item.quantity -= quantity;
        }
        return item;
      })
      .filter((item) => item.quantity > 0);

    CartItemSourceManager._setCartItemSources(newCartItemSources);
  },
  clear: () => {
    CartItemSourceManager._setCartItemSources([]);
  },
  get: (): CartItemSource[] => {
    const cartItemSourcesRaw = localStorage.getItem(storageKey.CART_ITEM_SOURCES);
    const cartItemSources = cartItemSourcesRaw ? JSON.parse(cartItemSourcesRaw) : [];
    return cartItemSources;
  },
  _setCartItemSources: (cartItemSources: CartItemSource[]) => {
    localStorage.setItem(storageKey.CART_ITEM_SOURCES, JSON.stringify(cartItemSources));
  }
});
