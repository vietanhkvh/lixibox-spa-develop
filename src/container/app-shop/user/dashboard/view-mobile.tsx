import classnames from 'classnames';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

import BoxMessage from '../../../../components/box-message';
import SubmitButton from '../../../../components/ui/submit-button';
import UserInfo from '../../../../components/user/user-info';
import { DISCOUNT_CODE_TAB } from '../../../../constants/application/discount-code';
import { ORDER_TYPE } from '../../../../constants/application/order';
import { SOCIAL_URL } from '../../../../constants/application/social';
import GeneralModal from '../../../../presentation-component/modal/general-modal';
import SvgIcon from '../../../../presentation-component/ui/icon';
import SeparateLine from '../../../../presentation-component/ui/separate-line';
import {
  ROUTING_USER_ORDER,
  ROUTING_COMMUNITY_USER_FEED_PATH,
  ROUTING_VOUCHERS_PATH,
  ROUTING_USER_INVITE,
  ROUTING_USER_INVITE_HISTORY
} from '../../../../routings/path';
import { objectToHash, checkMessageReminder, checkUserInfoFields } from '../../../../utils';
import { auth } from '../../../../utils/auth';
import { isMobileVersion } from '../../../../utils/responsive';
import WrapLayout from '../../../layout/wrap';
import {
  listOrderNavigation,
  listAccountNavigation,
  listProductNavigation,
  listPromotionNavigation as _listPromotionNavigation,
  listInfoNavigation,
  listSocialNavigation
} from '../side-panel/initialize';
import { checkBirthdayGift } from 'utils/generic';

import { IProps } from './model';
import STYLE from './style';
import styles from './style.module.scss';

const renderView = (props: IProps) => {
  const {
    userStore: { orderCount },
    authStore: { profile },
    cartStore: { constants },
    referralStore: { availableSchemes },
    lixicoinStore: { membershipInfo },
    signOutAction,
    openAlertAction,
    orderStore: {
      birthdayOrder: { orders, storeOrders }
    }
  } = props;
  const availableSchemeList = availableSchemes.byQuery[objectToHash({ status: 'available' })] || [];
  const myProfileLink = profile?.referral_code ? `${ROUTING_COMMUNITY_USER_FEED_PATH}/${profile.referral_code}` : '';

  const userInfoProps = {
    openAlert: openAlertAction,
    userInfo: profile,
    membershipInfo,
    style: STYLE.mobileUserInfoContainer
  };
  const isReceivedBirthdayGift = checkBirthdayGift(orders, storeOrders);
  const BoxMessageProps = {
    message: checkMessageReminder(profile, isReceivedBirthdayGift)
  };
  const isUpdatedAllUserInfoFields = checkUserInfoFields(profile);

  const defaultReferralSchemeRewardMessage = availableSchemeList[0]?.referrer?.reward_message || '';
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
    },
    {
      icon: 'user-referral',
      title: 'Lịch sử giới thiệu bạn bè',
      link: ROUTING_USER_INVITE_HISTORY
    }
  ];
  const promotionNavs = Array.isArray(listPromotionNavigation)
    ? [discountCodePromoEntry, ...listPromotionNavigation]
    : [discountCodePromoEntry];

  const phone = constants.phone || '';

  return (
    <div className={'user-dashboard-container'}>
      <WrapLayout>
        <UserInfo {...userInfoProps} />

        {!!auth.loggedIn() && !!listOrderNavigation && (
          <OrderNavigation orderCount={orderCount} listOrderNavigation={listOrderNavigation} />
        )}
        {!!auth.loggedIn() && (
          <>
            <BoxMessage {...BoxMessageProps} />
            <SeparateLine />
          </>
        )}
        {!!auth.loggedIn() && !!listAccountNavigation && (
          <ListNav
            list={listAccountNavigation(myProfileLink)}
            isUpdatedAllUserInfoFields={isUpdatedAllUserInfoFields}
          />
        )}
        {!!listProductNavigation && <ListNav list={listProductNavigation} />}
        {!!promotionNavs && <ListNav list={promotionNavs} />}
        {!!listInfoNavigation && (
          <ListNav isWithOutBottomPadding={true} list={listInfoNavigation} isWithSeparateLine={false} phone={phone} />
        )}
        <SocialLink />
        {!!auth.loggedIn() && <SignOut onSignOut={signOutAction} />}
      </WrapLayout>
    </div>
  );
};

