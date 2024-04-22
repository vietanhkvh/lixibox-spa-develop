import MainBlock from '../../../container/layout/main-block';
import Loading from '../../ui/loading';

import ItemList from '../item-list';

import { IProps } from './model';
import STYLE from './style';

const mainBlockContent = ({ list, isShowCategory, onItemClick }) => {
  return 0 === list.length ? (
    <Loading style={{ height: 250 }} />
  ) : (
    <div style={STYLE.categoryDetail}>
      <ItemList list={list} isShowCategory={isShowCategory} onItemClick={onItemClick} />
    </div>
  );
};

const renderView = (props) => {
  const { list, isShowCategory, onItemClick } = props as IProps;
  const mainBlockProps = {
    showHeader: false,
    showViewMore: false,
    content: mainBlockContent({ list, isShowCategory, onItemClick }),
    style: {}
  };

  return (
    <div className={'magazine-category'}>
      <MainBlock {...mainBlockProps} />
    </div>
  );
};

export default renderView;
