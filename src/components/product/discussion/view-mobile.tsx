import { useLocation, useNavigate } from 'react-router-dom-v5-compat';
import { auth } from '../../../utils/auth';
import { objectToHash } from '../../../utils/encode';
import { isUndefined, isEmptyObject } from '../../../utils/validate';
import Pagination from '../../general/pagination';
import Loading from '../../ui/loading';
import SvgIcon from '../../../presentation-component/ui/icon';
import InputField from '../../ui/input-field';

import TrackVisibility from 'lixibox-react-on-screen';
import DiscussionItem from '../discussion-item';

import STYLE from './style';
import styles from './styles.module.scss';
import { IProps, IState } from './model';

import { CDN_ASSETS_PREFIX } from '../../../utils/uri';
import { ROUTING_AUTH_SIGN_IN } from 'routings/path';

const MainBlockContent = ({
  discussionList,
  avatarUser,
  openModal,
  handleAddComment,
  handleInputOnChange,
  handleOnKeyUp,
  addDiscussionComment,
  urlList,
  handleClick,
  userInfo,
  isAddDiscussionCommentSuccess,
  isLoading = true,
  txtComment = '',
  isOnModal,
  replyComment,
  onReply,
  handleCloseReplyTo
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const txtRemind = !auth.loggedIn() ? 'Đăng nhập để gửi thảo luận...' : 'Gửi thảo luận...';
  const checkPermissionCommentAction = auth.loggedIn()
    ? () => {}
    : () => {
        navigate({ pathname: ROUTING_AUTH_SIGN_IN }, { state: { referrer: location.pathname } });
      };

  const avatarProps = {
    style: Object.assign({}, { backgroundImage: `url('${avatarUser}')` }, STYLE.inputDiscussionGroup.avatar)
  };

  const inputDiscussionProps = {
    id: 'box-detail-discussion-input',
    autoComplete: 'off',
    style: STYLE.inputDiscussionGroup.inputText(auth.loggedIn()),
    placeholder: txtRemind,
    type: InputField.INPUT_TYPE.TEXT,
    name: InputField.INPUT_NAME.CONTENT,
    onChange: (e) => handleInputOnChange(e),
    onKeyUp: (e) => handleOnKeyUp(e),
    value: txtComment || ''
  };

  const list = discussionList || [];
  const { current_page, per_page, total_pages } = (0 !== list.length && list.paging) || {
    current_page: 0,
    per_page: 0,
    total_pages: 0
  };
  let _urlList = [];
  const totalDiscusionItem = (list.discussions && list.discussions.length) || 0;
  if (totalDiscusionItem) {
    _urlList = urlList;

    if (_urlList.length !== total_pages) {
      _urlList = [];
      for (let i = 1; i <= total_pages; i++) {
        _urlList.push({
          number: i,
          title: i,
          link: `#`
        });
      }
    }
  }

  const paginationProps = {
    list: (list && list.discussions) || [],
    current: current_page,
    per: per_page,
    total: total_pages,
    urlList: _urlList,
    isSticky: true,
    canScrollToTop: false,
    handleClick: (val) => handleClick(val)
  };

  const discussionListLength = (list && list.discussions && list.discussions.length) || 0;

  function handleDiscussionItemRender(item, index) {
    const commentItemProps = {
      userInfo,
      openModal,
      addDiscussionComment,
      isAddDiscussionCommentSuccess,
      commentChild: item,
      hasLastChild: list && list.discussions && index === discussionListLength - 1,
      onReply: this.onReply
    };

    return <DiscussionItem {...commentItemProps} key={`discussion-item-${item.id}`} />;
  }

  return (
    <div style={STYLE}>
      <div>
        {isLoading && !isOnModal ? (
          <Loading style={STYLE.loading} />
        ) : list && Array.isArray(list.discussions) && !!list.discussions.length ? (
          list.discussions.filter((_, index) => !!isOnModal || index < 2).map(handleDiscussionItemRender, { onReply })
        ) : (
          <div style={STYLE.emptyMessage}>Đặt câu hỏi đầu tiên cho sản phẩm này</div>
        )}
      </div>
      {!!isOnModal && <Pagination {...paginationProps} />}
      {!!isOnModal && (
        <div style={STYLE.inputDiscussionGroup.container(!!replyComment)}>
          <div style={STYLE.inputDiscussionGroup.fixed(!!replyComment)}>
            {!!replyComment && (
              <div className={styles.replyPanel}>
                Trả lời: <span className={styles.userName}>{replyComment.user_name}</span>
                <SvgIcon name={'close'} className={styles.closeButton} onClick={handleCloseReplyTo} />
              </div>
            )}
            <div {...avatarProps} />
            <div
              style={STYLE.inputDiscussionGroup.commentInputGroup(auth.loggedIn())}
              onClick={checkPermissionCommentAction}
            >
              <input {...inputDiscussionProps} />
              {auth.loggedIn() && (
                <div style={STYLE.inputDiscussionGroup.sendComment} onClick={handleAddComment}>
                  Gửi
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default function renderComponent({
  props,
  state,
  handleAddComment,
  handleInputOnChange,
  handleOnKeyUp,
  handlePaginationClick,
  handleFetchApi,
  handleSetReplyComment
}) {
  const {
    discussionStore: { boxDiscussions, isAddDiscussionCommentSuccess },
    authStore: { userInfo },
    openModal,
    productId,
    addDiscussionComment,
    perPage,
    isOnModal,
    onReply
  } = props as IProps;

  const { txtComment, page, urlList, isFetchApi, isLoading, replyComment } = state as IState;

  const hashKey = objectToHash({ productId, page, perPage });
  const discussionList =
    isEmptyObject(boxDiscussions) || isUndefined(boxDiscussions[hashKey]) ? [] : boxDiscussions[hashKey];

  const avatarUser =
    auth.loggedIn() && userInfo && userInfo.avatar
      ? userInfo.avatar.medium_url
      : CDN_ASSETS_PREFIX('/sample-data/avatar.jpg');

  const mainBlockProps = {
    discussionList,
    avatarUser,
    openModal,
    handleAddComment,
    handleInputOnChange,
    handleOnKeyUp,
    txtComment,
    addDiscussionComment,
    urlList,
    isLoading,
    userInfo,
    isAddDiscussionCommentSuccess,
    handleClick: handlePaginationClick,
    isOnModal,
    replyComment,
    onReply: (comment) => (!isOnModal ? onReply() : handleSetReplyComment(comment)),
    handleCloseReplyTo: () => handleSetReplyComment(null)
  };
  return (
    <TrackVisibility offset={200}>
      {({ isVisible }) => {
        !!isVisible && !isFetchApi && !!handleFetchApi && handleFetchApi();

        return <MainBlockContent {...mainBlockProps} />;
      }}
    </TrackVisibility>
  );
}