export const OrderNavigation = ({ orderCount, listOrderNavigation, className = '' }) => {
  const { firstRow, secondRow } = listOrderNavigation;
  if (!firstRow || !secondRow) return null;

  const orderStatuses = orderCount.index;
  const formatedFirstRow = firstRow.map((item) => {
    let count = 0;

    !!orderStatuses &&
      orderStatuses.forEach((status) => {
        if (!status || !status.status || (item.type.length === 1 && item.type[0] === ORDER_TYPE.FULFILLED)) return;

        count = item.type.reduce((acc, type) => (status.status === type ? acc + status.count : acc), count);
      });

    return {
      ...item,
      count
    };
  });

  return (
    <>
      <div className={classnames(styles.orederMav, className)}>
        <div className={styles.heading}>
          <div className={classnames(styles.title, { [styles.desktop]: !isMobileVersion() })}>Lịch sử mua hàng</div>
          <NavLink to={ROUTING_USER_ORDER} className={styles.viewall}>
            Xem tất cả <SvgIcon name={'angle-right'} className={styles.viewAllIcon} />
          </NavLink>
        </div>
        <div className={styles.firstRow}>
          {Array.isArray(formatedFirstRow) && formatedFirstRow.map(OrderItem, { isLargeItem: false })}
        </div>
        <div className={styles.secondRow}>
          {Array.isArray(secondRow) && secondRow.map(OrderItem, { isLargeItem: true })}
        </div>
      </div>
      <SeparateLine />
    </>
  );
};

function OrderItem(item, index) {
  if (!item) return null;

  const iconProps = {
    name: item.icon,
    className: classnames(styles.orderItemIcon, { [styles[item.icon]]: true })
  };

  return (
    <NavLink
      key={`item-${item.id || index}`}
      to={item.link}
      className={classnames(styles.orderItem, { [styles.isLargeItem]: !!this.isLargeItem })}
    >
      <SvgIcon {...iconProps} />
      <div className={styles.name}>{item.title}</div>
      {!!item.count && <div className={styles.orderCount}>{item.count >= 10 ? '9+' : item.count}</div>}
    </NavLink>
  );
}

export const ListNavWithTitle = ({
  list,
  title,
  isWithSeparateLine = true,
  className = '',
  isForceToggleOpen = false,
  isUpdatedAllUserInfoFields = false
}) => {
  // if (!list || !list.lengh) return null;

  const [isToggleOpen, setDisplay] = useState(isForceToggleOpen);
  const selectPathName = list.find((item) => item.link === window.location.pathname);
  const forceOpen = !!selectPathName;

  const isOpen = forceOpen || isToggleOpen;

  return (
    <div
      className={classnames(styles.listNavWithTitle, { [styles.isHiddenContent]: !isOpen }, className)}
      style={{
        maxHeight: !!isOpen ? 15 + 40 + (10 + list.length * 50 + 10) : 15 + 40 + 15
      }}
    >
      <div className={styles.heading} onClick={() => setDisplay(!isToggleOpen)}>
        {title}
        <SvgIcon className={styles.icon} name={isOpen ? 'minus' : 'add'} />
      </div>
      <div className={classnames(styles.content, { [styles.isOpen]: !!isOpen })}>
        <ListNav {...{ list, isWithSeparateLine, isUpdatedAllUserInfoFields }} />
      </div>
    </div>
  );
};

