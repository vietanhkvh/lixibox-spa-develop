import { objectToHash } from '../../../../utils/encode';
import { isEmptyObject } from '../../../../utils/validate';
import SummaryOrderList from '../../../../components/order/summary-list';
import MobileTabHeader from '../../../../presentation-component/general/mobile-tab-header';

import { IState, IProps } from './model';
import styles from './style.module.scss';

function renderView() {
  const {
    perPage,
    openModalAction,
    cancelOrderAction,
    userStore: { userOrderList, isFetchUserOrderList },
    orderStore: { cancelOrderReasonList }
  } = this.props as IProps;
  const { urlList, page, mobileTabs, status } = this.state as IState;

  const params = { page, perPage, status };
  const keyHash = objectToHash(params);

  const list = (userOrderList && userOrderList[keyHash]) || [];

  const { current_page, per_page, total_pages } = (!isEmptyObject(list) && list.paging) || {
    current_page: 0,
    per_page: 0,
    total_pages: 0
  };
  const _urlList = !isEmptyObject(list) && list.orders && !!list.orders.length ? urlList : [];

  const sumaryOrderListProps = {
    showHeader: false,
    cancelOrderAction,
    openModalAction,
    cancelOrderReasonList,
    list: (!isEmptyObject(list) && list.orders) || [],
    isShowCancelBtn: true,
    current: current_page,
    per: per_page,
    total: total_pages,
    urlList: _urlList,
    isFetchUserOrderList,
    orderType: 'ONLINE_ORDER'
  };

  return (
    <div className={'user-order-container'}>
      <MobileTabHeader
        tabs={mobileTabs}
        className={styles.mobileTabHeader}
        animate
        onSelect={this.handleChangeMobileTab.bind(this)}
      />
      <SummaryOrderList {...sumaryOrderListProps} />
    </div>
  );
}

export default renderView;
