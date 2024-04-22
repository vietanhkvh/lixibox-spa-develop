import { StoredSocialAuthIntent } from 'constants/application/storage';

export type StoredSigninCredentialsToVerify = {
  phone: string;
  password: string;
  email?: string;
  providerToken?: string;
  provider?: 'facebook' | 'google' | 'apple';
  redirectUri?: string;
  modalOrigin?: string;
} | null;

export type StoredSocialAuthIntentType = (typeof StoredSocialAuthIntent)[keyof typeof StoredSocialAuthIntent] | null;
