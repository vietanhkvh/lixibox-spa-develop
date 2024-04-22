import SplitLayout from '../../../layout/split';
import RightBarCommunity from '../right-bar-container';
import { TOP_STAT_NAV } from '../../../../constants/application/community';
import STYLE from './style';
import styles from './style.module.scss';

import ReviewStickyList from '../../../../presentation-component/feed/review-sticky-list';
import Loading from '../../../../components/ui/loading';

const CURRENT_TOP_NAV_CODE = 'communityTopReview';
const getTopNavHeading = (topNav) => {
  const filtered = topNav.find((item) => CURRENT_TOP_NAV_CODE === item.code);
  if (!filtered) return '';
  return filtered.title;
};

const Heading = () => {
  return <div className={styles.heading}>{getTopNavHeading(TOP_STAT_NAV)}</div>;
};

function view({ history, userInfo, communityTopReview, isDisplayMobileAutoHeaeder }) {
  const reviewStickyListProps = {
    stickyPosition: 0,
    history,
    userProfile: userInfo,
    list: communityTopReview,
    style: {}
  };

  return (
    <div>
      <Heading />
      {!communityTopReview || !communityTopReview.length ? (
        <Loading />
      ) : (
        <ReviewStickyList {...reviewStickyListProps} />
      )}
    </div>
  );
}

export function renderComponent() {
  const { isDisplayMobileAutoHeaeder } = this.state;
  const {
    activityFeedStore: { hashtags },
    feedbackStore: { userBoxesToFeedback },
    activityFeedStore: { communityTopReview },
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
    mainContainer: view.bind(this)({ history, userInfo, communityTopReview, isDisplayMobileAutoHeaeder })
  };

  return (
    <div style={STYLE.wrapLayout}>
      <SplitLayout {...splitLayoutProps} />
    </div>
  );
}

export default renderComponent;
