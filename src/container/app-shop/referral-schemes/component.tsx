import { useState, useMemo, useEffect } from 'react';
import { generatePath, useHistory, useLocation } from 'react-router-dom';

import { isMobileVersion } from '../../../utils/responsive';
import { objectToHash } from '../../../utils';
import { auth } from '../../../utils/auth';
import { GetReferralSchemesActionParams } from '../../../flows/referral/action';
import { ReferralState } from '../../../flows/referral/types';
import { ReferralSchemeStatus } from '../../../api/referral';
import { usePrevious } from '../../../utils/hook';
import { generateSchemeTimelineNote } from '../../../utils/referral';
import { setCustomReferrer } from 'utils/navigate';
import { ALERT_REFERRAL_SCHEMES_SHARE_LINK_FETCH_ERROR } from '../../../constants/application/alert';
import { ROUTING_AUTH_SIGN_IN, ROUTING_USER_INVITE, ROUTING_USER_INVITE_DETAIL } from '../../../routings/path';
import type { Scheme } from '../../../presentation-component/referral/referral-scheme';
import type { ReferralCodePrimaryButtonProps } from '../../../presentation-component/referral/referral-code';
import { OpenAlertActionParams } from '../../../flows/alert/action';
import { ReferralSchemeTabs } from './constant';
import DesktopView from './view/desktop';
import MobileView from './view/mobile';

export interface Tab {
  id: string;
  title: string;
  selected?: boolean;
}
export interface ViewProps {
  code: string;
  schemes: Array<Scheme>;
  tabs: Array<Tab>;
  isLoggedIn: boolean;
  primaryButton?: ReferralCodePrimaryButtonProps;
  onTabSelect: (Tab) => any;
  onCopy: () => any;
  onSchemeClick: (scheme: Scheme) => any;
}

export interface ReferralSchemesProps {
  referralStore: ReferralState;
  authStore: any;
  copyTextToClipboard: (text: string) => any;
  openAlertAction: (data: OpenAlertActionParams) => any;
  getReferralSchemesAction: (params: GetReferralSchemesActionParams) => any;
  getReferralSchemesShareLinkAction: () => any;
}
const ReferralSchemes = ({
  referralStore: { availableSchemes, expiredSchemes, schemesShareLink },
  authStore: { userInfo },
  copyTextToClipboard,
  openAlertAction,
  getReferralSchemesAction,
  getReferralSchemesShareLinkAction
}: ReferralSchemesProps) => {
  const history = useHistory();
  const { search, pathname } = useLocation();
  const query = useMemo(() => new URLSearchParams(search), [search]);
  const [isPrimaryButtonLoading, setIsPrimaryButtonLoading] = useState<boolean>(false);
  const wasFetchingSchemesShareLink = usePrevious(schemesShareLink.fetching);
  useEffect(() => {
    if (wasFetchingSchemesShareLink && !schemesShareLink.fetching) {
      setIsPrimaryButtonLoading(false);
      if (schemesShareLink.errored) {
        openAlertAction(ALERT_REFERRAL_SCHEMES_SHARE_LINK_FETCH_ERROR);
      } else {
        copyTextToClipboard(schemesShareLink.link.web_url);
      }
    }
  }, [schemesShareLink.fetching]);
  const activeTabId = (query.get('tab') || 'available') as ReferralSchemeStatus;
  const schemeIndexQuery = { status: activeTabId };
  const schemeIndexQueryHash = objectToHash(schemeIndexQuery);
  useMemo(() => {
    getReferralSchemesAction(schemeIndexQuery);
  }, [activeTabId]);
  const [tabs, setTabs] = useState(
    ReferralSchemeTabs.map((tab) => Object.assign({}, tab, { selected: tab.id === activeTabId }))
  );

  const code = userInfo.referral_code || 'Đăng nhập để xem mã giới thiệu';

  const _schemes =
    activeTabId === 'available'
      ? availableSchemes.byQuery[schemeIndexQueryHash]
      : expiredSchemes.byQuery[schemeIndexQueryHash];
  const schemes = Array.isArray(_schemes)
    ? _schemes.map((scheme) => ({
        id: scheme.id,
        title: scheme.name,
        bannerUrl: scheme.banner.url,
        note: generateSchemeTimelineNote(scheme),
        isExpired: activeTabId !== 'available'
      }))
    : [];

  const onTabSelect = (selectedTab: Tab) => {
    const newQuery = new URLSearchParams(query.toString());
    newQuery.set('tab', selectedTab.id);
    history.push(`${pathname}?${newQuery.toString()}`);
    setTabs((tabs) => tabs.map((tab) => Object.assign({}, tab, { selected: tab.id === selectedTab.id })));
  };

  const onCopy = () => {
    if (auth.loggedIn()) {
      copyTextToClipboard(code);
    } else {
      setCustomReferrer({ value: ROUTING_USER_INVITE });
      history.push(ROUTING_AUTH_SIGN_IN);
    }
  };
  const onPrimaryButtonClick = () => {
    if (schemesShareLink.link) {
      copyTextToClipboard(schemesShareLink.link.web_url);
    } else {
      getReferralSchemesShareLinkAction();
      setIsPrimaryButtonLoading(true);
    }
  };
  const onSchemeClick = (scheme: Scheme) => {
    const path = generatePath(ROUTING_USER_INVITE_DETAIL, { id: scheme.id });
    history.push(path);
  };

  const View = isMobileVersion() ? MobileView : DesktopView;

  return (
    <View
      {...{
        code,
        schemes,
        tabs,
        isLoggedIn: auth.loggedIn(),
        primaryButton: {
          title: isMobileVersion() ? 'Chia sẻ ngay' : 'Sao chép link giới thiệu',
          loading: isPrimaryButtonLoading,
          onClick: onPrimaryButtonClick
        },
        onTabSelect,
        onCopy,
        onSchemeClick
      }}
    />
  );
};

export default ReferralSchemes;
