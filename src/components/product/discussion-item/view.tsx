import { renderHtmlContent } from '../../../utils/html';
import { formatDateTime } from '../../../utils/date-time';
import { MODAL_SIGN_IN } from '../../../constants/application/modal';
import { auth } from '../../../utils/auth';

import STYLE from './style';
import { IProps } from './model';

const renderParentComment = ({ comment, handleReply, openModal }) => {
  const avatarProps = {
    style: Object.assign(
      {},
      {
        backgroundImage: `url(${(comment && comment.user_avatar && comment.user_avatar.medium_url) || ''})`
      },
      STYLE.headerWrap.item.info.avatar
    )
  };

  return (
    <div style={STYLE.headerWrap}>
      <div style={STYLE.headerWrap.item.info.container}>
        <div {...avatarProps} />
        <div style={STYLE.headerWrap.item.info.detailContainer}>
          <div style={STYLE.headerWrap.item.info.detail}>
            <div style={STYLE.headerWrap.item.info.detail.username}>{(comment && comment.user_name) || ''}</div>
            <div style={STYLE.headerWrap.item.info.description.container}>
              {renderHtmlContent({ content: comment ? comment.content : '', isDetectLink: true }) || ''}
            </div>
          </div>
          <div style={STYLE.headerWrap.item.info.detail.infoGroup}>
            <div
              style={STYLE.headerWrap.item.info.detail.infoGroup.date}
              title={formatDateTime(comment && comment.created_at)}
            >
              {formatDateTime(comment && comment.created_at)}
            </div>
            <div
              onClick={() => (auth.loggedIn() ? handleReply(comment) : openModal(MODAL_SIGN_IN()))}
              style={STYLE.headerWrap.item.info.detail.infoGroup.reply}
            >
              Trả lời
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function handleRenderItem(comment) {
  const avatarProps = {
    style: Object.assign(
      {},
      {
        backgroundImage: `url('${(comment && comment.avatar && comment.avatar.medium_url) || ''}')`
      },
      STYLE.headerWrap.item.info.avatar,
      STYLE.headerWrap.item.info.avatar.small
    )
  };
  return (
    <div key={`discussion-item-${(comment && comment.id) || 0}`} style={STYLE.headerWrap.item.commentGroup.container}>
      <div style={STYLE.headerWrap.item.commentGroup.contenGroup.topInfo}>
        <div {...avatarProps} />
        <span style={STYLE.headerWrap.item.info.detail.username}>{(comment && comment.user_name) || ''}</span>
      </div>
      <div style={STYLE.headerWrap.item.commentGroup.contenGroup.comment}>
        {renderHtmlContent({ content: comment ? comment.content : '', isDetectLink: true }) || ''}
      </div>

      <div style={Object.assign({}, STYLE.headerWrap.item.info.detail.infoGroup, { paddingLeft: 16 })}>
        <div
          style={STYLE.headerWrap.item.info.detail.infoGroup.date}
          title={formatDateTime(comment && comment.created_at)}
        >
          {formatDateTime(comment && comment.created_at)}
        </div>
        <div
          onClick={() => (auth.loggedIn() ? this.handleReply(comment) : this.openModal(MODAL_SIGN_IN()))}
          style={STYLE.headerWrap.item.info.detail.infoGroup.reply}
        >
          Trả lời
        </div>
      </div>
    </div>
  );
}

const renderChildCommentList = ({ comments, handleReply, openModal }) =>
  Array.isArray(comments) && comments.map(handleRenderItem, { handleReply, openModal });

export function renderComponent({
  props,
  state,
  handleAddComment,
  handleInputOnChange,
  handleOnKeyUp,
  handleReply,
  setInputCommentRef
}) {
  const {
    // userInfo,
    openModal,
    hasLastChild,
    commentChild
  } = props as IProps;

  return (
    <div
      style={Object.assign({}, STYLE.headerWrap.item.container, hasLastChild ? STYLE.headerWrap.item.lastChild : '')}
    >
      {renderParentComment({ comment: commentChild, handleReply, openModal })}
      <div style={STYLE.headerWrap.item.commentGroup}>
        {renderChildCommentList({
          comments: commentChild.comments || [],
          handleReply: (comment) => handleReply(Object.assign({}, comment, { id: commentChild.id })),
          openModal
        })}
      </div>
    </div>
  );
}
