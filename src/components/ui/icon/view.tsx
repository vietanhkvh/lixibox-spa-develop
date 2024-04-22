import { mergeStyle } from '../../../utils/responsive';
import { generateTestId } from 'utils/test-utils';
import * as LAYOUT from '../../../style/layout';
import STYLE from './style';

import renderLogo from './svg/logo';
import renderLogoLine from './svg/logo-line';
import renderLogoText from './svg/logo-text';
import renderCaretDown from './svg/caret-down';
import renderAngleUp from './svg/angle-up';
import renderAngleDown from './svg/angle-down';
import renderAngleLeft from './svg/angle-left';
import renderAngleRight from './svg/angle-right';
import renderTrash from './svg/trash';
import renderSearch from './svg/search';
import renderCart from './svg/cart';
import renderShoppingBag from './svg/shopping-bag';
import renderHeartBox from './svg/heart-box';
import renderRatingStage from './svg/rating-stage';
import renderInviteEmail from './svg/invite-email';
import renderCartLine from './svg/cart-line';
import renderHeart from './svg/heart';
import renderHeartLine from './svg/heart-line';
import renderHeartFull from './svg/heart-full';
import renderPlay from './svg/play';
import renderArrowUp from './svg/arrow-up';
import renderArrowDown from './svg/arrow-down';
import renderArrowLeft from './svg/arrow-left';
import renderArrowRight from './svg/arrow-right';
import renderTime from './svg/time';
import renderStar from './svg/star';
import renderStarLine from './svg/star-line';
import renderStarHalf from './svg/star-half';
import renderStarLight from './svg/star-light';
import renderDollar from './svg/dollar';
import renderDeliver from './svg/deliver';
import renderRefresh from './svg/refresh';
import renderMenu from './svg/menu';
import renderClose from './svg/close';
import renderFacebook from './svg/facebook';
import renderInstagram from './svg/instagram';
import renderYoutube from './svg/youtube';
import renderPinterest from './svg/pinterest';
import renderPlus from './svg/plus';
import renderMinus from './svg/minus';
import renderFeed from './svg/feed';
import renderGift from './svg/gift';
import renderBell from './svg/bell';
import renderUser from './svg/user';
import renderUserPlus from './svg/user-plus';
import renderInfo from './svg/info';
import renderRelated from './svg/related';
import renderMessage from './svg/message';
import renderMessageFaq from './svg/message-faq';
import renderMessageHeart from './svg/message-heart';
import renderDanger from './svg/danger';
import renderError from './svg/error';
import renderSuccess from './svg/success';
import renderCheck from './svg/check';
import renderCheckBold from './svg/check-bold';
import renderEdit from './svg/edit';
import renderSelfie from './svg/selfie';
import renderCamera from './svg/camera';
import renderLike from './svg/like';
import renderLikeFull from './svg/like-full';
import renderSignIn from './svg/sign-in';
import renderSignOut from './svg/sign-out';
import renderTagPrice from './svg/tag-price';
import renderPercent from './svg/percent';
import renderMagazine from './svg/magazine';
import renderStore from './svg/store';
import renderBook from './svg/book';
import renderCall from './svg/call';
import renderEmail from './svg/email';
import renderFly from './svg/fly';
import renderCircle from './svg/circle';
import renderCopy from './svg/copy';
import renderBookmark from './svg/bookmark';
import renderBookmarkLine from './svg/bookmark-line';
import renderVerification from './svg/verification';
import renderFilter from './svg/filter';
import renderApp from './svg/app';
import renderEye from './svg/eye';
import renderMapMarker from './svg/map-marker';
import renderCosmetic from './svg/cosmetic';
import renderPicture from './svg/picture';
import renderHash from './svg/hash';
import renderHalfLighting from './svg/half-lighting';
import renderPaperPlane from './svg/paper-plane';
import renderColorDeliver from './svg/color-deliver';
import renderColorStore from './svg/color-store';
import renderColorMoney from './svg/color-money';
import renderColorVisa from './svg/color-visa';
import renderColorAtm from './svg/color-atm';
import renderColorBanking from './svg/color-banking';
import renderColorMomo from './svg/color-momo';
import renderColorRocket from './svg/color-rocket';
import renderColorShopping from './svg/color-shopping';
import renderColorCommunity from './svg/color-community';
import renderColorMagazine from './svg/color-magazine';
import renderColorSignIn from './svg/color-sign-in';
import renderColorUnboxing from './svg/color-unboxing';
import renderColorStar from './svg/color-star';
import renderBoxEmpty from './svg/box-empty';
import renderNextLink from './svg/next-link';
import renderMessager from './svg/messager';
import renderBrandGoogle from './svg/brand/google';
import renderZalo from './svg/zalo';

