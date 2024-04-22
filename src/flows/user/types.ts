import { PagingResponse } from 'api/types';
import { ProductBox } from 'types/api/shop';
import { UnixSeconds } from 'types/generic';

export const UserTransactionCurrencyType = Object.freeze({
  CREDIT: 'credit' as const,
  COIN: 'coin' as const
});
export type UserTransactionCurrencyTypeType =
  (typeof UserTransactionCurrencyType)[keyof typeof UserTransactionCurrencyType];
export const UserTransactionType = Object.freeze({
  BALANCE_ADDITION: 'balance_addition' as const,
  BALANCE_SUBTRACTION: 'balance_subtraction' as const,
  LIXICOIN_ADDITION: 'lixicoin_addition' as const,
  LIXICOIN_SUBTRACTION: 'lixicoin_subtraction' as const
});
export type UserTransactionTypeType = (typeof UserTransactionType)[keyof typeof UserTransactionType];
export interface UserTransaction {
  id: number;
  amount?: number;
  amount_after?: number;
  amount_before?: number;
  boxes?: ProductBox[];
  created_at: UnixSeconds;
  currency?: UserTransactionCurrencyTypeType;
  linked_object_id?: number;
  linked_object_type?: string;
  message?: string;
  order_number?: string;
  reason?: 'cashback_expired';
  type?: UserTransactionTypeType;
}
export interface PageableUserTransactions {
  paging: PagingResponse;
  transactions: UserTransaction[];
}

export interface FetchUserTransactionState {
  processing: boolean;
  processed: boolean;
  errored: boolean;
}

interface UserCashbackBoxesState {
  byQuery: {
    [key: string]: {
      boxes: ProductBox[];
      paging: PagingResponse;
    };
  };
  fetching: boolean;
  loaded: boolean;
  errored: boolean;
}

interface UserMembershipInfo {
  id: number;
  coins?: number;
  earned_coins?: number;
  lixicoins_expired_at?: UnixSeconds;
  membership_level?: number;
  uuid?: string;
}

export interface UserState {
  userTransactionList: {
    [key: string]: PageableUserTransactions;
  };
  fetchUserTransactions: FetchUserTransactionState;
  userMembershipInfo: UserMembershipInfo;
  isFetchUserMembershipInfo: boolean;
  cashbackBoxes: UserCashbackBoxesState;
  [key: string]: any; // TODO: Remove, and replace with exhaustive state typing
}
