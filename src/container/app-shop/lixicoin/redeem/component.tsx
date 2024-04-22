import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import WrapLayout from '../../../layout/wrap';
import Icon from '../../../../components/ui/icon';
import { readPage, pageExists } from '../../../../utils/page';
import { isMobileVersion } from '../../../../utils/responsive';
import { isEmptyObject } from '../../../../utils/validate';
import { numberFormat } from '../../../../utils/format';
import { auth } from '../../../../utils/auth';
import { setCustomReferrer } from 'utils/navigate';
import {
  ROUTING_SHOP_INDEX,
  ROUTING_LATEST_REDEEM_PATH,
  ROUTING_REDEEM_PATH,
  ROUTING_SPECIAL_REDEEM_PATH,
  ROUTING_USER_REDEEM_PATH
} from '../../../../routings/path';
import FadeIn from '../../../layout/fade-in';
import RedeemableItemWithAction from '../../cart/general/product/redeemable-item-with-action';
import LoadingPlaceholder from '../../../../components/ui/loading-placeholder';
import MobileAutoDisplayHeader from '../../../../presentation-component/general/mobile-auto-display-header';
import MobileScreenHeader from '../../../../presentation-component/general/mobile-screen-header';
import { objectToHash } from '../../../../utils/encode';
import BannerHomeMain from '../../../../components/banner/home-main';
import BannerCarousel from '../../../../components/banner/carousel';
import NoContentPlaceholder, {
  NO_CONTENT_LOGO
} from '../../../../presentation-component/general/mobile/no-content-placeholder';
import { ProductBox } from 'types/api/shop';
import ProductSliderWithHeader from '../../../../presentation-component/general/desktop/product-slider-with-heading';
import ItemCarousel from '../../../../presentation-component/item-list-hoc/item-carousel';
import { REDEEM_WARNING_MESSAGE } from '../../../../constants/application/membership_level';
import { BANNER_ID } from '../../../../constants/application/default';
import style from './style.module.scss';
import STYLE from './style';

export const renderItemPlaceholder = (item) => (
  <div
    style={Object.assign({}, STYLE.placeholder.productItem, isMobileVersion() && STYLE.placeholder.productMobileItem)}
    key={item}
  >
    <LoadingPlaceholder style={STYLE.placeholder.productItem.image} />
    <LoadingPlaceholder style={STYLE.placeholder.productItem.text} />
    <LoadingPlaceholder style={STYLE.placeholder.productItem.text} />
    <LoadingPlaceholder style={STYLE.placeholder.productItem.lastText} />
  </div>
);

const renderLoadingPlaceholder = () => {
  const list = isMobileVersion() ? [1, 2] : [1, 2, 3, 4, 5];

  return (
    <div style={STYLE.placeholder}>
      <LoadingPlaceholder
        style={Object.assign({}, STYLE.placeholder.title, isMobileVersion() && STYLE.placeholder.titleMobile)}
      />
      <div style={STYLE.placeholder.productList}>{Array.isArray(list) && list.map(renderItemPlaceholder)}</div>
    </div>
  );
};

const ErrorMessage = ({ message, actionTitle = '', actionLink = '' }) => {
  if (!message || !message.length) return null;

  const linkIconProps = {
    name: 'angle-right',
    style: STYLE.coinInfo.linkIcon,
    innerStyle: STYLE.coinInfo.innerLinkIcon
  };

  const navProps = {
    to: actionLink,
    style: STYLE.coinInfo.link,
    onClick: () => setCustomReferrer({ value: ROUTING_REDEEM_PATH })
  };

  const messageProps = {
    style: Object.assign({}, STYLE.coinInfo.content, STYLE.coinInfo.redText)
  };

  return (
    <div style={STYLE.messageWrap.container}>
      <div {...messageProps}>{message}</div>
      {!!actionTitle && !!actionTitle.length && (
        <NavLink {...navProps}>
          {actionTitle}
          <Icon {...linkIconProps} />
        </NavLink>
      )}
    </div>
  );
};

const InfoMessage = ({ isRequireLogin, isRequireBirthday }) => {
  if (!isRequireLogin && !isRequireBirthday) return null;

  const isRequireLoginProps = REDEEM_WARNING_MESSAGE.NEED_TO_LOGIN;
  const isRequireBirthdayProps = REDEEM_WARNING_MESSAGE.NEED_TO_UPDATE_INFO;

  return (
    <div style={STYLE.messageWrap.wrap}>
      {isRequireLogin && <ErrorMessage {...isRequireLoginProps} />}
      {isRequireBirthday && <ErrorMessage {...isRequireBirthdayProps} />}
    </div>
  );
};

const CoinInfo = ({ userInfo, remainingCoin }) => {
  if (!userInfo || !userInfo.coins) return null;

  return (
    <div style={STYLE.coinInfo.container}>
      <div style={STYLE.coinInfo.fixed}>
        <div style={STYLE.coinInfo.lixicoinRemaining}>
          <div style={STYLE.coinInfo.lixicoinHeading}>{`Bạn đang còn`}</div>
          <span style={STYLE.coinInfo.lixicoinRemainingText}>{`${numberFormat(remainingCoin)} Lixicoin`}</span>
        </div>
      </div>
    </div>
  );
};

