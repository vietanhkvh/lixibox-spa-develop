import { decodeEntities } from '../../../utils/encode';
import * as LAYOUT from '../../../style/layout';
import componentStyles from 'style/component.module.scss';
import STYLE from './style';
import styles from './style.module.scss';

export function renderMobile({ state, resetFilter, selectPrice }) {
  const { priceList, showRefreshIcon } = state;

  const isEmptyList = !Array.isArray(priceList) || priceList.length === 0;
  if (!!isEmptyList) return null;

  return (
    <div className={componentStyles.asideBlock}>
      {renderHeader({ showRefreshIcon, resetFilter })}
      {renderContent({ priceList, selectPrice })}
    </div>
  );
}

const renderHeader = ({ showRefreshIcon, resetFilter }) => {
  const containerProps = {
    style: STYLE.mobileVersion.heading,
    className: 'sticky'
  };

  const iconOuterProps = {
    className: 'refresh-price-icon',
    style: STYLE.refreshGroup,
    onClick: resetFilter
  };

  const titleProps = {
    style: STYLE.mobileVersion.heading.title
  };

  return (
    <div {...containerProps}>
      <div {...titleProps}>Giá</div>
      {showRefreshIcon && <div {...iconOuterProps}>Xóa bộ lọc</div>}
    </div>
  );
};

const renderContent = ({ priceList, selectPrice }) => {
  const containerProps = {
    className: componentStyles.asideBlockContent,
    style: Object.assign({}, LAYOUT.flexContainer.wrap, STYLE.priceList.container)
  };

  return <div {...containerProps}>{priceList.map(renderPriceItem, { selectPrice })}</div>;
};

function renderPriceItem(price, index) {
  const containerProps = {
    style: Object.assign({}, LAYOUT.flexContainer.left, STYLE.mobileVersion.priceItem),
    onClick: () => !price.selected && this.selectPrice(price),
    key: `filter-price-${index}`
  };

  const iconProps = {
    style: Object.assign(
      {},
      STYLE.mobileVersion.priceItem.icon,
      price.selected && STYLE.mobileVersion.priceItem.icon.selected
    )
  };

  const titleProps = {
    key: `filter-price-title-${index}`,
    className: styles.mobileVersionPriceItemTitle,
    style: Object.assign({}, price.selected && STYLE.mobileVersion.priceItem.title.selected)
  };

  return (
    <div {...containerProps}>
      <div {...iconProps}>
        <div style={STYLE.mobileVersion.priceItem.icon.firstCheck}></div>
        <div style={STYLE.mobileVersion.priceItem.icon.lastCheck}></div>
      </div>

      <div {...titleProps}>{`${decodeEntities(price.name)}`}</div>
    </div>
  );
}

export default renderMobile;
