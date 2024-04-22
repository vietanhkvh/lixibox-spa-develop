import { useState, useEffect } from 'react';
import classNames from 'classnames';
import { isMobileVersion } from 'utils';
import { CDN_ASSETS_PREFIX } from 'utils/uri';
import Image from 'presentation-component/ui/image';
import MobileAutoDisplayHeader from 'presentation-component/general/mobile-auto-display-header';
import MobileScreenHeader from 'presentation-component/general/mobile-screen-header';
import MobileTabHeader from 'presentation-component/general/mobile-tab-header';
import TiktokUnboxingGuideline from './tiktok';
import styles from './style.module.scss';

const tabList = [
  {
    id: 0,
    code: 'facebook',
    icon: 'social-fb',
    title: 'Facebook'
  },
  {
    id: 1,
    code: 'instagram',
    icon: 'social-insta',
    title: 'Instagram'
  },
  {
    id: 2,
    code: 'tiktok',
    icon: 'social-tiktok',
    title: 'Tiktok'
  }
];

const setSelectedTab = (tabs, tab) => {
  return tabs.map((item) => {
    return {
      ...item,
      selected: tab.code === item.code
    };
  });
};

const setAvailableTabs = (allTabs, keys) => {
  const availableTabs = allTabs.filter((tab) => keys.includes(tab.code));

  if (availableTabs.length === 0) return availableTabs;

  return availableTabs.map((tab) =>
    Object.assign({}, tab, {
      selected: tab.code === availableTabs[0].code
    })
  );
};

const DEFAULT_SOURCES = ['facebook', 'instagram', 'tiktok'];

const unboxingGuidelines = {
  facebook: {
    type: 'image',
    guideline: CDN_ASSETS_PREFIX('/unboxing-guide-line/fb.png')
  },
  instagram: {
    type: 'image',
    guideline: CDN_ASSETS_PREFIX('/unboxing-guide-line/insta.png')
  },
  tiktok: {
    type: 'component',
    guideline: (
      <TiktokUnboxingGuideline
        classes={{
          container: isMobileVersion()
            ? styles.unboxingGuidelineComponentMobile
            : styles.unboxingGuidelineComponentDesktop
        }}
      />
    )
  }
};

interface UnboxingGuidelineProps {
  unboxingStore?: any;
  fetchUnboxingConfigAction?: any;
}
const UnboxingGuideline = ({
  unboxingStore: {
    config: unboxingConfig,
    config: { detail: configDetail }
  },
  fetchUnboxingConfigAction
}: UnboxingGuidelineProps) => {
  const tabKeys = (configDetail?.supported_sources?.length && configDetail?.supported_sources) || DEFAULT_SOURCES;
  const [tabs, setTabs] = useState(setAvailableTabs(tabList, tabKeys));
  useEffect(() => {
    if (!unboxingConfig?.fetching && !unboxingConfig?.loaded) {
      fetchUnboxingConfigAction();
    }
  }, []);
  useEffect(() => {
    setTabs(setAvailableTabs(tabList, tabKeys));
  }, [tabKeys]);
  const selectedTabKey = tabs.find((tab) => tab.selected)?.code;
  const shouldShowTabs = !!tabs.length && tabs.length > 1;
  const unboxingGuideline = unboxingGuidelines[selectedTabKey];

  return (
    <div className={styles.container}>
      {isMobileVersion() ? (
        <MobileAutoDisplayHeader row={shouldShowTabs ? 2 : 1}>
          <MobileScreenHeader title={'Cách tham gia thử thách đập hộp'} />
          {shouldShowTabs && (
            <MobileTabHeader
              tabs={tabs}
              className={classNames(isMobileVersion() ? styles.tabContainerMobile : styles.tabContainerDesktop)}
              iconClassName={styles.tabIcon}
              onSelect={(tab) => setTabs((tabs) => setSelectedTab(tabs, tab))}
            />
          )}
        </MobileAutoDisplayHeader>
      ) : (
        <>
          <div className={styles.desktopHeading}>Cách tham gia thử thách đập hộp</div>
          {shouldShowTabs && (
            <MobileTabHeader
              tabs={tabs}
              className={classNames(isMobileVersion() ? styles.tabContainerMobile : styles.tabContainerDesktop)}
              iconClassName={styles.tabIcon}
              onSelect={(tab) => setTabs((tabs) => setSelectedTab(tabs, tab))}
            />
          )}
        </>
      )}
      {unboxingGuideline.type === 'image' ? (
        <div className={styles.unboxingGuidelineImage}>
          <Image alt={''} src={unboxingGuideline.guideline} />
        </div>
      ) : (
        unboxingGuideline.guideline
      )}
    </div>
  );
};

export default UnboxingGuideline;
