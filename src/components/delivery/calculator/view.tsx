import * as TYPOGRAPHY from '../../../style/typography';
import * as LAYOUT from '../../../style/layout';
import Icon from '../../ui/icon';
import { numberFormat } from '../../../utils/format';
import { isEmptyObject } from '../../../utils/validate';
import { MODAL_ADDRESS } from '../../../constants/application/modal';

import STYLE from './style';
import { IDeliverCalculatorProps, IDeliverCalculatorState } from './model';

const renderView = ({ props, state }) => {
  const { valueCalculated, isFetchTimeFeeShippingFinished } = state as IDeliverCalculatorState;
  const {
    style,
    openModal,
    addressStore: { addressSelected },
    boxId
  } = props as IDeliverCalculatorProps;

  const iconProps = {
    name: !isFetchTimeFeeShippingFinished ? 'angle-down' : 'edit',
    style: STYLE.itemSelect.icon,
    innerStyle: STYLE.itemSelect.innerIcon
  };

  return (
    <div style={Object.assign({}, STYLE, style)}>
      {/** 1. value calculated */}
      {/** 1.1. Calculate for delivery */}
      {isFetchTimeFeeShippingFinished && (
        <div style={Object.assign({}, LAYOUT.flexContainer.left, STYLE.result)}>
          <div style={Object.assign({}, TYPOGRAPHY.bodyText.bold, STYLE.result.heading)}>Giao hàng tiêu chuẩn:</div>
          <div style={Object.assign({}, TYPOGRAPHY.bodyText.textPink, STYLE.result.value)}>
            {numberFormat(valueCalculated.price)} VND
          </div>
        </div>
      )}

      {/** 1.2. Calculate for time delivery */}
      {isFetchTimeFeeShippingFinished && (
        <div style={Object.assign({}, LAYOUT.flexContainer.left, STYLE.result)}>
          {/* <i style={STYLE.result.icon} className="lx lx-40-delivery"></i> */}
          <div style={Object.assign({}, TYPOGRAPHY.bodyText.bold, STYLE.result.heading)}>Thời gian giao dự kiến:</div>
          <div style={Object.assign({}, TYPOGRAPHY.bodyText.textPink, STYLE.result.value)}>{valueCalculated.time}</div>
        </div>
      )}

      <div style={STYLE.itemSelect.select} onClick={() => openModal(MODAL_ADDRESS(true, boxId))}>
        {!isFetchTimeFeeShippingFinished ? (
          <div style={STYLE.itemSelect.addressHeading}>Chọn tỉnh / Thành phố</div>
        ) : (
          <div style={STYLE.itemSelect.addressHeading}>
            {(!isEmptyObject(addressSelected) && addressSelected.districtName + ', ' + addressSelected.provinceName) ||
              ''}
          </div>
        )}
        <Icon {...iconProps}></Icon>
      </div>

      {/** 2. Select city */}
      {/* <SelectBox
        style={STYLE.selectBox}
        list={provinceList}
        title={'Chọn Tỉnh / Thành phố'}
        search={'Tìm kiếm Tỉnh / Thành phố'}
        onChange={handleOnChangeProvince.bind(this)}
      /> */}

      {/** 3. select district  */}
      {/* {
        districtList.length > 0 &&
        <SelectBox
          style={STYLE.selectBox}
          list={districtList}
          title={'Chọn Quận / Huyện'}
          search={'Tìm kiếm Quận Huyện'}
          onChange={handleOnChangeDistrict.bind(this)}
        />
      } */}
    </div>
  );
};

export default renderView;
