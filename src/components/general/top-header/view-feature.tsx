import SvgIcon from 'presentation-component/ui/icon';
import classnames from 'classnames';
import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  ROUTING_MAGAZINE,
  ROUTING_COMMUNITY_PATH,
  ROUTING_AUTH_SIGN_IN,
  ROUTING_AUTH_SIGN_UP,
  ROUTING_COMMUNITY_USER_FEED_PATH,
  ROUTING_VOUCHERS_PATH,
  ROUTING_USER_INVITE,
  ROUTING_USER_ORDER
} from 'routings/path';
import { SIGN_IN_STATE } from '../../../constants/application/global';

import { CDN_ASSETS_PREFIX } from 'utils/uri';
import SubmitButton from 'presentation-component/ui/submit-button/component';
import { auth } from 'utils/auth';
import { DISCOUNT_CODE_TAB } from 'constants/application/discount-code';
import { objectToHash } from 'utils';
import Image from 'presentation-component/ui/image/component';
import { CustomCurrencyType, formatCurrency } from 'utils/currency';
import { setReferrer } from 'utils/navigate';
import {
  listAccountNavigation,
  listProductNavigation,
  listPromotionNavigation as _listPromotionNavigation
} from './initialize';
import { renderTooltip } from './view-icon-list';
import { IFeature, IFeatures, IUser } from './model';
import style from './style.module.scss';

const Feature: React.FC<IFeature> = (props) => {
  const {
    icon,
    name = 'default name',
    img = '',
    description = 'default description',
    title = 'default name',
    url = '/',
    disFeaturesUrl = [],
    classNames = {},
    isBriefVersion = false
  } = props;
  const [isActive, setIsActive] = useState(false);
  const { wrapper, iconWrapper, iconInner, textContainer, descriptionC, titleC } = classNames;
  const pathCur = useLocation();

  useEffect(() => {
    if (!disFeaturesUrl.includes(url) && pathCur.pathname.includes(url)) setIsActive(true);
    else setIsActive(false);
  }, [disFeaturesUrl, pathCur, url]);

  const TextContainer = () => (
    <>
      {isBriefVersion ? (
        renderTooltip(name)
      ) : (
        <div className={classnames(style.textContainer, !!textContainer && textContainer)}>
          <span className={classnames(style.description, !!descriptionC && descriptionC)}>{description}</span>
          <span className={classnames(style.title, !!titleC && titleC)}>{title}</span>
        </div>
      )}
    </>
  );

  return (
    <NavLink
      to={url}
      className={classnames(
        style.feature,
        !!wrapper && wrapper,
        isActive && style.activeFeature,
        isBriefVersion && style.brief
      )}
    >
      {img ? (
        <div className={style.imgWrapper}>
          <Image className={style.imgInner} alt={'avatar'} src={img} />
        </div>
      ) : (
        <div className={classnames(style.iconWrapper, !!iconWrapper && iconWrapper)}>
          <SvgIcon
            {...icon}
            className={classnames(style.iconInner, !!iconInner && iconInner, isBriefVersion && style.iconInnerList)}
          />
        </div>
      )}
      <TextContainer />
    </NavLink>
  );
};

const defaultList: Array<IFeature> = [
  {
    id: 0,
    name: 'MAGAZINES',
    icon: {
      name: 'magazine'
    },
    description: 'Thông tin hot',
    title: 'Lixi Magazines',
    url: ROUTING_MAGAZINE
  },
  {
    id: 1,
    name: 'CỘNG ĐỒNG',
    icon: {
      name: 'message-heart'
    },
    description: 'Kết nối bạn bè',
    title: 'Trang cộng đồng',
    url: ROUTING_COMMUNITY_PATH
  }
];

const ListNav = ({ list, isWithSeparateLine = true, isWithOutBottomPadding = false }) => {
  if (!list) return null;

  return (
    <>
      <div className={classnames(style.listNavFeature, { [style.withOutBottomPadding]: !!isWithOutBottomPadding })}>
        {list.map(ListNavItemFeature)}
      </div>
      {!!isWithSeparateLine && <Line />}
    </>
  );
};

