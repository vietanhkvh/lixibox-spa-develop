import MainBlock from '../../../container/layout/main-block';
import CategoryProduct from '../category-product';

const mainBlockContent = ({ url, list, onItemClick }) => {
  return (
    <div>
      <CategoryProduct list={list} onItemClick={(magazine, index) => onItemClick?.(magazine, index)} />
    </div>
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
