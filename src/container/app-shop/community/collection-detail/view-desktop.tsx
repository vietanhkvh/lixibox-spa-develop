import RightBarCommunity from '../right-bar-container';

import SplitLayout from '../../../layout/split';
import { renderMainContainer } from './view-general';
import STYLE from './style';
import { IProps } from './model';

function renderDesktop({ props, state, openFeedDetail }) {
  const {
    match: {
      params: { collectionId }
    },
    activityFeedStore: {
      collection: { detail },
      hashtags
    },
    authStore: { profile },
    feedbackStore: { userBoxesToFeedback }
  } = props as IProps;

  const { feedActiveId } = state;

  const rightBarCommunityProps = {
    hashtags,
    userBoxesToFeedback
  };

  const collectionDetail = detail && detail[collectionId];

  const splitLayoutProps = {
    type: 'right',
    size: 'largest',
    subContainer: <RightBarCommunity {...rightBarCommunityProps} />,
    mainContainer: renderMainContainer({
      collectionDetail,
      profile,
      feedActiveId,
      openFeedDetail
    })
  };

  return (
    <div style={STYLE.wrapLayout}>
      <SplitLayout {...splitLayoutProps} />
    </div>
  );
}

export default renderDesktop;
