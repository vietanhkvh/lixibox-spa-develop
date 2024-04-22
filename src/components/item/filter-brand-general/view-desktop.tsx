import { decodeEntities } from '../../../utils/encode';
import * as LAYOUT from '../../../style/layout';

import componetStyles from 'style/component.module.scss';
import STYLE from './style';
import styles from './style.module.scss';

export function renderDesktop({ props, state, resetFilter, selectBrand }) {
  const { showRefreshIcon } = state;
  const { brandList } = props;
  const isFallBackRender = !Array.isArray(brandList) || brandList.length === 0;

  if (!!isFallBackRender) return null;

  return (
    <div className={componetStyles.asideBlock} style={Object.assign({}, STYLE)}>
      {renderHeading({ showRefreshIcon, resetFilter })}
      {renderContent({ brandList, selectBrand })}
    </div>
  );
}

const renderHeading = ({ showRefreshIcon, resetFilter }) => {
  const containerPropos = {
    className: componetStyles.asideBlockHeading,
    style: Object.assign({}, STYLE.heading)
  };

  const titleProps = {
    className: componetStyles.asideBlockHeadingText
  };

  const resetProps = {
    className: 'refresh-price-icon',
    style: STYLE.refreshGroup,
    onClick: resetFilter
  };

  return (
    <div {...containerPropos}>
      <div {...titleProps}>Thương hiệu</div>
      {showRefreshIcon && <div {...resetProps}>Xóa bộ lọc</div>}
    </div>
  );
};

const renderContent = ({ brandList, selectBrand }) => {
  if (!brandList || !Array.isArray(brandList)) return null;

  const containerProps = {
    className: componetStyles.asideBlockContent,
    style: Object.assign({}, LAYOUT.flexContainer.wrap, STYLE.brandList.container)
  };

  return (
    <div {...containerProps}>
      {brandList.map((brand) => (
        <Item key={brand.brand_id} brand={brand} selectBrand={selectBrand} />
      ))}
    </div>
  );
};

function Item({ brand, selectBrand }) {
  const containerProps = {
    onClick: () => selectBrand(brand),
    key: `filter-brand-${brand.brand_id}`,
    style: Object.assign({}, LAYOUT.flexContainer.left, STYLE.brandItem)
  };

  const iconProps = {
    style: Object.assign({}, STYLE.brandItem.icon, brand.selected && STYLE.brandItem.icon.selected)
  };

  const nameProps = {
    key: `filter-brand-title-${brand.brand_id}`,
    className: styles.brandItemTitle,
    style: Object.assign({}, brand.selected && STYLE.brandItem.title.selected)
  };

  return (
    <div {...containerProps}>
      <div {...iconProps}>
        <div style={STYLE.brandItem.icon.firstCheck}></div>
        <div style={STYLE.brandItem.icon.lastCheck}></div>
      </div>

      <div {...nameProps}>{`${decodeEntities(brand.brand_name)} (${brand.count})`}</div>
    </div>
  );
}

export default renderDesktop;
