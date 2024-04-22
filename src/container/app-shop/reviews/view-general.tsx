import Image from 'presentation-component/ui/image';
import { isEmptyObject } from '../../../utils/validate';
import { formatDateTime } from '../../../utils/date-time';
import { DATETIME_FORMAT_TYPE } from '../../../constants/application/global';
import { renderHtmlContent } from '../../../utils/html';
import { createBreakDownLine } from '../../../utils/format';

import RatingStar from '../../../components/ui/rating-star';

import STYLE from './style';

function renderFeedItem({ feedItem }) {
  const itemStyle = STYLE.headerWrap.item;

  return (
    <div style={itemStyle.container}>
      {/** 1 Item : Info */}
      <div style={STYLE.headerWrap}>
        <div style={itemStyle.info.container}>
          {/** 1.1 Item : Info : Avatar user */}
          <div
            style={Object.assign(
              {},
              {
                backgroundImage: `url(${
                  (feedItem && feedItem.user && feedItem.user.avatar && feedItem.user.avatar.medium_url) || ''
                })`
              },
              itemStyle.info.avatar
            )}
          />
          <div style={itemStyle.info.detail} className={'icon-item'}>
            <div>
              <span style={itemStyle.info.detail.username}>
                {(feedItem && feedItem.user && feedItem.user.name) || ''}
              </span>
            </div>
            <div style={itemStyle.info.detail.ratingGroup}>
              {feedItem && feedItem.rate && (
                <RatingStar style={itemStyle.info.detail.ratingGroup.rating} value={feedItem.rate} />
              )}
              {feedItem && feedItem.created_at && (
                <div
                  style={itemStyle.info.detail.ratingGroup.date}
                  title={formatDateTime(feedItem.created_at, DATETIME_FORMAT_TYPE.FULL_INFO)}
                >
                  {formatDateTime(feedItem.created_at, DATETIME_FORMAT_TYPE.DD_MM_YYYY)}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div>
        <Image
          style={STYLE.headerWrap.imgProduct.img}
          src={(feedItem && feedItem.feedbackable_image && feedItem.feedbackable_image.large_url) || ''}
        />
      </div>
      {/** 2 Item : Content Detail */}
      {renderHtmlContent({
        content: createBreakDownLine((feedItem && feedItem.review) || ''),
        style: itemStyle.info.description.container,
        isDetectLink: true
      })}
    </div>
  );
}

export const renderMainContainer = ({ feedItem }) => {
  return isEmptyObject(feedItem) ? null : <div style={STYLE}>{renderFeedItem({ feedItem })}</div>;
};
