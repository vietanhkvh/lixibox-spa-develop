import { useEffect } from 'react';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import WrapLayout from '../../../layout/wrap';
import Icon from '../../../../components/ui/icon';
import { getUrlParameter } from '../../../../utils/format';
import { readPage, pageExists, totalPages, pageLinks } from '../../../../utils/page';
import { isMobileVersion } from '../../../../utils/responsive';
import { isEmptyObject } from '../../../../utils/validate';
import { numberFormat } from '../../../../utils/format';
import { auth } from '../../../../utils/auth';
import {
  ROUTING_SHOP_INDEX,
  ROUTING_REDEEM_PATH,
  ROUTING_SPECIAL_REDEEM_PATH,
  ROUTING_USER_REDEEM_PATH
} from '../../../../routings/path';
import ItemVerticalList from '../../../../presentation-component/item-list-hoc/item-vertical-list';
import RedeemableItemWithAction from '../../cart/general/product/redeemable-item-with-action';
import LoadingPlaceholder from '../../../../components/ui/loading-placeholder';
import Pagination from 'components/general/pagination';
import MobileAutoDisplayHeader from '../../../../presentation-component/general/mobile-auto-display-header';
import MobileScreenHeader from '../../../../presentation-component/general/mobile-screen-header';
import BannerHomeMain from '../../../../components/banner/home-main';
import BannerCarousel from '../../../../components/banner/carousel';
import NoContentPlaceholder, {
  NO_CONTENT_LOGO
} from '../../../../presentation-component/general/mobile/no-content-placeholder';
import { objectToHash } from '../../../../utils/encode';
import { setCustomReferrer } from 'utils/navigate';
import { BANNER_ID } from '../../../../constants/application/default';
import { REDEEM_WARNING_MESSAGE } from '../../../../constants/application/membership_level';
import CountdownPanel from 'components/countdown/panel';
import { ViewedSource } from 'tracking/constants';
import { gatewayTrackViewContentFromList } from 'tracking/gateway';
import { ProductBox } from 'types/api/shop';
import { REDEEM_CATEGORY } from './constant';
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
  const list = isMobileVersion() ? [1, 2, 3, 4] : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

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

const RedeemCategory = ({
  authStore: { userInfo },
  cartStore: { cartDetail },
  shopStore: {
    redeemable: { latest, special, user }
  },
  bannerStore,
  countdownStore,
  kind,
  perPage,
  fetchRedeemLatestBoxesAction,
  fetchRedeemUserBoxesAction,
  fetchRedeemSpecialBoxesAction,
  fetchBannerAction,
  updateMetaInfoAction,
  history,
  fetchCountdownListAction
}) => {
  let fetchRedeemBoxesAction = fetchRedeemLatestBoxesAction;
  let redeemablePageable = latest;
  let categoryRoute = ROUTING_REDEEM_PATH;
  let title = 'Mới nhất';
  const bannerHash = objectToHash({
    idBanner: BANNER_ID.REDEEM,
    limit: 12
  });
  const banners = bannerStore.bannerList[bannerHash] || [];
  switch (kind) {
    case REDEEM_CATEGORY.SPECIAL_REDEEM:
      fetchRedeemBoxesAction = fetchRedeemSpecialBoxesAction;
      redeemablePageable = special;
      categoryRoute = ROUTING_SPECIAL_REDEEM_PATH;
      title = 'Quà Hot hiện nay';
      break;
    case REDEEM_CATEGORY.USER_REDEEM:
      fetchRedeemBoxesAction = fetchRedeemUserBoxesAction;
      redeemablePageable = user;
      categoryRoute = ROUTING_USER_REDEEM_PATH;
      title = 'Dành riêng cho bạn';
  }

  const currentPage = parseInt(getUrlParameter(window.location.search, 'page') || '1');
  useEffect(() => {
    fetchRedeemBoxesAction({ page: currentPage, perPage });
  }, [kind, perPage, currentPage]);

  useEffect(() => {
    fetchBannerAction({
      idBanner: BANNER_ID.REDEEM,
      limit: 12
    });
  }, [kind]);

  useEffect(() => {
    !countdownStore.isLoaded && !countdownStore.isFetching && fetchCountdownListAction();
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [currentPage]);

  useEffect(() => {
    const bannerImage = banners?.[0]?.cover_image?.large_url || '';
    banners.length &&
      updateMetaInfoAction({
        info: Object.assign(
          {},
          {
            url: `https://www.lixibox.com/redeem`,
            type: 'catalog',
            title: 'Tích Lixicoin, đổi quà tiền triệu | Lixibox',
            description:
              'Dùng điểm thưởng Lixicoin để đổi lấy nhiều phần quà, ưu đãi hấp dẫn tại website/app Lixibox ngay hôm nay.',
            keyword:
              'Lixicoin, tích điểm, ưu đãi Lixibox, ưu đãi Lixicoin, đổi quà miễn phí, đổi điểm, khuyến mại Lixibox'
          },
          bannerImage && { image: bannerImage }
        )
      });
  }, [banners]);

  if (kind === REDEEM_CATEGORY.USER_REDEEM && !auth.loggedIn()) {
    history.push(ROUTING_REDEEM_PATH);
    return null;
  }

  const pageLoaded = pageExists({ pageable: redeemablePageable, page: currentPage, perPage });
  const boxesInCurrentPage = readPage({ pageable: redeemablePageable, page: currentPage, perPage });
  const totalPageCount = totalPages({ pageable: redeemablePageable, perPage });

  const isRequireLogin = !!isEmptyObject(userInfo);
  const isRequireBirthday = !isEmptyObject(userInfo) && userInfo.birthday <= 0;
  const coinRedeemInCart = (!isEmptyObject(cartDetail) && cartDetail.total_coins) || 0;
  const remainingCoin = userInfo.coins - coinRedeemInCart;

  return (
    <div className={classNames(style.redeemCategory, isMobileVersion() || style.redeemCategoryDesktop)}>
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
        {!!countdownStore?.list?.length && (
          <CountdownPanel
            size={isMobileVersion() ? 'normal' : 'large'}
            data={countdownStore.list[countdownStore.list.length - 1]}
          />
        )}
        {!pageLoaded ? (
          renderLoadingPlaceholder()
        ) : boxesInCurrentPage.length ? (
          <>
            {isMobileVersion() && <div className={style.mobileProductsHeading}>Danh sách quà</div>}
            <div style={STYLE.list}>
              {!!boxesInCurrentPage.length && (
                <ItemVerticalList column={isMobileVersion() ? 2 : 5}>
                  {boxesInCurrentPage.map((product, index) => (
                    <RedeemableItemWithAction
                      key={product.id}
                      product={product as ProductBox}
                      onClickProductItem={() => {
                        gatewayTrackViewContentFromList({
                          source: ViewedSource.REDEEM,
                          box: product as ProductBox,
                          index
                        });
                      }}
                    />
                  ))}
                </ItemVerticalList>
              )}
            </div>
            {totalPageCount > 1 && (
              <Pagination
                {...{
                  current: currentPage,
                  per: perPage,
                  total: totalPageCount,
                  urlList: pageLinks({ totalPages: totalPageCount, baseUrl: categoryRoute })
                }}
              />
            )}
          </>
        ) : (
          <NoContentPlaceholder
            title="Không tìm thấy đơn hàng"
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
  perPage: 20
};

export default RedeemCategory;
