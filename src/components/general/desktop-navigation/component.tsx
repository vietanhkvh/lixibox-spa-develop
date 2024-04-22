import { Component } from 'react';

import { MAGAZINE_LIST_TYPE } from '../../../constants/application/magazine';
import { isMobileVersion } from '../../../utils/responsive';
import { isEmptyObject } from '../../../utils/validate';
import { scrollElement } from '../../../utils/scroll';
import { objectToHash } from '../../../utils/encode';

import {
  DEFAULT_PROPS,
  INITIAL_STATE,
  alphabetSameScroll,
  MOM_BABY_MENU_BANNER_PARAMS,
  BEST_DEAL_MENU_BANNER_PARAMS,
  BRANDS_MENU_BANNER_PARAMS,
  SHOP_GIFT_MENU_BANNER_PARAMS,
  MOM_BABY_MENU_BANNER_HASH,
  BEST_DEAL_MENU_BANNER_HASH,
  BRANDS_MENU_BANNER_HASH,
  SHOP_GIFT_MENU_BANNER_HASH
} from './initialize';
import { IProps, IState } from './model';
import renderView from './view';

class DesktopNavigation extends Component<IProps, IState> {
  static defaultProps = DEFAULT_PROPS as IProps;
  private timeOutHoverMenu: any;

  constructor(props: IProps) {
    super(props);
    this.state = INITIAL_STATE as IState;

    this.timeOutHoverMenu = null;
  }

  startTimeoutShowMenu() {
    if (null === this.timeOutHoverMenu) {
      this.timeOutHoverMenu = setTimeout(() => {
        this.setState({ isActiveMenu: true } as IState);
      }, 250);
    }
  }

  stopTimeoutShowMenu() {
    clearTimeout(this.timeOutHoverMenu);
    this.timeOutHoverMenu = null;
  }

  /**
   * Show Menu Desktop popup
   * @param id number : id to show sub menu
   */
  showMenuDesktop(_id) {
    this.setState({
      subMenuDesktop: {
        show: true,
        id: _id
      }
    } as IState);
  }

  /** Hide menu desktop popup */
  hideMenuDesktop() {
    this.stopTimeoutShowMenu();

    this.setState({
      isActiveMenu: false,
      subMenuDesktop: {
        show: false,
        id: ''
      }
    } as IState);
  }

  handleScrollView(id) {
    this.setState({ alphaBetBrandSelected: id });
    if (alphabetSameScroll.indexOf(id) === 0) {
      id = alphabetSameScroll[0]; // equal = U
    }

    var el = document.getElementById(`brand-alphabet-${id}`);

    if (el !== null) {
      const position = window.pageYOffset;
      el.scrollIntoView();
      scrollElement({ x: 0, y: position });
    }
  }

  shouldComponentUpdate(nextProps: IProps, nextState: IState) {
    const keyHash = objectToHash({
      page: 1,
      perPage: 12,
      type: MAGAZINE_LIST_TYPE.DEFAULT
    });

    const currentMenuLen =
      this.props.menuStore.listMenu && this.props.menuStore.listMenu.browse_nodes
        ? this.props.menuStore.listMenu.browse_nodes.length
        : 0;
    const nextMenuLen =
      nextProps.menuStore.listMenu && nextProps.menuStore.listMenu.browse_nodes
        ? nextProps.menuStore.listMenu.browse_nodes.length
        : 0;

    if (currentMenuLen !== nextMenuLen) {
      return true;
    }

    const currentBrandStoreList = this.props.brandStore.list ? this.props.brandStore.list.length : 0;
    const nextBrandStoreList = nextProps.brandStore.list ? nextProps.brandStore.list.length : 0;
    if (currentBrandStoreList !== nextBrandStoreList) {
      return true;
    }

    if (this.props.themeListStore.length !== nextProps.themeListStore.length) {
      return true;
    }
    if (this.state.subMenuDesktop.show !== nextState.subMenuDesktop.show) {
      return true;
    }
    if (
      this.state.subMenuDesktop.id !== nextState.subMenuDesktop.id ||
      this.state.subMenuDesktop.id === nextState.subMenuDesktop.id
    ) {
      return true;
    } // Same menu name or different can show menu
    if (
      this.props.magazineStore.magazineList &&
      this.props.magazineStore.magazineList[keyHash] &&
      nextProps.magazineStore.magazineList &&
      nextProps.magazineStore.magazineList[keyHash] &&
      this.props.magazineStore.magazineList[keyHash].length !== nextProps.magazineStore.magazineList[keyHash].length
    ) {
      return true;
    }

    if (this.state.alphaBetBrandSelected !== nextState.alphaBetBrandSelected) {
      return true;
    }

    return false;
  }

  hadleLazyFetchData() {
    const {
      magazineStore: { magazineList },
      fetchMagazineListAction,
      brandStore: { list },
      fetchBrandListAction,
      menuStore: { categorySlideList },
      fetchListMenuAction,
      activityFeedStore,
      fecthActivityFeedListNavigationAction,
      themeListStore,
      fetchThemeAction,
      magazineStore: { magazineDashboard },
      fetchMagazineDashboardAction,
      bannerStore: { bannerList },
      fetchBannerAction
    } = this.props;

    const fetchDefaultMagazineParam = {
      page: 1,
      perPage: 6,
      type: MAGAZINE_LIST_TYPE.DEFAULT
    };
    const keyHash = objectToHash(fetchDefaultMagazineParam);

    try {
      if (!magazineList || !magazineList[keyHash] || !magazineList[keyHash].length) {
        fetchMagazineListAction(fetchDefaultMagazineParam);
      }

      if (!list || !list.length) {
        fetchBrandListAction();
      }

      if (!categorySlideList || !categorySlideList.length) {
        !isMobileVersion() && fetchListMenuAction();
      }

      if (!themeListStore || !themeListStore.length) {
        fetchThemeAction();
      }

      if (!!activityFeedStore && !activityFeedStore.navigationList.length) {
        fecthActivityFeedListNavigationAction();
      }

      if (isEmptyObject(magazineDashboard)) {
        fetchMagazineDashboardAction();
      }

      !bannerList[MOM_BABY_MENU_BANNER_HASH] && fetchBannerAction(MOM_BABY_MENU_BANNER_PARAMS);
      !bannerList[BEST_DEAL_MENU_BANNER_HASH] && fetchBannerAction(BEST_DEAL_MENU_BANNER_PARAMS);
      !bannerList[BRANDS_MENU_BANNER_HASH] && fetchBannerAction(BRANDS_MENU_BANNER_PARAMS);
      !bannerList[SHOP_GIFT_MENU_BANNER_HASH] && fetchBannerAction(SHOP_GIFT_MENU_BANNER_PARAMS);
    } catch (e) {}
  }

  render() {
    return renderView.bind(this)();
  }
}

export default DesktopNavigation;