export const ListNav = ({
  list,
  phone = '',
  isWithSeparateLine = true,
  isWithOutBottomPadding = false,
  isUpdatedAllUserInfoFields = false
}) => {
  if (!list) return null;

  return (
    <>
      {' '}
      <div className={classnames(styles.listNav, { [styles.withOutBottomPadding]: !!isWithOutBottomPadding })}>
        {list.map((item, index) => ListNavItem(item, index, isUpdatedAllUserInfoFields, phone))}
      </div>
      {!!isWithSeparateLine && <SeparateLine />}
    </>
  );
};

function ListNavItem(item, index, isUpdatedAllUserInfoFields = false, phone = '') {
  const iconProps = {
    name: item.icon,
    className: classnames(styles.navItemIcon, { [styles[item.icon]]: true })
  };

  const GeneralContent = () => {
    if (item.isHotlineItem && !phone) return null;

    return (
      <>
        {' '}
        <SvgIcon {...iconProps} />
        <div className={styles.infoItem}>
          {!!item.title && (
            <div className={styles.title}>
              {item.title}
              {item.isHotlineItem ? phone : ''}
              {item.badge && <span className={styles.badge}>{item.badge}</span>}
              {item.icon === 'user' && !isUpdatedAllUserInfoFields && (
                <SvgIcon name="color-warning-info" className={styles.infoIcon} />
              )}
            </div>
          )}
          {!!item.description && <div className={styles.description}> {item.description}</div>}
        </div>
      </>
    );
  };

  if (!!item.isExternalLink) {
    if (item.isHotlineItem && !phone) return null;

    return (
      <a
        href={`${item.link}${item.isHotlineItem ? phone : ''}`}
        key={`item-dashboard-${item.id || index}`}
        className={styles.listNavItem}
        target={'_blank'}
        rel="noreferrer"
      >
        <GeneralContent />
      </a>
    );
  }

  if (item.isAction) {
    return (
      <NavLink
        to="#"
        key={`item-dashboard-${item.id || index}`}
        onClick={() => item.action()}
        className={styles.listNavItem}
      >
        <GeneralContent />
      </NavLink>
    );
  }

  return (
    <NavLink to={item.link} key={`item-dashboard-${item.id || index}`} className={styles.listNavItem}>
      <GeneralContent />
    </NavLink>
  );
}

function SocialLink() {
  if (!listSocialNavigation) return null;

  return (
    <>
      {ListNavItem(
        {
          icon: 'connect',
          title: 'Liên hệ với chúng tôi',
          isExternalLink: true,
          link: SOCIAL_URL.messager
        },
        1
      )}
      <div className={styles.socialLink}>
        {Array.isArray(listSocialNavigation) && listSocialNavigation.map((item, index) => ListNavItem(item, index))}
      </div>
    </>
  );
}

function SignOut({ onSignOut }) {
  const [isConfirmation, setConfirmation] = useState(false);

  return (
    <div className={styles.signOut}>
      <SubmitButton
        color={'borderBlack'}
        title={'Đăng xuất'}
        svgIcon={'sign-out'}
        svgIconClass={styles.icon}
        style={{ margin: 0 }}
        onSubmit={() => setConfirmation(true)}
      />

      <GeneralModal
        isOpen={isConfirmation}
        title="Đăng xuất"
        leftTitle=""
        rightIcon={'close'}
        onRightActionClick={() => setConfirmation(false)}
        onRequestClose={() => setConfirmation(false)}
      >
        <div className={styles.signOutConfirmation}>
          <div className={styles.message}>Bạn có muốn đăng xuất khỏi Lixibox hay không?</div>

          <SubmitButton
            color={'black'}
            title={'Đăng xuất'}
            svgIcon={'sign-out'}
            svgIconClass={styles.icon}
            style={{ margin: 0 }}
            onSubmit={onSignOut}
          />
        </div>
      </GeneralModal>
    </div>
  );
}
export default renderView;
