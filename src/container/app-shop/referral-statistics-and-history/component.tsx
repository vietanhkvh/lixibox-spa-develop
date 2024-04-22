import { useState, useMemo } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { isMobileVersion } from '../../../utils/responsive';
import { GetReferralStatisticsAndHistoryActionParams } from '../../../flows/referral/action';
import {
  ReferralState,
  ReferralHistoryStatus,
  ReferralStatisticsAndHistoryResponseSummary,
  ReferralStatisticsAndHistoryResponseRewardHistory
} from '../../../flows/referral/types';
import { ReferralStatisticsAndHistoryTabs } from './constant';
import DesktopView from './view/desktop';
import MobileView from './view/mobile';
import { objectToHash } from 'utils';

interface Tab {
  id: string;
  title: string;
  selected?: boolean;
}
interface ViewProps {
  isLoaded: boolean;
  statistics: ReferralStatisticsAndHistoryResponseSummary;
  referrals: Array<ReferralStatisticsAndHistoryResponseRewardHistory>;
  tabs: Array<Tab>;
  onTabSelect: (Tab) => any;
}
interface ReferralStatisticsAndHistoryProps {
  referralStore: ReferralState;
  getReferralStatisticsAndHistoryAction: (data: GetReferralStatisticsAndHistoryActionParams) => any;
}
const ReferralStatisticsAndHistory = ({
  referralStore: { statisticsAndHistory },
  getReferralStatisticsAndHistoryAction
}: ReferralStatisticsAndHistoryProps) => {
  const history = useHistory();
  const { search, pathname } = useLocation();
  const query = useMemo(() => new URLSearchParams(search), [search]);
  const activeTabId = (query.get('tab') || 'completed') as ReferralHistoryStatus;
  const apiQuery = { status: activeTabId };
  const apiQueryHash = objectToHash(apiQuery);
  const [tabs, setTabs] = useState(
    ReferralStatisticsAndHistoryTabs.map((tab) => Object.assign({}, tab, { selected: tab.id === activeTabId }))
  );
  useMemo(() => {
    getReferralStatisticsAndHistoryAction({ status: activeTabId });
  }, [activeTabId]);
  const referralHistory = statisticsAndHistory.byQuery[apiQueryHash];

  const onTabSelect = (selectedTab: Tab) => {
    const newQuery = new URLSearchParams(query.toString());
    newQuery.set('tab', selectedTab.id);
    history.push(`${pathname}?${newQuery.toString()}`);
    setTabs((tabs) => tabs.map((tab) => Object.assign({}, tab, { selected: tab.id === selectedTab.id })));
  };

  const View = isMobileVersion() ? MobileView : DesktopView;

  return (
    <View
      {...{
        isLoaded: statisticsAndHistory.loaded && !!referralHistory,
        statistics: statisticsAndHistory.summary,
        referrals: referralHistory,
        tabs,
        onTabSelect
      }}
    />
  );
};

export type { Tab, ViewProps, ReferralStatisticsAndHistoryProps };
export default ReferralStatisticsAndHistory;
