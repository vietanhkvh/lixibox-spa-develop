import { useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import { isMobileDevice } from '../../../../utils/responsive';
import NoContentPlaceholder, {
  NO_CONTENT_LOGO
} from '../../../../presentation-component/general/mobile/no-content-placeholder';
import { ROUTING_SHOP_INDEX } from '../../../../routings/path';

import LiveList from '../../../../presentation-component/live/live-list';
import LiveListItem from '../../../../presentation-component/live/live-list-item';
import MobileAutoDisplayHeader from '../../../../presentation-component/general/mobile-auto-display-header';
import MobileTabHeader from '../../../../presentation-component/general/mobile-tab-header';
import Loading from '../../../../components/ui/loading';
import { FEEDBACK_MOBILE_TABS } from '../../../../constants/application/feedback';

import styles from './style.module.scss';

const LiveItem = (item, index) => (
  <div key={index}>
    <LiveListItem data={item} />
  </div>
);

const MobileHeaderNavigation = () => {
  const tabs = FEEDBACK_MOBILE_TABS;

  return (
    <MobileAutoDisplayHeader row={1}>
      <MobileTabHeader tabs={tabs} />
    </MobileAutoDisplayHeader>
  );
};

const liveListTransform = (liveList) =>
  liveList.map((item) => ({
    name: item.title,
    slug: item.slug,
    coverImage: item.image_url,
    createdAt: item.start_at,
    endAt: item.end_at
  }));

const Component = (props) => {
  const {
    liveStore: { liveList, isFetchLiveList },
    fetchLiveListAction,
    history
  } = props;

  useEffect(() => {
    fetchLiveListAction({});
  }, []);

  const transformedLiveList = (Array.isArray(liveList) && liveListTransform(liveList)) || [];

  return (
    <>
      {isMobileDevice() && <MobileHeaderNavigation />}
      {isFetchLiveList ? (
        <Loading />
      ) : !!transformedLiveList && !!transformedLiveList.length ? (
        <LiveList>{transformedLiveList.map(LiveItem)}</LiveList>
      ) : (
        <NoContentPlaceholder
          title="Không tìm thấy"
          info="Hiện tại chưa có video live streams nào, vui lòng quay lại sau bạn nhé"
          logo={NO_CONTENT_LOGO.SHIPMENT}
          action={{ text: 'Tiếp tục mua sắm' }}
          onClick={() => history.push(ROUTING_SHOP_INDEX)}
          className={styles.noContentPlaceholder}
        />
      )}
    </>
  );
};

export default withRouter(Component);
