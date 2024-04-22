import classnames from 'classnames';
import { NavLink, generatePath, useHistory } from 'react-router-dom';
import { forwardRef, useRef, useState } from 'react';

import Image from 'presentation-component/ui/image';
import RatingStar from '../../ui/rating-star';
import Icon from '../../ui/icon';
import SvgIcon from '../../../presentation-component/ui/icon';
import Loading from '../../ui/loading';

import { auth } from '../../../utils/auth';
import { formatDateTime } from '../../../utils/date-time';
import { renderHtmlContent } from '../../../utils/html';
import { createBreakDownLine } from '../../../utils/format';
import { isEmptyObject } from '../../../utils/validate';
import { CustomCurrencyType, formatCurrency } from 'utils/currency';
import { setReferrer } from 'utils/navigate';

import InputField from '../../ui/input-field';
import ContextMenu from 'presentation-component/ui/context-menu';

import { FEEDABLE_TYPE } from '../../../constants/application/feedable';
import { MODAL_SIGN_IN } from '../../../constants/application/modal';
import { DATETIME_FORMAT_TYPE } from '../../../constants/application/global';
import {
  ROUTING_PRODUCT_DETAIL_PATH,
  ROUTING_COMMUNITY_PATH,
  ROUTING_COMMUNITY_USER_FEED_PATH,
  ROUTING_AUTH_SIGN_IN,
  ROUTING_COMMUNITY_FEEDBACK_EDIT
} from '../../../routings/path';
import { ViewedSource } from 'tracking/constants';
import { gatewayTrackViewContentFromList, gatewayTrackViewContentFromSource } from 'tracking/gateway';
import Comment from './comment';
import { renderImageGroup } from './view-image';
import { IFeedState, IFeedProps } from './model';
import STYLE from './style';
import styles from './style.module.scss';

const shareFacebookLink = '//www.facebook.com/sharer.php?u=';
const itemStyle = STYLE.headerWrap.item;
interface TextIconProps {
  id?: string;
  link?: string;
  isExtenalLink?: boolean;
  iconName: string;
  onClick?: any;
  iconStyle: string;
  isLink?: boolean;
  number?: number;
  isActiveNumber?: boolean;
}
const TextIcon = forwardRef<any, TextIconProps>((props, ref) => {
  const {
    id,
    link,
    isExtenalLink = false,
    iconName,
    onClick,
    iconStyle,
    isLink = false,
    number,
    isActiveNumber
  } = props;
  const iconProps = {
    name: iconName,
    className: iconStyle
  };

  const linkProps = {
    ref: ref,
    href: `${shareFacebookLink}${link}`,
    target: '_blank'
  };

  const Number = () =>
    !!number ? (
      <div className={classnames(styles.iconText, { [styles.isActive]: !!isActiveNumber })}>{number}</div>
    ) : null;

  return isLink ? (
    isExtenalLink ? (
      <a {...linkProps}>
        <SvgIcon {...iconProps} />
        <Number />
      </a>
    ) : (
      <NavLink ref={ref} to={link} style={{ display: 'flex' }}>
        <SvgIcon {...iconProps} />
        <Number />
      </NavLink>
    )
  ) : (
    <div ref={ref} style={{ display: 'flex' }} id={id} onClick={onClick}>
      <SvgIcon {...iconProps} />
      <Number />
    </div>
  );
});

const getLikeProps = ({ id = '', iconStyle, openModal, handleLike, number, isActiveNumber }) => ({
  id,
  iconStyle,
  iconName: 'like',
  number,
  isActiveNumber,
  onClick: auth.loggedIn() ? handleLike : () => openModal(MODAL_SIGN_IN())
});

