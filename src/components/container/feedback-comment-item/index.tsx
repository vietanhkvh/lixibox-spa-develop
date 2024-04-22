import { formatDateTime } from 'utils/date-time';
import { DATETIME_FORMAT_TYPE } from 'constants/application/global';
import { renderHtmlContent } from 'utils/html';
import { BoxFeedbackComment } from 'types/api/shop';
import STYLE from './style';

interface FeedbackCommentItemProps {
  comment: BoxFeedbackComment;
}
const FeedbackCommentItem = ({ comment }: FeedbackCommentItemProps) => {
  return (
    <div key={`discussion-item-${(comment && comment.id) || 0}`} style={STYLE.commentGroup}>
      <div style={STYLE.commentGroup.contenGroup.topInfo}>
        <div
          style={Object.assign(
            {},
            {
              backgroundImage: `url('${(comment && comment.avatar && comment.avatar.medium_url) || ''}')`
            },
            STYLE.info.avatar,
            STYLE.info.avatar.small
          )}
        />
        <span style={STYLE.info.detail.username}>{(comment && comment.user_name) || ''}</span>
      </div>
      <div style={STYLE.commentGroup.contenGroup.comment}>
        {renderHtmlContent({ content: comment ? comment.content : '', isDetectLink: true }) || ''}
      </div>

      <div style={Object.assign({}, STYLE.info.detail.infoGroup, { paddingLeft: 16 })}>
        <div
          style={STYLE.info.detail.infoGroup.date}
          title={formatDateTime(comment && comment.created_at, DATETIME_FORMAT_TYPE.FULL_INFO)}
        >
          {formatDateTime(comment && comment.created_at)}
        </div>
      </div>
    </div>
  );
};

export default FeedbackCommentItem;
