import { NavLink, useHistory } from 'react-router-dom';
import classnames from 'classnames';

import SvgIcon from 'presentation-component/ui/icon';
import Image from 'presentation-component/ui/image';
import SeparateLine from 'presentation-component/ui/separate-line';
import SubmitButton from 'presentation-component/ui/submit-button/component';
import AvatarWithMembershipProgress from 'presentation-component/user/avatar-with-membership-progress';
import MembershipProgressbar from 'presentation-component/user/membership-progressbar';
import {
  ROUTING_AUTH_SIGN_IN,
  ROUTING_AUTH_SIGN_UP,
  ROUTING_BALANCE,
  ROUTING_LIXI_COIN,
  ROUTING_MEMBERSHIP_FAQ,
  ROUTING_USER_PROFILE_EDIT
} from 'routings/path';
import { auth } from 'utils/auth';
import { CustomCurrencyType, formatCurrency } from 'utils/currency';
import { setReferrer } from 'utils/navigate';
import { mergeStyle } from 'utils/responsive';
import { CDN_ASSETS_PREFIX } from 'utils/uri';

import { IProps } from './model';
import STYLE from './style';
import styles from './style.module.scss';

const AVATAR = CDN_ASSETS_PREFIX('/user/avatar.png');

const UserInfo = ({
  style,
  userInfo,
  membershipInfo,
  getEmailVerificationAction,
  requestPhoneVerificationOtpAction,
  isDisplayStatSection = true
}: IProps) => {
  const history = useHistory();

  const ruleList: Array<string> = [];
  userInfo && userInfo.is_admin && ruleList.push('ADMIN');
  const shouldShowEmailVerificationWarning = userInfo?.email_verified === false;
  const shouldShowPhoneVerificationWarning = userInfo?.phone_verified === false;
  const onEmailVerify = () => {
    getEmailVerificationAction();
    const query = new URLSearchParams(history.location.search);
    if (history.location.pathname === ROUTING_USER_PROFILE_EDIT && query.get('modal') === 'otpConfirmation') {
      history.replace(ROUTING_USER_PROFILE_EDIT);
      setTimeout(() => {
        history.replace(`${ROUTING_USER_PROFILE_EDIT}?modal=otpConfirmation`);
      }, 200);
    } else {
      history.push(`${ROUTING_USER_PROFILE_EDIT}?modal=otpConfirmation`);
    }
  };
  const onEmailUpdate = () => {
    const query = new URLSearchParams(history.location.search);
    if (history.location.pathname === ROUTING_USER_PROFILE_EDIT && query.get('modal') === 'emailUpdate') {
      history.replace(ROUTING_USER_PROFILE_EDIT);
      setTimeout(() => {
        history.replace(`${ROUTING_USER_PROFILE_EDIT}?modal=emailUpdate`);
      }, 200);
    } else {
      history.push(`${ROUTING_USER_PROFILE_EDIT}?modal=emailUpdate`);
    }
  };
  const onPhoneEntry = () => {
    const query = new URLSearchParams(history.location.search);
    if (history.location.pathname === ROUTING_USER_PROFILE_EDIT && query.get('modal') === 'phoneUpdate') {
      history.replace(ROUTING_USER_PROFILE_EDIT);
      setTimeout(() => {
        history.replace(`${ROUTING_USER_PROFILE_EDIT}?modal=phoneUpdate`);
      }, 200);
    } else {
      history.push(`${ROUTING_USER_PROFILE_EDIT}?modal=phoneUpdate`);
    }
  };
  const onPhoneVerify = () => {
    requestPhoneVerificationOtpAction({ phone: userInfo?.phone || '' });
    const query = new URLSearchParams(history.location.search);
    if (history.location.pathname === ROUTING_USER_PROFILE_EDIT && query.get('modal') === 'phoneOtpConfirmation') {
      history.replace(ROUTING_USER_PROFILE_EDIT);
      setTimeout(() => {
        history.replace(`${ROUTING_USER_PROFILE_EDIT}?modal=phoneOtpConfirmation`);
      }, 200);
    } else {
      history.push(`${ROUTING_USER_PROFILE_EDIT}?modal=phoneOtpConfirmation`);
    }
  };

  return (
    <>
      {true === auth.loggedIn() ? (
        <div className={styles.newContainer}>
          <div className={styles.userSection}>
            <AvatarWithMembershipProgress user={userInfo} />
            <div className={styles.userInfo}>
              <div className={styles.username}>{(userInfo && userInfo.name) || ''}</div>
              <UserLevel info={userInfo} />
            </div>
          </div>
          {isDisplayStatSection && (
            <div className={styles.statSection}>
              <NavLink to={ROUTING_BALANCE} className={styles.item}>
                <SvgIcon name={'color-wallet'} className={styles.icon} />
                <div className={styles.info}>
                  <div className={styles.heading}>Số dư Ví</div>
                  <div className={styles.value}>{formatCurrency(userInfo?.balance || 0, { suffix: true })}</div>
                </div>
              </NavLink>
              <NavLink to={ROUTING_LIXI_COIN} className={styles.item}>
                <SvgIcon name={'color-lixicoin'} className={styles.icon} />
                <div className={styles.info}>
                  <div className={styles.heading}>Lixicoin</div>
                  <div className={classnames(styles.value, styles.highLight)}>
                    {userInfo && formatCurrency(userInfo.coins, { suffix: CustomCurrencyType.LIXICOIN })}
                  </div>
                </div>
              </NavLink>
            </div>
          )}
          <MembershipProgressbar
            userInfo={userInfo}
            membershipInfo={membershipInfo}
            infoPath={ROUTING_MEMBERSHIP_FAQ}
          />
          {shouldShowEmailVerificationWarning && (
            <div className={styles.emailVerificationWarning}>
              {!!userInfo?.email_update_required ? (
                <>
                  Vui lòng cập nhật email để theo dõi thông tin đơn hàng.{' '}
                  <span onClick={onEmailUpdate}>Cập nhật ngay</span>
                </>
              ) : (
                <>
                  Email chưa xác thực. <span onClick={onEmailVerify}>Xác thực ngay</span>
                </>
              )}
            </div>
          )}
          {!shouldShowEmailVerificationWarning && shouldShowPhoneVerificationWarning && (
            <div className={styles.phoneVerificationWarning}>
              {!!userInfo?.phone ? (
                <>
                  Số điện thoại chưa xác thực. <span onClick={onPhoneVerify}>Xác thực ngay</span>
                </>
              ) : (
                <>
                  Vui lòng cập nhật số điện thoại để nhận thêm nhiều ưu đãi.{' '}
                  <span onClick={onPhoneEntry}>Cập nhật ngay</span>
                </>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className={'user-info'} style={mergeStyle(STYLE.container, style) as any}>
          <Image alt={''} src={AVATAR} style={STYLE.emptyAvatar} />
          <div style={STYLE.noteHeading}>Đăng nhập</div>
          <div style={STYLE.note}>
            Để trải nghiệm những ưu đãi độc quyền
            <br /> của bạn tại Lixibox
          </div>
          <div style={STYLE.loginGroup}>
            <SubmitButton
              link={{ to: ROUTING_AUTH_SIGN_IN }}
              onSubmit={() => setReferrer()}
              type={'link'}
              title={'Đăng nhập'}
              classes={{ container: styles.authButton }}
              color={'black'}
            />
            <SubmitButton
              link={{ to: ROUTING_AUTH_SIGN_UP }}
              onSubmit={() => setReferrer()}
              type={'link'}
              title={'Đăng ký'}
              classes={{ container: styles.authButton }}
              color={'borderBlack'}
            />
          </div>
        </div>
      )}
      <SeparateLine />
    </>
  );
};

const LEVEL = [
  CDN_ASSETS_PREFIX('/lixicoin/level-member.png'),
  CDN_ASSETS_PREFIX('/lixicoin/level-silver.png'),
  CDN_ASSETS_PREFIX('/lixicoin/level-gold.png'),
  CDN_ASSETS_PREFIX('/lixicoin/level-diamond.png')
];

const UserLevel = ({ info }) => {
  if (!info) return null;

  const level = info.membership_level;
  if (level >= LEVEL.length || level < 0) return null;

  return (
    <NavLink to={ROUTING_LIXI_COIN} className={styles.levelInfo}>
      <Image alt={''} src={LEVEL[level] as any} />
    </NavLink>
  );
};

export default UserInfo;
