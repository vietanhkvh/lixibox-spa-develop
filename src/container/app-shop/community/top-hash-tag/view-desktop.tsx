import SplitLayout from '../../../layout/split';
import RightBarCommunity from '../right-bar-container';

import STYLE from './style';

import MobileTabHeader from '../../../../presentation-component/general/mobile-tab-header';
import SeparateLine from '../../../../presentation-component/ui/separate-line';
import FeedList from '../../../../components/container/feed-list';
import Loading from '../../../../components/ui/loading';
import { objectToHash } from '../../../../utils/encode';
import NoContentPlaceholder, { NO_CONTENT_LOGO } from 'presentation-component/general/mobile/no-content-placeholder';
import styles from './styles.module.scss';
function view() {
  const { isOpenScreenHeaderDropdown, selectedHashIndex } = this.state;
  const {
    activityFeedStore: { hashtags, hashtagFeeds, isFetchingHashtagFeeds },
    authStore: { userInfo },
    history
  } = this.props;

  window.addEventListener('scroll', () => {
    !!isOpenScreenHeaderDropdown && this.handleDisplayScreenHeaderDropdown(false);
  });

  const hashString = objectToHash({ days: 7 });
  const tabs = (!!hashtags && hashtags[hashString]) || [];
  const formatTabs = tabs.map((item, index) => ({
    title: `${item.name} (${item.count})`,
    name: item.name,
    id: index,
    selected: index === selectedHashIndex
  }));

  const mobileTabHeaderProps = {
    isBorderStyle: true,
    tabs: formatTabs,
    onSelect: this.handleSelectHashTabs.bind(this)
  };

  const feedListProps = {
    history,
    userProfile: userInfo,
    list: hashtagFeeds,
    style: {}
  };

  return (
    <div>
      <Heading title={'Top được đề cập nhiều nhất'} />
      <MobileTabHeader {...mobileTabHeaderProps} />
      <SeparateLine />
      {isFetchingHashtagFeeds ? (
        <Loading />
      ) : !hashtagFeeds || !hashtagFeeds.length ? (
        <NoContentPlaceholder
          title="Chưa có hash tag được dề cập nhiều nhất"
          info="Hãy quay lại sau bạn nhe"
          logo={NO_CONTENT_LOGO.SEARCH_EMPTY}
          className={styles.noResultPlaceholder}
        />
      ) : (
        <FeedList {...feedListProps} />
      )}
    </div>
  );
}

const Heading = ({ title }) => {
  return <div style={STYLE.screenHeading}>{title}</div>;
};

export function renderComponent() {
  const {
    activityFeedStore: { hashtags },
    feedbackStore: { userBoxesToFeedback }
  } = this.props;

  const rightBarCommunityProps = {
    hashtags,
    userBoxesToFeedback
  };

  const splitLayoutProps = {
    type: 'right',
    size: 'larger',
    subContainer: <RightBarCommunity {...rightBarCommunityProps} />,
    mainContainer: view.bind(this)()
  };

  return (
    <div style={STYLE.wrapLayout}>
      <SplitLayout {...splitLayoutProps} />
    </div>
  );
}

export default renderComponent;
