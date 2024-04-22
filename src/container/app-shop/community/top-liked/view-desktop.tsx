import SplitLayout from '../../../layout/split';
import RightBarCommunity from '../right-bar-container';
import { TOP_STAT_NAV } from '../../../../constants/application/community';
import STYLE from './style';
import styles from './style.module.scss';

import FeedList from '../../../../components/container/feed-list';
import Loading from '../../../../components/ui/loading';

const CURRENT_TOP_NAV_CODE = 'communityTopLiked';
const getTopNavHeading = (topNav) => {
  const filtered = topNav.find((item) => CURRENT_TOP_NAV_CODE === item.code);
  if (!filtered) return '';
  return filtered.title;
};

const Heading = () => {
  return <div className={styles.heading}>{getTopNavHeading(TOP_STAT_NAV)}</div>;
};

function view({ history, userInfo, communityTopLiked }) {
  const feedListProps = {
    history,
    userProfile: userInfo,
    list: communityTopLiked,
    style: {}
  };

  return (
    <div>
      <Heading />
      {!communityTopLiked || !communityTopLiked.length ? <Loading /> : <FeedList {...feedListProps} />}
    </div>
  );
}

export function renderComponent() {
  const {
    activityFeedStore: { hashtags },
    feedbackStore: { userBoxesToFeedback },
    activityFeedStore: { communityTopLiked },
    authStore: { userInfo },
    history
  } = this.props;

  const rightBarCommunityProps = {
    hashtags,
    userBoxesToFeedback
  };

  const splitLayoutProps = {
    type: 'right',
    size: 'larger',
    subContainer: <RightBarCommunity {...rightBarCommunityProps} />,
    mainContainer: view.bind(this)({ history, userInfo, communityTopLiked })
  };

  return (
    <div style={STYLE.wrapLayout}>
      <SplitLayout {...splitLayoutProps} />
    </div>
  );
}

export default renderComponent;
