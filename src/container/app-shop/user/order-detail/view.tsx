import OrderDetail from '../../../../components/order/detail';
import MobileAutoDisplayHeader from '../../../../presentation-component/general/mobile-auto-display-header';
import MobileScreenHeader from '../../../../presentation-component/general/mobile-screen-header';

import { isUndefined } from '../../../../utils/validate';
import { stringToHash } from '../../../../utils/encode';
import { isMobileVersion } from '../../../../utils/responsive';
import { IProps } from './model';
import PlaceholderLoading from './view-placeholder';
import * as STYLE from './style';

function view({
  props,
  state,
  handleGetMomoPaymentAddressUrl,
  handleGetOnepayPaymentAddressUrl,
  handleChangeToCOD,
  handleCancelOrder
}) {
  const {
    cartStore: { constants },
    orderStore: { orderList },
    match: {
      params: { orderNumber }
    }
  } = props as IProps;
  const newKeys = { checkouted_at: 'created_at', primary_picture_medium_url: 'primary_picture' };
  const keyHash = stringToHash(orderNumber);

  let data = (!!orderList && !isUndefined(orderList[keyHash]) && orderList[keyHash].order) || {};

  const renameKeys = (value) => {
    if (!value || typeof value !== 'object') return value;
    if (Array.isArray(value)) return value.map(renameKeys);
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [newKeys[k] || k, renameKeys(v)]));
  };
  data = renameKeys(data);
  const orderBoxes = data.order_boxes || [];
  data.order_boxes = orderBoxes.map((item) => {
    if (!item.box.primary_picture.medium_url) item.box.primary_picture = { medium_url: item.box.primary_picture };
    return item;
  });
  const { isLoading } = state;
  return (
    <div style={STYLE.main.container}>
      {!!isMobileVersion() && (
        <MobileAutoDisplayHeader row={1}>
          <MobileScreenHeader title={'Thông tin đơn hàng'} />
        </MobileAutoDisplayHeader>
      )}
      {!isMobileVersion() && <div style={STYLE.main.heading}>Chi tiết đơn hàng </div>}
      <div style={STYLE.main.detail}>
        {!!isLoading ? (
          <PlaceholderLoading />
        ) : (
          <OrderDetail
            constants={constants}
            data={data}
            handleGetOnepayPaymentAddressUrl={handleGetOnepayPaymentAddressUrl}
            handleGetMomoPaymentAddressUrl={handleGetMomoPaymentAddressUrl}
            handleChangeToCOD={handleChangeToCOD}
            handleCancelOrder={handleCancelOrder}
          />
        )}
      </div>
    </div>
  );
}
export default view;
