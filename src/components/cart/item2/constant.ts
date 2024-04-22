import { PURCHASE_TYPE } from '../../../constants/application/purchase';

export const PURCHASE_TYPE_LOCALE = Object.freeze({
  [PURCHASE_TYPE.NORMAL]: null,
  [PURCHASE_TYPE.REDEEM]: 'Quà Lixicoin',
  [PURCHASE_TYPE.SAMPLE]: 'Dùng thử miễn phí',
  [PURCHASE_TYPE.GIFT]: 'Quà tặng',
  [PURCHASE_TYPE.ADDON]: 'Ưu đãi'
});
