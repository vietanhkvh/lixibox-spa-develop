import classNames from 'classnames';
import { renderHtmlContent } from 'utils/html';
import { DATETIME_FORMAT_TYPE } from 'constants/application/global';
import { formatDateTime } from 'utils/date-time';
import { isMobileVersion } from 'utils';
import Image from 'presentation-component/ui/image';
import Icon from 'components/ui/icon';
import SvgIcon from 'presentation-component/ui/icon';
import RatingStar from 'components/ui/rating-star';
import FeedbackCommentItem from 'components/container/feedback-comment-item';
import Loading from 'components/ui/loading/component';
import { ViewProps } from '../../component';
import * as LAYOUT from 'style/layout';
import STYLE from '../style';
import styles from './style.module.scss';

const View = ({ boxFeedback, isFirstItem, isLikeActionProcessing, onFeedbackImageClick, onActionLike }: ViewProps) => {
  return (
    <div className={'container1'} style={STYLE.container} key={`rating-item-${boxFeedback.id}`}>
      {/** 2.2.1. Item : Info */}
      <div style={Object.assign({}, LAYOUT.flexContainer.left, STYLE.container.info)}>
        <Image src={boxFeedback.user.avatar?.medium_url} style={STYLE.container.info.avatar} />
        <div
          style={Object.assign(
            {},
            STYLE.container.info.groupUsername,
            isFirstItem && STYLE.container.info.groupUsername.withBorder
          )}
        >
          <div style={STYLE.container.info.ratingInfoGroup}>
            <div style={STYLE.container.info.ratingInfo}>
              <div style={STYLE.container.info.ratingInfo}>
                <div style={STYLE.container.info.username}>{boxFeedback.user.name}</div>
                <div
                  style={STYLE.container.info.time}
                  title={formatDateTime(boxFeedback.created_at, DATETIME_FORMAT_TYPE.FULL_INFO)}
                >
                  {` - ${formatDateTime(boxFeedback.created_at)}`}
                </div>
              </div>
            </div>
            <div style={STYLE.container.info.ratingInfo}>
              <RatingStar value={boxFeedback.rate} style={STYLE.container.info.rating} />
              <div style={STYLE.container.info.verificationText} className={'verify-tooltip'}>
                <Icon
                  name={'verification'}
                  style={STYLE.container.info.verification}
                  innerStyle={STYLE.container.info.innerVerification}
                />
                <span style={STYLE.container.info.verificationTooltip}>Đã mua sản phẩm</span>
              </div>
            </div>
          </div>

          <div style={STYLE.container.info.content}>
            {renderHtmlContent({ content: boxFeedback.review, isDetectLink: true })}
            {Array.isArray(boxFeedback.pictures) && !!boxFeedback.pictures.length && (
              <div style={STYLE.container.info.pictureList}>
                {boxFeedback.pictures.map((item, index) => (
                  <Image
                    key={index}
                    onClick={() => {
                      onFeedbackImageClick?.({ pictures: boxFeedback.pictures, index, layout: 'mobile' });
                    }}
                    src={item.url}
                    style={STYLE.container.info.pictureItem}
                    alt={''}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <div>
        {boxFeedback.comments?.map((comment, index) => (
          <FeedbackCommentItem key={index} comment={comment} />
        ))}
      </div>
      <div className={styles.actionSection}>
        <div
          className={classNames(styles.feedbackAction, boxFeedback?.liked && styles.feedbackActionActive)}
          onClick={() => onActionLike?.()}
        >
          {isLikeActionProcessing ? (
            <Loading classes={{ container: styles.loaderContainer, innerContainer: styles.loaderInnerContainer }} />
          ) : (
            <SvgIcon name="like" className={styles.icon} />
          )}
          <div className={styles.text}>Hữu ích {!!boxFeedback.total_likes && `(${boxFeedback.total_likes})`}</div>
        </div>
      </div>
      {isMobileVersion() && <div className={styles.bottomSection} />}
    </div>
  );
};

export default View;
