import { NavLink, useHistory } from 'react-router-dom';
import Icon from 'components/ui/icon';
import SvgIcon from 'presentation-component/ui/icon';
import { ROUTING_SHOP_INDEX, ROUTING_AUTH_FORGOT_PASSWORD } from 'routings/path';
import { isEmptyObject } from 'utils/validate';
import AppleSigninBlock from 'components/auth/apple-signin-block';
import GoogleSigninBlock from 'components/auth/google-signin-block';
import FacebookSigninBlock from 'components/auth/facebook-signin-block';
import FadeIn from 'container/layout/fade-in';
import { IProps } from '../model';
import STYLE from './style';
import styles from './style.module.scss';

const View = ({
  title,
  description,
  descriptionVisibility,
  mainContainer,
  customMobileTopContainer,
  userReferrerProfile,
  mobileBottomLink,
  isShowMobileTop,
  withMobileDescription,
  withoutSocialButtons,
  socialButtonHint,
  socialAuthIntent,
  referrer
}: IProps) => {
  const history = useHistory();
  const shouldRenderSocialLoginButton =
    !withoutSocialButtons && window.location.pathname !== ROUTING_AUTH_FORGOT_PASSWORD;
  // Promotion params
  const avatarUrl = userReferrerProfile?.avatar?.original_url || '';
  const userName = `${userReferrerProfile?.last_name} ${userReferrerProfile?.first_name}`;

  return (
    <div style={STYLE.mobile.container}>
      <div style={STYLE.mobile.mainContainer}>
        {/* Top */}
        {!!isShowMobileTop && (
          <div style={STYLE.mobile.top}>
            <div style={STYLE.mobile.top.iconList}>
              <div
                onClick={() => {
                  history.length >= 3 ? history.goBack() : history.push(ROUTING_SHOP_INDEX);
                }}
                style={STYLE.mobile.top.link}
              >
                <Icon
                  {...{
                    name: 'angle-left',
                    style: STYLE.mobile.top.icon,
                    innerStyle: STYLE.mobile.top.innerIcon
                  }}
                />
              </div>
            </div>
          </div>
        )}
        {/* Heading */}
        <NavLink to={ROUTING_SHOP_INDEX} className={styles.mobileHeading}>
          <SvgIcon name={'logo-full'} className={styles.logoFull} />
          <SvgIcon name={'logo-text'} className={styles.logoText} />
        </NavLink>
        {!!customMobileTopContainer && customMobileTopContainer}
        {!isEmptyObject(userReferrerProfile) && (
          <div style={STYLE.leftContent.promotion}>
            <div style={STYLE.leftContent.promotion.avatarWrap}>
              <div style={STYLE.leftContent.promotion.avatar(avatarUrl)}></div>
            </div>
            <div style={STYLE.leftContent.promotion.title}>
              {userName} tặng bạn một vài món quà khi mua sắm tại Lixibox
            </div>
            <div style={STYLE.leftContent.promotion.note}>
              Đăng ký ngay hôm nay để được nhận quà tặng cho đơn hàng đầu tiên.
            </div>
          </div>
        )}
        <FadeIn>
          {/* Main */}
          <div style={STYLE.mobile.main}>
            <div className={styles.mobileHeadingTitle}>{title}</div>
            {withMobileDescription && !!description && descriptionVisibility.mobile && (
              <div className={styles.mobileHeadingDescription}>{description}</div>
            )}
            {mainContainer}
          </div>
        </FadeIn>
        {shouldRenderSocialLoginButton && (
          <>
            {!!socialButtonHint && <div style={STYLE.mobile.fbButtonHeading}>{socialButtonHint}</div>}
            <FacebookSigninBlock
              referrer={referrer || ROUTING_SHOP_INDEX}
              intent={socialAuthIntent}
              classes={{ container: styles.facebookSigninContainerMobile }}
            />
            <GoogleSigninBlock
              referrer={referrer || ROUTING_SHOP_INDEX}
              intent={socialAuthIntent}
              classes={{ container: styles.googleSigninContainerMobile }}
            />
            <AppleSigninBlock
              authType="sign-in"
              intent={socialAuthIntent}
              className={styles.appleLoginContainerMobile}
            />
            <div style={{ marginBottom: 10 }} />
          </>
        )}
      </div>
      {!!mobileBottomLink && (
        <FadeIn>
          {/* Mobile bottom link */}
          <div className={styles.mobileBottomLink}>
            {mobileBottomLink.text}
            <NavLink className={styles.link} to={mobileBottomLink.link}>
              {mobileBottomLink.linkTitle}
            </NavLink>
          </div>
        </FadeIn>
      )}
    </div>
  );
};

export default View;
