import { useEffect, useState } from 'react';
import { generatePath, useLocation, useParams, useHistory } from 'react-router-dom';

import DesktopView from './view/desktop';
import MobileView from './view/mobile';
import { isMobileVersion } from '../../../utils/responsive';
import { objectToHash } from '../../../utils';
import { usePrevious } from '../../../utils/hook';
import { generateFacebookShareUrl } from '../../../utils/uri';
import { ALERT_GENERAL_ERROR, ALERT_GENERAL_SUCCESS } from '../../../constants/application/alert';
import { storageKey } from '../../../constants/application/client-storage';
import { MODAL_BOX_DETAIL_PICTURE } from '../../../constants/application/modal';
import { ROUTING_ORDER_FEEDBACK, ROUTING_PRODUCT_DETAIL, ROUTING_SHOP_INDEX } from '../../../routings/path';
import { reportException } from '../../../tracking/sentry';
import { gatewayTrackShare } from 'tracking/gateway';

export interface PopupProp {
  isOpen: boolean;
  title: string;
  message: string;
  action: { text: string };
  onRequestClose: () => any;
}
interface OrderFeedbackProps {
  cartStore: any;
  feedbackStore: any;
  fetchFeedbackByIdAction: (param0?: any) => any;
  shareBoxOnFacebookAction: (param0?: any) => any;
  openAlertAction: (param0?: any) => any;
  openModalAction: (param0?: any) => any;
  classes?: { container?: string };
}
const OrderFeedback = ({
  cartStore: { constants },
  feedbackStore: { isFetchFeedbackById: fetchComplete, feedbackById, shareBoxOnFacebook },
  fetchFeedbackByIdAction,
  shareBoxOnFacebookAction,
  openAlertAction,
  openModalAction
}: OrderFeedbackProps) => {
  const history = useHistory();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const isFbReferred = query.get('referrer') === 'facebook';
  const wasFetchComplete = usePrevious(fetchComplete);
  const wasSharing = usePrevious(shareBoxOnFacebook.sharing);
  const { feedbackId } = useParams<{ feedbackId: string }>();
  const idHash = objectToHash({ feedbackId });
  const [feedback, setFeedback] = useState<any>(null);
  const [popup, setPopup] = useState<PopupProp>({
    isOpen: false,
    title: '',
    message: '',
    action: { text: 'OK' },
    onRequestClose: () => updatePopup({ isOpen: false })
  });
  const updatePopup = (attr: any) => setPopup((popup) => Object.assign({}, popup, attr));

  useEffect(() => {
    fetchFeedbackByIdAction({ feedbackId });
  }, []);

  useEffect(() => {
    if (!wasFetchComplete && fetchComplete) {
      const feedback = feedbackById[idHash];
      if (feedback) {
        if (isFbReferred) {
          history.replace(generatePath(ROUTING_ORDER_FEEDBACK, { feedbackId }));
          shareBoxOnFacebookAction({ id: feedback.feedbackable_id });
          gatewayTrackShare({
            id: feedback.feedbackable_id,
            type: 'product' as const,
            name: feedback.feedbackable_name,
            provider: 'facebook' as const
          });
        }
        setFeedback(feedback);
      }
    }
  }, [fetchComplete]);

  useEffect(() => {
    const { sharing, shared } = shareBoxOnFacebook;
    if (wasSharing && !sharing) {
      fetchFeedbackByIdAction({ feedbackId });
      if (shared) {
        const message = 'Tài khoản của bạn sẽ được cộng thêm 200 Lixicoin.';
        isMobileVersion()
          ? updatePopup({ isOpen: true, title: 'CHÚC MỪNG BẠN', message })
          : openAlertAction(ALERT_GENERAL_SUCCESS({ content: message }));
      } else {
        isMobileVersion()
          ? updatePopup({ isOpen: true, title: 'THÔNG BÁO', message: shareBoxOnFacebook.error })
          : openAlertAction(ALERT_GENERAL_ERROR({ content: shareBoxOnFacebook.error }));
      }
    }
  }, [shareBoxOnFacebook.sharing]);

  const onImageClick = ({ index, images }) => {
    openModalAction(
      MODAL_BOX_DETAIL_PICTURE({
        selected: parseInt('101' + index),
        list: images.map(({ url }) => ({ medium_url: url, large_url: url, original_url: url }))
      })
    );
  };

  const onSubmit = ({ feedback }: { feedback: any }) => {
    const feedbackId = (feedback && feedback.id) || null;
    const rating = (feedback && feedback.rate) || 0;
    const isLowRating = rating < 4;
    const productSlug = (feedback && feedback.feedbackable_slug) || '';

    if (isLowRating) {
      const referralRedirectPath = localStorage.getItem(storageKey.FEEDBACK_REDIRECT);
      if (referralRedirectPath) {
        localStorage.removeItem(storageKey.FEEDBACK_REDIRECT);
        history.push(referralRedirectPath);
      } else {
        history.length >= 3 ? history.goBack() : history.push(ROUTING_SHOP_INDEX);
      }
    } else {
      const shareUrl = generateFacebookShareUrl({
        shareUrl: `${process.env.REACT_APP_FQDN}${generatePath(ROUTING_PRODUCT_DETAIL, { idProduct: productSlug })}`,
        redirectUrl: `${process.env.REACT_APP_FQDN}${generatePath(ROUTING_ORDER_FEEDBACK, {
          feedbackId
        })}?referrer=facebook`
      });
      if (shareUrl) {
        window.location.href = shareUrl;
      } else {
        reportException(new Error('Exception: failed to generate Facebook share URL'));
      }
    }
  };

  // TODO: Add constant to production and staging servers
  const fbCoins = constants.lixicoin_share_box || 200;
  const View = isMobileVersion() ? MobileView : DesktopView;

  return <View feedback={feedback} fbCoins={fbCoins} popup={popup} onSubmit={onSubmit} onImageClick={onImageClick} />;
};

export default OrderFeedback;
