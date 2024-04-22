import * as React from 'react';
import { NavLink, Route } from 'react-router-dom';
import classnames from 'classnames';
import { auth } from '../../../utils/auth';
import { objectToHash } from 'utils';
import { getUrlParameter } from 'utils/format';
import { AppShopSwitchRouting } from '../../../routings/router';

import { defaultSortList } from 'constants/application/sorting';
import {
  ROUTING_PRODUCT_DETAIL,
  ROUTING_MAGAZINE_DETAIL,
  ROUTING_PRODUCT_CATEGORY_PATH,
  ROUTING_MAGAZINE,
  ROUTING_MAGAZINE_CATEGORY_PATH,
  ROUTING_SEARCH_MAGAZINE_PATH,
  ROUTING_SEARCH_PATH,
  ROUTING_PRODUCT_DETAIL_PATH,
  ROUTING_BRAND_DETAIL_PATH,
  ROUTING_MAGAZINE_TAG_PATH
} from '../../../routings/path';

import SvgIcon from 'presentation-component/ui/icon';
import Modal from '../../modal';
import SharedModal from '../../shared-modal';
import Alert from '../../alert';
import Footer from '../../app-shop/general/footer';
import CartSummary from '../../app-shop/cart/summary';
import OverlayReload from '../../layout/overlay-reload';
import GoToTop from '../../../components/general/go-to-top';
import SocialShare from '../../../presentation-component/social-share';

import SubcribeEmail from '../../../components/modal/subcribe-email';
import UserBirthday from '../../../components/modal/user-birthday';
import LiveBackground from '../../../presentation-component/live/live-background';
import ErrorMessage from '../../exception/error';

import DesktopNavigations from 'components/general/new-desktop-navigation';
import BreadCrumb from 'components/general/new-bread-crumb';
import HeaderPaginator from 'presentation-component/ui/header-paginator';
import SortFilter from 'presentation-component/general/new-sort-filter';
import Header from 'container/app-shop/general/header';
import LoadingPlaceholder from 'presentation-component/ui/loading-placeholder';
import { generateCategoryHirarchy } from 'container/app-shop/product/detail/utils';

import { WHITE_LIST_CHECK_OUT_CONTAINER, NO_FOOTER_ROUTES } from './initialize';
import { IProps, IState } from './model';
import STYLE from './style';
import styles from './style.module.scss';

interface ILeftNav {
  className?: string;
  list?: Array<{ id: string; title: string; link?: string }>;
  idSelected?: any;
}

interface IRightNav {
  className?: string;
  paging?: { current_page: number; per_page: number; total_pages: number };
  location?: any;
  route?: string;
  defaultSortList?: Array<any>;
  enableSorted?: boolean;
}

const LeftMagazine: React.FC<ILeftNav> = (props) => {
  const { className = '', list = [], idSelected = 'magazine' } = props;
  const [idActive, setIdActive] = React.useState(idSelected);
  const [isLoading, setIsLoading] = React.useState(false);
  const listClone = [
    {
      id: 'magazine',
      code: 'magazine',
      title: 'Tất cả',
      selected: true,
      link: ROUTING_MAGAZINE
    },
    ...list
  ];
  const itemActive = listClone.find((item) => item.id === idActive) || { id: 'not-found', title: 'Not Found' };
  const listShow = listClone.filter((item) => (item.id === idActive ? false : true));

  const iconProps = {
    name: 'angle-left',
    className: styles.angleIcon
  };

  React.useEffect(() => {
    setIsLoading(true);
    if (!!list.length) setIsLoading(false);
  }, [list]);

  React.useEffect(() => {
    setIdActive(idSelected);
  }, [idSelected]);
  return isLoading ? (
    <div className={styles.loadingContainer}>
      <LoadingPlaceholder className={styles.loadingFetch} />
    </div>
  ) : (
    <div className={classnames(styles.leftNav, !!className && className)}>
      <div className={styles.header}>
        <div className={styles.title}>{itemActive.title}</div>
        <SvgIcon {...iconProps} />
      </div>
      <div className={classnames(styles.content)}>
        <div className={styles.items}>
          {listShow.map((item) => {
            const { id, title, link } = item;
            const itemProps = {
              className: styles.item,
              key: `magazine-cate-${id}`,
              onClick: () => setIdActive(id),
              to: link
            };
            return <NavLink {...itemProps}>{title}</NavLink>;
          })}
        </div>
      </div>
    </div>
  );
};