const RedeemableProductSlider = ({ pageable, perPage, viewMoreLink, title }) => {
  const pageLoaded = pageExists({ pageable, page: 1, perPage });
  const boxes = readPage({ pageable, page: 1, perPage });
  const dataProps = boxes.map((product) => ({ key: product.id, product, isShowVariants: false }));

  return pageLoaded ? (
    !!boxes.length ? (
      isMobileVersion() ? (
        <ItemCarousel viewMore={'Xem tất cả'} viewMoreLink={viewMoreLink} title={title}>
          {boxes.map((product) => (
            <RedeemableItemWithAction key={product.id} product={product as ProductBox} />
          ))}
        </ItemCarousel>
      ) : (
        <ProductSliderWithHeader
          data={dataProps}
          template={RedeemableItemWithAction}
          title={title}
          viewMoreLink={viewMoreLink}
          isShowViewMore={true}
        />
      )
    ) : null
  ) : (
    renderLoadingPlaceholder()
  );
};

const RedeemCategory = ({
  authStore: { userInfo },
  cartStore: { cartDetail },
  shopStore: {
    redeemable: { latest, special, user }
  },
  bannerStore,
  perPage,
  fetchRedeemLatestBoxesAction,
  fetchRedeemUserBoxesAction,
  fetchRedeemSpecialBoxesAction,
  fetchBannerAction,
  history
}) => {
  const title = 'ĐỔI QUÀ TỪ LIXICOIN';

  const bannerHash = objectToHash({
    idBanner: BANNER_ID.REDEEM,
    limit: 12
  });
  const banners = bannerStore.bannerList[bannerHash] || [];

  useEffect(() => {
    fetchRedeemLatestBoxesAction({ page: 1, perPage });
    auth.loggedIn() && fetchRedeemUserBoxesAction({ page: 1, perPage });
    fetchRedeemSpecialBoxesAction({ page: 1, perPage });
    fetchBannerAction({
      idBanner: BANNER_ID.REDEEM,
      limit: 12
    });
  }, []);
  const isRequireLogin = !!isEmptyObject(userInfo);
  const isRequireBirthday = !isEmptyObject(userInfo) && userInfo.birthday <= 0;
  const coinRedeemInCart = (!isEmptyObject(cartDetail) && cartDetail.total_coins) || 0;
  const remainingCoin = userInfo.coins - coinRedeemInCart;
  const redeemableSliders: Array<any> = [];
  redeemableSliders.push({ pageable: latest, title: 'Mới nhất', viewMoreLink: ROUTING_LATEST_REDEEM_PATH });
  auth.loggedIn() &&
    redeemableSliders.push({ pageable: user, title: 'Dành riêng cho bạn', viewMoreLink: ROUTING_USER_REDEEM_PATH });
  redeemableSliders.push({ pageable: special, title: 'Quà Hot hiện nay', viewMoreLink: ROUTING_SPECIAL_REDEEM_PATH });
  const anySliderIdle = !latest.loaded || (auth.loggedIn() && !user.loaded) || !special.loaded;
  const anySliderLoading = latest.fetching || (auth.loggedIn() && user.fetching) || special.fetching;
  const anySliderLoadingOrIdle = anySliderLoading || anySliderIdle;
  const anySliderDisplayed = !![latest, user, special]
    .map((pageable) => pageExists({ pageable, page: 1, perPage }))
    .find((exists) => exists);

  return (
    <div className={style.redeemCategory}>
      <WrapLayout style={STYLE.wrap}>
        {isMobileVersion() ? (
          <MobileAutoDisplayHeader row={1}>
            <MobileScreenHeader title={title} />
          </MobileAutoDisplayHeader>
        ) : (
          <div style={STYLE.heading}>{title}</div>
        )}
        <InfoMessage {...{ isRequireLogin, isRequireBirthday }} />
        {!isMobileVersion() && <CoinInfo userInfo={userInfo} remainingCoin={remainingCoin} />}
        {isMobileVersion() ? (
          <BannerCarousel list={banners} isShowIndicator={true} />
        ) : (
          <BannerHomeMain list={banners} />
        )}

        {anySliderLoadingOrIdle ? (
          renderLoadingPlaceholder()
        ) : anySliderDisplayed ? (
          <>
            <FadeIn>
              <div style={STYLE.list}>
                {redeemableSliders.map((props, index) => (
                  <RedeemableProductSlider key={index} perPage={perPage} {...props} />
                ))}
              </div>
            </FadeIn>
          </>
        ) : (
          <NoContentPlaceholder
            title="Không tìm thấy sản phẩm"
            logo={NO_CONTENT_LOGO.SHIPMENT}
            action={{ text: 'Tiếp tục mua sắm' }}
            onClick={() => history.push(ROUTING_SHOP_INDEX)}
            className={style.noContentPlaceholder}
          />
        )}
        {isMobileVersion() && <CoinInfo userInfo={userInfo} remainingCoin={remainingCoin} />}
      </WrapLayout>
    </div>
  );
};
RedeemCategory.defaultProps = {
  perPage: 12
};

export default RedeemCategory;
