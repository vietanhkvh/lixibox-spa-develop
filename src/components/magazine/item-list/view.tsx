import Item from '../item';
import { IProps } from './model';
import STYLE from './style';

const renderView = (props) => {
  const { list, showViewGroup, showDescription, style, isSearchList, size, isShowCategory, onItemClick } =
    props as IProps;
  const num = list.length - 1;

  const renderItem = (item, index) => {
    const itemProps = {
      item: item,
      showDescription: showDescription,
      showViewGroup: showViewGroup,
      isShowCategory,
      size:
        0 < size.length
          ? size
          : 0 === index
          ? 'large'
          : 1 === index || 2 === index || 9 === index || 10 === index
          ? 'medium'
          : 'small',
      mobileSize: 0 === index % 4 ? 'normal' : 'small',
      style: Object.assign({}, true === isSearchList && index === num && STYLE.searchList, style),
      onClick: (_, magazine) => onItemClick?.(magazine, index)
    };
    return <Item key={`item-${item.id}`} {...itemProps} />;
  };

  return <div style={STYLE.container}>{Array.isArray(list) && list.map(renderItem)}</div>;
};

export default renderView;
