import { NavLink, useHistory } from 'react-router-dom';
import classNames from 'classnames';

import Image from 'presentation-component/ui/image';
import SubmitButton from '../../../components/ui/submit-button';
import RatingStar from '../../../components/ui/rating-star';
import { convertUnixTimeDDMMYYYY } from '../../../utils/encode';
import { isMobileVersion } from '../../../utils/responsive';
import { DATETIME_TYPE_FORMAT } from '../../../constants/application/global';
import { ROUTING_PRODUCT_DETAIL_PATH, ROUTING_COMMUNITY_FEEDBACK_EDIT_PATH } from '../../../routings/path';
import styles from './style.module.scss';

interface SubmittedFeedbackProps {
  feedback: { [key: string]: any };
  onImageClick?: ({ index, image, images }: { index: number; image: string; images: Array<string> }) => any;
}
const SubmittedFeedback = ({ feedback: item, onImageClick }: SubmittedFeedbackProps) => {
  const history = useHistory();
  const ratingStarProps = {
    classes: { container: styles.rating },
    value: item.rate
  };

  const buttonSubmitProps = {
    title: 'Sửa nhận xét',
    color: 'borderBlack',
    icon: 'edit',
    size: 'small',
    className: classNames(styles.button, isMobileVersion() ? styles.buttonMobile : styles.buttonDesktop),
    onSubmit: () => history.push(`${ROUTING_COMMUNITY_FEEDBACK_EDIT_PATH}/${item.id}`)
  };

  const addToCartSubmitProps = {
    title: 'Mua lại',
    color: 'black',
    icon: 'cart',
    size: 'small',
    className: classNames(styles.button, isMobileVersion() ? styles.buttonMobile : styles.buttonDesktop),
    styleIcon: { color: '#FFFFFF', marginTop: -2 },
    onSubmit: () => history.push(`${ROUTING_PRODUCT_DETAIL_PATH}/${item.feedbackable_slug}`)
  };

  return (
    <div className={classNames('user-feed-item', styles.container)}>
      <div className={styles.boxLink}>
        <Image
          alt=""
          className={styles.boxImage}
          src={!!item.feedbackable_image && item.feedbackable_image.medium_url}
        />
        <div className={styles.boxInfo}>
          <NavLink
            target={'_blank'}
            to={`${ROUTING_PRODUCT_DETAIL_PATH}/${item.feedbackable_slug}`}
            className={styles.boxName}
          >
            {item.feedbackable_name}
          </NavLink>
          <div className={styles.ratingGroup}>
            {!!item.rate && <RatingStar {...ratingStarProps} />}
            {!!item.created_at && (
              <div className={styles.time}>
                {convertUnixTimeDDMMYYYY(item.created_at, DATETIME_TYPE_FORMAT.SHORT_DATE)}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={styles.feedbackDetail}>
        <div className={styles.description}>{item.review}</div>
        {!!item.pictures && !!item.pictures.length && (
          <div className={styles.imgList}>
            {item.pictures.map((image, index) => (
              <Image
                alt={''}
                src={image.url}
                className={styles.img}
                onClick={() =>
                  onImageClick &&
                  onImageClick({ index, image: image.url, images: item.pictures.map((picture) => picture.url) })
                }
              />
            ))}
          </div>
        )}
      </div>

      <div className={classNames(styles.buttonList, isMobileVersion() && styles.buttonListMobile)}>
        <SubmitButton {...buttonSubmitProps} />
        <SubmitButton {...addToCartSubmitProps} />
      </div>
    </div>
  );
};

export default SubmittedFeedback;
