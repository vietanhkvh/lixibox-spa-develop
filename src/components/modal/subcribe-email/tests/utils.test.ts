import { storageKey } from 'constants/application/client-storage';
import { ROUTING_CHECK_OUT_PATH, ROUTING_SHOP_INDEX } from 'routings/path';
import { getIsDisplayable, getIsWelcomeGiftPopupDisplayedToday } from '../utils';

describe(`SubscribeEmail utils fuction`, () => {
  test('getIsWelcomeGiftPopupDisplayedToday, no lastMaximizedAtStr, equals false', () => {
    localStorage.clear();
    expect(getIsWelcomeGiftPopupDisplayedToday()).toEqual(false);
  });
  test('getIsWelcomeGiftPopupDisplayedToday, not be open, equals false', () => {
    const now = new Date();
    const yesterday = new Date().setDate(now.getDate() - 1);
    localStorage.setItem(storageKey.WELCOME_GIFT_LAST_AUTO_MAXIMIZED_AT, new Date(yesterday).toString());

    expect(getIsWelcomeGiftPopupDisplayedToday()).toEqual(false);
  });

  test('getIsWelcomeGiftPopupDisplayedToday, opened, equals true', () => {
    const now = new Date();
    localStorage.setItem(storageKey.WELCOME_GIFT_LAST_AUTO_MAXIMIZED_AT, now.toString());
    expect(getIsWelcomeGiftPopupDisplayedToday()).toEqual(true);
  });

  test('getIsDisplayable is false in desktop', () => {
    expect(getIsDisplayable({ location: { pathname: ROUTING_CHECK_OUT_PATH } })).toEqual(false);
  });

  test('getIsDisplayable is true in mobile', () => {
    const resizeWindow = (width, height) => {
      global.innerWidth = width;
      global.innerHeight = height;
      expect(window.innerWidth).toBe(width);
      expect(window.innerHeight).toBe(height);
    };
    resizeWindow(390, 840);
    expect(getIsDisplayable({ location: { pathname: ROUTING_SHOP_INDEX } })).toEqual(true);
  });
});
