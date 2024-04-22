import { ROUTING_BALANCE, ROUTING_LIXI_COIN, ROUTING_MEMBERSHIP } from 'routings/path';
import { TabParams } from 'types/generic';

export const USER_TRANSACTION_TYPE = {
  COIN: 'coin',
  CREDIT: 'credit'
};

export const BalanceAndLixicoinDashboardTab = Object.freeze({
  BALANCE: { id: 'balance', title: 'Hoàn tiền', path: ROUTING_BALANCE } as TabParams,
  MEMBERSHIP: { id: 'membership', title: 'Hạng thành viên', path: ROUTING_MEMBERSHIP } as TabParams,
  LIXICOIN: { id: 'lixicoin', title: 'Lixicoin', path: ROUTING_LIXI_COIN } as TabParams
});
