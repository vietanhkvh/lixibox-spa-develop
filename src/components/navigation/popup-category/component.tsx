import React, { useState, useEffect } from 'react';
//
import { IProps } from './model';
import classnames from 'classnames';
import { NavLink } from 'react-router-dom';

import { ROUTING_PRODUCT_CATEGORY_PATH } from '../../../routings/path';
import SvgIcon from '../../../presentation-component/ui/icon';
import styles from './styles.module.scss';
import Loading from 'components/ui/loading';

const SubItem: React.FC<any> = (props) => {
  const { subCate } = props;
  const [isActive, setIsActive] = useState(!!subCate.activeMenu);
  const [isRemoveBG, removeBG] = useState(false);
  const isHaveSubNodes = Array.isArray(subCate?.sub_nodes) && subCate?.sub_nodes?.length > 0;

  const iconProps = {
    name: 'angle-right',
    className: classnames(styles.iconAngle, styles.right, isActive && styles.active),
    onClick: (e) => {
      e.stopPropagation();
      setIsActive(!isActive);
    }
  };

  useEffect(() => {
    setIsActive(!!subCate.activeMenu);
  }, [subCate.activeMenu]);

  return (
    <>
      <div className={styles.catItem} style={{ background: isRemoveBG && 'inherit' }}>
        <NavLink to={`${ROUTING_PRODUCT_CATEGORY_PATH}/${subCate.slug}`} className={styles.categoryItem}>
          <span className={classnames(styles.text, !!subCate.activeMenu && styles.active)}>
            {subCate?.name || subCate?.vn_name}
          </span>
        </NavLink>
        {isHaveSubNodes && (
          <div
            onMouseEnter={() => {
              removeBG(true);
            }}
            onMouseLeave={() => {
              removeBG(false);
            }}
          >
            <SvgIcon {...iconProps} />
          </div>
        )}
      </div>

      {isActive && isHaveSubNodes && (
        <div className={classnames(styles.subCategoryList, isActive && styles.show)}>
          {subCate?.sub_nodes.map((subMini, id) => (
            <SubItem key={`subMini-${id}`} subCate={subMini} />
          ))}
        </div>
      )}
    </>
  );
};

const CategoryItem = ({ category, handleClick }) => {
  //TODO: show more feature,cmt cause now there are 2 categories, not need this feature
  // const [needShowMore, setNeedShowMore] = useState(false);
  // const [isShowMore, setIsShowMore] = useState(true);
  // const length = category?.sub_nodes?.length || 0;
  // const [numShow, setNumShow] = useState(4);

  //TODO: show more feature
  // useEffect(() => {
  //   if (length >= 5) setNeedShowMore(true);
  // }, []);

  // useEffect(() => {
  //   if (!isShowMore) setNumShow(length);
  //   else setNumShow(4);
  // }, [isShowMore, length]);

  const linkProps = {
    to: `${ROUTING_PRODUCT_CATEGORY_PATH}/${category.slug}`,
    className: classnames(styles.text, styles.categoryTitle, !!category.activeMenu && styles.active)
  };

  //TODO: show more feature
  // const Button = ({ btnName, iconName, handlerClick }) => (
  //   <div className={classnames(styles.catItem, styles.btnWrapper)} onClick={handlerClick}>
  //     <div className={classnames(styles.categoryItem, styles.button)}>{btnName}</div>
  //     <SvgIcon className={classnames(styles.iconAngle, styles.btnIcon)} name={iconName} />
  //   </div>
  // );
  // const buttonProps = {
  //   btnName: isShowMore ? 'Xem thêm' : 'Thu gọn',
  //   iconName: isShowMore ? 'angle-down' : 'angle-up',
  //   handlerClick: (e) => {
  //     e.stopPropagation();
  //     setIsShowMore(!isShowMore);
  //     handleClick(true);
  //   }
  // };

  return (
    <div className={styles.categoryList} key={`category-${category.id}`} onClick={() => handleClick(false)}>
      <NavLink {...linkProps}>{category?.name || category?.vn_name}</NavLink>
      <div>
        {Array.isArray(category?.sub_nodes) &&
          category?.sub_nodes
            //TODO: show more feature
            // .slice(0, numShow)
            .map((subCate) => <SubItem key={`sub-cate-${subCate.id}`} subCate={subCate} />)}
      </div>
      {/* TODO: show more feature */}
      {/* {needShowMore && <Button {...buttonProps} />} */}
    </div>
  );
};

const renderHeader = (onClick) => {
  return (
    <div className={styles.header}>
      <div className={styles.title}>
        <SvgIcon name="menu" className={classnames(styles.icon, styles.iconMenu)} />
        <span>Danh mục sản phẩm </span>
      </div>
      <SvgIcon
        name="close"
        onClick={(e) => {
          e.stopPropagation();
          onClick(false);
        }}
        className={classnames(styles.icon, styles.iconClose)}
      />
    </div>
  );
};

const PopupCategory: React.FC<IProps> = (props) => {
  const {
    listMenu,
    classes: { container = '' },
    showed = false,
    setShowed = (val = true) => {}
  } = props;

  const handleClick = (val) => {
    setShowed(val);
  };

  return (
    <div className={classnames(styles.popupWrapper, !!container && container, showed && styles.over)}>
      <div className={classnames(styles.overlay, showed && styles.over)} onClick={() => handleClick(false)} />
      <div className={classnames(styles.popupCategory, showed && styles.isShow)}>
        {renderHeader(handleClick)}
        <div className={styles.category}>
          {!!listMenu.browse_nodes && !!listMenu.browse_nodes.length ? (
            Array.isArray(listMenu?.browse_nodes) &&
            listMenu?.browse_nodes?.map((category) => (
              <CategoryItem key={`category-container-${category.id}`} category={category} handleClick={handleClick} />
            ))
          ) : (
            <Loading />
          )}
        </div>
      </div>
    </div>
  );
};

export default PopupCategory;
