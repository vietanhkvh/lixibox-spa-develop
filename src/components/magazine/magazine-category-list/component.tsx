import { NavLink } from 'react-router-dom';

import TagLine from '../tag-line';

import styles from './style.module.scss';

const Component = ({ tabs }) => {
  return (
    <div className={styles.container}>
      <TagLine style={{ paddingBottom: 20 }} title={'Danh mục sản phẩm'} />
      <div className={styles.list}>
        {tabs.map((item) => (
          <NavLink className={styles.item} to={item.link}>
            {item.title}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Component;
