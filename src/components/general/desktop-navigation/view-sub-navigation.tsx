import { NavLink } from 'react-router-dom';
import ReactModal from 'react-modal';
import Loading from '../../ui/loading';
import AdLink from '../../../presentation-component/ui/ad-link';
import { getNavLink, isExternalLink } from '../../../utils/validate';
import {
  GA_TRACKING_EVENT_CATEGORY,
  GA_TRACKING_EVENT_ACTION,
  GA_TRACKING_EVENT_LABEL
} from '../../../tracking/google-analytic/type';
import { gaEventTracking } from '../../../tracking/google-analytic/ga-event-tracking';

import { decodeEntities } from '../../../utils';
import {
  ROUTING_BRAND_DETAIL_PATH,
  ROUTING_MAGAZINE_DETAIL_PATH,
  ROUTING_PRODUCT_CATEGORY_PATH
} from '../../../routings/path';
import { MODAL_MAP_STORE } from '../../../constants/application/modal';
import { MAGAZINE_LIST_TYPE } from '../../../constants/application/magazine';
import { objectToHash } from '../../../utils/encode';
import { ROUTING_MAGAZINE_CATEGORY_PATH } from '../../../routings/path';
import * as LAYOUT from '../../../style/layout';
import { IProps, IState } from './model';
import STYLE from './style';
import styles from './style.module.scss';
import {
  MENU_IMAGE_CONFIG,
  MOM_BABY_MENU_BANNER_HASH,
  BEST_DEAL_MENU_BANNER_HASH,
  SHOP_GIFT_MENU_BANNER_HASH,
  BRANDS_MENU_BANNER_HASH
} from './initialize';
import tracking from './tracking';

/** Render sub navigation: show when hover */
export function renderSubNavigation() {
  const { listCategoryReject, subMenuDesktop, isActiveMenu, idShoppingCat } = this.state as IState;
  const {
    menuStore: { listMenu = { browse_nodes: [] } },
    brandStore,
    themeListStore,
    magazineStore,
    openModal,
    bannerStore: { bannerList }
  } = this.props as IProps;

  const containerProps = {
    style: Object.assign({}, STYLE.subNavPanel, subMenuDesktop.show && STYLE.subNavPanel.show)
    // TODO: Check if we need the following function. Remove if not necessary
    // function(e) {
    //   if (e.event !== this) return;
    //   this.setState({ isActiveMenu: false });
    //   this.hideMenuDesktop();
    // }
  };

  const bannerNavigationList = [MENU_IMAGE_CONFIG.NEW, MENU_IMAGE_CONFIG.SERVICE];

  return false === isActiveMenu ? null : (
    <div {...containerProps}>
      {renderSubNavOverlay.bind(this)()}
      <div style={STYLE.subNavPanel.content}>
        {renderSubNavShopping.bind(this)({
          idShoppingCat,
          listMenu,
          subMenuDesktop,
          themeListStore,
          listCategoryReject
        })}
        {renderSubNavMomBaby.bind(this)({
          listMenu,
          bannerList,
          subMenuDesktop,
          data: MENU_IMAGE_CONFIG.MOM_BABY
        })}
        {Array.isArray(bannerNavigationList) &&
          bannerNavigationList.map((bannerNavigationItem) =>
            renderSubNavBannerNavigation.bind(this)({
              subMenuDesktop,
              data: bannerNavigationItem,
              openModal
            })
          )}
        {renderSubNavForSpecial.bind(this)({
          bannerList,
          subMenuDesktop,
          data: MENU_IMAGE_CONFIG.SPECIAL,
          themeListStore
        })}
        {renderSubNavForGift.bind(this)({
          bannerList,
          subMenuDesktop,
          listMenu,
          data: MENU_IMAGE_CONFIG.GIFT
        })}
        {renderSubNavBrandList.bind(this)({
          subMenuDesktop,
          bannerList,
          brandStore,
          data: MENU_IMAGE_CONFIG.BRAND
        })}
        {renderSubNavMagazineList.bind(this)({ subMenuDesktop, magazineStore })}
      </div>
    </div>
  );
}

