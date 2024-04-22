import { Suspense, lazy } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import LazyLoading from '../../components/ui/lazy-loading';
import { REDEEM_CATEGORY } from '../../container/app-shop/lixicoin/redeem-category';
import { HALIO_REDIRECT_LIST, AuthenticatorRoute } from './router-utils';
import * as ROUTINGS from '../path';
import { AuthenticatedRoute } from './router-utils';

const ShopIndexContainer = lazy(() => import('../../container/app-shop/index/index'));

/** Magazine */
const MagazineIndexContainer = lazy(() => import('../../container/app-shop/magazine/index'));
const MagazineSearchContainer = lazy(() => import('../../container/app-shop/magazine/search'));
const MagazineCategoryContainer = lazy(() => import('../../container/app-shop/magazine/category'));
const MagazineDetailContainer = lazy(() => import('../../container/app-shop/magazine/detail'));

/** Lixicoin, balance and membership */
const LixicoinDashboardContainer = lazy(() => import('../../container/app-shop/lixicoin-dashboard'));
const LixiCoinFaqContainer = lazy(() => import('../../container/app-shop/lixicoin/faq'));
const BalancesDashboardContainer = lazy(() => import('../../container/app-shop/balances-dashboard'));
const BalancesFaqContainer = lazy(() => import('../../container/app-shop/balances-faq'));
const MembershipDashboardContainer = lazy(() => import('../../container/app-shop/membership-dashboard'));

/** SEARCH */
const SearchContainer = lazy(() => import('../../container/app-shop/search/detail'));

/** PRODUCT */
const ProductCategoryContainer = lazy(() => import('../../container/app-shop/product/category'));
const ProductMobileCategory = lazy(() => import('../../container/app-shop/product/mobile-category'));
const ProductDetailContainer = lazy(() => import('../../container/app-shop/product/detail'));

/** AUTH */
const CheckoutFastTrackContainer = lazy(() => import('../../container/auth/checkout-fast-track'));
const SignInContainer = lazy(() => import('../../container/auth/sign-in'));
const SignUpContainer = lazy(() => import('../../container/auth/sign-up'));
const ForgotPasswordContainer = lazy(() => import('../../container/auth/forgot-password'));
const SignupVerifyPhoneContainer = lazy(() => import('../../container/auth/signup-verify-phone'));
const SignupWithRegisteredPhonePromptContainer = lazy(
  () => import('container/auth/signup-with-registered-phone-prompt')
);
const SigninWithUnconfirmedPhonePromptContainer = lazy(
  () => import('container/auth/signin-with-unconfirmed-phone-prompt')
);
const SigninAttachPhoneStep1Container = lazy(() => import('container/auth/signin-attach-phone-step-1'));
const SigninAttachPhoneStep2Container = lazy(() => import('container/auth/signin-attach-phone-step-2'));
const ConnectFacebookContainer = lazy(() => import('../../container/auth/connect-facebook'));
const ConnectGoogleContainer = lazy(() => import('../../container/auth/connect-google'));

/** MOBILE INDEX TAB */
const PromotionContainer = lazy(() => import('../../container/app-shop/mobile-index-tab/promotion'));
const NotificationTabContainer = lazy(() => import('../../container/app-shop/mobile-index-tab/notification'));

/** User Group */
const UserPanelContainer = lazy(() => import('../../container/app-shop/user/panel'));

/** Check out */
const CheckOutPanelContainer = lazy(() => import('../../container/app-shop/cart/panel'));

/** THEME */
const ThemeContainer = lazy(() => import('../../container/app-shop/theme'));

/** BRAND */
const BrandContainer = lazy(() => import('../../container/app-shop/brand'));
const BrandList = lazy(() => import('../../container/app-shop/all-brand'));

/** VOUCHER */
const DiscountCodeTabsContainer = lazy(() => import('../../components/cart/discount-code-tabs'));

/** INFO */
const InfoPanelContainer = lazy(() => import('../../container/app-shop/info/panel'));
const InfoDashboardContainer = lazy(() => import('../../container/app-shop/info/dashboard'));
const InfoAboutContainer = lazy(() => import('../../container/app-shop/info/about'));
const FaqPanelContainer = lazy(() => import('../../container/app-shop/faq/dashboard'));
const ArticleListContainer = lazy(() => import('../../container/app-shop/faq/article-list'));
const ArticleDetailContainer = lazy(() => import('../../container/app-shop/faq/article-detail'));

