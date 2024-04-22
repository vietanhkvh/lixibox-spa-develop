import { useState, useRef } from 'react';
import classnames from 'classnames';
import { NavLink } from 'react-router-dom';

import List from '../../../../presentation-component/ui/list';
import Popover from '../../../../presentation-component/ui/popover';
import CommentEditFormModal from './comment-edit-form-modal';

import { formatDateTime } from '../../../../utils/date-time';
import { DATETIME_FORMAT_TYPE } from '../../../../constants/application/global';
import { ROUTING_COMMUNITY_USER_FEED_PATH } from '../../../../routings/path';

import STYLE from './style';
import styles from './style.module.scss';

interface CommentProps {
  feed: any;
  comment: any;
  currentUserId: number;
  updateActivityFeedCommentAction: (param0: { feedId: number; commentId: number; content: string }) => any;
  deleteActivityFeedCommentAction: (param0: { feedId: number; commentId: number }) => any;
}
const Comment = ({
  feed,
  comment,
  currentUserId,
  updateActivityFeedCommentAction,
  deleteActivityFeedCommentAction
}: CommentProps) => {
  const [popoverVisibility, setPopoverVisibility] = useState(false);
  const [editModalVisibility, setEditModalVisibility] = useState(false);
  const commentReplyEl = useRef(null);

  return (
    <div key={comment.id} style={STYLE.commentGroup.container}>
      <NavLink
        to={`${ROUTING_COMMUNITY_USER_FEED_PATH}/${comment.user.referral_code}`}
        style={Object.assign({}, { backgroundImage: `url('${comment.user.avatar}')` }, STYLE.info.avatar)}
      />
      <div style={STYLE.commentGroup.contentGroup}>
        <div style={STYLE.commentGroup.contentGroup.inner}>
          <NavLink
            to={`${ROUTING_COMMUNITY_USER_FEED_PATH}/${comment.user.referral_code}`}
            style={STYLE.info.detail.username as any}
          >
            {comment.user.name}
          </NavLink>
          <span style={STYLE.commentGroup.contentGroup.comment as any}>{comment.content}</span>
        </div>
        <div className={styles.extraCommentInfo}>
          <div
            className={classnames(styles.section, styles.date)}
            title={formatDateTime(comment.created_at, DATETIME_FORMAT_TYPE.FULL_INFO)}
          >
            {formatDateTime(comment.created_at)}
            {''}
          </div>
          <div
            className={classnames(styles.section, styles.reply)}
            onClick={() => {
              const inputNewComment = document.getElementById('input-new-comment');
              !!inputNewComment && inputNewComment.focus();
            }}
          >
            Trả lời
          </div>
          {comment.user.id === currentUserId && (
            <>
              <Popover
                isOpen={popoverVisibility}
                anchorEl={commentReplyEl}
                classes={{ container: styles.commentOptions }}
                onRequestClose={() => {
                  setPopoverVisibility(false);
                }}
              >
                <List
                  classes={{ container: styles.list }}
                  data={comment}
                  onClick={({ action, data }) => {
                    switch (action.id) {
                      case 'update':
                        setPopoverVisibility(false);
                        setEditModalVisibility(true);
                        break;
                      case 'delete':
                        deleteActivityFeedCommentAction({ feedId: feed.id, commentId: comment.id });
                        setPopoverVisibility(false);
                        break;
                      default:
                    }
                  }}
                  list={[
                    { id: 'update', title: 'Sửa bình luận', icon: 'edit' },
                    { id: 'delete', title: 'Xóa bình luận', icon: 'trash' }
                  ]}
                />
              </Popover>
              <div
                ref={commentReplyEl}
                className={classnames(styles.section, styles.more)}
                onClick={() => {
                  setPopoverVisibility((state) => !state);
                }}
              >
                Thêm
              </div>
            </>
          )}
        </div>
      </div>
      <CommentEditFormModal
        isOpen={editModalVisibility}
        initialValue={comment.content}
        onSubmit={({ comment: content }) => {
          updateActivityFeedCommentAction({ feedId: feed.id, commentId: comment.id, content });
          setEditModalVisibility(false);
        }}
        onRequestClose={() => setEditModalVisibility(false)}
      />
    </div>
  );
};

export default Comment;