function renderSubNavOverlay() {
  const { isActiveMenu, subMenuDesktop } = this.state as IState;
  if (subMenuDesktop.id === 'community' || subMenuDesktop.id === 'invite') return null;
  return !isActiveMenu ? null : (
    <ReactModal
      isOpen
      overlayClassName={{ base: styles.modalOverlay, afterOpen: '', beforeClose: '' }}
      className={{ base: styles.modal, afterOpen: '', beforeClose: '' }}
    >
      <div
        className={styles.body}
        onMouseEnter={() => {
          this.setState({ isActiveMenu: false });
          this.hideMenuDesktop();
        }}
      />
    </ReactModal>
  );
}

function renderSubNavForSpecial({ subMenuDesktop, data, themeListStore, bannerList }) {
  const menuBanner = !!bannerList && bannerList[BEST_DEAL_MENU_BANNER_HASH];
  const containerProps = {
    key: `sub-nav-banner-${data.id}`,
    onMouseLeave: () => {
      this.setState({ isActiveMenu: false });
      this.hideMenuDesktop();
    },
    style: Object.assign({}, LAYOUT.flexContainer.justify, STYLE.subNavigation.shopping)
  };

  return (
    data.id === subMenuDesktop.id && (
      <div
        {...containerProps}
        className={'sub-navigation-shopping'}
        onMouseLeave={() => this.setState({ idShoppingCat: 'menu-product-0' })}
      >
        <div style={Object.assign({}, STYLE.subNavigation.shopping.listCategory, STYLE.subNavigation.colGrid)}>
          {Array.isArray(themeListStore) &&
            themeListStore.map((item) => (
              <NavLink
                to={`/theme/${item.slug}`}
                title={item.name}
                style={STYLE.subNavigation.link}
                onClick={() => {
                  this.setState({ isActiveMenu: false });
                  this.hideMenuDesktop();
                }}
                className={'link-sub-nav'}
                key={`menu-product-${item.id}-${data.id}`}
              >
                <div style={STYLE.subNavigation.link.name} className={'link-sub-nav-name'}>
                  {decodeEntities(item.name)}
                </div>
              </NavLink>
            ))}
        </div>
        <div style={STYLE.subNavigation.detailCatCol}>
          {
            <div style={STYLE.subNavigation.shopping.subCategory} className={'link-sub-nav-panel-box'}>
              {Array.isArray(menuBanner) &&
                menuBanner.map((item) => {
                  if (!item) return null;

                  return (
                    <div
                      style={STYLE.subNavigation.shopping.subCategory.col.container('calc(33.33% - 14px)')}
                      key={`menu-box-outer-${item.id}-${data.id}`}
                    >
                      <div
                        style={STYLE.subNavigation.shopping.subCategory.col.bg(
                          (item && item.cover_image && item.cover_image.original_url) || ''
                        )}
                      />
                      <div style={STYLE.subNavigation.shopping.subCategory.col.content}>
                        {item &&
                          Array.isArray(item.links) &&
                          item.links.map((contentItem, index) => {
                            const generalProps = {
                              key: `menu-box-${item.id}-${index}-${data.id}`,
                              onClick: () => {
                                this.setState({ isActiveMenu: false });
                                this.hideMenuDesktop();

                                gaEventTracking({
                                  category: GA_TRACKING_EVENT_CATEGORY.FEATURE_EFFECTIVE,
                                  action: GA_TRACKING_EVENT_ACTION.FEATURE_EFFECTIVE.DESKTOP_NAVIGATION_IMAGES,
                                  label:
                                    GA_TRACKING_EVENT_LABEL.FEATURE_EFFECTIVE.DESKTOP_NAVIGATION_IMAGES.CLICK_ON +
                                    contentItem,
                                  value: 1
                                });
                              },
                              title: '',
                              style: STYLE.subNavigation.shopping.subCategory.col.link
                            };

                            if (!!isExternalLink(contentItem)) {
                              const aProps = {
                                href: getNavLink(contentItem),
                                ...generalProps
                              };

                              // TODO: Restrucutre this component. Anchor body should not be empty
                              // Ref.: https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/f0d2ddb65f21278ad29be43fb167a1092287b4b1/docs/rules/anchor-has-content.md
                              return <a {...aProps}> </a>;
                            }

                            const navLinkProps = {
                              to: getNavLink(contentItem),
                              ...generalProps
                            };

                            return <AdLink {...navLinkProps} />;
                          })}
                      </div>
                    </div>
                  );
                })}
            </div>
          }
        </div>
      </div>
    )
  );
}