function renderView() {
  const {
    name,
    style: styleWithoutDomState,
    innerStyle: innerStyleWithoutDomState,
    onClick,
    className,
    innerClassName,
    testId
  } = this.props;
  const { listIcon, defaultIcon, hovering } = this.state;
  const iconName = listIcon.indexOf(name) < 0 ? defaultIcon : name;
  const style = mergeStyle(styleWithoutDomState, hovering && styleWithoutDomState[':hover']);
  const innerStyle = mergeStyle(innerStyleWithoutDomState, hovering && innerStyleWithoutDomState[':hover']);

  const list = {
    logo: renderLogo,
    'logo-line': renderLogoLine,
    'logo-text': renderLogoText,
    'caret-down': renderCaretDown,
    'angle-up': renderAngleUp,
    'angle-down': renderAngleDown,
    'angle-left': renderAngleLeft,
    'angle-right': renderAngleRight,
    trash: renderTrash,
    search: renderSearch,
    cart: renderCart,
    'shopping-bag': renderShoppingBag,
    'heart-box': renderHeartBox,
    'rating-stage': renderRatingStage,
    'invite-email': renderInviteEmail,
    'cart-line': renderCartLine,
    heart: renderHeart,
    'heart-line': renderHeartLine,
    'heart-full': renderHeartFull,
    play: renderPlay,
    'arrow-up': renderArrowUp,
    'arrow-down': renderArrowDown,
    'arrow-left': renderArrowLeft,
    'arrow-right': renderArrowRight,
    time: renderTime,
    star: renderStar,
    'star-line': renderStarLine,
    'star-half': renderStarHalf,
    'star-light': renderStarLight,
    dollar: renderDollar,
    deliver: renderDeliver,
    refresh: renderRefresh,
    menu: renderMenu,
    close: renderClose,
    facebook: renderFacebook,
    instagram: renderInstagram,
    youtube: renderYoutube,
    pinterest: renderPinterest,
    plus: renderPlus,
    minus: renderMinus,
    feed: renderFeed,
    gift: renderGift,
    bell: renderBell,
    user: renderUser,
    'user-plus': renderUserPlus,
    info: renderInfo,
    related: renderRelated,
    message: renderMessage,
    'message-faq': renderMessageFaq,
    'message-heart': renderMessageHeart,
    danger: renderDanger,
    error: renderError,
    success: renderSuccess,
    check: renderCheck,
    'check-bold': renderCheckBold,
    edit: renderEdit,
    selfie: renderSelfie,
    camera: renderCamera,
    like: renderLike,
    'like-full': renderLikeFull,
    'sign-in': renderSignIn,
    'sign-out': renderSignOut,
    'tag-price': renderTagPrice,
    percent: renderPercent,
    magazine: renderMagazine,
    store: renderStore,
    book: renderBook,
    call: renderCall,
    email: renderEmail,
    fly: renderFly,
    circle: renderCircle,
    copy: renderCopy,
    bookmark: renderBookmark,
    'bookmark-line': renderBookmarkLine,
    verification: renderVerification,
    filter: renderFilter,
    app: renderApp,
    eye: renderEye,
    'map-marker': renderMapMarker,
    cosmetic: renderCosmetic,
    picture: renderPicture,
    hash: renderHash,
    'half-lighting': renderHalfLighting,
    'paper-plane': renderPaperPlane,
    'color-deliver': renderColorDeliver,
    'color-store': renderColorStore,
    'color-money': renderColorMoney,
    'color-visa': renderColorVisa,
    'color-atm': renderColorAtm,
    'color-banking': renderColorBanking,
    'color-momo': renderColorMomo,
    'color-rocket': renderColorRocket,
    'color-shopping': renderColorShopping,
    'color-community': renderColorCommunity,
    'color-magazine': renderColorMagazine,
    'color-sign-in': renderColorSignIn,
    'color-unboxing': renderColorUnboxing,
    'color-star': renderColorStar,
    'box-empty': renderBoxEmpty,
    'next-link': renderNextLink,
    messager: renderMessager,
    'brand-google': renderBrandGoogle,
    zalo: renderZalo
  };

  const containerProps = {
    style: Object.assign(
      {},
      LAYOUT.flexContainer,
      LAYOUT.flexContainer.verticalCenter,
      LAYOUT.flexContainer.center,
      STYLE,
      style
    ),
    onClick: onClick,
    onMouseEnter: this.onEnter,
    onMouseLeave: this.onLeave,
    className
  };

  return !!window.isInsightsBot && list && list[iconName] ? null : (
    <div {...containerProps} {...generateTestId(testId)}>
      {list[iconName]({ style, innerStyle, innerClassName })}
    </div>
  );
}
export default renderView;
