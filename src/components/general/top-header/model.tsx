export interface IProps {
  history?: any;
  signOut?: any;

  authStore?: any;
  cartStore?: any;
  userStore?: any;

  backToAdminAction?: any;
  clearCart?: any;
  fetchUserProfileAction?: any;

  /**
   * Object: refferal reward  schemes
   */
  availableSchemes?: any;
  /**
   * Object: style header for theme sale
   */
  themeHeader?: any;
  /**
   * class name from parent
   */
  classname?: string;
}

export interface IState {
  showCategorySearch: boolean;
  e;
  categorySearchList: Array<any>;
  userInfoListAction: Array<any>;
  showUserInfoListAction: boolean;
  searchKeyWord: string;
}
export interface IFeature {
  /**
   * id
   */
  id: number | string;
  /**
   * name of the feature
   */
  name?: string;
  /**
   * name of icon to display
   */
  icon?: { name: string; style?: any; innerStyle?: any };

  /**
   * src img
   */
  img?: string;

  /**
   * brief of feature
   */
  description: string;
  /**
   * name of feature
   */
  title: string;
  /**
   * url
   */
  url: string;
  /**
   * disable feature url
   */
  disFeaturesUrl?: Array<string>;
  /**
   * style theme for header
   */
  themeHeader?: any;
  /**
   * class names array
   */
  classNames?: {
    /**
     * container
     */
    wrapper?: string;
    /**
     * icon wrapper
     */
    iconWrapper?: string;
    /**
     * icon inner style name
     */
    iconInner?: string;
    /**
     * text container style name
     */
    textContainer?: string;
    /**
     * description style name
     */
    descriptionC?: string;
    /**
     * title style name
     */
    titleC?: string;
  };
  /**
   * brief version
   */
  isBriefVersion?: boolean;
}
export interface IFeatures {
  /**
   * data list to display
   */
  list?: Array<IFeature>;
  /**
   * theme for header
   */
  themeHeader?: any;
  /**
   * user information
   */
  accountInfor?: IAccount;
  /**
   * available schemes
   */
  availableSchemes?: any;
  /**
   * sign out fuction
   */
  signOut: () => void;
}
export interface IAccount {
  userInfo?: any;
  // authStore: any;
  signInStatus?: any;
  history?: any;
}
export interface IUser {
  /**
   * data from api
   */
  accountInfor?: IAccount;
  /**
   * information display
   */
  data?: IFeature;
  /**
   * disableb active array
   */
  disFeaturesUrl?: Array<string>;
  /**
   * available schemes
   */
  availableSchemes?: any;
  /**
   * sign out fuction
   */
  signOut: () => void;
}