function ListNavItemFeature(item, index) {
  const iconProps = {
    key: `icon-userfeature-${index}`,
    name: item.icon,
    className: classnames(style.navItemIconFeature, { [style[item.icon]]: true })
  };

  const GeneralContent = () => (
    <>
      <SvgIcon {...iconProps} />
      <div className={style.infoItem}>
        {!!item.title && (
          <div className={style.title}>
            {item.title}
            {item.badge && <span className={style.badge}>{item.badge}</span>}
          </div>
        )}

        {!!item.description && <div className={style.description}> {item.description}</div>}
      </div>
    </>
  );

  return (
    <NavLink to={item.link} key={`item-userfeature-${item.id || index}`} className={style.listNavItemFeature}>
      <GeneralContent />
    </NavLink>
  );
}

const Line = (props) => {
  const { classname } = props;
  return <div className={classnames(style.line, classname && classname)} />;
};

const Functions = ({ userInfo, availableSchemes, className }) => {
  const availableSchemeList =
    !!availableSchemes && (availableSchemes.byQuery[objectToHash({ status: 'available' })] || []);
  const defaultReferralSchemeRewardMessage = availableSchemeList[0]?.referrer?.reward_message || '';
  const myProfileLink = !!userInfo ? `${ROUTING_COMMUNITY_USER_FEED_PATH}/${userInfo.referral_code}` : '';
  const discountCodePromoEntry = {
    icon: 'discount-code',
    title: 'Mã giảm giá',
    badge: 'Hot',
    link: `${ROUTING_VOUCHERS_PATH}?tab=${DISCOUNT_CODE_TAB.SuggestionDiscountCodes.slug}`
  };
  const listPromotionNavigation = [
    ..._listPromotionNavigation,
    {
      icon: 'user-plus',
      title: 'Giới thiệu bạn bè',
      description: defaultReferralSchemeRewardMessage ? `Nhận ngay ${defaultReferralSchemeRewardMessage}` : '',
      link: ROUTING_USER_INVITE
    }
  ];
  const promotionNavs = Array.isArray(listPromotionNavigation)
    ? [discountCodePromoEntry, ...listPromotionNavigation]
    : [discountCodePromoEntry];

  return (
    <div className={classnames(style.function, className)}>
      {!!auth.loggedIn() && !!listAccountNavigation && <ListNav list={listAccountNavigation(myProfileLink)} />}
      {!!listProductNavigation && <ListNav list={listProductNavigation} />}
      {!!promotionNavs && <ListNav list={promotionNavs} isWithSeparateLine={false} />}
    </div>
  );
};

const Component = ({ content, propsItem }) => (
  <div className={classnames(style.userInfo, style.userInfoContainer)}>
    <Feature {...propsItem} />
    {content}
  </div>
);

