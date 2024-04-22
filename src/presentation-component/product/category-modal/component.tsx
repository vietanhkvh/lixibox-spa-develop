import { useState } from 'react';

import { Heading } from '../../modal/general-modal/component';
import SvgIcon from '../../ui/icon';
import styles from './style.module.css';

const BreadCrumbItem = (item, index) => {
  if (!item) return null;

  return (
    <div key={`bread-${item.id || index}`} className={styles.breadCrumbItem}>
      {item}
    </div>
  );
};

export const BreadCrumb = ({ list }) => {
  return <div className={styles.breadCrumb}>{list.map(BreadCrumbItem)}</div>;
};

function Item(item, index) {
  const iconProps = {
    name: 'angle-left',
    className: styles.angleIcon
  };

  return (
    <div key={`item-${item.id || index}`} className={styles.item} onClick={() => this.onSelect(item)}>
      <div className={styles.name}>
        <div className={styles.mainName}>{item.name || item.vn_name}</div>
        {!!this.isDisplaySubTitle && <div className={styles.subName}>{item.vn_name}</div>}
      </div>
      {!!item.sub_nodes && !!item.sub_nodes.length && <SvgIcon {...iconProps} />}
    </div>
  );
}

const Content = ({ focusItem, displayList, breadCrumb, onSelect, isDisplaySubTitle }) => {
  if (!displayList || !displayList.length) return null;

  return (
    <div className={styles.content}>
      <BreadCrumb list={breadCrumb} />
      <div className={styles.list}>{displayList.map(Item, { onSelect, isDisplaySubTitle })}</div>
    </div>
  );
};

const getCurrentList = (browseNodes, arr) => {
  const activeMenu = browseNodes.find((menu) => !!menu.activeMenu);
  if (!activeMenu || !activeMenu.sub_nodes.length) return [...arr, browseNodes];

  return getCurrentList(activeMenu.sub_nodes, [...arr, browseNodes]);
};

const getFocusItem = (currentList) => {
  const activeMenu = currentList[currentList.length - 1].find((menu) => !!menu.activeMenu);

  if (!!activeMenu) return activeMenu;
  if (currentList.length >= 2) return currentList[currentList.length - 2].find((menu) => !!menu.activeMenu);

  return null;
};

const generateBreadCrumb = ({ breadCrumbHeading, currentList }) => {
  if (!currentList || !currentList.length) return;

  const list = currentList
    .map((item) => {
      const active = item.find((_) => !!_.activeMenu);
      if (!!active && !!active.sub_nodes && !!active.sub_nodes.length) return active.name || active.vn_name;
      return null;
    })
    .filter((item) => !!item);

  return [breadCrumbHeading, ...list];
};

const CategoryModal = ({
  title,
  breadCrumbHeading = 'Danh mục',
  browseNodes,
  isDisplaySubTitle = true,
  onRequestClose
}) => {
  const [currentList, setCurrentList] = useState(getCurrentList(browseNodes, []));
  const [focusItem, setFocusItem]: [any, Function] = useState(getFocusItem(currentList));
  const [breadCrumb, setBreadCrumb]: [any, Function] = useState(generateBreadCrumb({ breadCrumbHeading, currentList }));

  const headingProps = {
    title,
    leftIcon: currentList.length > 1 ? 'angle-left' : '',
    rightIcon: 'close',
    onLeftActionClick: () => {
      if (1 === currentList.length) return;

      /** Click back -> remove the last item */
      const [, ...rest] = currentList.reverse();
      setCurrentList(rest.reverse());

      /** If only item in the list -> remove focus item */
      if (rest.length > 1) {
        setFocusItem(getFocusItem(currentList));
      } else {
        setFocusItem(null);
      }

      /* * Update breadCumb */
      const [, ...restBreadCrumb] = breadCrumb.reverse();
      setBreadCrumb(restBreadCrumb.reverse());
    },
    onRightActionClick: () => onRequestClose(!!focusItem && focusItem.slug),
    withoutBorder: true
  };

  const contentProps = {
    focusItem,
    breadCrumb,
    isDisplaySubTitle,
    displayList: currentList[currentList.length - 1],
    onSelect: (item) => {
      if (!!item.sub_nodes && !!item.sub_nodes.length) {
        /** Select item with sub category -> go into */
        setFocusItem(item);
        setCurrentList([...currentList, item.sub_nodes]);

        /** Set new BreadCumb */
        setBreadCrumb([...breadCrumb, item.name || item.vn_name]);
      } else {
        onRequestClose(!!item && item.slug);
      }
    }
  };

  return (
    <div className={styles.container}>
      <Heading {...headingProps} />
      <Content {...contentProps} />
    </div>
  );
};

export default CategoryModal;
