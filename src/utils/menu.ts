/**
 * Update Menu Selected
 *
 * @param listMenu   : List menu <browwser node>
 * @param idCategory : id category selected
 */
export const updateMenuSelect = (listMenu: any, idCategory = '') => {
  if (listMenu) {
    listMenu.browse_nodes = listMenu.browse_nodes && checkActiveChild(listMenu.browse_nodes, idCategory);
  }

  return listMenu;
};

/**
 * Check Menu active
 * @param listMenu   : list category <sub>
 * @param idCategory : category id
 *
 * Loop in sub_nodes
 * If sub_item.slug === id category -> set menu Active is true
 * If not set menu active by list sub
 */
const checkActiveChild = (listMenu, idCategory) => {
  listMenu = Array.isArray(listMenu)
    ? listMenu.map((item) => {
        /** Recursive in sub nodes */
        item.sub_nodes = checkActiveChild(item && item.sub_nodes, idCategory);

        /** If active at sub node */
        if (idCategory === item.slug || 0 === idCategory.indexOf(item.slug + '_')) {
          item.activeMenu = true;
        } else {
          /** If sub list have active -> set active */
          item.activeMenu = item && item.sub_nodes.filter((subItem) => true === subItem.activeMenu).length > 0;
        }

        return item;
      })
    : [];

  return listMenu;
};
/**
 * Refresh list menu with activeMenu true => no active menu
 * @param listMenu   : listMenu object
 *
 * Loop in sub_nodes
 * If sub_item.slug === id category -> set menu Active is true
 * If not set menu active by list sub
 */
export const refreshListMenu = (listMenu) => {
  if (listMenu) {
    listMenu.browse_nodes = listMenu.browse_nodes && disActiveMenu(listMenu.browse_nodes);
  }

  return listMenu;
};

export const disActiveMenu = (browseNode) => {
  browseNode = Array.isArray(browseNode)
    ? browseNode.map((item) => {
        item.sub_nodes = disActiveMenu(item.sub_nodes);
        if (!!item.activeMenu) {
          item.activeMenu = false;
        }
        return item;
      })
    : [];
  return browseNode;
};
/* istanbul ignore next TODO: Remove */
export const getCategorySlideList = (listMenu) => {
  if (!Array.isArray(listMenu)) {
    return [];
  }
  if (listMenu.length < 2) return [];

  const beautyBox = {
    id: listMenu[0].id,
    name: listMenu[0].name,
    vn_name: listMenu[0].vn_name,
    slug: listMenu[0].slug,
    img_url: (listMenu[0].cover_image && listMenu[0].cover_image.original_url) || ''
  };

  const list: Array<any> = [];
  list.push(beautyBox);

  Array.isArray(listMenu[1].sub_nodes) &&
    listMenu[1].sub_nodes.map((item) => {
      const tmpObj = {
        id: item.id,
        name: item.name,
        vn_name: item.vn_name,
        slug: item.slug,
        img_url: (item.cover_image && item.cover_image.original_url) || ''
      };

      return list.push(tmpObj);
    });

  return list;
};
