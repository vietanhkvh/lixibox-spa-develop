import Icon from '../../ui/icon';
import * as LAYOUT from '../../../style/layout';
import { formatDateTime } from '../../../utils/date-time';
import { DATETIME_FORMAT_TYPE } from '../../../constants/application/global';
import RatingStar from '../../../components/ui/rating-star';
import { renderHtmlContent } from '../../../utils/html';
import Loading from '../../../components/ui/loading';

import styles from './style.module.scss';
import STYLE from './style';

const RatingItem = (props) => {
  const { ratingItem, index, isDisplaySold } = props;
  return (
    <div style={STYLE.container.item} key={`landing-rating-item-${ratingItem.id}`}>
      {/** 2.2.1. Item : Info */}
      <div style={Object.assign({}, LAYOUT.flexContainer.left, STYLE.container.info)}>
        <div
          style={Object.assign(
            {},
            {
              backgroundImage: `url('${ratingItem.user.avatar && ratingItem.user.avatar.medium_url}')`
            },
            STYLE.container.info.avatar
          )}
        />
        <div
          style={Object.assign(
            {},
            STYLE.container.info.groupUsername,
            0 === index && STYLE.container.info.groupUsername.withBorder
          )}
        >
          <div style={STYLE.container.info.ratingInfoGroup}>
            <div style={STYLE.container.info.ratingInfo}>
              <div style={STYLE.container.info.ratingInfo}>
                <div style={STYLE.container.info.username}>{ratingItem.user.name}</div>
                <div
                  style={STYLE.container.info.time}
                  title={formatDateTime(ratingItem.created_at, DATETIME_FORMAT_TYPE.FULL_INFO)}
                >
                  {`${formatDateTime(ratingItem.created_at)}`}
                </div>
              </div>
            </div>
            <div style={STYLE.container.info.ratingInfo}>
              <RatingStar value={ratingItem.rate} style={STYLE.container.info.rating} />
              <div style={STYLE.container.info.verificationText} className={'verify-tooltip'}>
                <Icon
                  name={'verification'}
                  // style={STYLE.container.info.verification}
                  // innerStyle={STYLE.container.info.innerVerification}
                />
                {isDisplaySold && <span style={STYLE.container.info.verificationTooltip}>Đã mua sản phẩm</span>}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={STYLE.container.info.content} className={styles.ratingContent}>
        {renderHtmlContent({
          content: ratingItem.review,
          isDetectLink: true
        })}
      </div>
    </div>
  );
};

const LandingPageRating = (props) => {
  const { rating, isDisplaySold = false } = props;
  if (!rating || !rating.length) return <Loading />;

  return (
    <div style={STYLE.listContainer}>
      {rating
        .filter((_, index) => index < 4)
        .map((r: any, index) => (
          <RatingItem key={r.id} ratingItem={r} index={index} isDisplaySold={isDisplaySold} />
        ))}
    </div>
  );
};

export default LandingPageRating;
