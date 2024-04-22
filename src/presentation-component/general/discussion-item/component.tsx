import classnames from 'classnames';
import { NavLink } from 'react-router-dom';

import Image from 'presentation-component/ui/image';
import { ROUTING_COMMUNITY_USER_FEED_PATH } from '../../../routings/path';
import { renderHtmlContent } from '../../../utils/html';
import { formatDateTime } from '../../../utils/date-time';
import { DATETIME_FORMAT_TYPE } from '../../../constants/application/global';

import styles from './style.module.scss';

interface IBaseInfo {
  id: number;
  content: string;
  username: string;
  isParent: boolean;
  userMobileReferralCode?: string;
}

interface IReplyToInfo extends IBaseInfo {
  relatedId: number;
}

interface IDiscussionProps extends IBaseInfo {
  userAvatar: string;
  createdAt: number;
  repliesCount: number;
  replyTo: IReplyToInfo;
  isDisplayOnThread: boolean;
  onReplyTo?: any;
}

const ReplyTo = ({ replyTo, onClick }) => {
  if (!replyTo) return null;

  return (
    <div className={styles.replyTo} onClick={() => onClick(replyTo.id)}>
      <span className={styles.bold}>{'Trả lời: '}</span>
      <span>{replyTo.content}</span>
    </div>
  );
};
const Content = ({ content }) => {
  return <div className={styles.content}>{renderHtmlContent({ content })}</div>;
};

const Control = ({ isParent, createdAt, repliesCount, isSecondLevel, isDisplayOnThread, onReplyClick }) => {
  const actionContent = isSecondLevel ? 'Xem tin nhắn gốc' : !repliesCount ? 'Trả lời' : `Xem ${repliesCount} trả lời`;
  const isShowControl = !isDisplayOnThread && !isParent;

  return (
    <div onClick={onReplyClick} className={styles.control}>
      <div className={styles.time} title={formatDateTime(createdAt, DATETIME_FORMAT_TYPE.FULL_INFO)}>
        {formatDateTime(createdAt, DATETIME_FORMAT_TYPE.DD_MM_YYYY)}
      </div>
      {isShowControl && <div className={styles.reply}>{actionContent}</div>}
    </div>
  );
};

const DiscussionItem = ({
  id,
  content,
  userAvatar,
  username,
  userMobileReferralCode,
  createdAt,
  replyTo,
  repliesCount,
  isParent = false,
  isDisplayOnThread = false,
  onReplyTo = () => {}
}: IDiscussionProps) => {
  const isSecondLevel = !!replyTo;
  const imgProps = { src: userAvatar, className: styles.avatar };
  const replyToProps = { replyTo, onClick: onReplyTo };
  const controlProps = {
    isParent,
    createdAt,
    repliesCount,
    isSecondLevel,
    isDisplayOnThread,
    onReplyClick: () => (!!isDisplayOnThread ? undefined : onReplyTo(!!isSecondLevel ? replyTo.id : id))
  };

  const userNavLinkProps = {
    to: `${ROUTING_COMMUNITY_USER_FEED_PATH}/${userMobileReferralCode}`,
    target: '_blank'
  };

  const containerProps = {
    className: classnames(styles.container, {
      [styles.smallVersion]: !!isDisplayOnThread,
      [styles.parentVersion]: !!isParent
    })
  };

  return (
    <div {...containerProps}>
      <NavLink {...userNavLinkProps}>
        <Image {...imgProps} />
      </NavLink>
      <div className={styles.info}>
        <NavLink {...userNavLinkProps} className={styles.username}>
          {username}
        </NavLink>

        <div className={styles.contentGroup}>
          {!isDisplayOnThread && <ReplyTo {...replyToProps} />}
          <Content {...{ content }} />
          <Control {...controlProps} />
        </div>
      </div>
    </div>
  );
};

export default DiscussionItem;