function renderSubNavForGift({ subMenuDesktop, data, listMenu, bannerList }) {
  if (!listMenu || !listMenu.browse_nodes || !listMenu.browse_nodes.length) return null;
  const subNodes = listMenu.browse_nodes.find((b) => b.slug === 'shop-gifts') || {};
  const subNode = subNodes.sub_nodes || [];
  const menuBanner = !!bannerList && bannerList[SHOP_GIFT_MENU_BANNER_HASH];
  const containerProps = {
    key: `sub-nav-banner-${data.id}`,
    onMouseLeave: () => {
      this.setState({ isActiveMenu: false });
      this.hideMenuDesktop();
    },
    style: Object.assign({}, LAYOUT.flexContainer.justify, STYLE.subNavigation.shopping)
  };
  return (
    data.id === subMenuDesktop.id && (
      <div
        {...containerProps}
        className={'sub-navigation-shopping'}
        onMouseLeave={() => this.setState({ idShoppingCat: 'menu-product-0' })}
      >
        <div style={Object.assign({}, STYLE.subNavigation.shopping.listCategory, STYLE.subNavigation.colGrid)}>
          {Array.isArray(subNode) &&
            subNode.map((item) => (
              <NavLink
                to={`/category/${item.slug}`}
                title={item.name}
                style={STYLE.subNavigation.link}
                onClick={() => {
                  this.setState({ isActiveMenu: false });
                  this.hideMenuDesktop();
                }}
                className={'link-sub-nav'}
                key={`menu-product-${item.id}-${data.id}`}
              >
                <div style={STYLE.subNavigation.link.name} className={'link-sub-nav-name'}>
                  {decodeEntities(item.name)}
                </div>
              </NavLink>
            ))}
        </div>
        <div style={STYLE.subNavigation.detailCatCol}>
          {
            <div style={STYLE.subNavigation.shopping.subCategory} className={'link-sub-nav-panel-box'}>
              {Array.isArray(menuBanner) &&
                menuBanner.map((item) => {
                  if (!item) return null;

                  return (
                    <div
                      style={STYLE.subNavigation.shopping.subCategory.col.container('calc(33.33% - 14px)')}
                      key={`menu-box-outer-${item.id}-${data.id}`}
                    >
                      <div
                        style={STYLE.subNavigation.shopping.subCategory.col.bg(
                          (item && item.cover_image && item.cover_image.original_url) || ''
                        )}
                      />
                      <div style={STYLE.subNavigation.shopping.subCategory.col.content}>
                        {item &&
                          Array.isArray(item.links) &&
                          item.links.map((contentItem, index) => {
                            const generalProps = {
                              key: `menu-box-${item.id}-${index}-${data.id}`,
                              onClick: () => {
                                this.setState({ isActiveMenu: false });
                                this.hideMenuDesktop();

                                gaEventTracking({
                                  category: GA_TRACKING_EVENT_CATEGORY.FEATURE_EFFECTIVE,
                                  action: GA_TRACKING_EVENT_ACTION.FEATURE_EFFECTIVE.DESKTOP_NAVIGATION_IMAGES,
                                  label:
                                    GA_TRACKING_EVENT_LABEL.FEATURE_EFFECTIVE.DESKTOP_NAVIGATION_IMAGES.CLICK_ON +
                                    contentItem,
                                  value: 1
                                });
                              },
                              title: '',
                              style: STYLE.subNavigation.shopping.subCategory.col.link
                            };

                            if (!!isExternalLink(contentItem)) {
                              const aProps = {
                                href: getNavLink(contentItem),
                                ...generalProps
                              };

                              // TODO: Restrucutre this component. Anchor body should not be empty
                              // Ref.: https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/f0d2ddb65f21278ad29be43fb167a1092287b4b1/docs/rules/anchor-has-content.md
                              return <a {...aProps}> </a>;
                            }

                            const navLinkProps = {
                              to: getNavLink(contentItem),
                              ...generalProps
                            };

                            return <AdLink {...navLinkProps} />;
                          })}
                      </div>
                    </div>
                  );
                })}
            </div>
          }
        </div>
      </div>
    )
  );
}

