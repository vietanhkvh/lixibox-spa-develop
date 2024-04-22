import { NavLink } from 'react-router-dom';

import * as VARIABLE from '../../../style/variable';
import { auth } from '../../../utils/auth';

import Icon from '../../ui/icon';

import { IProps } from './model';
import STYLE from './style';

const renderMobile = ({ props, handleSignOut }) => {
  const { list = [], style } = props as IProps;

  const generateLinkProps = (count, item, index) => ({
    key: `item-${index}`,
    style: Object.assign({}, STYLE.itemMobile, item.withBorder && STYLE.itemMobile.mobileItemBoder),
    to: item.link
  });

  const generateIconProps = (item) => ({
    name: item.icon,
    style: Object.assign({}, STYLE.itemMobile.icon, { color: item.color }),
    innerStyle: Object.assign({}, STYLE.itemMobile.innerIcon, item.iconStyle)
  });

  const userSignOutNavigation = {
    icon: 'sign-out',
    title: 'Đăng xuất',
    description: 'Đăng xuất tài khoản khỏi Lixibox',
    color: VARIABLE.colorBlack
  };

  const iconSignOutProps = generateIconProps(userSignOutNavigation);
  const linkSignOutProps = {
    to: '',
    onClick: handleSignOut
  };

  return (
    <div style={Object.assign({}, STYLE.container, style)}>
      {Array.isArray(list) &&
        list.map((item, index) => {
          const iconProps = generateIconProps(item);
          const linkProps = generateLinkProps((list && list.length) || 0, item, index);

          return item.title.length === 0 || item.title === 'Thông báo' ? null : (
            <NavLink {...linkProps}>
              <div key={`item-${index}`} style={STYLE.item.inner}>
                <Icon {...iconProps} />
                <div style={STYLE.itemMobile.groupTitle}>
                  <span style={Object.assign({}, STYLE.itemMobile.title, item.textStyle)}>{item.title}</span>
                </div>
              </div>
            </NavLink>
          );
        })}
      {true === auth.loggedIn() ? (
        <NavLink {...linkSignOutProps}>
          <div style={STYLE.item.inner}>
            <Icon {...iconSignOutProps} />
            <div style={STYLE.itemMobile.groupTitle}>
              <span style={STYLE.itemMobile.title}>{userSignOutNavigation.title}</span>
            </div>
          </div>
        </NavLink>
      ) : null}
    </div>
  );
};

export default renderMobile;
