import { decodeEntities } from '../../../utils/encode';
import * as LAYOUT from '../../../style/layout';

import componentStyles from 'style/component.module.scss';
import STYLE from './style';
import styles from './style.module.scss';

export function renderMobile({ state, props, resetFilter, selectBrand, handleShowViewMore }) {
  const { showRefreshIcon, showViewMore } = state;
  const { brandList } = props;
  const smallList = !showViewMore ? (!!brandList && !!brandList.length ? brandList.slice(0, 5) : []) : brandList;

  const isNotDisplay = !Array.isArray(smallList) || smallList.length === 0;
  if (!!isNotDisplay) return null;

  return (
    <div className={componentStyles.asideBlock}>
      {renderHeader({ resetFilter, showRefreshIcon })}
      {renderContent({ smallList, selectBrand, brandList, handleShowViewMore, showViewMore })}
    </div>
  );
}

const renderHeader = ({ resetFilter, showRefreshIcon }) => {
  const resetProps = {
    className: 'refresh-brand-icon',
    style: STYLE.refreshGroup,
    onClick: resetFilter
  };

  const containerProps = {
    className: 'sticky',
    style: STYLE.mobileVersion.heading
  };

  return (
    <div {...containerProps}>
      <div style={STYLE.mobileVersion.heading.title}>Thương hiệu</div>
      {showRefreshIcon && <div {...resetProps}>Xóa bộ lọc</div>}
    </div>
  );
};

const renderContent = ({ smallList, selectBrand, brandList, handleShowViewMore, showViewMore }) => {
  const containerProps = {
    className: componentStyles.asideBlockContent,
    style: Object.assign({}, LAYOUT.flexContainer.wrap, STYLE.brandList.container)
  };

  return (
    <div {...containerProps}>
      {smallList.map(renderItem, { selectBrand })}
      {renderViewMore({ brandList, handleShowViewMore, showViewMore })}
    </div>
  );
};

function renderItem(brand) {
  const containerProps = {
    key: `filter-brand-${brand.brand_id}`,
    onClick: () => this.selectBrand(brand),
    style: Object.assign({}, LAYOUT.flexContainer.left, STYLE.mobileVersion.brandItem)
  };

  const iconProps = {
    style: Object.assign(
      {},
      STYLE.mobileVersion.brandItem.icon,
      brand.selected && STYLE.mobileVersion.brandItem.icon.selected
    )
  };

  const titleProps = {
    key: `filter-brand-title-${brand.brand_id}`,
    className: styles.mobileVersionBrandItemTitle,
    style: Object.assign({}, brand.selected && STYLE.mobileVersion.brandItem.title.selected)
  };

  return (
    <div {...containerProps}>
      <div {...iconProps}>
        <div style={STYLE.mobileVersion.brandItem.icon.firstCheck}></div>
        <div style={STYLE.mobileVersion.brandItem.icon.lastCheck}></div>
      </div>

      <div {...titleProps}>
        {`${decodeEntities(brand.brand_name)} `}
        <span style={STYLE.mobileVersion.brandItem.count}>({brand.count})</span>
      </div>
    </div>
  );
}

const renderViewMore = ({ brandList, handleShowViewMore, showViewMore }) => {
  const isShowViewMore = brandList && brandList.length > 5;
  if (!isShowViewMore) return null;

  const containerProps = {
    onClick: handleShowViewMore,
    style: Object.assign({}, LAYOUT.flexContainer.left, STYLE.mobileVersion.brandItem)
  };

  const titleProps = {
    style: STYLE.mobileVersion.brandItem.viewMoreText
  };

  const title = !showViewMore ? 'Xem thêm' : 'Ẩn xem thêm';

  return (
    <div {...containerProps}>
      <div {...titleProps}>{title}</div>
    </div>
  );
};
export default renderMobile;
