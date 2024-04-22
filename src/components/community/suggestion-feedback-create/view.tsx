import { NavLink, generatePath } from 'react-router-dom';

import { isMobileVersion } from '../../../utils/responsive';
import { gaEventTracking } from '../../../tracking/google-analytic/ga-event-tracking';
import SvgIcon from '../../../presentation-component/ui/icon';
import Image from 'presentation-component/ui/image';
import {
  GA_TRACKING_EVENT_CATEGORY,
  GA_TRACKING_EVENT_ACTION,
  GA_TRACKING_EVENT_LABEL
} from '../../../tracking/google-analytic/type';
import { ROUTING_COMMUNITY_FEEDBACKS_TO_SUBMIT, ROUTING_COMMUNITY_NEW_FEEDBACK } from '../../../routings/path';
import { setReferrer } from '../../../utils/navigate';
import { storageKey } from '../../../constants/application/client-storage';
import { gatewayTrackViewAllItems } from 'tracking/gateway';
import { ViewedSource } from 'tracking/constants';
import STYLE from './style';
import styles from './style.module.scss';

const renderBoxToFeedback = ({
  listBoxNeedToFeedback,
  closeModal = () => {},
  limit = 3,
  isInModal = false,
  onClickItem = () => {}
}) => {
  if (!listBoxNeedToFeedback || !listBoxNeedToFeedback.length) {
    return null;
  }

  const filteredList = listBoxNeedToFeedback.filter((item, index) => index < limit);

  const containerProps = {
    style: Object.assign({}, STYLE.container, !!isInModal && STYLE.modalContainer)
  };

  const listProps = {
    style: Object.assign({}, STYLE.list, isInModal && STYLE.modalList)
  };

  return (
    <div {...containerProps}>
      {renderHeading({ isInModal, closeModal })}
      <div {...listProps}>{filteredList.map(renderBoxToFeedbackItem, { closeModal, onClickItem })}</div>
    </div>
  );
};

const renderHeading = ({ isInModal, closeModal }) => {
  const navProps = {
    style: STYLE.heading.viewmore,
    to: `${ROUTING_COMMUNITY_FEEDBACKS_TO_SUBMIT}`,
    onClick: () => {
      gatewayTrackViewAllItems({ source: ViewedSource.MY_FEEDBACK });
    }
  };

  const headingContainerProps = {
    style: Object.assign({}, STYLE.heading.container, !!isInModal && STYLE.heading.modalContainer)
  };

  const titleProps = {
    style: Object.assign({}, STYLE.heading.title, !!isInModal && STYLE.heading.modalTitle)
  };

  const descriptionProps = {
    style: Object.assign({}, STYLE.heading.description, !!isInModal && STYLE.heading.modalDescription)
  };

  return (
    <div {...headingContainerProps}>
      <div {...titleProps}>
        Đánh giá box
        <NavLink {...navProps}>
          Xem tất cả
          <SvgIcon name={'angle-right'} className={styles.viewMoreIcon} />
        </NavLink>
      </div>
      <div {...descriptionProps}>
        Đánh giá sản phẩm đã mua và chia sẻ link đập hộp để nhận thưởng lên đến{' '}
        <span style={STYLE.heading.highLight}>200 Lixicoin</span>
      </div>

      {!!isInModal && !isMobileVersion() && <NavLink {...navProps}>Đánh giá ngay</NavLink>}
    </div>
  );
};

function renderBoxToFeedbackItem(item) {
  const newFeedbackPath = generatePath(ROUTING_COMMUNITY_NEW_FEEDBACK, { productId: item.id });
  const navLinkProps = {
    style: STYLE.item,
    to: newFeedbackPath,
    onClick: () => {
      !!this.closeModal && this.closeModal();
      viewDetailFeedbackGaTracking();
      !!this.onClickItem && this.onClickItem();
      setReferrer(storageKey.FEEDBACK_REDIRECT);
    }
  };

  const imgProps = {
    alt: '',
    style: STYLE.itemImage,
    src: item.primary_picture && item.primary_picture.medium_url
  };

  return (
    <NavLink {...navLinkProps}>
      <Image {...imgProps} />
      <div style={STYLE.itemName}>{item.name}</div>
    </NavLink>
  );
}

const viewDetailFeedbackGaTracking = () => {
  const viewDetailGaTracking = {
    category: GA_TRACKING_EVENT_CATEGORY.FEATURE_EFFECTIVE,
    action: GA_TRACKING_EVENT_ACTION.FEATURE_EFFECTIVE.SUGGESTION_FEEDBACK_MODAL,
    label: GA_TRACKING_EVENT_LABEL.FEATURE_EFFECTIVE.SUGGESTION_FEEDBACK_MODAL.VIEW_CONTENT,
    value: 1
  };

  !!gaEventTracking && gaEventTracking(viewDetailGaTracking);
};

export default renderBoxToFeedback;