/** GIFT WITH PURCHASE */
const GwpIndexContainer = lazy(() => import('../../container/app-shop/gwp/index'));
const GwpDetailContainer = lazy(() => import('../../container/app-shop/gwp/detail'));

/** ORDERS TRACKINGS */
const OrdersTrackingsContainer = lazy(() => import('../../container/app-shop/orders/order-tracking'));

/** TRACKING EXPERT */
const TrackingExpertContainer = lazy(() => import('../../container/app-shop/tracking-expert'));

/** REDEEM */
// const RedeemContainer = lazy(() => import('../../container/app-shop/lixicoin/redeem'));
const RedeemCategoryContainer = lazy(() => import('../../container/app-shop/lixicoin/redeem-category'));

/** BRAND MOBILE */
const BrandMobileContainer = lazy(() => import('../../container/app-shop/mobile-index-tab/brand'));

/** COMMUNITY */
const CommunityContainer = lazy(() => import('../../container/app-shop/community/panel'));

/** REVIEWS */
const ReviewsContainer = lazy(() => import('../../container/app-shop/reviews'));

/** REFERRAL */
const RefereeEntryContainer = lazy(() => import('../../container/app-shop/referee-entry'));

/** Mobile - Deep link */
const MobileContainer = lazy(() => import('../../container/app-shop/mobile'));

/** RE ORDER */
const ReOrderContainer = lazy(() => import('../../container/app-shop/re-order'));

/** 404 */
const NotFoundContainer = lazy(() => import('../../container/exception/404'));

/** Game */
const GameShakeContainer = lazy(() => import('../../container/game/beauty-hunter/step-1'));
const GameShakePlayContainer = lazy(() => import('../../container/game/beauty-hunter/step-2'));
const GameShakeResultContainer = lazy(() => import('../../container/game/beauty-hunter/step-3'));

/** Discount code page */
const DiscountCodeDetailContainer = lazy(() => import('../../container/app-shop/discount-code-detail'));
const DiscountCodeBoxCategoryDetailContainer = lazy(
  () => import('../../container/app-shop/discount-code-box-category-detail')
);

/** Support center */
const SupportCenterContainer = lazy(() => import('../../container/app-shop/support-center'));

/** Store */
const StoreIndexContainer = lazy(() => import('../../container/app-shop/stores'));
const StoreMapContainer = lazy(() => import('../../container/app-shop/store'));

/** Halio private access trade */
const HalioOrivateAccessTrade = lazy(() => import('../../container/landing-page/halio-private-access-trade'));

/** Dummy container */
const DummyContainer = lazy(() => import('../../container/dummy'));

const HotDealContainer = lazy(() => import('container/app-shop/community/hot-deal')) as any;