function renderSubNavItem(sub) {
  const title = decodeEntities(sub.name);

  const navLinkProps = {
    to: `${ROUTING_PRODUCT_CATEGORY_PATH}/${sub.slug}`,
    style: STYLE.newShop.subLink,
    className: 'new-cat-link',
    key: `new-cat-link-${sub.id}`,
    onClick: () => this.onClick(title)
  };

  const nameProps = {
    style: STYLE.newShop.name,
    key: `new-cat-link-name-${sub.id}`,
    className: 'name'
  };

  const vnNameProps = {
    style: STYLE.newShop.secondName,
    className: 'second-name'
  };
  return (
    <NavLink {...navLinkProps}>
      <div {...nameProps}>{title}</div>
      {!!this.isShowSubTitle && <div {...vnNameProps}>{!!sub.vn_name && decodeEntities(sub.vn_name)}</div>}
    </NavLink>
  );
}

function renderGroupSubNavShopping({ rootNode, subList, isShowSubTitle = true, onClick }: any, index = undefined) {
  const groupWithBorder = [];
  const skipGroup = [1106, 1263];

  if (skipGroup.indexOf(rootNode.id || 0) >= 0) return null;

  const containerProps = {
    key: index,
    style: STYLE.newShop.group
  };

  const isWithoutLink = '#' === rootNode.slug;
  const rootTitle = decodeEntities(rootNode.title);

  const rootLinkProps = {
    to: isWithoutLink ? '#' : `${ROUTING_PRODUCT_CATEGORY_PATH}/${rootNode.slug}`,
    style: STYLE.newShop.headingLink(isWithoutLink),
    onClick: () => onClick(rootTitle),
    className: 'new-cat-link',
    key: `new-cat-link-${rootNode.id}`
  };

  const rootLinkTitleProps = {
    style: STYLE.newShop.headingName,
    key: `new-cat-link-name-${rootNode.id}`,
    className: 'name heading'
  };

  return (
    <div {...containerProps}>
      <div style={STYLE.newShop.heading}>
        <NavLink {...rootLinkProps}>
          <div {...rootLinkTitleProps}>{rootTitle}</div>
        </NavLink>
      </div>

      <div style={STYLE.newShop.subList}>
        {Array.isArray(subList) && subList.map(renderSubNavItem, { isShowSubTitle, onClick })}
      </div>
      {groupWithBorder.indexOf(rootNode.id || 0) >= 0 && <div style={STYLE.newShop.group.withBorder} />}
    </div>
  );
}

function renderSubNavShopping({ idShoppingCat, listMenu, subMenuDesktop, themeListStore, listCategoryReject }) {
  if (!listMenu || !listMenu.browse_nodes || !listMenu.browse_nodes.length) return null;

  const containerProps = {
    onMouseLeave: () => {
      this.setState({ isActiveMenu: false, idShoppingCat: 'menu-product-0' });
      this.hideMenuDesktop();
    },
    className: styles['sub-navigation-shopping'],
    style: Object.assign({}, LAYOUT.flexContainer.justify, STYLE.newShop.container)
  };

  const onClickMenu = (category) => {
    tracking(category);
    this.setState({ isActiveMenu: false });
    this.hideMenuDesktop();
  };
  const findBrowseNode = (slug) =>
    listMenu.browse_nodes && (listMenu.browse_nodes.find((b) => b.slug === slug) || null);

  const beautyBoxGroup = findBrowseNode('beauty-box');
  const beautyBoxGroupProps = !!beautyBoxGroup && {
    rootNode: {
      slug: beautyBoxGroup.slug,
      title: 'Mua theo Box',
      id: beautyBoxGroup.id
    },
    subList: beautyBoxGroup.sub_nodes,
    isShowSubTitle: false,
    onClick: onClickMenu
  };
  // const skinConcernGroupNode = findBrowseNode('lifestyle');
  // const skinConcernGroupProps = !!skinConcernGroupNode
  //   ? {
  //       rootNode: {
  //         slug: '#',
  //         title: 'Các vấn đề về da'
  //       },
  //       subList: skinConcernGroupNode.sub_nodes,
  //       isShowSubTitle: false,
  //       onClick: onClickMenu
  //     }
  //   : null;

  const beautyGroupNode = findBrowseNode('beauty');
  const beautyGroupProps = (menuItem) =>
    !!beautyGroupNode
      ? {
          rootNode: {
            slug: menuItem.slug,
            title: menuItem.vn_name || menuItem.name,
            id: menuItem.id
          },
          subList: menuItem.sub_nodes,
          onClick: onClickMenu
        }
      : null;

  return (
    'category' === subMenuDesktop.id && (
      <div {...containerProps}>
        {beautyBoxGroupProps && renderGroupSubNavShopping(beautyBoxGroupProps)}
        {beautyGroupNode &&
          beautyGroupNode.sub_nodes.map((menuItem, index) =>
            renderGroupSubNavShopping(beautyGroupProps(menuItem), index)
          )}
      </div>
    )
  );
}

