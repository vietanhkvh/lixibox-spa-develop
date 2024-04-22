import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

import { ROUTING_PRODUCT_CATEGORY_PATH } from '../../../routings/path';
import { decodeEntities } from '../../../utils/encode';
import WrapLayout from '../../../container/layout/wrap';
import * as LAYOUT from '../../../style/layout';

import { IBreadCrumbState } from './model';
import STYLE from './style';
import styles from './style.module.scss';

export function renderComponent() {
  const { list } = this.state as IBreadCrumbState;

  return (
    <div style={Object.assign({}, LAYOUT.flexContainer.left, STYLE)}>
      <WrapLayout style={STYLE.wrap}>
        <div style={STYLE.item} key={`bread-0`}>
          <NavLink to={'/'} key={`bread-span-link-0`}>
            <span key={`bread-span-0`} className={styles.title} style={Object.assign({}, LAYOUT.flexContainer.left)}>
              Trang chủ
              <div style={STYLE.title.icon}></div>
            </span>
          </NavLink>
        </div>
        {Array.isArray(list) &&
          list.map((item, $index) => (
            <div
              style={STYLE.item}
              key={`bread-${item.id}`}
              onMouseEnter={() => this.hoverItem(item, true)}
              onMouseLeave={() => this.hoverItem(item, false)}
            >
              <NavLink to={ROUTING_PRODUCT_CATEGORY_PATH + '/' + item.slug} key={`bread-span-link-${item.id}`}>
                <span
                  key={`bread-span-${item.id}`}
                  className={styles.title}
                  style={Object.assign({}, LAYOUT.flexContainer.left)}
                >
                  {decodeEntities(item.name || item.vn_name)}
                  {!!list && $index < list.length - 1 && <div style={STYLE.title.icon}></div>}
                </span>
              </NavLink>

              {/* Sub List */}
              {item && item.sub && item.sub.length > 0 && (
                <div style={Object.assign({}, STYLE.sub, LAYOUT.flexContainer.wrap, item.hover && STYLE.sub.show)}>
                  {item &&
                    Array.isArray(item.sub) &&
                    item.sub.map((sub) => (
                      <NavLink
                        to={ROUTING_PRODUCT_CATEGORY_PATH + '/' + sub.slug}
                        style={STYLE.title.titleSubLink}
                        key={`bread-sub-link-${sub.id}`}
                        onClick={() => this.handlerClickSubItem(sub.id, item.sub)}
                      >
                        <span className={classNames(styles.title, styles.titleSub)} key={`bread-sub-${sub.id}`}>
                          {decodeEntities(sub.name || sub.vn_name)}
                        </span>
                      </NavLink>
                    ))}
                </div>
              )}
            </div>
          ))}
      </WrapLayout>
    </div>
  );
}
