import { NavLink } from 'react-router-dom';

import { ROUTING_USER_ORDER } from '../../../routings/path';
import SubmitButton from '../../ui/submit-button';
import Icon from '../../ui/icon';
import STYLE from './style';

export const renderHeader = ({ orderName, orderStatus }) => (
  <div style={STYLE.container.contentGroup.header.container}>
    <div style={STYLE.container.contentGroup.header.title}>Trạng thái đơn hàng</div>
    <NavLink
      to={`${ROUTING_USER_ORDER}/${orderName}`}
      style={STYLE.container.contentGroup.header.orderNameTitle}
    >{`#${orderName}`}</NavLink>
    <div style={STYLE.container.contentGroup.header.orderStatusTitle}>{orderStatus}</div>
  </div>
);

export const renderIconGroup = ({ item, isLastChild, shipmentNum }) => {
  const processStyle = STYLE.processWrap.processGroup;

  const iconProps = {
    name: item.iconName,
    style: processStyle.iconGroup.icon(item.id === shipmentNum),
    innerStyle: Object.assign(
      {},
      processStyle.iconGroup.innerIcon,
      !!processStyle.iconGroup.innerIcon[item.iconName] ? processStyle.iconGroup.innerIcon[item.iconName] : {}
    )
  };

  return (
    <div key={`process-item-${item.id}`} style={processStyle.container}>
      <div
        style={Object.assign(
          {},
          processStyle.iconGroup.container,
          item.id <= shipmentNum && processStyle.iconGroup.success
        )}
      >
        <Icon {...iconProps} />
      </div>
      <div style={processStyle.title.container(item.id === shipmentNum)}>{item.title}</div>
      {!isLastChild && <div style={processStyle.line(item.id < shipmentNum)} />}
    </div>
  );
};

export const renderCloseIcon = ({ onClick }) => (
  <Icon name={'close'} style={STYLE.close.icon} innerStyle={STYLE.close.innerIcon} onClick={!!onClick && onClick} />
);

export const renderCTA = ({ history, link }) => (
  <SubmitButton
    title={'Xem Chi tiết đơn hàng'}
    color={'borderBlack'}
    onSubmit={() => {
      !!history && !!history.push && history.push(link);
    }}
    style={STYLE.container.btn}
  />
);
