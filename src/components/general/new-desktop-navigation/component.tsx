import React, { useEffect, useState } from 'react';
import { INavigations, IPanelAction, ICategories, ICategory, ISpecialComponent } from './model';
import { NavLink, useLocation } from 'react-router-dom';
import classnames from 'classnames';
import SvgIcon from 'presentation-component/ui/icon';

import { fixedDataRaw, leffDataRaw, rightDataRaw } from './initialize';
import { decodeEntities, isMobileVersion } from 'utils';
import styles from './style.module.scss';
import SpecialComponent from './view-list-special';
import PopupCategory from 'components/navigation/popup-category';
// import { scrollElement } from 'utils/scroll';
import WrapLayoutFC from 'container/layout/new-wrap';
import { ROUTING_PRODUCT_CATEGORY_PATH } from 'routings/path';

const Category: React.FC<ICategory> = (props) => {
  const {
    id,
    icon = { name: '', className: '' },
    posIcon = { name: '', className: '' },
    title = '',
    url = '#',
    className,
    hoverable = true,
    dropDownContent,
    isHighlighted,
    onMouseEnter = (id) => {},
    onClick = (id) => {},
    onClickFixedItem = () => {}
  } = props;
  const handleMouseEnter = () => {
    onMouseEnter && onMouseEnter(id);
  };
  const handleClick = () => {
    onClick && onClick(id);
    onClickFixedItem && onClickFixedItem();
  };

  const location = useLocation();

  return (
    <NavLink
      key={`menu-item-${id}`}
      to={url}
      className={classnames(
        styles.category,
        className && className,
        !hoverable && styles.divide,
        location?.pathname === url && styles.activeLink,
        isHighlighted && styles.categoryHighlighted
      )}
      onMouseEnter={handleMouseEnter}
      onClick={handleClick}
    >
      {!!icon.name && <SvgIcon name={icon.name} className={classnames(styles.iconWrapper, icon.className)} />}
      <div className={styles.title}>
        <span className={styles.text}>{decodeEntities(title)}</span>
      </div>
      {!!posIcon.name && <SvgIcon name={posIcon.name} className={classnames(styles.iconWrapper, posIcon.className)} />}
      {dropDownContent && dropDownContent}
    </NavLink>
  );
};

const Categories: React.FC<ICategories> = (props) => {
  const { dataArray, className, onMouseEnter, onClick } = props;

  return (
    <div className={classnames(styles.categories, className && className)}>
      {Array.isArray(dataArray) &&
        dataArray.map((item) => {
          const itemProps = Object.assign({}, item, { onMouseEnter, onClick });
          return <Category key={item.id} {...itemProps} />;
        })}
    </div>
  );
};

const PanelAction: React.FC<IPanelAction> = (props) => {
  const { template: Template, propsTemplate } = props;
  const propsCommon = Object.assign({}, props, propsTemplate);
  return (
    <>
      <Template {...propsCommon} />
    </>
  );
};

const Modal: React.FC<any> = (props) => {
  const { isActiveModal, content, onMouseLeave } = props;
  return (
    <div className={classnames(styles.modalCotainer, isActiveModal && styles.show)}>
      <div className={classnames(styles.overlay)} onClick={onMouseLeave} />
      <div className={classnames(styles.modal, isActiveModal && styles.show)} onMouseLeave={onMouseLeave}>
        {content}
      </div>
    </div>
  );
};