const UserFeature: React.FC<IUser> = (props) => {
  const AVATAR = CDN_ASSETS_PREFIX('/user/avatar.png');

  const {
    accountInfor,
    data = {
      id: 1,
      name: 'Tài khoản',
      img: AVATAR,
      description: 'Hi, Beautiful',
      title: 'Đăng nhập ngay',
      url: ROUTING_AUTH_SIGN_IN
    },
    disFeaturesUrl,
    availableSchemes,
    signOut
  } = props;
  const { userInfo, history, signInStatus } = accountInfor;
  const memberLevel = (level: number = 0) => {
    switch (level) {
      case 1:
        return 'SILVER';
      case 2:
        return 'GOLD';
      case 3:
        return 'DIAMOND';
      default:
        return 'MEMBER';
    }
  };

  const contentNoSignin = (
    <div className={classnames(style.container, style.userInfoAction)}>
      <div className={style.note}>
        Đăng nhập để trải nghiệm những
        <br />
        ưu đãi độc quyền của bạn tại Lixibox
      </div>
      <div className={style.buttonContainer}>
        <SubmitButton
          link={{ to: ROUTING_AUTH_SIGN_IN }}
          onSubmit={() => setReferrer()}
          type={'link'}
          title={'Đăng nhập'}
          classes={{ container: style.btnAuth }}
          color={'black'}
        />
        <SubmitButton
          link={{ to: ROUTING_AUTH_SIGN_UP }}
          onSubmit={() => setReferrer()}
          type={'link'}
          title={'Đăng ký'}
          classes={{ container: style.btnAuth }}
          color={'borderBlack'}
        />
      </div>
      <Line />
      <Functions userInfo={userInfo} availableSchemes={availableSchemes} className={''} />
    </div>
  );

  const contentSignin = (
    <div className={classnames(style.container, style.userInfoAction)}>
      {userInfo?.is_admin && (
        <a
          href={process.env.REACT_APP_ADMIN_FQDN}
          key={`item-admin-platform}`}
          className={style.admin}
          target={'_blank'}
          rel="noreferrer"
        >
          <SvgIcon name={'setting'} className={style.iconAdmin} />
          <div className={style.title}>Admin - Trang quản trị</div>
        </a>
      )}
      <Line />
      <Functions userInfo={accountInfor.userInfo} availableSchemes={availableSchemes} className={style.signedIn} />
      <div className={style.signOut}>
        <SubmitButton color={'borderBlack'} title={'Đăng xuất'} classes={{ container: style.btn }} onSubmit={signOut} />
      </div>
    </div>
  );

  const render = () => {
    let propsItem = Object.assign({}, data, { disFeaturesUrl: disFeaturesUrl });

    switch (signInStatus) {
      case SIGN_IN_STATE.NO_LOGIN:
        propsItem = Object.assign({}, propsItem, history);
        return <Component content={contentNoSignin} propsItem={propsItem} />;
      case SIGN_IN_STATE.LOGIN_FAIL:
        propsItem = Object.assign({}, propsItem, history);
        return <Component content={contentNoSignin} propsItem={propsItem} />;
      case SIGN_IN_STATE.LOGIN_SUCCESS:
        const coins =
          userInfo && userInfo.coins > 0
            ? `/ ${formatCurrency(userInfo.coins, { suffix: CustomCurrencyType.LIXICOIN })}`
            : '';
        const level = memberLevel(userInfo.membership_level);
        const title = `${level} ${coins}`;
        const newData = {
          ...data,
          img: userInfo.avatar.thumb_url,
          description: userInfo.name,
          title: title,
          url: ROUTING_USER_ORDER
        };
        propsItem = Object.assign({}, newData, { disFeaturesUrl: disFeaturesUrl }, accountInfor);
        return <Component propsItem={propsItem} content={contentSignin} />;
      default:
        return null;
    }
  };

  return render();
};

const Features: React.FC<IFeatures> = (props) => {
  const { list = defaultList, themeHeader = [], accountInfor, availableSchemes, signOut } = props;
  const disFeaturesUrl = [ROUTING_AUTH_SIGN_IN, ROUTING_USER_ORDER];

  const userProps = {
    accountInfor,
    disFeaturesUrl,
    availableSchemes,
    signOut,
    isBriefVersion: false
  };

  return (
    <div className={style.containerFeature}>
      <div className={style.expandedVerContainer}>
        {Array.isArray(list) &&
          list.map((item) => {
            const props = Object.assign({}, item, { themeHeader });
            return <Feature key={item.url} {...props} />;
          })}
      </div>
      <div className={style.briefVerContainer}>
        {Array.isArray(list) &&
          list.map((item) => {
            const props = Object.assign({}, item, { themeHeader, isBriefVersion: true });
            return <Feature key={item.url} {...props} />;
          })}
      </div>
      <UserFeature {...userProps} />
    </div>
  );
};
export default Features;
