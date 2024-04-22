import { isMobileVersion } from '../../../utils/responsive';
import LoadingPlaceholder from '../../ui/loading-placeholder';
import Pagination from 'components/general/pagination';
import NoContentPlaceholder, {
  NO_CONTENT_LOGO
} from '../../../presentation-component/general/mobile/no-content-placeholder';
import SummaryOrderDetailItem from '../detail-item';
import { ROUTING_SHOP_INDEX } from '../../../routings/path';

import { IProps, IState } from './model';
import STYLE from './style';
import styles from './style.module.scss';

export const renderItemPlaceholder = (item) => (
  <div
    style={Object.assign({}, STYLE.placeholder.productItem, isMobileVersion() && STYLE.placeholder.productMobileItem)}
    key={item}
  >
    <LoadingPlaceholder style={STYLE.placeholder.productItem.image} />
  </div>
);

const renderLoadingPlaceholder = () => {
  const list = isMobileVersion() ? [1, 2, 3, 4] : [1, 2, 3, 4, 5, 6, 7, 8];
  return (
    <div style={STYLE.placeholder}>
      <div style={STYLE.placeholder.productList}>{Array.isArray(list) && list.map(renderItemPlaceholder)}</div>
    </div>
  );
};

const renderView = ({ props, state }) => {
  const {
    list,
    style,
    current,
    per,
    total,
    urlList,
    cancelOrderAction,
    openModalAction,
    cancelOrderReasonList,
    history,
    orderType
  } = props as IProps;

  const { isLoadingList } = state as IState;

  const content = () => (
    <>
      <div style={Object.assign({}, STYLE.list)}>
        {Array.isArray(list) &&
          list.map((item) => {
            const sumaryOrderItemProps = {
              data: item,
              key: item.id,
              style: {},
              cancelOrderAction,
              openModalAction,
              cancelOrderReasonList,
              orderType
            };
            return (
              <div key={item.id} style={STYLE.item}>
                <SummaryOrderDetailItem {...sumaryOrderItemProps} />
              </div>
            );
          })}
      </div>
      <Pagination
        {...{
          current,
          per,
          total,
          urlList,
          handleClick: () => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
        }}
      />
    </>
  );

  return (
    <div className={'summary-order-list'} style={Object.assign({}, STYLE.container, style)}>
      {isLoadingList ? (
        renderLoadingPlaceholder()
      ) : Array.isArray(list) && list.length > 0 ? (
        content()
      ) : (
        <NoContentPlaceholder
          title="Không tìm thấy đơn hàng"
          logo={NO_CONTENT_LOGO.SHIPMENT}
          action={{ text: 'Tiếp tục mua sắm' }}
          onClick={() => history.push(ROUTING_SHOP_INDEX)}
          className={styles.noContentPlaceholder}
        />
      )}
    </div>
  );
};

export default renderView;
