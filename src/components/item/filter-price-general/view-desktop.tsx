import { decodeEntities } from '../../../utils/encode';
import * as LAYOUT from '../../../style/layout';

import componetStyles from 'style/component.module.scss';
import STYLE from './style';
import styles from './style.module.scss';

export function renderDesktop({ state, resetFilter, selectPrice }) {
  const { priceList, showRefreshIcon } = state;
  const isFallBackRender = !Array.isArray(priceList) || priceList.length <= 2;

  if (!!isFallBackRender) return null;

  return (
    <div className={componetStyles.asideBlock} style={Object.assign({}, STYLE)}>
      {renderHeading({ showRefreshIcon, resetFilter })}
      {renderContent({ priceList, selectPrice })}
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
      <div {...titleProps}>Tìm theo Giá</div>
      {showRefreshIcon && <div {...resetProps}>Xóa bộ lọc</div>}
    </div>
  );
};

const renderContent = ({ priceList, selectPrice }) => {
  if (!priceList || !Array.isArray(priceList)) return null;

  const containerProps = {
    className: componetStyles.asideBlockContent,
    style: Object.assign({}, LAYOUT.flexContainer.wrap, STYLE.priceList.container)
  };

  return <div {...containerProps}>{priceList.map(renderItem, { selectPrice })}</div>;
};

function renderItem(price, index) {
  const containerProps = {
    onClick: () => !price.selected && this.selectPrice(price),
    key: `filter-price-${index}`,
    style: Object.assign({}, LAYOUT.flexContainer.left, STYLE.priceItem, price.selected && STYLE.priceItem.selected)
  };

  const iconProps = {
    style: Object.assign({}, STYLE.priceItem.icon, price.selected && STYLE.priceItem.icon.selected)
  };

  const nameProps = {
    key: `filter-price-title-${index}`,
    className: styles.priceItemTitle,
    style: Object.assign({}, price.selected && STYLE.priceItem.title.selected)
  };

  return (
    <div {...containerProps}>
      <div {...iconProps}>
        <div style={STYLE.priceItem.icon.firstCheck}></div>
        <div style={STYLE.priceItem.icon.lastCheck}></div>
      </div>

      <div {...nameProps}>{`${decodeEntities(price.name)}`}</div>
    </div>
  );
}

export default renderDesktop;
