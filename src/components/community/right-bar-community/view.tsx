import { NavLink } from 'react-router-dom';

import {
  GA_TRACKING_EVENT_LABEL,
  GA_TRACKING_EVENT_ACTION,
  GA_TRACKING_EVENT_CATEGORY
} from '../../../tracking/google-analytic/type';
import { gaEventTracking } from '../../../tracking/google-analytic/ga-event-tracking';

import { objectToHash } from '../../../utils/encode';
import { ROUTING_COMMUNITY_TAG_PATH } from '../../../routings/path';
import SuggestionFeedbackCreate from '../suggestion-feedback-create';

import STYLE from './style';
import { IProps } from './model';

const renderHeader = (name, style = {}) => {
  return <div style={Object.assign({}, STYLE.header, style)}>{name}</div>;
};

const renderTags = ({ hashtagList, hashtagSelected }) => (
  <div style={STYLE.wrapTag}>
    {Array.isArray(hashtagList) && hashtagList.length !== 0 && hashtagList.map(handleRenderTags, { hashtagSelected })}
  </div>
);

function handleRenderTags(item, index) {
  const tagName = (item && item.name) || '';

  const linkProps = {
    to: `${ROUTING_COMMUNITY_TAG_PATH}/${tagName}`,
    key: `tag-item-${index}`,
    style: Object.assign({}, STYLE.wrapTag.tag, this.hashtagSelected === tagName && STYLE.wrapTag.tag.active),
    onClick: () => {
      gaEventTracking({
        category: GA_TRACKING_EVENT_CATEGORY.BEHAVIOR_IN_PAGE,
        action: GA_TRACKING_EVENT_ACTION.BEHAVIOR_IN_PAGE.COMMNUNITY_PAGE,
        label: GA_TRACKING_EVENT_LABEL.BEHAVIOR_IN_PAGE.COMMNUNITY_PAGE.RIGHT_SIDEBAR.TAG,
        value: 1
      });
    }
  };

  return <NavLink {...linkProps}>{`# ${tagName}`}</NavLink>;
}

const renderTrendingTags = ({ hashtagList, hashtagSelected }) => {
  return (
    hashtagList &&
    hashtagList.length !== 0 && (
      <div style={STYLE.hashtagGroup}>
        {renderHeader('Từ khóa nổi bật', { paddingBottom: 10 })}
        {renderTags({ hashtagList, hashtagSelected })}
      </div>
    )
  );
};

export function renderComponent({ props }) {
  const { hashtagList, hashtagSelected, userBoxesToFeedback, isShowUnReview } = props as IProps;

  const userBoxesToFeedbackHash = objectToHash({ page: 1, perPage: 30 });
  const listBoxNeedToFeedback =
    (!!userBoxesToFeedback &&
      !!userBoxesToFeedback[userBoxesToFeedbackHash] &&
      userBoxesToFeedback[userBoxesToFeedbackHash].boxes) ||
    [];

  return (
    <div style={STYLE.wrapLayout} id={'desktop-community-right-sticky'}>
      {renderTrendingTags({ hashtagList, hashtagSelected })}
      {!!isShowUnReview &&
        !!listBoxNeedToFeedback &&
        !!listBoxNeedToFeedback.length &&
        SuggestionFeedbackCreate({
          listBoxNeedToFeedback: [...listBoxNeedToFeedback].filter((item, index) => index < 3),
          onClickItem: () => {
            gaEventTracking({
              category: GA_TRACKING_EVENT_CATEGORY.BEHAVIOR_IN_PAGE,
              action: GA_TRACKING_EVENT_ACTION.BEHAVIOR_IN_PAGE.COMMNUNITY_PAGE,
              label: GA_TRACKING_EVENT_LABEL.BEHAVIOR_IN_PAGE.COMMNUNITY_PAGE.RIGHT_SIDEBAR.SUGGESTION_CREATE_FEED,
              value: 1
            });
          }
        })}
    </div>
  );
}
