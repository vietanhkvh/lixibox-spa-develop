import FeedItem from '../feed-item';
import SeparateLine from '../../../presentation-component/ui/separate-line';
import { isMobileVersion } from '../../../utils/responsive';

import { IFeedProps } from './model';
import STYLE from './style';

export function renderView() {
  const { list, userProfile, style, history, isFeedDetail } = this.props as IFeedProps;
  const { forceDisableVideo } = this.state;

  const handleRenderItem = (item) => {
    const feedItemProps = {
      item,
      history,
      userProfile,
      isFeedDetail,
      key: `feed-detail-item-${item.id}`,
      style: STYLE.feedItem,
      forceDisableVideo,
      onDisableVideo: this.handleDisableVideo.bind(this)
    };

    return (
      <div style={STYLE.outerFeedItem} key={`feed-item-${item.id}`}>
        <FeedItem {...feedItemProps} />
        {!!isMobileVersion() && <SeparateLine />}
      </div>
    );
  };

  return (
    <div style={Object.assign({}, STYLE.container, style)}>
      {Array.isArray(list) && list.length > 0 && list.map(handleRenderItem)}
    </div>
  );
}
