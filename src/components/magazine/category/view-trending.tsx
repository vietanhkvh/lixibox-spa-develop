import { isMobileVersion } from '../../../utils/responsive';
import MainBlock from '../../../container/layout/main-block';
import LoadingPlaceholder from '../../ui/loading-placeholder';
import ItemList from '../item-list';

import STYLE from './style';

export const renderItemPlaceholder = (item) => (
  <div
    style={Object.assign({}, STYLE.placeholder.productItem, isMobileVersion() && STYLE.placeholder.productMobileItem)}
    key={item}
  >
    <LoadingPlaceholder style={STYLE.placeholder.productItem.image} />
    <LoadingPlaceholder style={STYLE.placeholder.productItem.text} />
  </div>
);

const renderLoadingPlaceholder = () => {
  return (
    <div style={STYLE.placeholder}>
      <LoadingPlaceholder
        style={Object.assign({}, STYLE.placeholder.title, isMobileVersion() && STYLE.placeholder.titleMobile)}
      />
      <div style={STYLE.placeholder.productList}>{[1, 2, 3, 4].map(renderItemPlaceholder)}</div>
    </div>
  );
};

const mainBlockContent = ({ list, onItemClick }) => {
  const categoryTrendingStyle = STYLE.magazineCategory.categoryTrendingContent;

  const itemListProps = {
    list,
    showDescription: false,
    showViewGroup: false,
    style: categoryTrendingStyle.trendingWrap,
    onItemClick
  };

  return (
    <div style={categoryTrendingStyle}>
      <ItemList {...itemListProps} />
    </div>
  );
};

const renderView = ({ title, list, onItemClick }) => {
  const mainBlockProps = {
    showHeader: true,
    title: title,
    showViewMore: false,
    textAlignType: 'center',
    content: mainBlockContent({ list, onItemClick }),
    style: {}
  };
  return list && 0 === list.length ? renderLoadingPlaceholder() : <MainBlock {...mainBlockProps} />;
};

export default renderView;