function renderSubNavMomBaby({ listMenu, subMenuDesktop, bannerList, data }) {
  const menuBanner = !!bannerList && bannerList[MOM_BABY_MENU_BANNER_HASH];
  if (!listMenu || !listMenu.browse_nodes || !listMenu.browse_nodes.length) return null;

  const containerProps = {
    onMouseLeave: () => {
      this.setState({ isActiveMenu: false, idShoppingCat: 'menu-product-0' });
      this.hideMenuDesktop();
    },
    className: 'sub-navigation-shopping',
    style: Object.assign({}, LAYOUT.flexContainer.justify, STYLE.newShop.container)
  };

  const onClickMenu = (category) => {
    tracking(category);
    this.setState({ isActiveMenu: false });
    this.hideMenuDesktop();
  };

  const groupProps = (menuItem, nodeIndex) =>
    listMenu.browse_nodes && listMenu.browse_nodes[nodeIndex]
      ? {
          rootNode: {
            slug: menuItem.slug,
            title: menuItem.vn_name,
            id: menuItem.id
          },
          subList: menuItem.sub_nodes,
          onClick: onClickMenu
        }
      : null;

  return (
    'momAndBaby' === subMenuDesktop.id && (
      <div {...containerProps}>
        {!!listMenu.browse_nodes[2] &&
          listMenu.browse_nodes[2].sub_nodes.map((menuItem, index) =>
            renderGroupSubNavShopping(groupProps(menuItem, 2), index)
          )}
        {!!listMenu.browse_nodes[4] &&
          listMenu.browse_nodes[4].sub_nodes.map((menuItem, index) =>
            renderGroupSubNavShopping(groupProps(menuItem, 4), index)
          )}
        <div
          style={Object.assign({}, STYLE.subNavigation.detailCatCol, {
            width: '60%',
            paddingTop: 10
          })}
        >
          {
            <div style={STYLE.subNavigation.shopping.subCategory} className={'link-sub-nav-panel-box'}>
              {Array.isArray(menuBanner) &&
                menuBanner.map((item) => {
                  if (!item) return null;

                  return (
                    <div
                      style={STYLE.subNavigation.shopping.subCategory.col.container('calc(50% - 14px)')}
                      key={`menu-box-outer-${item.id}-${data.id}`}
                    >
                      <div
                        style={STYLE.subNavigation.shopping.subCategory.col.bg(
                          (item && item.cover_image && item.cover_image.original_url) || ''
                        )}
                      />
                      <div style={STYLE.subNavigation.shopping.subCategory.col.content}>
                        {item &&
                          Array.isArray(item.links) &&
                          item.links.map((contentItem, index) => {
                            const generalProps = {
                              key: `menu-box-${item.id}-${index}-${data.id}`,
                              onClick: () => {
                                this.setState({ isActiveMenu: false });
                                this.hideMenuDesktop();

                                gaEventTracking({
                                  category: GA_TRACKING_EVENT_CATEGORY.FEATURE_EFFECTIVE,
                                  action: GA_TRACKING_EVENT_ACTION.FEATURE_EFFECTIVE.DESKTOP_NAVIGATION_IMAGES,
                                  label:
                                    GA_TRACKING_EVENT_LABEL.FEATURE_EFFECTIVE.DESKTOP_NAVIGATION_IMAGES.CLICK_ON +
                                    contentItem,
                                  value: 1
                                });
                              },
                              title: '',
                              style: STYLE.subNavigation.shopping.subCategory.col.link
                            };

                            if (!!isExternalLink(contentItem)) {
                              const aProps = {
                                href: getNavLink(contentItem),
                                ...generalProps
                              };

                              // TODO: Restrucutre this component. Anchor body should not be empty
                              // Ref.: https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/f0d2ddb65f21278ad29be43fb167a1092287b4b1/docs/rules/anchor-has-content.md
                              return <a {...aProps}> </a>;
                            }

                            const navLinkProps = {
                              to: getNavLink(contentItem),
                              ...generalProps
                            };

                            return <AdLink {...navLinkProps} />;
                          })}
                      </div>
                    </div>
                  );
                })}
            </div>
          }
        </div>
      </div>
    )
  );
}

