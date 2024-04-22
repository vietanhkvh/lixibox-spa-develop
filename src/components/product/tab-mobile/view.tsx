import { NavLink } from 'react-router-dom';

import Icon from '../../ui/icon';
import { TAB_INFO_STATUS } from '../../../constants/application/product';
import { CAPACITY_TYPE } from '../../../constants/application/capacity';
import { ROUTING_BRAND_DETAIL_PATH, ROUTING_PRODUCT_DETAIL_PATH } from '../../../routings/path';

import { IProps, IState } from './model';
import STYLE from './style';

const getDataByType = ({ data, type }) => {
  switch (type) {
    case TAB_INFO_STATUS.info:
      return (
        Array.isArray(data) && data.filter((item) => item.product.description && item.product.description.length > 0)
      );

    case TAB_INFO_STATUS.usage:
      return Array.isArray(data) && data.filter((item) => item.product.usage && item.product.usage.length > 0);

    case TAB_INFO_STATUS.ingredients:
      return (
        Array.isArray(data) && data.filter((item) => item.product.ingredients && item.product.ingredients.length > 0)
      );

    default:
      return [];
  }
};

export function renderComponent({ props, state, handleShowInfo }) {
  const { title, data, type, isIndividual } = props as IProps;
  const { isShow } = state as IState;

  const list = getDataByType({ data, type });
  const length = (list && list.length) || 0;

  const renderCategory = ({ title, name, link = '#' }) => (
    <NavLink to={link} style={STYLE.category}>
      <span style={STYLE.category.title}>{title}</span>
      <span style={STYLE.category.name}>{name}</span>
    </NavLink>
  );

  const renderDesc = ({ item }) => {
    switch (type) {
      case TAB_INFO_STATUS.info:
        return item && item.product && item.product.description.length > 0
          ? item.product.description
          : `Chưa cập nhật thông tin sản phẩm`;
      case TAB_INFO_STATUS.usage:
        return item && item.product && item.product.usage.length > 0
          ? item.product.usage
          : `Chưa cập nhật cách sử dụng sản phẩm`;
      case TAB_INFO_STATUS.ingredients:
        return item && item.product && item.product.ingredients.length > 0
          ? item.product.ingredients
          : `Chưa cập nhật thành phần sản phẩm`;
      default:
        return '';
    }
  };

  return 0 === length ? null : (
    <div>
      <div style={STYLE.itemInfo.container(isShow)} onClick={handleShowInfo}>
        <div style={STYLE.itemInfo.name}>{title}</div>
        <Icon name={'angle-right'} style={STYLE.itemInfo.icon(isShow)} innerStyle={STYLE.itemInfo.innerIcon} />
      </div>
      {
        <div style={STYLE.infoWrap(isShow)}>
          {Array.isArray(list) &&
            list.map((item) => {
              let imgUrl =
                (item && item.product && item.product.primary_picture && item.product.primary_picture.original_url) ||
                '';

              const arr =
                (item.product &&
                  item.product.capacity &&
                  item.product.capacity.length > 0 &&
                  item.product.capacity.split(' ')) ||
                [];

              const capacityText = arr.length > 1 ? CAPACITY_TYPE[arr[1]] : '';

              return (
                <div style={STYLE.infoContainer} key={`category-item-${item.id}`}>
                  <div style={STYLE.infoContainer.infoGroup}>
                    <NavLink
                      to={`${ROUTING_PRODUCT_DETAIL_PATH}/${
                        (item && item.product && (item.product.individual_box_slug || item.product.slug)) || ''
                      }`}
                      style={STYLE.infoContainer.infoGroup.imgWrap}
                    >
                      <div style={STYLE.infoContainer.infoGroup.imgWrap.img(imgUrl)}></div>
                    </NavLink>
                    <div style={STYLE.infoContainer.infoGroup.info}>
                      {!isIndividual && (
                        <NavLink
                          to={`${ROUTING_PRODUCT_DETAIL_PATH}/${
                            (item && item.product && (item.product.individual_box_slug || item.product.slug)) || ''
                          }`}
                          style={STYLE.infoContainer.infoGroup.info.productName}
                        >
                          {(item && item.product && item.product.name) || ''}
                        </NavLink>
                      )}
                      {!isIndividual &&
                        item &&
                        item.quantity &&
                        renderCategory({
                          title: `Số lượng`,
                          name: item.quantity || ''
                        })}
                      {item &&
                        item.product &&
                        item.product.brand &&
                        renderCategory({
                          title: `Nhãn hiệu`,
                          name: item.product.brand.name || '',
                          link: `${ROUTING_BRAND_DETAIL_PATH}/${item.product.brand.slug}`
                        })}
                      {item &&
                        item.product &&
                        item.product.country &&
                        renderCategory({
                          title: `Thương hiệu`,
                          name: item.product.country || ''
                        })}
                      {item &&
                        item.product &&
                        item.product.capacity &&
                        renderCategory({
                          title: capacityText,
                          name: item.product.capacity || ''
                        })}
                      {item &&
                        item.product &&
                        item.product.made_in_country &&
                        renderCategory({
                          title: `Xuất xứ`,
                          name: item.product.made_in_country || ''
                        })}
                    </div>
                  </div>
                  <div style={STYLE.infoContainer.desc}>{renderDesc({ item })}</div>
                </div>
              );
            })}
        </div>
      }
    </div>
  );
}
