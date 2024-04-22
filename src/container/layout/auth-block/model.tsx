import { StoredSocialAuthIntentType } from 'types/storage';

export interface IProps {
  title?: string;
  description?: string;
  descriptionVisibility?: { mobile: boolean; desktop: boolean };
  secondDescription?: string;
  subContainer?: any;
  mainContainer?: any;
  customMobileTopContainer?: any;
  mobileBottomLink?: any;
  style?: any;
  classes?: { container?: string };
  userReferrerProfile?: any;
  referrer?: string;
  isShowMobileTop: boolean;
  withMobileDescription?: boolean;
  withoutSocialButtons?: boolean;
  socialButtonHint?: string;
  socialAuthIntent?: StoredSocialAuthIntentType;
}