const Navigations: React.FC<INavigations> = (props) => {
  const {
    leftData = {
      template: Categories,
      propsTemplate: { dataArray: leffDataRaw }
    },
    rightData = {
      template: Categories,
      propsTemplate: { dataArray: rightDataRaw }
    },
    optionalData = {
      template: null,
      propsTemplate: null
    },
    modalData = [
      {
        id: 'special',
        content: (props) => <SpecialComponent {...props} />,
        contentProps: {} as ISpecialComponent
      }
    ],
    menuStore: { listMenu },
    cartStore: { constants },
    countdownStore,
    fetchListMenuAction,
    removeMenuSelectedAction,
    promotions,
    fetchPromotionsAction
  } = props;

  const [isActiveModal, activeModal] = useState(false);
  const [typeModal, setTypeModal] = useState('special');
  const [showCat, setShowCat] = useState(false);

  const [isDisplay] = useState(true); //setDisplay, TODO: This for feature scroll down -> hidden, scroll up-> display
  const activeList = modalData.map((m) => m.id);
  const location = useLocation();

  const hadleLazyFetchData = () => {
    try {
      if (!promotions || !promotions.length) {
        fetchPromotionsAction();
      }
    } catch (e) {}
  };

  const onMouseEnter = (id) => {
    if (!activeList.includes(id)) {
      activeModal(false);
      setTypeModal('');
    } else {
      setTypeModal(id);
    }
  };
  const onClick = (id) => {
    activeModal(false);
    if (activeList.includes(id)) {
      hadleLazyFetchData();
      activeModal(true);
    }
  };

  const onMouseLeave = () => {
    activeModal(false);
    setTypeModal('');
  };

  const onClickHiddenModal = () => {
    activeModal(false);
  };

  const commonProps = {
    onClick,
    onMouseEnter,
    onMouseLeave,
    onClickHiddenModal
  };

  const onClickCat = () => {
    setShowCat(true);
    const arrPath = location.pathname.toString().split('/');
    const getSlug = (index) => arrPath[index];
    const firstSlugPre = `/${getSlug(1)}`;
    //not be at categories page refresh selected menu tree
    if (ROUTING_PRODUCT_CATEGORY_PATH !== firstSlugPre) removeMenuSelectedAction();
  };

  useEffect(() => {
    if (!listMenu || !listMenu?.browse_nodes?.length) !isMobileVersion() && fetchListMenuAction();
  }, []);

  const listCatFixed = fixedDataRaw.map((data) => {
    if (data.id === 'category') {
      return Object.assign({}, data, {
        onClickFixedItem: onClickCat
      });
    }
    return data;
  });

  const fixedProps = {
    template: Categories,
    propsTemplate: Object.assign({}, commonProps, { dataArray: listCatFixed })
  };

  const hasTopBarNavigationText = constants?.top_bar_navigation_text?.trim();
  const topBarNavigationText = hasTopBarNavigationText ? constants.top_bar_navigation_text.trim() : '';

  const leftNavArray = Object.assign({}, leftData?.propsTemplate, {
    dataArray:
      leftData.propsTemplate?.dataArray?.map((item) => {
        // If item.id is 'special' and we have navigation text, return a modified item
        return item.id === 'special' && hasTopBarNavigationText ? { ...item, title: topBarNavigationText } : item;
      }) || leftData.propsTemplate?.dataArray // Fallback to original dataArray in other cases
  });

  const leftProps = {
    template: leftData.template,
    propsTemplate: Object.assign({}, commonProps, leftNavArray)
  };

  const rightProps = {
    className: styles.right,
    template: rightData.template,
    propsTemplate: Object.assign({}, commonProps, rightData.propsTemplate)
  };

  const data =
    !!countdownStore && Array.isArray(countdownStore.list) && !!countdownStore.list.length
      ? countdownStore.list[countdownStore.list.length - 1]
      : null;

  const optionalProps = {
    template: optionalData.template,
    propsTemplate: Object.assign({}, optionalData.propsTemplate, { data })
  };

  const contentRender = (typeModal) => {
    const content = modalData.find((m) => m.id === typeModal);
    const props = Object.assign({}, content?.contentProps, {
      promotions,
      onMouseLeave: onMouseLeave
    });
    return content?.content(props);
  };

  const modalProps = {
    isActiveModal,
    onMouseLeave,
    content: contentRender(typeModal)
  };

  //TODO: This for feature scroll down -> hidden, scroll up-> display
  // let prev = window.scrollY;
  // const detectDisplayNav = () => {
  //   const autoDisplayNav: any = document.getElementById('auto-display-nav');
  //   if (!autoDisplayNav) return;
  //   if (prev > window.scrollY || prev === 0) {
  //     if (!isDisplay) {
  //       setDisplay(true);
  //     }
  //   } else if (prev < window.scrollY && window.scrollY >= autoDisplayNav.offsetTop + 150) {
  //     if (!!isDisplay) {
  //       setDisplay(false);
  //       activeModal(false);
  //     }
  //   }
  //   prev = window.scrollY;
  // };
  // window.addEventListener('scroll', () => detectDisplayNav(), false);

  const popupCateProps = {
    listMenu: listMenu,
    classes: { container: styles.childCategory },
    showed: showCat,
    setShowed: setShowCat
  };

  //TODO: This for feature scroll down -> hidden, scroll up-> display
  // useEffect(() => {
  //   if (showCat) {
  //     try {
  //       const shopAppElement: any = document.getElementById('shop-app');
  //       if (!!shopAppElement && 'fixed' !== shopAppElement.style.position) {
  //         const scrollYPages = window.scrollY;
  //         shopAppElement.style.top = `-${scrollYPages}px`;
  //         shopAppElement.style.width = '100%';
  //         shopAppElement.style.position = 'fixed';
  //       }

  //       /** Force hide facebook customer chat when open modal */
  //       const fbRootElement: any = document.getElementById('fb-root');
  //       if (!!fbRootElement) fbRootElement.style.display = 'none';
  //     } catch (e) {}
  //   } else {
  //     try {
  //       const shopAppElement: any = document.getElementById('shop-app');
  //       if (!!shopAppElement) {
  //         const scrollYPages = Math.abs(parseInt(shopAppElement.style.top));
  //         shopAppElement.setAttribute('style', '');
  //         scrollElement({ x: 0, y: scrollYPages });
  //       }

  //       /** Force hide facebook customer chat when open modal */
  //       const fbRootElement: any = document.getElementById('fb-root');
  //       if (!!fbRootElement) fbRootElement.style.display = 'block';
  //     } catch (e) {}
  //   }
  // }, [showCat]);

  return (
    <>
      <div className={classnames(styles.wrapper)} id={'auto-display-nav'} onMouseLeave={onMouseLeave}>
        <div className={classnames(styles.component, isDisplay && styles.isDisplay)}>
          <WrapLayoutFC className={classnames(styles.wrapLayout)} type="larger">
            <div className={classnames(styles.container, isActiveModal && styles.popup)}>
              <div className={styles.left}>
                <PanelAction {...fixedProps} />
                <PanelAction {...leftProps} />
              </div>
              <div className={styles.rightContainer}>
                <PanelAction {...rightProps} />
                {optionalProps.template && optionalProps.propsTemplate?.data && <PanelAction {...optionalProps} />}
              </div>
            </div>
          </WrapLayoutFC>
        </div>
        <Modal {...modalProps} />
      </div>
      <PopupCategory {...popupCateProps} />
    </>
  );
};
export default Navigations;
