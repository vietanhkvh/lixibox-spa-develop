import { Heading } from '../../../presentation-component/modal/general-modal/component';
import SvgIcon from '../../../presentation-component/ui/icon';
import { ADDRESS_SELECT_STEP } from '../../../constants/application/address';

import { IProps, IState } from './model';
import STYLE from './style';
import styles from './style.module.scss';
import { generateTestId } from 'utils/test-utils';

function renderItem(item, index) {
  const itemProps = {
    key: `address-item-${item.id}`,
    className: styles.item,
    onClick: () => this.handleClick(item)
  };

  return (
    <div {...generateTestId({ name: 'city-item' })} {...itemProps}>
      {item.title}
      <SvgIcon name={'angle-right'} className={styles.itemIcon} />
    </div>
  );
}

const renderSearch = ({ searchFilter, placeholder, list, keySearch = '' }) => {
  const searchProps = {
    value: keySearch,
    style: STYLE.searchContainer.search,
    autoComplete: 'off',
    placeholder: `Tìm kiếm ${placeholder}`,
    onChange: (event) => searchFilter(event, list)
  };

  return (
    <div style={STYLE.searchContainer}>
      <SvgIcon name={'search'} className={styles.searchIcon} />
      <input {...searchProps} />
    </div>
  );
};

const renderItemList = ({ list, handleClick }) => {
  return (
    <div className={'scroll-view'} style={STYLE.address}>
      {Array.isArray(list) && list.map(renderItem, { handleClick })}
    </div>
  );
};

export function renderComponent({
  props,
  state,
  handleBack,
  searchFilter,
  handleOnChangeWard,
  handleOnChangeProvince,
  handleOnChangeDistrict
}) {
  const { wardList, keySearch, filteredList, districtList, provinceList, addressSelectStep = 0 } = state as IState;

  const { onRequestClose } = props as IProps;

  let placeholder = '';
  let title = '';
  let list = [];

  if (addressSelectStep === ADDRESS_SELECT_STEP.WARD) {
    placeholder = 'Phường / Xã';
    title = 'Chọn Phường / Xã';
    list = filteredList && filteredList.length > 0 ? filteredList : wardList;
  } else if (addressSelectStep === ADDRESS_SELECT_STEP.DISTRICT) {
    placeholder = 'Quận / Huyện';
    title = 'Chọn Quận / Huyện';
    list = filteredList && filteredList.length > 0 ? filteredList : districtList;
  } else {
    placeholder = 'Tỉnh / Thành phố';
    title = 'Chọn Tỉnh / Thành phố';
    list = filteredList && filteredList.length > 0 ? filteredList : provinceList;
  }

  const headingProps = {
    title,
    leftIcon: addressSelectStep !== ADDRESS_SELECT_STEP.PROVINCE ? 'angle-left' : '',
    rightIcon: 'close',
    onLeftActionClick: handleBack,
    onRightActionClick: onRequestClose
  };

  return (
    <div className={'address-item'} style={STYLE.container}>
      <div style={STYLE.addressGroup}>
        {/* {renderHeader({
          title,
          handleClick:  ? handleBack : closeModalAction,
          step: addressSelectStep
        })} */}
        <Heading {...headingProps} />
        {/* <div style={STYLE.content}> */}
        {renderSearch({ searchFilter, placeholder, list, keySearch })}
        <div style={STYLE.addressList(addressSelectStep * (-100 / 3))}>
          {renderItemList({
            list: ADDRESS_SELECT_STEP.PROVINCE === addressSelectStep ? list : [],
            handleClick: handleOnChangeProvince
          })}
          {renderItemList({
            list: ADDRESS_SELECT_STEP.DISTRICT === addressSelectStep ? list : [],
            handleClick: handleOnChangeDistrict
          })}
          {renderItemList({
            list: ADDRESS_SELECT_STEP.WARD === addressSelectStep ? list : [],
            handleClick: handleOnChangeWard
          })}
        </div>
        {/* </div> */}
      </div>
    </div>
  );
}