export const AppShopSwitchRouting = () => (
  <Suspense fallback={<LazyLoading />}>
    <Switch>
      <Route
        exact
        path={ROUTINGS.ROUTING_INFO_PRIVACY_SHORT}
        render={(routeProps) => <InfoAboutContainer {...routeProps} />}
      />
      {/** Tracking expert */}
      <Route
        exact
        path={ROUTINGS.ROUTING_TRACKING_EXPERT_PATH_PRE}
        render={() => <Redirect to={ROUTINGS.ROUTING_SHOP_INDEX} />}
      />
      <Route
        exact
        path={ROUTINGS.ROUTING_TRACKING_EXPERT_PATH}
        render={() => <Redirect to={ROUTINGS.ROUTING_SHOP_INDEX} />}
      />
      <Route
        path={ROUTINGS.ROUTING_TRACKING_EXPERT}
        render={(routeProps) => <TrackingExpertContainer {...routeProps} />}
      />
      {/** Loves new */}
      <Route
        exact
        path={ROUTINGS.ROUTING_LOVE}
        render={() => <Redirect to={`${ROUTINGS.ROUTING_COMMUNITY_UNBOXING_FEEDBACK_NEW}`} />}
      />
      <Route
        exact
        path={ROUTINGS.ROUTING_LOVES}
        render={() => <Redirect to={`${ROUTINGS.ROUTING_COMMUNITY_UNBOXING_FEEDBACK_NEW}`} />}
      />
      <Route
        exact
        path={ROUTINGS.ROUTING_LOVES_NEW}
        render={() => <Redirect to={`${ROUTINGS.ROUTING_COMMUNITY_UNBOXING_FEEDBACK_NEW}`} />}
      />
      {/** Orders trackings */}
      <Route
        path={ROUTINGS.ROUTING_ORDERS_TRACKINGS}
        render={(routeProps) => <OrdersTrackingsContainer {...routeProps} />}
      />
      <Route
        exact
        path={ROUTINGS.ROUTING_ORDERS_TRACKINGS_PATH}
        render={(routeProps) => <OrdersTrackingsContainer {...routeProps} />}
      />
      {/** Special Deal */}
      <Route
        exact
        path={ROUTINGS.ROUTING_SPECIAL_DEALS}
        render={() => <Redirect to={ROUTINGS.ROUTING_SPECIAL_DEAL_DETAIL} />}
      />
      <Route
        exact
        path={ROUTINGS.ROUTING_SPECIAL_DEAL_DETAIL_OLD}
        render={() => <Redirect to={ROUTINGS.ROUTING_SPECIAL_DEAL_DETAIL} />}
      />
      {/** Gift with purchase */}
      <Route
        exact
        path={ROUTINGS.ROUTING_GWP_INDEX}
        render={() => <Redirect to={ROUTINGS.ROUTING_SPECIAL_DEAL_DETAIL} />}
      />
      <Route
        exact
        path={ROUTINGS.ROUTING_SPECIAL_DEAL_DETAIL}
        render={(routerProps) => <GwpIndexContainer {...routerProps} />}
      />
      <Route path={ROUTINGS.ROUTING_GWP_DETAIL} render={() => <GwpDetailContainer />} />
      {/** Checkout */}
      <Route
        exact
        path={ROUTINGS.ROUTING_CHECK_OUT_PATH}
        render={() => <Redirect to={ROUTINGS.ROUTING_SHOP_INDEX} />}
      />
      <Route
        path={ROUTINGS.ROUTING_CHECK_OUT_PATH}
        render={(routeProps) => <CheckOutPanelContainer {...routeProps} />}
      />
      {/** User */}
      <Route path={ROUTINGS.ROUTING_USER} component={UserPanelContainer} />
      {/** Info */}
      <Route exact path={ROUTINGS.ROUTING_INFO} component={InfoDashboardContainer} />
      <Route path={ROUTINGS.ROUTING_INFO} render={(routeProps) => <InfoPanelContainer {...routeProps} />} />

      <Route
        path={ROUTINGS.ROUTING_ARTICLE_DETAIL}
        render={(routeProps) => <ArticleDetailContainer {...routeProps} />}
      />
      <Route path={ROUTINGS.ROUTING_ARTICLE_LIST} render={(routeProps) => <ArticleListContainer {...routeProps} />} />
      <Route
        exact
        path={ROUTINGS.ROUTING_PRODUCT_MANUAL}
        render={(routeProps) => <FaqPanelContainer {...routeProps} />}
      />
      <Route
        exact
        path={ROUTINGS.ROUTING_FAQ}
        render={({ location: { search } }) => <Redirect to={`${ROUTINGS.ROUTING_PRODUCT_MANUAL}${search}`} />}
      />

      {/** Lixicoin, balance and membership */}
      <Route exact path={ROUTINGS.ROUTING_LIXI_COIN} component={LixicoinDashboardContainer} />
      <Route exact path={ROUTINGS.ROUTING_LIXI_COIN_FAQ} component={LixiCoinFaqContainer} />
      <Route exact path={ROUTINGS.ROUTING_BALANCE} component={BalancesDashboardContainer} />
      <Route exact path={ROUTINGS.ROUTING_BALANCE_FAQ} component={BalancesFaqContainer} />
      <Route exact path={ROUTINGS.ROUTING_MEMBERSHIP} component={MembershipDashboardContainer} />
      <Route exact path={ROUTINGS.ROUTING_MEMBERSHIP_FAQ} component={LixiCoinFaqContainer} />
      {/** BRAND */}
      <Route
        exact
        path={ROUTINGS.ROUTING_BRAND_DETAIL_PATH}
        // render={() => <Redirect to={ROUTINGS.ROUTING_SHOP_INDEX} />}
        component={BrandList}
      />

      {/** Landing Page Redirect */}
      {!!HALIO_REDIRECT_LIST &&
        HALIO_REDIRECT_LIST.map((item, index) => (
          <Route key={index} exact path={item.from} render={() => <Redirect to={item.to} />} />
        ))}

      <Route
        exact
        path={ROUTINGS.ROUTING_HOT_LINK_LUSTRE}
        render={() => <Redirect to={`${ROUTINGS.ROUTING_BRAND_DETAIL_PATH}${ROUTINGS.ROUTING_HOT_LINK_LUSTRE}`} />}
      />
      <Route
        exact
        path={ROUTINGS.ROUTING_HOT_LINK_OKAME}
        render={() => <Redirect to={`${ROUTINGS.ROUTING_BRAND_DETAIL_PATH}${ROUTINGS.ROUTING_HOT_LINK_OKAME}`} />}
      />
      <Route path={ROUTINGS.ROUTING_BRAND_DETAIL} component={BrandContainer} />

      {/** THEME */}
      <Route
        exact
        path={ROUTINGS.ROUTING_THEME_DETAIL_PATH}
        render={() => <Redirect to={ROUTINGS.ROUTING_SHOP_INDEX} />}
      />
      <Route
        exact
        path={ROUTINGS.ROUTING_THEME_DETAIL_PATH_OLD}
        render={() => <Redirect to={ROUTINGS.ROUTING_SHOP_INDEX} />}
      />
      <Route
        exact
        path={ROUTINGS.ROUTING_THEME_DETAIL_OLD}
        render={(data) => <Redirect to={`${ROUTINGS.ROUTING_THEME_DETAIL_PATH}/${data.match.params.idSpecial}`} />}
      />
      <Route exact path={ROUTINGS.ROUTING_THEME_DETAIL} component={ThemeContainer} />
      {/** PRODUCT */}
      <Route
        exact
        path={ROUTINGS.ROUTING_PRODUCT_CATEGORY_LINGERIE}
        render={() => <Redirect to={`${ROUTINGS.ROUTING_PRODUCT_CATEGORY_PATH}/lingerie`} />}
      />
      <Route
        exact
        path={ROUTINGS.ROUTING_PRODUCT_CATEGORY_PATH}
        render={(routeProps) => <ProductMobileCategory {...routeProps} />}
      />
      <Route path={ROUTINGS.ROUTING_PRODUCT_CATEGORY} component={ProductCategoryContainer} />
      <Route
        exact
        path={ROUTINGS.ROUTING_PRODUCT_DETAIL_PATH}
        render={() => <Redirect to={ROUTINGS.ROUTING_SHOP_INDEX} />}
      />
      {/* <Route path={ROUTINGS.ROUTING_PRODUCT_DETAIL} component={ProductDetailContainer} /> */}
      <Route
        path={ROUTINGS.ROUTING_PRODUCT_DETAIL}
        render={(routeProps) => <ProductDetailContainer {...routeProps} />}
      />
      {/** AUTH */}
      <AuthenticatorRoute
        exact
        path={ROUTINGS.ROUTING_AUTH_CHECKOUT_FAST_TRACK}
        component={CheckoutFastTrackContainer}
      />
      <AuthenticatorRoute exact path={ROUTINGS.ROUTING_AUTH_SIGN_IN} component={SignInContainer} />
      <AuthenticatorRoute exact path={ROUTINGS.ROUTING_AUTH_SIGN_UP} component={SignUpContainer} />
      <AuthenticatorRoute exact path={ROUTINGS.ROUTING_AUTH_FORGOT_PASSWORD} component={ForgotPasswordContainer} />
      <AuthenticatorRoute exact path={ROUTINGS.ROUTING_AUTH_VERIFY_PHONE} component={SignupVerifyPhoneContainer} />
      <AuthenticatorRoute
        exact
        path={ROUTINGS.ROUTING_AUTH_PHONE_REGISTERED}
        component={SignupWithRegisteredPhonePromptContainer}
      />
      <AuthenticatorRoute
        exact
        path={ROUTINGS.ROUTING_AUTH_LOGIN_UNCONFIRMED_PHONE_PROMPT}
        component={SigninWithUnconfirmedPhonePromptContainer}
      />
      <AuthenticatorRoute
        exact
        path={ROUTINGS.ROUTING_AUTH_ATTACH_PHONE_STEP_1}
        component={SigninAttachPhoneStep1Container}
      />
      <AuthenticatorRoute
        exact
        path={ROUTINGS.ROUTING_AUTH_ATTACH_PHONE_STEP_2}
        component={SigninAttachPhoneStep2Container}
      />
      <Route exact path={ROUTINGS.ROUTING_AUTH_CONNECT_FACEBOOK} component={ConnectFacebookContainer} />
      <Route exact path={ROUTINGS.ROUTING_AUTH_CONNECT_GOOGLE} component={ConnectGoogleContainer} />

      <Route
        exact
        path={ROUTINGS.ROUTING_AUTH_RESET_PASSWORD}
        render={() => <Redirect to={ROUTINGS.ROUTING_USER_VERIFY} />}
      />
      {/** MOBILE INDEX TAB */}
      {/* <Route exact path={ROUTINGS.ROUTING_COMMUNITY_PATH} component={NewFeedContainer} /> */}
      <Route exact path={ROUTINGS.ROUTING_PROMOTION} render={(routeProps) => <PromotionContainer {...routeProps} />} />
      <Route exact path={ROUTINGS.ROUTING_USER_NOTIFICATION} component={NotificationTabContainer} />
      <Route
        exact
        path={ROUTINGS.ROUTING_MOBILE_BRAND_PATH}
        render={(routeProps) => <BrandMobileContainer {...routeProps} />}
      />
      {/** Search */}
      <Route exact path={ROUTINGS.ROUTING_SEARCH_PATH} render={() => <Redirect to={ROUTINGS.ROUTING_SHOP_INDEX} />} />
      <Route path={ROUTINGS.ROUTING_SEARCH_DETAIL} render={(routeProps) => <SearchContainer {...routeProps} />} />
      {/** INDEX WEB SHOP */}
      <Route exact path={ROUTINGS.ROUTING_SHOP_INDEX} render={(routeProps) => <ShopIndexContainer {...routeProps} />} />
      {/** REDEEM */}
      <Route
        exact
        path={ROUTINGS.ROUTING_REDEEM_PATH}
        render={(routeProps) => <RedeemCategoryContainer kind={REDEEM_CATEGORY.LATEST_REDEEM} {...routeProps} />}
      />
      {/** SPECIAL REDEEM */}
      <Route
        exact
        path={ROUTINGS.ROUTING_SPECIAL_REDEEM_PATH}
        render={() => <Redirect to={ROUTINGS.ROUTING_REDEEM_PATH} />}
      />
      {/** USER REDEEM */}
      <Route
        exact
        path={ROUTINGS.ROUTING_USER_REDEEM_PATH}
        render={() => <Redirect to={ROUTINGS.ROUTING_REDEEM_PATH} />}
      />
      {/** LATEST REDEEM */}
      <Route
        exact
        path={ROUTINGS.ROUTING_LATEST_REDEEM_PATH}
        render={() => <Redirect to={ROUTINGS.ROUTING_REDEEM_PATH} />}
      />
      {/** Community */}
      <Route path={ROUTINGS.ROUTING_COMMUNITY_PATH} render={(routeProps) => <CommunityContainer {...routeProps} />} />
      {/** Magazine */}
      <Route exact path={ROUTINGS.ROUTING_MAGAZINE} component={MagazineIndexContainer} />
      <Route exact path={ROUTINGS.ROUTING_SEARCH_MAGAZINE} component={MagazineSearchContainer} />
      <Route
        exact
        path={ROUTINGS.ROUTING_MAGAZINE_VIDEO_PATH}
        render={() => <Redirect to={ROUTINGS.ROUTING_SHOP_INDEX} />}
      />
      {/* <Route path={ROUTINGS.ROUTING_MAGAZINE_VIDEO} component={MagazineVideoContainer} /> */}
      <Route
        exact
        path={ROUTINGS.ROUTING_MAGAZINE_CATEGORY_PATH}
        render={() => <Redirect to={ROUTINGS.ROUTING_SHOP_INDEX} />}
      />
      <Route
        path={ROUTINGS.ROUTING_MAGAZINE_CATEGORY}
        render={(routeProps) => <MagazineCategoryContainer {...routeProps} />}
      />
      <Route
        exact
        path={ROUTINGS.ROUTING_MAGAZINE_TAG_PATH}
        render={() => <Redirect to={ROUTINGS.ROUTING_SHOP_INDEX} />}
      />
      <Route
        path={ROUTINGS.ROUTING_MAGAZINE_TAG}
        render={(routeProps) => <MagazineCategoryContainer {...routeProps} />}
      />
      <Route
        exact
        path={ROUTINGS.ROUTING_MAGAZINE_DETAIL_PATH}
        render={() => <Redirect to={ROUTINGS.ROUTING_SHOP_INDEX} />}
      />
      <Route path={ROUTINGS.ROUTING_MAGAZINE_DETAIL} component={MagazineDetailContainer} />

      {/** Invite */}
      <Route exact path={ROUTINGS.ROUTING_REFERAL} render={(routeProps) => <RefereeEntryContainer {...routeProps} />} />
      <Route path={ROUTINGS.ROUTING_REFERAL_PATH} render={() => <Redirect to={ROUTINGS.ROUTING_USER_INVITE} />} />

      {/** Mobile Deep link */}
      <Route exact path={ROUTINGS.ROUTING_MOBILE_DEEPLINK} component={MobileContainer} />
      {/** Re order */}
      <Route exact path={ROUTINGS.ROUTING_RE_ORDER_PATH} render={() => <Redirect to={ROUTINGS.ROUTING_SHOP_INDEX} />} />
      <Route exact path={ROUTINGS.ROUTING_RE_ORDER_DETAIL} component={ReOrderContainer} />
      {/** Game */}
      <Route
        exact
        path={ROUTINGS.ROUTING_GAME}
        render={(data) => {
          const search = data.location.search;
          const searchSplit = search.split('=');
          return <Redirect to={`${ROUTINGS.ROUTING_GAME_BEAUTY_HUNTER}?access_token=${searchSplit[1]}`} />;
        }}
      />
      <Route
        exact
        path={ROUTINGS.ROUTING_GAME_BEAUTY_HUNTER}
        render={(routeProps) => <GameShakeContainer {...routeProps} />}
      />
      <Route
        exact
        path={ROUTINGS.ROUTING_GAME_BEAUTY_HUNTER_PLAY}
        render={(routeProps) => <GameShakePlayContainer {...routeProps} />}
      />
      <Route
        exact
        path={ROUTINGS.ROUTING_GAME_BEAUTY_HUNTER_RESULT}
        render={(routeProps) => <GameShakeResultContainer {...routeProps} />}
      />
      {/** Reviews */}
      <Route path={ROUTINGS.ROUTING_REVIEWS_PATH} render={(routeProps) => <ReviewsContainer {...routeProps} />} />
      {/** Discount code */}
      <Route
        exact
        path={ROUTINGS.ROUTING_DISCOUNT_CODE_PATH}
        render={() => <Redirect to={ROUTINGS.ROUTING_SHOP_INDEX} />}
      />
      <AuthenticatedRoute exact path={ROUTINGS.ROUTING_VOUCHERS_PATH} component={DiscountCodeTabsContainer} />
      <Route
        exact
        path={ROUTINGS.ROUTING_DISCOUNT_CODE_DETAIL}
        render={(routerProps) => <DiscountCodeDetailContainer {...routerProps} />}
      />
      <Route
        exact
        path={ROUTINGS.ROUTING_DISCOUNT_CODE_CATEGORY_BOXES}
        render={(routerProps) => <DiscountCodeBoxCategoryDetailContainer {...routerProps} />}
      />

      <Route
        path={ROUTINGS.ROUTING_SUPPORT_CENTER_PATH}
        render={(routeProps) => <SupportCenterContainer {...routeProps} />}
      />

      <Route path={ROUTINGS.ROUTING_STORE_INDEX} component={StoreIndexContainer} />
      <Route path={ROUTINGS.ROUTING_STORE_MAP} component={StoreMapContainer} />

      <Route
        path={ROUTINGS.ROUTING_HALIO_PRIVATE_ACCESSS_TRADE}
        render={(routeProps) => <HalioOrivateAccessTrade {...routeProps} />}
      />

      <Route
        path={ROUTINGS.ROUTING_HALIO_PRIVATE_ACCESSS_TRADE}
        render={(routeProps) => <HalioOrivateAccessTrade {...routeProps} />}
      />
      <Route path={ROUTINGS.ROUTING_HOT_DEAL} render={(routeProps) => <HotDealContainer {...routeProps} />} />

      {process.env.REACT_APP_ENV !== 'production' && (
        <Route path={ROUTINGS.ROUTING_DUMMY} render={(routeProps) => <DummyContainer {...routeProps} />} />
      )}

      <Route path={'*'} render={(routeProps) => <NotFoundContainer {...routeProps} />} />
    </Switch>
  </Suspense>
);
