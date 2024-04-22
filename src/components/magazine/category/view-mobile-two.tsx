import MainBlock from '../../../container/layout/main-block';
import ViewMore from '../view-more';
import ItemList from '../item-list';

import STYLE from './style';

const mainBlockContent = ({ url, list, onItemClick }) => {
  const itemListProps = {
    list: list,
    showDescription: false,
    showViewGroup: false,
    onItemClick
  };
  return (
    0 !== list.length && (
      <div>
        <div style={STYLE.magazineCategory.boxContent}>
          <div style={STYLE.magazineCategory.boxContent.listSubItem}>
            <ItemList {...itemListProps} />
          </div>
        </div>
        <ViewMore url={url} />
      </div>
    )
  );
};

const renderView = ({ title, url, list, onItemClick }) => {
  const mainBlockProps = {
    title: title,
    showHeader: true,
    showViewMore: false,
    textAlignType: 'center',
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
