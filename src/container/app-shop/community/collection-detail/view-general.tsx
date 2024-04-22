import Image from 'presentation-component/ui/image';
import FeedItem from '../../../../components/container/feed-item';
import Icon from '../../../../components/ui/icon';

import STYLE from './style';

const renderContent = (item) => {
  return (
    <div style={STYLE.item.content}>
      <div style={STYLE.item.content.title}>{item.name}</div>
      <div style={STYLE.item.content.description}>{item.description}</div>
    </div>
  );
};

const renderCollectionItem = (item) => {
  const iconProps = {
    name: 'star-light',
    style: STYLE.item.cover.icon,
    innerStyle: STYLE.item.cover.innerIcon
  };

  return (
    <div style={STYLE.item}>
      <Icon {...iconProps} />
      {renderContent(item)}
    </div>
  );
};

function renderFeedItem(item, $index) {
  const iconProps = {
    name: 'angle-down',
    style: STYLE.feedItem.heading.icon,
    innerStyle: STYLE.feedItem.heading.innerIcon
  };

  const feedItemProps = {
    history: window.history,
    item,
    userProfile: this.profile
  };

  return (
    <div key={`feed-item-${$index}`} style={STYLE.feedItem}>
      {item.id !== this.feedActiveId && (
        <div style={STYLE.feedItem.heading} onClick={() => this.openFeedDetail(item.id)}>
          <Image alt={''} src={item.user.avatar.medium_url} style={STYLE.feedItem.heading.avatar} />
          <div style={STYLE.feedItem.heading.infoUser}>
            <div style={STYLE.feedItem.heading.infoUser.name}>{item.user.name}</div>
            <div style={STYLE.feedItem.heading.infoUser.message}>{item.message}</div>
          </div>
          <Icon {...iconProps} />
        </div>
      )}

      {item.id === this.feedActiveId && <FeedItem {...feedItemProps}></FeedItem>}
    </div>
  );
}

const renderFeedList = ({ collectionDetail, profile, feedActiveId, openFeedDetail }) => {
  return (
    <div style={STYLE.feedList}>
      {collectionDetail.feeds.map(renderFeedItem, {
        feedActiveId,
        profile,
        openFeedDetail
      })}
    </div>
  );
};

export const renderMainContainer = ({ collectionDetail, profile, feedActiveId, openFeedDetail }) => {
  if (!collectionDetail) {
    return null;
  }

  return (
    <div style={STYLE}>
      {renderCollectionItem(collectionDetail.collection)}
      {renderFeedList({
        collectionDetail,
        profile,
        feedActiveId,
        openFeedDetail
      })}
    </div>
  );
};
