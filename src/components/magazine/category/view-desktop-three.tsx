import MainBlock from '../../../container/layout/main-block';

import ItemList from '../item-list';

import STYLE from './style';

const mainBlockContent = ({ url, list, onItemClick }) => {
  const categoryThreeStyle = STYLE.magazineCategory.categoryThreeContent;
  const itemList = Array.isArray(list) ? list.slice(0, 4) : [];

  return (
    0 !== list.length && (
      <div>
        <div style={categoryThreeStyle}>
          <ItemList list={itemList} onItemClick={(magazine, index) => onItemClick?.(magazine, index)} />
        </div>
      </div>
    )
  );
};

const renderView = ({ title, url, list, onItemClick }) => {
  const mainBlockProps = {
    title: title,
    showHeader: true,
    showViewMore: false,
    content: mainBlockContent({ url, list, onItemClick }),
    style: {}
  };

  return (
    <div className={'magazine-category'}>
      <MainBlock {...mainBlockProps} />
    </div>
  );
};

export default renderView;
