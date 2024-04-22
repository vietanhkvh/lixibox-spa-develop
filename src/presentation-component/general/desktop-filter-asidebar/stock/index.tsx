import { IStockStatus } from '../model';
import SvgIcon from 'presentation-component/ui/icon';
import style from './style.module.scss';
import classnames from 'classnames';
import { useEffect, useState } from 'react';
import { navigateWithParams } from 'utils/navigate';
import { scrollElement } from 'utils/scroll';
import { STOCK_FILTER_OPTIONS } from 'constants/application/filter';

export const ItemStatus = ({ item, handleClick, onClickItem }) => {
  const { selected, title, id } = item;
  const iconProps = {
    name: selected ? 'checkbox-checked' : 'checkbox-empty',
    className: classnames(style.icon, selected && style.selected)
  };
  const onClick = () => {
    const value = selected ? '' : id;
    onClickItem(value);
    handleClick({ stock_status: value });
  };
  return (
    <div className={style.item} onClick={onClick}>
      <SvgIcon {...iconProps} />
      <div className={classnames(style.value, selected && style.selected)}>{title}</div>
    </div>
  );
};

const StockStatus: React.FC<IStockStatus> = (props) => {
  const {
    listStatus = STOCK_FILTER_OPTIONS,
    history,
    stockStatus = '',
    pl = '',
    ph = '',
    bids = '',
    sort = '',
    page = 1
  } = props;

  const [stockSts, setStockSts] = useState(stockStatus);
  const scrollToTop = () => {
    scrollElement({ x: 0, y: 0, element: document.documentElement });
  };

  const onClickItem = (value) => {
    setStockSts(value);
    scrollToTop();
  };

  const handleClick = (filterData) => {
    const newFilterData = Object.assign({}, filterData, {
      brands: bids,
      sort: sort,
      page: page,
      pl,
      ph
    });
    navigateWithParams(history, newFilterData, ['pl', 'ph', 'brands', 'page', 'sort', 'stock_status']);
  };

  useEffect(() => {
    setStockSts(stockStatus);
  }, [stockStatus]);

  return (
    <div className={style.container}>
      <div className={style.title}>{`Tìm kiếm theo trạng thái`}</div>
      <div className={style.items}>
        {listStatus.map((item, index) => {
          const props = {
            item: Object.assign({}, item, { selected: stockSts === item.id }),
            onClickItem,
            handleClick
          };
          return <ItemStatus {...props} key={`stock-status-item-${index}`} />;
        })}
      </div>
    </div>
  );
};

export default StockStatus;
