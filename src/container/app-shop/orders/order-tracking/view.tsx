import { NavLink } from 'react-router-dom';

import Icon from '../../../../components/ui/icon';
import SubmitButton from '../../../../components/ui/submit-button';

import * as LAYOUT from '../../../../style/layout';
import { objectToHash } from '../../../../utils/encode';
import { isEmptyObject } from '../../../../utils/validate';
import { ORDER_STATUS, SHIPMENT_STATUS, ORDER_TYPE } from '../../../../constants/application/order';

import { IProps, IState } from './model';
import { processList, defaultShipment } from './initialize';
import STYLE from './style';

const infoStyle = STYLE.infoParent.infoContainer;

const renderText = ({ style, text }) => {
  return <div style={style}>{text}</div>;
};

const renderIconGroup = ({ item, isLastChild, shipmentNum, url = '', shippingService }) => {
  const processStyle = STYLE.processWrap.processGroup;
  const TRANSPORT_STEP = 3;

  const iconProps = {
    name: item.iconName,
    style: processStyle.iconGroup.icon,
    innerStyle:
      TRANSPORT_STEP === item.id ? processStyle.iconGroup.innerTransportIcon : processStyle.iconGroup.innerIcon
  };

  const linkProps = {
    style: Object.assign({}, processStyle.title.container, processStyle.title.link),
    to: url,
    target: '_blank'
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
      {TRANSPORT_STEP === item.id && 0 !== url.length ? (
        <NavLink {...linkProps}>
          {'deliver' === item.iconName ? shippingService : ''} {item.title}
        </NavLink>
      ) : (
        <div style={processStyle.title.container}>
          {'deliver' === item.iconName ? shippingService : ''} {item.title}
        </div>
      )}
      {true !== isLastChild && (
        <div
          style={processStyle.line({
            isLeft: true,
            isSuccess: item.id < shipmentNum
          })}
        />
      )}
    </div>
  );
};

const renderHeader = ({ name, status }) => (
  <div style={infoStyle.container}>
    <div style={infoStyle.title}>
      Mã đơn hàng: <span style={infoStyle.name}>{name}</span>
    </div>
    <div style={infoStyle.title}>
      Tình trạng đơn hàng: <span style={infoStyle.status}>{status}</span>
    </div>
  </div>
);

const renderMomoInfo = ({ number, handleGetMomoPaymentAddressUrl }) => {
  const iconProps = {
    name: 'color-momo',
    style: STYLE.momo.icon,
    innreStyle: STYLE.momo.innerIcon
  };

  const buttonProps = {
    title: 'Thanh toán bằng Ví MoMo',
    color: 'momo',
    loading: false,
    style: STYLE.momo.button,
    onSubmit: () => handleGetMomoPaymentAddressUrl(number)
  };

  return (
    <div style={STYLE.momo.container}>
      <Icon {...iconProps} />
      <div style={Object.assign({}, STYLE.momo.text, STYLE.momo.text.bold)}>{`Mã đơn hàng: #${number}`}</div>
      <div style={STYLE.momo.text}>
        Đơn hàng của bạn chưa được thanh toán. <br />
        Vui lòng bấm vào nút bên dưới để tiến hành thanh toán bằng Ví MoMo
      </div>
      <SubmitButton {...buttonProps} />
    </div>
  );
};

const renderView = ({
  state,
  props,
  handleInputOnChange,
  handleSearch,
  handleSearchOnKeyUp,
  handleGetMomoPaymentAddressUrl
}) => {
  const {
    orderTrackingsStore: { orderTrackings }
  } = props as IProps;
  const { codeSearch, isSearch } = state as IState;

  const keyHash = objectToHash({ code: codeSearch.trim() });
  const orderTracking = orderTrackings[keyHash];
  const shipments =
    true === isEmptyObject(orderTracking) || 0 === orderTracking.shipments.length
      ? defaultShipment
      : orderTracking.shipments;
  const len = processList.length - 1;

  const inputProps = {
    id: 'tracking-input',
    autoComplete: 'off',
    style: STYLE.searchWrap.search.input,
    placeholder: 'Nhập mã đơn hàng...',
    value: codeSearch.toUpperCase(),
    onChange: handleInputOnChange.bind(this),
    onKeyUp: handleSearchOnKeyUp.bind(this)
  };

  const iconSearchProps = {
    name: 'search',
    style: Object.assign(
      {},
      STYLE.searchWrap.search.button,
      0 === codeSearch.length && STYLE.searchWrap.search.button.disable
    ),
    innerStyle: STYLE.searchWrap.search.button.inner,
    onClick: () => (0 === codeSearch.length ? {} : handleSearch())
  };

  const BLACK_LIST_PROCESS_STATUS = [ORDER_TYPE.CANCELLED, ORDER_TYPE.REFUNDED, ORDER_TYPE.RETURNED];

  return (
    <div className={'orders-trackings-container'}>
      <div style={STYLE.searchWrap.container}>
        {renderText({
          style: STYLE.searchWrap.textInfo,
          text: 'Tra cứu trạng thái đơn hàng'
        })}
        <div style={Object.assign({}, LAYOUT.flexContainer.justify, STYLE.searchWrap.search.container)}>
          <input {...inputProps} />
          <Icon {...iconSearchProps} />
        </div>
      </div>
      {false === isSearch ? (
        <div style={infoStyle.container} />
      ) : true === isEmptyObject(orderTracking) ? (
        <div style={infoStyle.container}>
          <div style={infoStyle.txtNotFound}>Đơn hàng bạn đang tìm kiếm không tồn tại</div>
        </div>
      ) : (
        <div style={STYLE.contentContainer}>
          {6 === orderTracking.payment_method &&
            'unpaid' === orderTracking.status &&
            renderMomoInfo({ number: orderTracking.number, handleGetMomoPaymentAddressUrl })}
          {Array.isArray(shipments) &&
            shipments.map((shipment, index) => {
              const shipmentNum =
                -1 === shipment.id ? SHIPMENT_STATUS[orderTracking.status] : SHIPMENT_STATUS[shipment.status];
              return (
                <div style={STYLE.infoParent.container} key={`shipment-item-${index}`}>
                  {renderHeader({
                    name: orderTracking.number,
                    status: ORDER_STATUS[orderTracking.status]
                  })}
                  {!BLACK_LIST_PROCESS_STATUS.includes(orderTracking.status) && (
                    <div style={STYLE.processWrap.container}>
                      {Array.isArray(processList) &&
                        processList.map((item, _index) =>
                          renderIconGroup({
                            item,
                            isLastChild: len === _index,
                            shipmentNum,
                            url: shipment.external_service_url || '',
                            shippingService: shipment.shipping_service
                          })
                        )}
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default renderView;
