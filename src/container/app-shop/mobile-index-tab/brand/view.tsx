import { NavLink } from 'react-router-dom';

import { ROUTING_BRAND_DETAIL_PATH } from '../../../../routings/path';
import Icon from '../../../../components/ui/icon';

import STYLE from './style';
import { IProps, IState } from './model';

const renderHeader = ({ handleGoBack, searchBrandFilter }) => {
  const backIconProps = {
    name: 'close',
    style: STYLE.header.icon,
    innerStyle: STYLE.header.innerIcon,
    onClick: handleGoBack
  };

  const filterInputProps = {
    style: STYLE.header.input,
    autoComplete: 'off',
    placeholder: 'Nhập thương hiệu cần tìm kiếm',
    onChange: (e) => searchBrandFilter(e)
  };

  return (
    <div style={STYLE.header}>
      <input {...filterInputProps} />
      <Icon {...backIconProps} />
    </div>
  );
};

export function renderComponent({ state, props, handleGoBack, searchBrandFilter }) {
  const {
    brandStore: { list }
  } = props as IProps;
  const { filteredBrandList } = state as IState;

  const generateItemBrandProps = (brandItem, indexItem) => ({
    to: `${ROUTING_BRAND_DETAIL_PATH}/${brandItem.slug}`,
    key: `mobile-brand-item-${indexItem}`,
    style: STYLE.brandContainer.list.item
  });

  const brandList = filteredBrandList && filteredBrandList.length > 0 ? filteredBrandList : list;

  return (
    <div>
      {renderHeader({ handleGoBack, searchBrandFilter })}
      <div style={STYLE.brandContainer.list}>
        {Array.isArray(brandList) &&
          brandList.map((brandGroup, index) => {
            const groupIndex = Object.keys(brandGroup)[0];
            const brands = brandGroup[groupIndex];

            const containerItemProps = {
              key: `mobile-brand-group-${index}`,
              style: STYLE.brandContainer.list.group
            };

            return (
              brands &&
              Array.isArray(brands) &&
              brands.length > 0 && (
                <div {...containerItemProps}>
                  <div className={'sticky'} style={STYLE.brandContainer.list.heading}>
                    {groupIndex}
                  </div>
                  {brands.map((brandItem, indexItem) => {
                    const brandItemProps = generateItemBrandProps(brandItem, indexItem);

                    return (
                      <NavLink {...brandItemProps}>
                        <div>{brandItem.name}</div>
                      </NavLink>
                    );
                  })}
                </div>
              )
            );
          })}
      </div>
    </div>
  );
}
