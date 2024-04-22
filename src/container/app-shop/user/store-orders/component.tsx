// TODO: Refactor. Cloned and adapted from `container/app-shop/user/order`
import { useEffect, useState, useRef } from 'react';

import { isMobileVersion } from '../../../../utils/responsive';
import MobileAutoDisplayHeader from '../../../../presentation-component/general/mobile-auto-display-header';
import MobileScreenHeader from '../../../../presentation-component/general/mobile-screen-header';
import SummaryOrderList from '../../../../components/order/summary-list';
import { objectToHash } from '../../../../utils/encode';
import { getUrlParameter } from '../../../../utils/format';
import { usePrevious } from '../../../../utils/hook';
import { ROUTING_USER_ORDER_STORE_PURCHASES } from '../../../../routings/path';
import styles from './style.module.scss';

interface StoreOrderProps {
  perPage?: number;
  history: any;
  userStore: any;
  orderStore: any;
  fetchUserStoreOrdersAction: (param0?: any) => any;
  cancelOrderAction: (param0?: any) => any;
  openModalAction: (param0?: any) => any;
  getCancelOrderReasonAction: (param0?: any) => any;
}
const StoreOrders = ({
  perPage,
  history,
  userStore: {
    storeOrders: {
      byQuery: storeOrdersByQuery,
      lastPaging: storeOrdersLastPaging,
      fetching: fetchingStoreOrders,
      loaded: loadedStoreOrders,
      errored: erroredStoreOrders
    }
  },
  orderStore: { cancelOrderReasonList, isCancelOrderSuccess },
  fetchUserStoreOrdersAction,
  cancelOrderAction,
  openModalAction,
  getCancelOrderReasonAction
}: StoreOrderProps) => {
  const page = parseInt(getUrlParameter(history.location.search, 'page')) || 1;
  const params = { page, perPage };
  const keyHash = objectToHash(params);

  const list = (storeOrdersByQuery && storeOrdersByQuery[keyHash]) || [];
  const { current_page, per_page, total_pages } = storeOrdersLastPaging || {
    current_page: 0,
    per_page: 0,
    total_pages: 0
  };
  const sectionRef: any = useRef();
  const prevPage = usePrevious(page);
  const wasCancelOrderSuccess = usePrevious(isCancelOrderSuccess);
  const wasFetchingStoreOrders = usePrevious(fetchingStoreOrders);
  const [urlList, setUrlList] = useState([]);
  const [pageState, setPageState] = useState(page);
  const initPagination = ({ totalPages }) => {
    const urls = Array.from({ length: totalPages }, (_, index) => index + 1).map((nth) => ({
      number: nth,
      title: nth,
      link: `${ROUTING_USER_ORDER_STORE_PURCHASES}?page=${nth}`
    }));

    setUrlList(urls);
  };
  useEffect(() => {
    fetchUserStoreOrdersAction(params);
    initPagination({ totalPages: total_pages });
    getCancelOrderReasonAction();
  }, []);

  useEffect(() => {
    if (wasFetchingStoreOrders && !fetchingStoreOrders && !erroredStoreOrders) {
      initPagination({ totalPages: total_pages });
    }
  }, [fetchingStoreOrders, wasFetchingStoreOrders, erroredStoreOrders, total_pages]);

  useEffect(() => {
    !wasCancelOrderSuccess && isCancelOrderSuccess && getCancelOrderReasonAction();
  }, [isCancelOrderSuccess]);

  useEffect(() => {
    if (page !== pageState) {
      setPageState(page);
      fetchUserStoreOrdersAction(params);
    }
    prevPage && prevPage !== page && sectionRef.current && sectionRef.current.scrollIntoView();
  }, [page]);

  const _urlList = list.length ? urlList : [];

  const sumaryOrderListProps = {
    showHeader: false,
    cancelOrderAction,
    openModalAction,
    cancelOrderReasonList,
    list,
    isShowCancelBtn: true,
    current: current_page,
    per: per_page,
    total: total_pages,
    urlList: _urlList,
    isFetchUserOrderList: !fetchingStoreOrders && loadedStoreOrders,
    orderType: 'STORE_ORDER'
  };

  return (
    <div className={'summary-delivery-list'} ref={sectionRef}>
      {!!isMobileVersion() ? (
        <MobileAutoDisplayHeader row={1}>
          <MobileScreenHeader title={'Mua tại cửa hàng'} />
        </MobileAutoDisplayHeader>
      ) : (
        <div className={styles.desktopHeading}>Mua tại cửa hàng</div>
      )}
      <SummaryOrderList {...sumaryOrderListProps} />
    </div>
  );
};
StoreOrders.defaultProps = {
  perPage: 20
};

export default StoreOrders;
