export const AuthMethod = Object.freeze({
  EMAIL: 'email',
  PHONE: 'phone',
  FACEBOOK: 'facebook',
  GOOGLE: 'google',
  APPLE: 'apple'
});
export type AuthMethodType = (typeof AuthMethod)[keyof typeof AuthMethod];
