import { MODAL_ADDRESS } from '../../constants/application/modal';
import Icon from '../ui/icon';

import { IProps } from './model';
import STYLE from './style';

const renderInfo = ({ address, isShowError, handleOnClick, title = '' }) => {
  const isAddressEmpty = address.length === 0;

  const iconProps = {
    name: isAddressEmpty ? 'angle-down' : 'edit',
    style: STYLE.itemSelect.icon,
    innerStyle: STYLE.itemSelect.innerIcon
  };

  const itemSelectProps = {
    style: STYLE.itemSelect.container(isAddressEmpty, isShowError),
    onClick: handleOnClick
  };

  return (
    <div style={STYLE.container}>
      <div {...itemSelectProps}>
        {
          <div style={STYLE.itemSelect.select}>
            {isAddressEmpty ? (
              <div style={STYLE.itemSelect.title(isShowError)}>{title}</div>
            ) : (
              <div>
                <div style={STYLE.itemSelect.addressHeading}>Tỉnh / Thành phố:</div>
                <div style={STYLE.itemSelect.addressValue}>{address}</div>
              </div>
            )}
            <Icon {...iconProps}></Icon>
          </div>
        }
      </div>
      {isShowError && <div style={STYLE.error}>Bạn chưa chọn tỉnh/thành phố</div>}
    </div>
  );
};

export function renderComponent({ props }) {
  const { address, openModalAction, isShowError } = props as IProps;

  return renderInfo({
    address,
    isShowError,
    title: 'Chọn Tỉnh / Thành phố',
    handleOnClick: () => openModalAction(MODAL_ADDRESS())
  });
}
