import MainBlock from '../../../container/layout/main-block';
import InputField from '../../ui/input-field';
import { auth } from '../../../utils/auth';
import { objectToHash } from '../../../utils/encode';
import { MODAL_SIGN_IN } from '../../../constants/application/modal';
import { isUndefined, isEmptyObject } from '../../../utils/validate';
import { CDN_ASSETS_PREFIX } from '../../../utils/uri';
import Image from 'presentation-component/ui/image';
import SvgIcon from '../../../presentation-component/ui/icon';
import Pagination from '../../general/pagination';
import Loading from '../../ui/loading';

import DiscussionItem from '../discussion-item';

import TrackVisibility from 'lixibox-react-on-screen';

import STYLE from './style';
import styles from './styles.module.scss';
import { IProps, IState } from './model';

const noCommentImage = CDN_ASSETS_PREFIX('/comment/no-comment.png');

const mainBlockContent = ({
  discussionList,
  avatarUser,
  openModal,
  handleAddComment,
  handleInputOnChange,
  handleOnKeyUp,
  addDiscussionComment,
  urlList,
  handleClick,
  scrollId,
  userInfo,
  isAddDiscussionCommentSuccess,
  isLoading = true,
  txtComment = '',
  onReply,
  replyComment,
  handleCloseReplyTo
}) => {
  const txtRemind = !auth.loggedIn() ? 'Đăng nhập để gửi thảo luận...' : 'Gửi thảo luận...';
  const checkPermissionCommentAction = auth.loggedIn() ? () => {} : () => openModal(MODAL_SIGN_IN());

  const avatarProps = {
    style: Object.assign({}, { backgroundImage: `url('${avatarUser}')` }, STYLE.inputDiscussionGroup.avatar)
  };

  const inputDiscussionProps = {
    id: 'box-detail-discussion-input',
    style: STYLE.inputDiscussionGroup.inputText(auth.loggedIn()),
    autoComplete: 'off',
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
  const _urlList = list.discussions && 0 !== list.discussions.length ? urlList : [];

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

  const handleDiscussionItemRender = (item, index) => {
    const commentItemProps = {
      onReply,
      commentChild: item,
      openModal,
      addDiscussionComment,
      userInfo,
      isAddDiscussionCommentSuccess,
      hasLastChild: list && list.discussions && index === discussionListLength - 1
    };

    return <DiscussionItem {...commentItemProps} key={`discussion-item-${item.id}`} />;
  };

  return (
    <div style={STYLE} id={scrollId}>
      <div style={STYLE.sticky}>
        <div style={STYLE.inputDiscussionGroup.container(0)}>
          <div style={STYLE.title}>Gửi thảo luận của bạn</div>
          <div style={STYLE.description}>
            Nhanh tay chia sẻ với cộng đồng những cảm nhận của bạn về sản phẩm này nhé
          </div>
          <div style={STYLE.commentGroup}>
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
          {!!replyComment && (
            <div className={styles.replyPanel}>
              Trả lời: <span className={styles.userName}>{replyComment.user_name}</span>
              <SvgIcon name={'close'} className={styles.closeButton} onClick={handleCloseReplyTo} />
            </div>
          )}
        </div>
      </div>

      <div style={STYLE.leftCol}>
        {isLoading ? (
          <Loading style={STYLE.loading} />
        ) : list && Array.isArray(list.discussions) && !!list.discussions.length ? (
          list.discussions.map(handleDiscussionItemRender)
        ) : (
          <div style={STYLE.empty}>
            <Image src={noCommentImage} alt={''} style={STYLE.empty.image} />
            <div style={STYLE.empty.content}>
              <div style={STYLE.empty.content.title}>Chưa có thảo luận</div>
              <div style={STYLE.empty.content.description}>Hãy trở thành người đầu tiên gửi thảo luận bạn nhé</div>
            </div>
          </div>
        )}
        <Pagination {...paginationProps} />
      </div>
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
    scrollId
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
    showHeader: false,
    showViewMore: false,
    textAlignType: 'center',
    content: mainBlockContent({
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
      scrollId,
      userInfo,
      isAddDiscussionCommentSuccess,
      handleClick: handlePaginationClick,
      replyComment,
      onReply: (comment) => handleSetReplyComment(comment),
      handleCloseReplyTo: () => handleSetReplyComment(null)
    }),
    style: {}
  };
  return (
    <TrackVisibility offset={200}>
      {({ isVisible }) => {
        !!isVisible && !isFetchApi && !!handleFetchApi && handleFetchApi();

        return <MainBlock {...mainBlockProps} />;
      }}
    </TrackVisibility>
  );
}
