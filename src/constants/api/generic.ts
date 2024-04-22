import { MEMBERSHIP_LEVEL_TYPE } from 'constants/application/membership_level';

export const Currency = Object.freeze({
  VND: 'vnd'
});
export type CurrencyType = (typeof Currency)[keyof typeof Currency];
export type MembershipLevelTypeType = keyof typeof MEMBERSHIP_LEVEL_TYPE;

export const Platform = Object.freeze({
  WEB: 'web',
  IOS: 'ios',
  ANDROID: 'android'
});
export type PlatformType = (typeof Platform)[keyof typeof Platform];
