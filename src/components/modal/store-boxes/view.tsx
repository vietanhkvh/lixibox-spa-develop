import { currenyFormat } from '../../../utils/currency';
import { isMobileVersion } from '../../../utils/responsive';
import { getDeviceVersion } from '../../../utils/responsive';
import { convertUnixTimeHHMM, checkOpenStore } from '../../../utils/encode';

import Icon from '../../../components/ui/icon';

import STYLE from './style';
import { IProps, IState } from './model';

const showTextOpenStore = (openTime, closeTime) => {
  const storeStyle = STYLE.container.storeList;

  return checkOpenStore(openTime, closeTime) ? (
    <span style={storeStyle.store.openStore}>(Mở cửa)</span>
  ) : (
    <span style={storeStyle.store.closeStore}>(Đóng cửa)</span>
  );
};

const renderInfoItem = ({ icon, content, isLastChild = false }) => {
  const storeStyle = STYLE.container.storeList;

  return (
    <div style={Object.assign({}, storeStyle.store.infoGroup, isLastChild && { marginBottom: 0 })}>
      {icon}
      {content}
    </div>
  );
};

function renderStoreItem(item) {
  const storeStyle = STYLE.container.storeList;

  const storeProps = {
    key: `store-item-${item.id}`,
    style: Object.assign(
      {},
      storeStyle.store.container,
      !isMobileVersion() && item.id === this.idSelected && storeStyle.store.active
    ),
    onClick: () => this.handleSelectStore(item)
  };

  return (
    <div {...storeProps}>
      <div style={storeStyle.store.name}>{item && item.store && item.store.name}</div>
      {renderInfoItem({
        icon: (
          <Icon
            name={'map-marker'}
            style={storeStyle.store.infoGroup.icon}
            innerStyle={Object.assign({}, storeStyle.store.infoGroup.innerIcon, { width: 12 })}
          />
        ),
        content: (
          <div style={storeStyle.store.address}>
            {item && item.store && `${item.store.full_address}`}{' '}
            {isMobileVersion() && <span style={storeStyle.store.lighthight}> (Xem bản đồ)</span>}
          </div>
        )
      })}
      {renderInfoItem({
        icon: (
          <Icon
            name={'call'}
            style={storeStyle.store.infoGroup.icon}
            innerStyle={Object.assign({}, storeStyle.store.infoGroup.innerIcon, { width: 13 })}
          />
        ),
        content: (
          <a href={`tel:${item && item.store && item.store.phone}`} style={storeStyle.store.phone}>
            Hotline:
            <span style={storeStyle.store.boldText}>{item && item.store && item.store.phone}</span>
          </a>
        )
      })}
      {renderInfoItem({
        icon: (
          <Icon
            name={'dollar'}
            style={storeStyle.store.infoGroup.icon}
            innerStyle={storeStyle.store.infoGroup.innerIcon}
          />
        ),
        content: (
          <div style={storeStyle.store.phone}>
            Giá bán tại cửa hàng: <span style={storeStyle.store.boldText}>{currenyFormat(item && item.price)}</span>
          </div>
        )
      })}
      {renderInfoItem({
        icon: (
          <Icon
            name={'time'}
            style={storeStyle.store.infoGroup.icon}
            innerStyle={storeStyle.store.infoGroup.innerIcon}
          />
        ),
        content: (
          <div style={storeStyle.store.time}>
            Giờ mở cửa: {convertUnixTimeHHMM(item && item.store && item.store.opening_time)} -{' '}
            {convertUnixTimeHHMM(item && item.store && item.store.closing_time)}{' '}
            {showTextOpenStore(
              item && item.store && item.store.opening_time,
              item && item.store && item.store.closing_time
            )}
          </div>
        )
      })}
      {Number(item.stock) < 10 &&
        renderInfoItem({
          icon: (
            <Icon
              name={'hash'}
              style={{ ...storeStyle.store.infoGroup.icon, opacity: 0, visibility: 'hidden' }}
              innerStyle={storeStyle.store.infoGroup.innerIcon}
            />
          ),
          content: <span style={storeStyle.store.stock}>Chỉ còn {item.stock} sản phẩm</span>,
          isLastChild: true
        })}
    </div>
  );
}

export function renderComponent({ state, props, handleSelectStore }) {
  const {
    data: { storeBoxes, openModal }
  } = props as IProps;
  const { idSelected } = state as IState;

  const storeAddressList = (Array.isArray(storeBoxes) && storeBoxes.filter((item) => item.id === idSelected)) || [];
  const mapUrl =
    Array.isArray(storeAddressList) && storeAddressList.length > 0 ? storeAddressList[0].store.embed_map_url : '';

  const iframeProps = {
    src: mapUrl,
    style: STYLE.container.iframe
  };

  const renderStoreList = () => (
    <div className={'scroll-view'} style={STYLE.container.storeList.container}>
      {storeBoxes.map(renderStoreItem, {
        idSelected,
        handleSelectStore,
        openModal,
        mapUrl
      })}
    </div>
  );

  const renderDesktopVersion = () => (
    <div style={STYLE.container.panel}>
      {renderStoreList()}
      {!!mapUrl && <iframe title="Stores" {...iframeProps} />}
    </div>
  );

  const renderMobileVersion = () => <div style={STYLE.container.panel}>{renderStoreList()}</div>;

  const switchVersion = {
    MOBILE: () => renderMobileVersion(),
    DESKTOP: () => renderDesktopVersion()
  };

  return !Array.isArray(storeBoxes) || storeBoxes.length === 0 ? null : switchVersion[getDeviceVersion()]();
}
