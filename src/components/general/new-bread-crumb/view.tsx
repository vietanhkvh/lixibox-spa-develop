import { NavLink } from 'react-router-dom';
import classnames from 'classnames';
import { ROUTING_PRODUCT_CATEGORY_PATH } from '../../../routings/path';
import { decodeEntities } from '../../../utils/encode';
import SvgIcon from 'presentation-component/ui/icon';
import { IBreadCrumbState } from './model';
import style from './style.module.scss';

const IconDiv = (props) => {
  const { name = 'angle-right', className = style.icon } = props;
  const iconProps = { name, className };
  return <SvgIcon {...iconProps} />;
};
export function renderComponent() {
  const { list } = this.state as IBreadCrumbState;
  return (
    <div className={style.container}>
      {Array.isArray(list) &&
        list.map((item, $index) => {
          return (
            <>
              <div
                className={style.item}
                key={`bread-${item.id}`}
                onMouseEnter={() => this.hoverItem(item, true)}
                onMouseLeave={() => this.hoverItem(item, false)}
              >
                <NavLink
                  to={$index === 0 ? item.slug : ROUTING_PRODUCT_CATEGORY_PATH + '/' + item.slug}
                  key={`bread-span-link-${item.id}`}
                >
                  <span
                    key={`bread-span-${item.id}`}
                    className={classnames(style.title, $index === list.length - 1 && style.active)}
                  >
                    {decodeEntities(item.name || item.vn_name)}
                  </span>
                </NavLink>

                {/* Sub List */}
                {item && item.sub && item.sub.length > 0 && (
                  <div className={classnames(style.sub, style.flexwrap, item.hover && style.show)}>
                    {item &&
                      Array.isArray(item.sub) &&
                      item.sub.map((sub) => (
                        <NavLink
                          to={$index === 0 ? sub.slug : ROUTING_PRODUCT_CATEGORY_PATH + '/' + sub.slug}
                          className={style.titleSubLink}
                          key={`bread-sub-link-${sub.id}`}
                          onClick={() => this.handlerClickSubItem(sub.id, item.sub)}
                        >
                          <span className={classnames(style.title, style.titleSub)} key={`bread-sub-${sub.id}`}>
                            {decodeEntities(sub.name || sub.vn_name)}
                          </span>
                        </NavLink>
                      ))}
                  </div>
                )}
              </div>
              <div className={style.item}>{!!list && $index < list.length - 1 && <IconDiv />}</div>
            </>
          );
        })}
    </div>
  );
}
