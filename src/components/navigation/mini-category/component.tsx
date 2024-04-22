import * as React from 'react';

import { IProps } from './model';
import classnames from 'classnames';
import { NavLink } from 'react-router-dom';
import { ROUTING_PRODUCT_CATEGORY_PATH } from '../../../routings/path';
import styles from './styles.module.scss';
import LoadingPlaceholder from 'presentation-component/ui/loading-placeholder';
import { usePrevious } from 'utils/hook';

export const testData = {
  id: 840,
  name: 'Làm đẹp',
  slug: 'beauty',
  sub_nodes: [
    { name: 'Phong cách', slug: 'lifestyle' },
    { name: 'Chăm sóc răng', slug: 'oral-care' },
    { name: 'Beauty Box', slug: 'beauty-box' },
    { name: 'Thực phẩm chức năng', slug: 'supplement' }
  ]
};

export const MinCategory = ({ menu }) => {
  if (!menu?.id) menu = testData;

  return (
    <div className={styles.miniCategory}>
      <div className={styles.title}>{menu?.name || menu?.vn_name}</div>
      {!!menu && Array.isArray(menu?.sub_nodes) && (
        <div className={styles.categoryList}>
          {menu?.sub_nodes &&
            menu?.sub_nodes.map((item: any) => {
              return (
                <NavLink key={`cate-mini-${item.id}`} to={`${ROUTING_PRODUCT_CATEGORY_PATH}/${item.slug}`}>
                  <div className={classnames(styles.categoryItem, item.activeMenu && styles.active)}>
                    {item?.name || item?.vn_name}
                  </div>
                </NavLink>
              );
            })}
        </div>
      )}
    </div>
  );
};

const MiniCategory: React.FC<IProps> = (props) => {
  const { menu } = props;
  const preMenu = usePrevious(!!menu && menu);
  const [originalVal, setOriginalVal] = React.useState(preMenu);

  React.useEffect(() => {
    if (menu) {
      setOriginalVal(menu);
    }
  }, [menu]);
  return !originalVal ? <LoadingPlaceholder /> : <MinCategory menu={originalVal} />;
};

export default MiniCategory;