export function renderView({
  props,
  state,
  handleLike,
  handleSubmit,
  handleViewMore,
  handleShareLink,
  handleShowVideo,
  handleShowComment,
  handleBookmarkBox,
  setInputCommentRef,
  handleInputOnFocus,
  handleInputOnChange,
  handleShowInputComment
}) {
  const {
    item,
    style,
    openModal,
    userProfile,
    // listLikedId,
    authStore,
    isLastChild,
    isShowImage,
    isShowFullImage,
    isFixSizeCover,
    isShowContent,
    limitTextLength = 0,
    history
  } = props as IFeedProps;

  const {
    isLike,
    isViewMore,
    commentList,
    isShowVideo,
    answerComment,
    isShowComments,
    likeNum = 0
  } = state as IFeedState;

  const renderYoutube = ({ isShowVideo, handleShowVideo, videoUrl, pictureUrl }) => {
    const iconProps = {
      name: 'play',
      style: STYLE.icon,
      innerStyle: STYLE.icon.inner
    };

    const youtubeUrl = videoUrl.replace('watch?v=', 'embed/') + '?autoplay=1&showinfo=0';
    return (
      <div style={STYLE.videoContainer.container}>
        {!isShowVideo ? (
          <div style={STYLE.videoContainer.thumbnail(pictureUrl)} onClick={handleShowVideo}>
            <Icon {...iconProps} />
            <div style={STYLE.wrapIcon} />
          </div>
        ) : (
          <div style={STYLE.videoContainer.videoWrap}>
            <iframe
              title="Video"
              style={STYLE.videoContainer.videoWrap.video}
              className={'frame-you-tube'}
              src={youtubeUrl}
              allowFullScreen={true}
              frameBorder={0}
            />
          </div>
        )}
      </div>
    );
  };

  const inputCommentProps = {
    id: 'input-new-comment',
    autoComplete: 'off',
    ref: (ref) => setInputCommentRef(ref),
    autoFocus: auth.loggedIn(),
    style: itemStyle.inputCommentGroup.inputText,
    placeholder: 'Gửi bình luận của bạn...',
    type: InputField.INPUT_TYPE.TEXT,
    name: InputField.INPUT_NAME.CONTENT,
    onChange: (e) => handleInputOnChange(e),
    onFocus: handleInputOnFocus,
    onSubmit: handleSubmit,
    value: answerComment || ''
  };

  const avatarUrl = auth.loggedIn() ? userProfile && userProfile.avatar && userProfile.avatar.medium_url : '';

  const avatarProps = {
    style: Object.assign({}, { backgroundImage: `url('${avatarUrl}')` }, itemStyle.inputCommentGroup.avatar)
  };

  const likeProps = getLikeProps({
    id: `like-feed-item-${item.id}`,
    iconStyle: classnames(styles.likeIcon, { [styles.isActive]: !!isLike }),
    openModal,
    handleLike: (data) => {
      const likeFeedItem = document.getElementById(`like-feed-item-${item.id}`);
      !!likeFeedItem && !!likeFeedItem.classList && likeFeedItem.classList[!isLike ? 'add' : 'remove']('animation-zis');
      handleLike(data);
    },
    number: likeNum,
    isActiveNumber: !!isLike
  });

  const isExistUser = item && item.user && !!item.user.referral_code;
  const userFeedUrl = isExistUser ? `${ROUTING_COMMUNITY_USER_FEED_PATH}/${item.user.referral_code}` : '#';

  let description = createBreakDownLine((item && item.message) || '');
  const hiddenDesc = !isViewMore && limitTextLength < description.length;
  description = hiddenDesc ? description.substring(0, limitTextLength) : description;

  const currentUserId = authStore?.userInfo?.id || 0;
  const onEntryEvent = (event) => {
    if (!auth.loggedIn()) {
      event.stopPropagation();
      setReferrer();
      history.push(ROUTING_AUTH_SIGN_IN);
    }
  };

  const onProductClickFromList = (box, index) => {
    gatewayTrackViewContentFromList({
      source: ViewedSource.FEED,
      index,
      box
    });
  };

  const onProductImageClick = (box) => {
    gatewayTrackViewContentFromSource({ box, source: ViewedSource.FEED, sourceId: String(item?.id || '') });
  };

  return (
    <div
      style={Object.assign(
        {},
        itemStyle.container,
        isLastChild ? itemStyle.lastChild : '',
        style,
        !isShowImage && { paddingBottom: 0, borderBottom: 'none' }
      )}
    >
      {/** 2.2.1. Item : Info */}
      <div style={STYLE.headerWrap}>
        <div style={itemStyle.info.container}>
          {/** 2.2.1.1. Item : Info : Avatar user */}
          <NavLink to={userFeedUrl} key={`feed-link-${item.id}`}>
            <div
              style={Object.assign(
                {},
                {
                  backgroundImage: `url(${
                    (item && item.user && item.user.avatar && item.user.avatar.medium_url) || ''
                  })`
                },
                itemStyle.info.avatar
              )}
            />
          </NavLink>
          <div style={itemStyle.info.detail} className={'icon-item'}>
            <div style={itemStyle.info.detail.feedCreateContentOuter}>
              <div style={itemStyle.info.detail.feedCreateContent}>
                <NavLink to={userFeedUrl}>
                  <span style={itemStyle.info.detail.username}>{(item && item.user && item.user.name) || ''}</span>
                </NavLink>
                <FeedCreateContent item={item} />
              </div>
              <BoxInFeedImage item={item} onClick={() => onProductImageClick?.(item)} />
            </div>

            <div style={itemStyle.info.detail.ratingGroup}>
              {item && item.rating && (
                <RatingStar style={STYLE.headerWrap.item.info.detail.ratingGroup.rating} value={item.rating} />
              )}
              {item && item.created_at && (
                <NavLink
                  to={`${ROUTING_COMMUNITY_PATH}/${(item && item.id) || 0}`}
                  style={itemStyle.info.detail.ratingGroup.date}
                  title={formatDateTime(item.created_at, DATETIME_FORMAT_TYPE.FULL_INFO)}
                >
                  {formatDateTime(item.created_at)}
                </NavLink>
              )}
            </div>
          </div>
        </div>
      </div>
      {/** 2.2.2. Item : Content Detail */}
      {!!isShowContent && (
        <div style={itemStyle.info.descGroup}>
          {hiddenDesc ? (
            <div>
              {renderHtmlContent({ content: description, style: itemStyle.info.description.container })}
              <span style={itemStyle.info.description.viewMore} onClick={handleViewMore}>
                ... Xem thêm
              </span>
            </div>
          ) : (
            renderHtmlContent({ content: description, style: itemStyle.info.description.container, isDetectLink: true })
          )}
        </div>
      )}

      {!isShowImage
        ? null
        : !isEmptyObject(item && item.video)
        ? renderYoutube({
            isShowVideo,
            handleShowVideo,
            videoUrl: item && item.video && item.video.url,
            pictureUrl: (item && item.video && item.video.thumbnail && item.video.thumbnail.original_url) || ''
          })
        : renderImageGroup({
            item,
            openModal,
            isShowFullImage,
            isFixSizeCover
          })}
      <ProductInFeed item={item} onItemClick={onProductClickFromList} />
      <div className={styles.likeCommentIconGroup} style={itemStyle.likeCommentIconGroup.container}>
        <div style={itemStyle.likeCommentIconGroup.left}>
          <TextIcon {...likeProps} />

          <TextIcon
            {...{
              iconName: 'message',
              iconStyle: styles.messageIcon,
              isLink: true,
              number: item.total_comments,
              link: `${ROUTING_COMMUNITY_PATH}/${(item && item.id) || 0}`
            }}
          />
        </div>

        <div className={styles.rightActionsContainer}>
          <TextIcon
            {...{
              isLink: true,
              isExtenalLink: true,
              iconName: 'next',
              iconStyle: styles.shareIcon,
              onClick: handleShareLink,
              link: (item && item.share_link) || ''
            }}
          />
          <RightActionsGroup item={item} />
        </div>
      </div>
      {isShowComments && (
        <div style={itemStyle.commentGroup} className={styles.commentGroup}>
          {'undefined' === typeof commentList ? (
            /** Loading Icon */
            <Loading style={STYLE.customStyleLoading} />
          ) : (
            /** Show list data */
            Array.isArray(commentList) &&
            commentList.map((comment, index) => <Comment {...{ key: index, feed: item, comment, currentUserId }} />)
          )}
          <div style={itemStyle.inputCommentGroup}>
            <div style={itemStyle.inputCommentGroup.fixed} className={'bottom-fixed-element'}>
              <div {...avatarProps} />
              <div style={itemStyle.inputCommentGroup.commentInputGroup} onClick={onEntryEvent} onChange={onEntryEvent}>
                <input {...inputCommentProps} />
                <div style={itemStyle.inputCommentGroup.sendComment} onClick={handleSubmit}>
                  Gửi
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ProductInFeedItem({ item, onClick }) {
  const linkProps = {
    to: `${ROUTING_PRODUCT_DETAIL_PATH}/${item.slug}`,
    onClick: () => onClick?.(),
    className: styles.ProductInFeedItem
  };

  const imgProps = {
    src: (item.primary_picture && item.primary_picture.medium_url) || '',
    className: styles.ProductInFeedImg,
    alt: ''
  };

  return (
    <NavLink {...linkProps}>
      <Image {...imgProps} />
    </NavLink>
  );
}

const ProductInFeed = ({ item, onItemClick }) => {
  if (!item || FEEDABLE_TYPE.LOVE !== item.feedable_type || !item.boxes || !item.boxes.length) return null;

  return (
    <div className={styles.ProductInFeed}>
      <div className={styles.ProductInFeedTitle}>
        {!!item.video ? 'Sản phẩm trong video' : 'Sản phẩm trong hình ảnh'}
      </div>
      <div className={styles.ProductInFeedContent}>
        <div className={styles.ProductInFeedPanel}>
          {item.boxes.map((box, index) => (
            <ProductInFeedItem
              {...{
                key: `item-${item.id || index}`,
                item: box,
                onClick: () => onItemClick?.(box, index)
              }}
            />
          ))}
          <div className={styles.ProductInFeedLastItem}></div>
        </div>
      </div>
    </div>
  );
};

const FeedCreateContent = ({ item }) => {
  let title = '';
  let product = '';

  if (FEEDABLE_TYPE.LOVE === item.feedable_type) {
    if (item?.source?.name === 'tiktok') {
      title = !!item.video ? 'chia sẻ video đập hộp trên TikTok và' : 'chia sẻ hình ảnh đập hộp trên TikTok và';

      const balance = item?.feedable?.love?.balance || 0;
      const coins = item?.feedable?.love?.coins || 0;
      const formattedBalance = formatCurrency(balance, { suffix: true });
      const formattedCoins = formatCurrency(coins, { suffix: CustomCurrencyType.LIXICOIN });
      if (balance && coins) {
        product = `nhận ${formattedBalance}, ${formattedCoins}`;
      } else if (balance) {
        product = `nhận ${formattedBalance}`;
      } else if (coins) {
        product = `nhận ${formattedCoins}`;
      }
    } else {
      title = !!item.video ? 'đã chia sẻ video đập hộp' : 'đã chia sẻ hình ảnh đập hộp';
    }
  }

  if (FEEDABLE_TYPE.FEEDBACK === item.feedable_type) {
    title = 'đã viết đánh giá cho sản phẩm';
    product = (item.box && item.box.name) || '';
  }

  if (FEEDABLE_TYPE.BLOG === item.feedable_type) {
    title = 'đã chia sẻ bài viết';
  }

  if (FEEDABLE_TYPE.THEME === item.feedable_type) {
    title = 'đã chia sẻ chương trình khuyến mãi';
  }

  return (
    <>
      <div style={itemStyle.info.detail.feedCreateContentMessage}>{title}</div>
      <div style={itemStyle.info.detail.feedCreateContentProduct}>{product}</div>
    </>
  );
};

const BoxInFeedImage = ({ item, onClick }) => {
  let img = '';
  let link = '';
  let _onClick = () => {};
  if (item?.feedable_type === 'Love') {
    const rewards = item?.feedable?.love?.rewards || [];
    img = (rewards.length && rewards[0]?.icon) || '';
    link = '#';

    if (!img) return null;
  } else {
    img =
      (!!item.boxes &&
        !!item.boxes.length &&
        item.boxes[0].primary_picture &&
        item.boxes[0].primary_picture.medium_url) ||
      null;
    link = `${ROUTING_PRODUCT_DETAIL_PATH}/${item?.box?.slug}`;
    _onClick = () => onClick?.();

    if (!item || !item.box || !img) return null;
  }

  return (
    <NavLink
      to={link}
      onClick={() => _onClick?.()}
      style={Object.assign(
        {},
        itemStyle.info.detail.boxInFeed,
        item?.feedable_type !== 'Love' && itemStyle.info.detail.boxInFeedBordered
      )}
    >
      <Image className="blasted" alt={''} src={img} style={itemStyle.info.detail.boxInFeedImage} />
    </NavLink>
  );
};

const RightActionsGroup = ({ item }) => {
  const [contextActionVisible, setContextActionVisibility] = useState(false);
  const history = useHistory();
  const actionsGroupRef = useRef<HTMLDivElement>(null);
  const ENTRY_ACTION_FEEDBACK_TYPE = Object.freeze({
    EDIT: 'edit'
  });

  let contextActionEntries = [];
  !!item?.viewer_is_owner &&
    FEEDABLE_TYPE.FEEDBACK === item?.feedable_type &&
    contextActionEntries.push({ type: ENTRY_ACTION_FEEDBACK_TYPE.EDIT, name: 'Chỉnh sửa', icon: 'edit' });

  const handleSelectAction = ({ type }) => {
    switch (type) {
      case ENTRY_ACTION_FEEDBACK_TYPE.EDIT:
        item?.feedable?.feedback?.id &&
          history.push(generatePath(ROUTING_COMMUNITY_FEEDBACK_EDIT, { feedbackId: item?.feedable.feedback.id }));
        break;
      default:
        return;
    }
  };
  return !!contextActionEntries?.length ? (
    <>
      <TextIcon
        {...{
          iconName: 'more',
          iconStyle: styles.moreIcon,
          onClick: () => setContextActionVisibility(true),
          ref: actionsGroupRef
        }}
      />
      <ContextMenu
        ref={actionsGroupRef}
        entries={contextActionEntries}
        onSelect={(data) => {
          setContextActionVisibility(false);
          handleSelectAction(data);
        }}
        onRequestClose={() => {
          setContextActionVisibility(false);
        }}
        classes={{
          container: classnames(styles.contextActions, contextActionVisible && styles.visible)
        }}
      />
    </>
  ) : null;
};
