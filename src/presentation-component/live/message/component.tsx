import { useState } from 'react';
import classnames from 'classnames';

import Loading from '../../../components/ui/loading';
import NoContentPlaceholder, { NO_CONTENT_LOGO } from '../../general/mobile/no-content-placeholder';

import SectionHeading from '../section-heading';
import DiscussionPanel from '../../general/discussion-panel';
import DiscussionItem from '../../general/discussion-item';
import DiscussionReply from '../../general/discussion-reply';

import styles from './style.module.scss';

function DiscussionItemChild(item, index) {
  return (
    <div>
      <DiscussionItem {...item} onReplyTo={!!this ? this.handleReplyTo : undefined} />
    </div>
  );
}

const MainMessagePanel = ({
  commentList,
  receiveNewComment,
  isFetchLiveCommentList,
  userInfo,
  signInStatus,
  newMessageContent,
  isSubmitLoading,
  onTextChange,
  onKeyUp,
  onSubmit,
  onRequestLogin,
  handleReplyTo
}) => {
  const discussionReplyProps = {
    userInfo,
    signInStatus,
    newMessageContent,
    isSubmitLoading,
    onTextChange,
    onKeyUp,
    onSubmit,
    onRequestLogin
  };

  const discussionPanelProps = {
    id: 'discussion-list-scroll-panel',
    receiveNewComment: receiveNewComment,
    replyPanel: <DiscussionReply {...discussionReplyProps} />
  };

  const loadingProps = {
    style: {
      height: 400
    }
  };

  return (
    <>
      <SectionHeading title={'Tin nhắn'} />
      <div className={styles.commentsPanel}>
        <DiscussionPanel {...discussionPanelProps}>
          {!!isFetchLiveCommentList ? (
            <Loading {...loadingProps} />
          ) : commentList && !!commentList.length ? (
            commentList.map(DiscussionItemChild, { handleReplyTo })
          ) : (
            <NoContentPlaceholder
              title="Chưa có tin nhắn nào"
              info="Xem video và để lại lời nhắn với Lixibox bạn nhé"
              logo={NO_CONTENT_LOGO.SHIPMENT}
              className={styles.noContentPlaceholder}
            />
          )}
        </DiscussionPanel>
      </div>
    </>
  );
};

const ReplyMessagePanel = ({
  parentMessage,
  commentList,
  isShowReplyPanel,
  receiveNewRelyComment,
  userInfo,
  signInStatus,
  newMessageContent,
  isSubmitLoading,
  onTextChange,
  onKeyUp,
  onSubmit,
  onRequestLogin,
  onNavigateBack
}) => {
  const discussionReplyProps = {
    userInfo,
    signInStatus,
    newMessageContent,
    isSubmitLoading,
    onTextChange,
    onKeyUp,
    onSubmit,
    onRequestLogin
  };

  return (
    <div className={classnames(styles.replyCommentsPanel, { [styles.isShow]: !!isShowReplyPanel })}>
      <SectionHeading title={'Trả lời'} iconName={'angle-left'} onClickIcon={onNavigateBack} />
      <div className={styles.commentsPanel}>
        <DiscussionPanel
          id={'discussion-reply-list-scroll-panel'}
          receiveNewComment={receiveNewRelyComment}
          replyPanel={<DiscussionReply {...discussionReplyProps} />}
        >
          <DiscussionItem {...parentMessage} isParent={true} />
          {commentList && commentList.map(DiscussionItemChild)}
        </DiscussionPanel>
      </div>
    </div>
  );
};

interface ICommentItem {
  id: number;
  content?: string;
  userAvatar?: string;
  username?: string;
  createdAt: number;
  repliesCount: number;
  replyTo: any;
}

interface IProps {
  commentList?: Array<ICommentItem>;
  liveRepliesCommentList?: Array<ICommentItem>;
  isFetchLiveCommentList: boolean;
  receiveNewComment?: number;
  receiveNewRelyComment?: number;
  userInfo: any;
  signInStatus: any;
  isSubmitLoading: boolean;
  onSubmit: any;
  onRequestLogin: any;
  onOpenThread: any;
}

const LiveMessage = ({
  commentList,
  liveRepliesCommentList,
  isFetchLiveCommentList,
  receiveNewComment,
  receiveNewRelyComment,
  userInfo,
  signInStatus,
  isSubmitLoading = false,
  onSubmit,
  onRequestLogin,
  onOpenThread
}: IProps) => {
  const [newMessageContent, setNewMessageContent] = useState('');
  const [isShowReplyPanel, setDisplayReplyPanel] = useState(false);
  const [parentMessage, setParentMessage] = useState(null);

  const submit = ({ content, threadId }) => {
    if (!content.trim().length) return;
    onSubmit({ content, threadId });
    setNewMessageContent('');
  };

  const handleReplyTo = (relatedId) => {
    setDisplayReplyPanel(true);
    onOpenThread({ id: relatedId });
  };

  const generateParentMessage = (list, id) => {
    if (!list || !list.length || !id) return null;

    return list.find((item) => item.id === id);
  };

  const mainMessagePanelProps = {
    commentList,
    receiveNewComment,
    isFetchLiveCommentList,
    userInfo,
    signInStatus,
    newMessageContent,
    isSubmitLoading,
    onTextChange: (e) => {
      const content = e.target.value;
      const newContent = !content || 0 === content.length || ' ' === content ? '' : content;
      setNewMessageContent(newContent);
    },
    onKeyUp: (e) => {
      const content = e.target.value.trim();
      if (!!isSubmitLoading || (!!content.length && 13 !== e.keyCode)) return;
      submit({ content, threadId: 0 });
    },
    onSubmit: () => {
      if (!!isSubmitLoading || !newMessageContent || !newMessageContent.length) return;
      submit({ content: newMessageContent, threadId: 0 });
    },
    onRequestLogin,
    handleReplyTo: (id) => {
      setParentMessage(generateParentMessage(commentList, id));
      handleReplyTo(id);
    }
  };

  const threadId = (!!parentMessage && parentMessage.id) || 0;

  const replyMessagePanel = {
    parentMessage: parentMessage || null,
    commentList: liveRepliesCommentList,
    receiveNewRelyComment,
    isShowReplyPanel,
    userInfo,
    signInStatus,
    newMessageContent,
    isSubmitLoading,
    onTextChange: (e) => {
      const content = e.target.value;
      const newContent = !content || 0 === content.length || ' ' === content ? '' : content;
      setNewMessageContent(newContent);
    },
    onKeyUp: (e) => {
      const content = e.target.value.trim();
      if (!!isSubmitLoading || (!!content.length && 13 !== e.keyCode)) return;
      submit({ content, threadId });
    },
    onSubmit: () => {
      if (!!isSubmitLoading || !newMessageContent || !newMessageContent.length) return;
      submit({ content: newMessageContent, threadId });
    },
    onRequestLogin,
    onNavigateBack: () => {
      setParentMessage(null);
      setDisplayReplyPanel(false);
    }
  };

  return (
    <div className={styles.container}>
      <MainMessagePanel {...mainMessagePanelProps} />
      <ReplyMessagePanel {...replyMessagePanel} />
    </div>
  );
};

export default LiveMessage;