function renderSubNavBannerNavigation({ subMenuDesktop, data, openModal }) {
  const containerProps = {
    key: `sub-nav-banner-${data.id}`,
    onMouseLeave: () => {
      this.setState({ isActiveMenu: false });
      this.hideMenuDesktop();
    },
    style: Object.assign({}, LAYOUT.flexContainer.justify, STYLE.subNavigation.shopping)
  };

  return (
    data.id === subMenuDesktop.id && (
      <div
        {...containerProps}
        className={'sub-navigation-shopping'}
        onMouseLeave={() => this.setState({ idShoppingCat: 'menu-product-0' })}
      >
        <div style={Object.assign({}, STYLE.subNavigation.shopping.listCategory, STYLE.subNavigation.colGrid)}>
          {data &&
            Array.isArray(data.menu) &&
            data.menu.map((item) => {
              const props = {
                to: item.link,
                title: item.title,
                style: STYLE.subNavigation.link,
                onClick: () => {
                  this.setState({ isActiveMenu: false });
                  this.hideMenuDesktop();
                },
                className: 'link-sub-nav',
                key: `menu-product-${item.id}-${data.id}`
              };

              return (
                <NavLink {...props}>
                  <div style={STYLE.subNavigation.link.name} className={'link-sub-nav-name'}>
                    {decodeEntities(item.title)}
                  </div>
                </NavLink>
              );
            })}
          {/* Show modal map of store */}
          <div
            title={'Cửa hàng'}
            style={STYLE.subNavigation.link}
            onClick={() => openModal(MODAL_MAP_STORE({}))}
            className={'link-sub-nav'}
            key={`menu-product-store`}
          >
            <div style={STYLE.subNavigation.link.name} className={'link-sub-nav-name'}>
              {decodeEntities('Cửa hàng LIXIBOX')}
            </div>
          </div>
        </div>
        <div style={STYLE.subNavigation.detailCatCol}>
          {
            <div style={STYLE.subNavigation.shopping.subCategory} className={'link-sub-nav-panel-box'}>
              {data &&
                Array.isArray(data.banner) &&
                data.banner.map((item) => (
                  <div
                    style={STYLE.subNavigation.shopping.subCategory.col.container('calc(33.33% - 14px)')}
                    key={`menu-box-outer-${item.id}-${data.id}`}
                  >
                    <div style={STYLE.subNavigation.shopping.subCategory.col.bg(item.img)} />
                    <div style={STYLE.subNavigation.shopping.subCategory.col.content}>
                      {item &&
                        Array.isArray(item.content) &&
                        item.content.map((contentItem, index) => (
                          <NavLink
                            key={`menu-box-${item.id}-${index}-${data.id}`}
                            onClick={() => {
                              this.setState({ isActiveMenu: false });
                              this.hideMenuDesktop();

                              gaEventTracking({
                                category: GA_TRACKING_EVENT_CATEGORY.FEATURE_EFFECTIVE,
                                action: GA_TRACKING_EVENT_ACTION.FEATURE_EFFECTIVE.DESKTOP_NAVIGATION_IMAGES,
                                label:
                                  GA_TRACKING_EVENT_LABEL.FEATURE_EFFECTIVE.DESKTOP_NAVIGATION_IMAGES.CLICK_ON +
                                  contentItem.title,
                                value: 1
                              });
                            }}
                            to={contentItem.link}
                            title={contentItem.title}
                            style={STYLE.subNavigation.shopping.subCategory.col.link}
                          />
                        ))}
                    </div>
                  </div>
                ))}
            </div>
          }
        </div>
      </div>
    )
  );
}

