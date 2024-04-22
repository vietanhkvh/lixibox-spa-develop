import { useState } from 'react';
import classnames from 'classnames';

import { navigateWithParams } from '../../../utils/navigate';
import MobileFilterPanel from '../../general/mobile-filter-panel';
import Modal from '../../modal/general-modal';

import SvgIcon from '../../ui/icon';
import { defaultSortList } from '../../../constants/application/sorting';
import { setSelectedSortList } from '../../../utils/sorting-filter';
import styles from './style.module.css';

function SortItem(item, index) {
  const tickIconProps = {
    name: 'tick',
    className: styles.tickIcon
  };

  const itemProps = {
    className: styles.sortItem,
    key: item.id || index,
    onClick: () => this.onSelect(item.key)
  };

  return (
    <div {...itemProps}>
      <div className={styles.sortItemTitle}>{item.title}</div>
      {item.selected && <SvgIcon {...tickIconProps} />}
    </div>
  );
}

const SortPanel = ({ sortList, onSelect }) => {
  if (!sortList.length) return null;

  return (
    <div className={styles.sortPanel}>
      <div className={styles.sortOverlay} />
      <div className={styles.sortList}>{sortList.map(SortItem, { onSelect })}</div>
    </div>
  );
};

const getSortTitle = (sortList) => {
  const selected = sortList.find((item) => !!item.selected);
  if (!selected) return 'Sắp xếp';

  return selected.title;
};

const Left = ({ sort, history, onSubmit }) => {
  const [isOpenSort, setOpenSort] = useState(false);
  const [sortList, setSortList] = useState(setSelectedSortList(defaultSortList, sort));
  const [sortTitle, setSortTitle] = useState(getSortTitle(sortList));
  const [timerDisplaySort, setTimerDisplaySort] = useState(true);

  const sortIconProps = {
    name: 'sort',
    className: styles.sortIcon
  };

  const angleIconProps = {
    name: 'angle-left',
    className: styles.angleIcon
  };

  const softPanelProps = {
    sortList,
    onSelect: (selectedKey) => {
      const newSortList = setSelectedSortList(sortList, selectedKey);
      setSortTitle(getSortTitle(newSortList));
      setSortList(newSortList);

      onSubmit({ sort: selectedKey });
      /** navigate to */
      navigateWithParams(history, { sort: selectedKey });
    }
  };

  const sortProps = {
    className: classnames(styles.sortContainer, {
      [styles.openSortContainer]: !!isOpenSort
    }),
    onClick: () => {
      if (!!timerDisplaySort) {
        setTimerDisplaySort(false);
        setTimeout(() => setTimerDisplaySort(true), 400);

        setOpenSort(!isOpenSort);
      }
    }
  };

  window.addEventListener('scroll', () => !!isOpenSort && setOpenSort(false));

  return (
    <div {...sortProps}>
      <SvgIcon {...sortIconProps} />
      <div className={styles.sortTitle}>{sortTitle}</div>
      <SvgIcon {...angleIconProps} />
      <SortPanel {...softPanelProps} />
    </div>
  );
};

const Right = ({ number, onClick }) => {
  const filterIconProps = {
    name: 'filter',
    className: styles.filterIcon
  };

  const filterNumber = !!number ? `(${number})` : '';

  return (
    <div
      onClick={onClick}
      className={classnames(styles.filterContainer, {
        [styles.activeFilterContainer]: !!number
      })}
    >
      <SvgIcon {...filterIconProps} />
      <div className={styles.filterTitle}>{`Lọc ${filterNumber}`}</div>
    </div>
  );
};

const getFIlterNumber = ({ pl, ph, brands, stock_status }) => {
  let number = 0;

  if (!!(pl * 1) || !!(ph * 1)) number += 1;
  if (!!!!brands && !!brands.length) number += brands.split(',').length;
  if (stock_status) number += stock_status.split(',').length;

  return number;
};

const MobileFilterHeader = ({
  sort = '',
  history,
  brandList,
  bids,
  minPrice,
  maxPrice,
  pl,
  ph,
  stockStatus = '',
  onSubmit = (data) => {}
}) => {
  const [isOpenMobileFilterModal, setOpenMobileFilterModal] = useState(false);
  const [filterNumber, setFilterNumber] = useState(
    getFIlterNumber({ pl, ph, brands: bids, stock_status: stockStatus })
  );
  const leftProps = { sort, history, onSubmit };

  const rightProps = { number: filterNumber, onClick: () => setOpenMobileFilterModal(true) };

  const filterPanelProps = {
    brandList,
    bids,
    minPrice,
    maxPrice,
    pl,
    ph,
    stockStatus,
    onSelect: (filterData) => {
      setFilterNumber(getFIlterNumber(filterData));
      !!onSubmit && onSubmit(filterData);
      navigateWithParams(history, filterData, ['pl', 'ph', 'brands', 'stock_status', 'page']);
    },
    onRequestClose: () => setOpenMobileFilterModal(false)
  };

  const modalProps = {
    isOpen: isOpenMobileFilterModal,
    title: '',
    isShowHeading: false,
    fullHeight: true,
    forceResetScrollOnUnmount: true,
    onRequestClose: () => setOpenMobileFilterModal(false)
  };

  return (
    <div className={styles.container}>
      <Left {...leftProps} />
      <Right {...rightProps} />
      <Modal {...modalProps}>
        <MobileFilterPanel {...filterPanelProps} />
      </Modal>
    </div>
  );
};

export default MobileFilterHeader;