const RightNavigation: React.FC<IRightNav> = (props) => {
  const {
    className = '',
    paging: { current_page = 0, per_page = 0, total_pages = 0 },
    location = window.location,
    defaultSortList = [],
    enableSorted = true
  } = props;

  let urlList: Array<any> = [];
  let searchParams = new URLSearchParams(location.search);

  [...Array(total_pages)].forEach((_, i) => {
    searchParams.set('page', String(i + 1));
    let queryString = searchParams.toString() ? `?${searchParams.toString()}` : '';
    urlList = [
      ...urlList,
      {
        number: i + 1,
        title: i + 1,
        link: `${location.pathname}${queryString}`
      }
    ];
  });

  return (
    <div className={classnames(styles.rightNav, !!className && className)}>
      {enableSorted && <SortFilter sortList={[]} perPage={per_page} defaultList={defaultSortList} />}
      <HeaderPaginator currentPage={current_page} totalPage={total_pages} urlList={urlList} perPage={per_page} />
    </div>
  );
};

const LeftTitle = ({ prefix = 'Tìm kiếm: ', title }) => (
  <div className={styles.leftTitle}>
    <div className={styles.title}>{`${prefix}${title}`}</div>
  </div>
);

interface ViewProps {
  props: IProps;
  state: IState;
  handleBackToHome: () => void;
  handleReload: () => void;
}
const View = ({ props, state, handleBackToHome, handleReload }: ViewProps) => {
  const {
    location,
    history,
    appStore: { isPrivateMode, mobileappWebviewStatus },
    menuStore: { listMenu },
    boxesCategories,
    productPaging,
    productBrandPaging,
    searchPaging,
    magazineStore: { magazineCategory, magazineTagName, magazineHomePaging, magazineCateTypes, magazineSearchPaging }
  } = props;
  const { isError, isShowBirthdayModalForm, isShowCartSummary } = state;

  const isDisplayFilterByCheckOut = WHITE_LIST_CHECK_OUT_CONTAINER.DESKTOP.indexOf(location.pathname) < 0;
  const isDisplayHeaderFooter = isDisplayFilterByCheckOut;
  const showFooter = !NO_FOOTER_ROUTES.DESKTOP.includes(location.pathname) && !isPrivateMode;

  const stickyBtnMemberRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const footerEle = document.getElementsByTagName('footer')?.[0];

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          stickyBtnMemberRef.current.style.opacity = '0';
          stickyBtnMemberRef.current.style.visibility = 'hidden';
        } else {
          stickyBtnMemberRef.current.style.opacity = '1';
          stickyBtnMemberRef.current.style.visibility = 'visible';
        }
      },
      { threshold: 0 }
    );

    if (!!footerEle) {
      observer.observe(footerEle);
    }

    return () => {
      if (!!footerEle) {
        observer.unobserve(footerEle);
      }
    };
  }, [stickyBtnMemberRef]);

  if (0 === isError)
    return <ErrorMessage handleBackToHome={() => handleBackToHome()} handleReload={() => handleReload()} />;

  const renderNavigation = () => {
    const path = location.pathname;
    const arrPath = path.toString().split('/');
    const pathLength = arrPath.length || 0;
    const getSlug = (index) => arrPath[index];
    const firstSlugPre = `/${getSlug(1)}`;

    if (ROUTING_PRODUCT_CATEGORY_PATH === firstSlugPre) {
      return {
        leftData: {
          template: BreadCrumb,
          propsTemplate: { listMenu }
        },
        rightData: {
          template: RightNavigation,
          propsTemplate: { paging: productPaging, location, defaultSortList }
        }
      };
    } else if (ROUTING_MAGAZINE === firstSlugPre) {
      const idSelected = getSlug(arrPath.length - 1);
      const list =
        (!!magazineCateTypes?.length &&
          magazineCateTypes.map((item) => ({
            id: item.slug,
            title: item.name,
            link: `${ROUTING_MAGAZINE_CATEGORY_PATH}/${item.slug}`
          }))) ||
        [];

      const keyHash = objectToHash({
        slug: idSelected,
        page: getUrlParameter(location?.search, 'page') || 1,
        perPage: 17 // reference: src/container/app-shop/magazine/category/initialize.tsx
      });

      let magazinePaging = magazineHomePaging;
      if (path.includes(ROUTING_MAGAZINE_CATEGORY_PATH))
        magazinePaging = magazineCategory?.[keyHash]?.paging || magazineHomePaging;
      else if (path.includes(ROUTING_MAGAZINE_TAG_PATH))
        magazinePaging = magazineTagName?.[keyHash]?.paging || magazineHomePaging;

      return pathLength === 3 //path is magazine detail
        ? {}
        : {
            leftData: {
              template: LeftMagazine,
              propsTemplate: { list, idSelected }
            },
            // TODO: create an api request filter by A-Z,Z-A,... for magazine category
            rightData: {
              template: RightNavigation,
              propsTemplate: {
                paging: magazinePaging,
                location,
                enableSorted: false
              }
            }
          };
    } else if (ROUTING_SEARCH_PATH === firstSlugPre || ROUTING_SEARCH_MAGAZINE_PATH === firstSlugPre) {
      const title = decodeURI(getSlug(2) || '');
      let paging = {};
      if (ROUTING_SEARCH_PATH === firstSlugPre) {
        paging = searchPaging;
      } else if (ROUTING_SEARCH_MAGAZINE_PATH === firstSlugPre) {
        paging = magazineSearchPaging;
      }
      return {
        leftData: {
          template: LeftTitle,
          propsTemplate: { title }
        },
        rightData: {
          template: RightNavigation,
          propsTemplate: { paging, location, defaultSortList }
        }
      };
    } else if (ROUTING_PRODUCT_DETAIL_PATH === firstSlugPre) {
      const newBoxesCategories = generateCategoryHirarchy(boxesCategories);

      return {
        leftData: {
          template: BreadCrumb,
          propsTemplate: { listMenu: newBoxesCategories, isFinalList: true, selectedSlug: location.pathname }
        }
      };
    } else if (ROUTING_BRAND_DETAIL_PATH === firstSlugPre) {
      const idBrands = path.replace(`${ROUTING_BRAND_DETAIL_PATH}/`, '');

      return idBrands === ROUTING_BRAND_DETAIL_PATH
        ? {}
        : {
            rightData: {
              template: RightNavigation,
              propsTemplate: { paging: productBrandPaging, location, defaultSortList }
            }
          };
    } else return {};
  };
  const navigationProps = renderNavigation();

  return (
    <div id={'shop-app'}>
      {!isPrivateMode && <LiveBackground />}
      {isDisplayHeaderFooter && !isPrivateMode && (
        <>
          {/* TODO: Remove after adding AB testing */}
          {/* <Header /> */}
          <Header />
          <DesktopNavigations {...navigationProps} />
        </>
      )}
      <div id={'app-container'} className={styles.desktopAppContainer} style={STYLE.desktop}>
        {1 === isError ? (
          <ErrorMessage handleBackToHome={() => handleBackToHome()} handleReload={() => handleReload()} />
        ) : (
          <AppShopSwitchRouting />
        )}
      </div>
      {showFooter && <Footer location={location} />}
      {showFooter && !isPrivateMode && (
        <Route
          exact
          path={[ROUTING_PRODUCT_DETAIL, ROUTING_MAGAZINE_DETAIL]}
          render={() => <SocialShare classes={{ container: styles.socialShare }} />}
        />
      )}
      {showFooter && !isPrivateMode && <GoToTop />}

      <div ref={stickyBtnMemberRef} className={styles.stickyBtnMemberContainer}>
        {!!auth.loggedIn()
          ? !isPrivateMode && !!isShowBirthdayModalForm && <UserBirthday />
          : !isPrivateMode && !mobileappWebviewStatus && <SubcribeEmail />}
      </div>

      {!window.isInsightsBot && isDisplayHeaderFooter && isShowCartSummary && <CartSummary />}
      <Modal history={history} />
      <SharedModal />
      <Alert />
      <OverlayReload />
    </div>
  );
};

export default View;