function renderSubNavBrandList({ subMenuDesktop, brandStore, data, bannerList }) {
  const menuBanner = !!bannerList && bannerList[BRANDS_MENU_BANNER_HASH];
  const containerProps = {
    key: `sub-nav-banner-brand`,
    onMouseLeave: () => {
      this.setState({ isActiveMenu: false });
      this.hideMenuDesktop();
    },
    style: Object.assign({}, LAYOUT.flexContainer.justify, STYLE.subNavigation.shopping)
  };

  const generateItemBrandProps = (brandItem, $indexItem) => ({
    to: `${ROUTING_BRAND_DETAIL_PATH}/${brandItem.slug}`,
    key: `brand-item-${$indexItem}`,
    className: 'brand-item-name',
    style: STYLE.brandContainer.list.item,
    onClick: () => {
      this.setState({ isActiveMenu: false });
      this.hideMenuDesktop();
    }
  });

  return (
    'brand' === subMenuDesktop.id && (
      <div
        {...containerProps}
        className={'sub-navigation-shopping'}
        onMouseLeave={() => this.setState({ idShoppingCat: 'menu-product-0' })}
      >
        <div
          style={Object.assign(
            {},
            STYLE.subNavigation.shopping.listCategory,
            STYLE.subNavigation.colGrid,
            STYLE.subNavigation.brandAlphabet
          )}
        >
          <div style={STYLE.brandContainer.alphabet}>
            {brandStore &&
              Array.isArray(brandStore.list) &&
              brandStore.list.map((brandGroup, index) => {
                const alphabet = Object.keys(brandGroup)[0] || '';
                const alphabetProps = {
                  style: Object.assign(
                    {},
                    STYLE.brandContainer.alphabet.text,
                    this.state.alphaBetBrandSelected === alphabet && STYLE.brandContainer.alphabet.pink
                  ),
                  key: `alphabet-${index}`,
                  onMouseEnter: () => this.handleScrollView(alphabet),
                  onClick: () => this.handleScrollView(alphabet)
                };
                return <div {...alphabetProps}>{alphabet}</div>;
              })}
          </div>
          <div style={STYLE.brandContainer.list}>
            {brandStore &&
              Array.isArray(brandStore.list) &&
              brandStore.list.map((brandGroup, $index) => {
                const groupIndex = Object.keys(brandGroup)[0];
                const containerItemProps = {
                  key: `brand-group-${$index}`,
                  style: STYLE.brandContainer.list.group
                };

                return (
                  <div {...containerItemProps}>
                    <div id={`brand-alphabet-${groupIndex}`} style={STYLE.brandContainer.list.heading}>
                      {groupIndex}
                    </div>
                    {brandGroup &&
                      Array.isArray(brandGroup[groupIndex]) &&
                      brandGroup[groupIndex].map((brandItem, $indexItem) => {
                        const brandItemProps = generateItemBrandProps(brandItem, $indexItem);
                        return (
                          <NavLink {...brandItemProps}>
                            <div>{brandItem.name}</div>
                          </NavLink>
                        );
                      })}
                  </div>
                );
              })}
          </div>
        </div>
        <div style={STYLE.subNavigation.detailCatCol}>
          {
            <div style={STYLE.subNavigation.shopping.subCategory} className={'link-sub-nav-panel-box'}>
              {Array.isArray(menuBanner) &&
                menuBanner.map((item) => {
                  if (!item) return null;

                  return (
                    <div
                      style={STYLE.subNavigation.shopping.subCategory.col.container('calc(33.33% - 14px)')}
                      key={`menu-box-outer-${item.id}-${data.id}`}
                    >
                      <div
                        style={STYLE.subNavigation.shopping.subCategory.col.bg(
                          (item && item.cover_image && item.cover_image.original_url) || ''
                        )}
                      />
                      <div style={STYLE.subNavigation.shopping.subCategory.col.content}>
                        {Array.isArray(item.links) &&
                          item.links.map((contentItem, index) => {
                            const generalProps = {
                              key: `menu-box-${item.id}-${index}-${data.id}`,
                              onClick: () => {
                                this.setState({ isActiveMenu: false });
                                this.hideMenuDesktop();

                                gaEventTracking({
                                  category: GA_TRACKING_EVENT_CATEGORY.FEATURE_EFFECTIVE,
                                  action: GA_TRACKING_EVENT_ACTION.FEATURE_EFFECTIVE.DESKTOP_NAVIGATION_IMAGES,
                                  label:
                                    GA_TRACKING_EVENT_LABEL.FEATURE_EFFECTIVE.DESKTOP_NAVIGATION_IMAGES.CLICK_ON +
                                    contentItem,
                                  value: 1
                                });
                              },
                              title: '',
                              style: STYLE.subNavigation.shopping.subCategory.col.link
                            };

                            if (!!isExternalLink(contentItem)) {
                              const aProps = {
                                href: getNavLink(contentItem),
                                ...generalProps
                              };

                              // TODO: Restrucutre this component. Anchor body should not be empty
                              // Ref.: https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/f0d2ddb65f21278ad29be43fb167a1092287b4b1/docs/rules/anchor-has-content.md
                              return <a {...aProps}> </a>;
                            }

                            const navLinkProps = {
                              to: getNavLink(contentItem),
                              ...generalProps
                            };

                            return <AdLink {...navLinkProps} />;
                          })}
                      </div>
                    </div>
                  );
                })}
            </div>
          }
        </div>
      </div>
    )
  );
}

