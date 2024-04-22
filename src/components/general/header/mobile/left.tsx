import { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { SIGN_IN_STATE } from '../../../../constants/application/global';
import { decodeEntities } from '../../../../utils/encode';
import { isEmptyObject } from '../../../../utils/validate';

import Icon from '../../../ui/icon';

import {
  navigateAdmin,
  navigateExpert,
  navigateMagazine,
  navigateLixicointConvert,
  setReferrer
} from '../../../../utils/navigate';

import { ROUTING_PRODUCT_CATEGORY_PATH, ROUTING_AUTH_SIGN_IN } from '../../../../routings/path';
import { signOutAction } from '../../../../flows/auth/action';

import * as LAYOUT from '../../../../style/layout';
import STYLE from './left.style';
import styles from './left.module.scss';

/**  PROPS & STATE INTERFACE */
interface ILeftNavigationMobileProps {
  history?: any;
  closeLeftPanel?: any;
  signOut?: any;
  userInfo?: any;
  signInStatus?: string;
  menuStore?: any;
}

export function mapStateToProps(state) {
  return {
    menuStore: state.menu,
    userInfo: state.auth.userInfo,
    signInStatus: state.auth.signInStatus
  } as ILeftNavigationMobileProps;
}

export function mapDispatchToProps(dispatch) {
  return {
    signOut: (): void => dispatch(signOutAction())
  } as ILeftNavigationMobileProps;
}

export class LeftNavigationMobile extends Component<ILeftNavigationMobileProps, any> {
  static defaultProps = {
    signOut: () => {},
    userInfo: {},
    signInStatus: SIGN_IN_STATE.NO_LOGIN
  } as ILeftNavigationMobileProps;
  constructor(props) {
    super(props);

    this.state = {
      menuFormated: [],
      listCategoryReject: [841, 992, 844],
      login: true,
      openMenuProfile: false,
      userInfoListAction: [
        {
          id: 1,
          keyCode: 'profile',
          title: 'Tài khoản',
          spacer: false
        },
        // {
        //   id: 2,
        //   keyCode: 'expert',
        //   title: 'Expert Platform',
        //   spacer: false
        // },
        {
          id: 3,
          keyCode: 'admin',
          title: 'Admin Platform',
          spacer: true
        },
        {
          id: 4,
          keyCode: 'sign-out',
          title: 'Đăng xuất',
          spacer: false
        }
      ]
    };
  }

  componentDidMount() {
    this.initMenu();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.initMenu(nextProps);
  }

  initMenu(props = this.props) {
    const {
      menuStore: { listMenu = { browse_nodes: [] } }
    } = props;
    const { listCategoryReject } = this.state;

    if (true === isEmptyObject(listMenu)) {
      return;
    }

    let menuFormated: Array<any> = [];
    listMenu.browse_nodes.forEach((rootItem) => {
      if ('beauty-box' === rootItem.slug) {
        rootItem.open = false;
        menuFormated.push(rootItem);
      } else {
        rootItem &&
          rootItem.sub_nodes.forEach((item) => {
            if (listCategoryReject.indexOf(item.id) < 0) {
              item.open = false;
              menuFormated.push(item);
            }
          });
      }
    });

    this.setState({ menuFormated });
  }

  toggleMenuItem = (_menuItem) => {
    this.setState((prevState, props) => ({
      menuFormated: prevState.menuFormated.map((menuItem) => {
        menuItem.open = menuItem.id !== _menuItem.id ? false : !_menuItem.open;
        return menuItem;
      })
    }));
  };

  handleUserInfoAction(itemMenu) {
    const { signOut, history } = this.props as ILeftNavigationMobileProps;

    switch (itemMenu.keyCode) {
      case 'profile':
        history.push('/user');
        break;
      case 'expert':
        navigateExpert();
        break;
      case 'admin':
        navigateAdmin();
        break;
      case 'sign-out':
        signOut();
        break;
    }
  }

  toggleMenuProfile = () => {
    this.setState((prevState, props) => ({
      openMenuProfile: !prevState.openMenuProfile
    }));
  };

  /** RENDER */
  render() {
    const { userInfo, signInStatus, closeLeftPanel, history } = this.props as ILeftNavigationMobileProps;

    const { menuFormated, userInfoListAction } = this.state;
    return (
      <div style={Object.assign({}, LAYOUT.flexContainer.justify, LAYOUT.flexContainer.verticalFlex, STYLE)}>
        {SIGN_IN_STATE.LOGIN_SUCCESS === signInStatus ? (
          /** Profile user */
          <div style={STYLE.profilePanel}>
            <Icon
              name={'close'}
              style={STYLE.closePanel}
              innerStyle={STYLE.closePanel.inner}
              onClick={this.props.closeLeftPanel}
            />
            <div
              style={Object.assign(
                {},
                { backgroundImage: `url('${userInfo.avatar_large_url}')` },
                STYLE.profilePanel.backgroundBlur
              )}
            />
            <div
              style={Object.assign(
                {},
                LAYOUT.flexContainer.verticalFlex,
                LAYOUT.flexContainer.verticalCenter,
                STYLE.profilePanel.container
              )}
            >
              <div
                style={Object.assign(
                  {},
                  { backgroundImage: `url('${userInfo.avatar_large_url}')` },
                  STYLE.profilePanel.avatar
                )}
              />
              <div style={STYLE.profilePanel.userName}>{decodeEntities(userInfo.name)}</div>
              <div
                style={Object.assign({}, STYLE.profilePanel.listNavigation, {
                  height: this.state.openMenuProfile ? userInfoListAction.length * 32 : 0,
                  opacity: this.state.openMenuProfile ? 1 : 0
                })}
              >
                {userInfoListAction.map((item) => (
                  <div
                    key={`userInfoListAction-${item.id}`}
                    style={STYLE.profilePanel.listNavigation.item}
                    onClick={() => {
                      this.handleUserInfoAction(item);
                    }}
                  >
                    {item.title}
                  </div>
                ))}
              </div>
              <Icon
                name={false === this.state.openMenuProfile ? 'angle-down' : 'angle-up'}
                style={STYLE.profilePanel.toggleNavigation}
                innerStyle={STYLE.profilePanel.toggleNavigation.inner}
                onClick={this.toggleMenuProfile}
              />
            </div>
          </div>
        ) : (
          /** Login button panel */
          <div
            style={Object.assign(
              {},
              LAYOUT.flexContainer.center,
              LAYOUT.flexContainer.verticalCenter,
              STYLE.loginPanel
            )}
          >
            <Icon
              name={'close'}
              style={STYLE.closePanel}
              innerStyle={STYLE.closePanel.inner}
              onClick={this.props.closeLeftPanel}
            />
            {/* TODO: Change the following `a` tag to div, span or button. */}
            {/* eslint-disable-next-line */}
            <a
              onClick={() => {
                closeLeftPanel();
                setReferrer();
                history.push(ROUTING_AUTH_SIGN_IN);
              }}
              key="buttonLogin"
              className={styles.loginPanelButton}
            >
              Sign In / Sign Up
            </a>
          </div>
        )}
        {/** List menu */}
        <div style={STYLE.menu}>
          {menuFormated.map((menuItem) => (
            <div key={menuItem.id}>
              <div style={Object.assign({}, LAYOUT.flexContainer.left, STYLE.menu.item)}>
                <div
                  style={Object.assign(
                    {},
                    LAYOUT.flexContainer.justify,
                    LAYOUT.flexContainer.verticalCenter,
                    STYLE.menu.item.sub
                  )}
                >
                  {/** Menu Item : Title */}
                  <div
                    onClick={() => {
                      closeLeftPanel();
                      history.push(`${ROUTING_PRODUCT_CATEGORY_PATH}/${menuItem.slug}`);
                    }}
                    style={STYLE.menu.item.title}
                  >
                    {decodeEntities(menuItem.name)}
                  </div>
                  {menuItem && menuItem.sub_nodes && menuItem.sub_nodes.length > 0 && (
                    <Icon
                      name={menuItem.open ? 'minus' : 'plus'}
                      style={STYLE.menu.item.sub.iconSub}
                      innerStyle={STYLE.menu.item.sub.iconSub.inner}
                      onClick={() => this.toggleMenuItem(menuItem)}
                    />
                  )}
                </div>
              </div>

              {/** Menu Item : Sub container */}
              {menuItem && menuItem.sub_nodes && menuItem.sub_nodes.length > 0 && (
                <div
                  style={Object.assign({}, STYLE.menu.item.subContainer, {
                    height: menuItem.open ? menuItem.sub_nodes.length * 32 : 0
                  })}
                  key={'sub-container-' + menuItem.id}
                >
                  {/** Sub menu item */}
                  {menuItem &&
                    menuItem.sub_nodes.map((subItem) => {
                      return (
                        <div
                          onClick={() => {
                            closeLeftPanel();
                            history.push(`${ROUTING_PRODUCT_CATEGORY_PATH}/${subItem.slug}`);
                          }}
                          style={STYLE.menu.item.subContainer.item}
                          key={subItem.id}
                        >
                          {decodeEntities(subItem.name)}
                        </div>
                      );
                    })}
                </div>
              )}
            </div>
          ))}
        </div>

        {/** Footer */}
        <div style={STYLE.footerInfo}>
          {/** Footer logo */}
          <NavLink
            style={Object.assign(
              {},
              LAYOUT.flexContainer.center,
              LAYOUT.flexContainer.verticalCenter,
              STYLE.footerInfo.logo
            )}
            to={'/'}
          >
            <Icon name={'logo-line'} style={STYLE.footerInfo.logo.line} innerStyle={STYLE.footerInfo.logo.line.inner} />
            <Icon name={'logo-text'} style={STYLE.footerInfo.logo.text} innerStyle={STYLE.footerInfo.logo.text.inner} />
          </NavLink>

          {/** List linked footer */}
          <div style={Object.assign({}, LAYOUT.flexContainer.center, STYLE.footerInfo.link)}>
            {/* TODO: Change the following `a` tag to div, span or button. */}
            {/* eslint-disable-next-line */}
            <a style={STYLE.footerInfo.link.item} onClick={navigateMagazine}>
              Magazine
            </a>
            {/* TODO: Change the following `a` tag to div, span or button. */}
            {/* eslint-disable-next-line */}
            <a style={STYLE.footerInfo.link.item} onClick={navigateLixicointConvert}>
              Đổi Lixicoin
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(LeftNavigationMobile);