function renderSubNavMagazineList({ subMenuDesktop, magazineStore }) {
  const {
    magazineStore: { magazineDashboard }
  } = this.props;

  const containerProps = {
    key: `sub-nav-magazine-brand`,
    onMouseLeave: () => {
      this.setState({ isActiveMenu: false });
      this.hideMenuDesktop();
    },
    style: Object.assign({}, LAYOUT.flexContainer.justify, STYLE.subNavigation.shopping)
  };

  const keyHash = objectToHash({
    page: 1,
    perPage: 6,
    type: MAGAZINE_LIST_TYPE.DEFAULT
  });
  const magazineList =
    magazineStore.magazineList && Array.isArray(magazineStore.magazineList[keyHash])
      ? magazineStore.magazineList[keyHash].slice(0, 6)
      : [];

  return (
    'magazine' === subMenuDesktop.id && (
      <div
        {...containerProps}
        className={'sub-navigation-shopping'}
        onMouseLeave={() => this.setState({ idShoppingCat: 'menu-product-0' })}
      >
        <div style={Object.assign({}, STYLE.subNavigation.shopping.listCategory, STYLE.subNavigation.colGrid)}>
          {!!magazineDashboard &&
            magazineDashboard.categories &&
            magazineDashboard.categories.map((item) =>
              !item ? null : (
                <NavLink
                  to={`${ROUTING_MAGAZINE_CATEGORY_PATH}/${item.slug}`}
                  title={item.name}
                  style={STYLE.subNavigation.link}
                  onClick={() => {
                    this.setState({ isActiveMenu: false });
                    this.hideMenuDesktop();
                  }}
                  className={'link-sub-nav'}
                  key={`menu-magazine-${item.id}`}
                >
                  <div
                    style={Object.assign({}, STYLE.subNavigation.link.name, { textTransform: 'uppercase' })}
                    className={'link-sub-nav-name'}
                  >
                    {decodeEntities(item.name)}
                  </div>
                </NavLink>
              )
            )}
        </div>
        <div style={STYLE.subNavigation.detailCatCol}>
          {
            <div style={STYLE.subNavigation.shopping.subCategory} className={'link-sub-nav-panel-box'}>
              {Array.isArray(magazineList) && 0 !== magazineList.length ? (
                magazineList.map((item, index) => (
                  <div
                    style={Object.assign(
                      {},
                      STYLE.subNavigation.shopping.subCategory.col.container('calc(33.33% - 14px)'),
                      index < 3 && { marginBottom: 20 }
                    )}
                    key={`menu-box-outer-magazine-${item.id}`}
                  >
                    <div
                      style={Object.assign(
                        {},
                        STYLE.subNavigation.shopping.subCategory.col.bg(
                          (item.cover_image && item.cover_image.original_url) || ''
                        ),
                        { paddingTop: '57%' }
                      )}
                    />
                    <div
                      style={Object.assign({}, STYLE.subNavigation.shopping.subCategory.col.title, {
                        fontSize: 16,
                        fontWeight: '600'
                      })}
                    >
                      {item.title}
                    </div>
                    <div style={STYLE.subNavigation.shopping.subCategory.col.content}>
                      <NavLink
                        onClick={() => {
                          this.setState({ isActiveMenu: false });
                          this.hideMenuDesktop();
                        }}
                        to={`${ROUTING_MAGAZINE_DETAIL_PATH}/${item.slug}`}
                        title={item.title}
                        style={STYLE.subNavigation.shopping.subCategory.col.link}
                      />
                    </div>
                  </div>
                ))
              ) : (
                <Loading style={{ height: 300 }} />
              )}
            </div>
          }
        </div>
      </div>
    )
  );
}
