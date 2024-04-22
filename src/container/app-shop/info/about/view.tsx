import { useState } from 'react';
import { Suspense, lazy } from 'react';

import LazyLoading from '../../../../components/ui/lazy-loading';

import {
  ROUTING_INFO_ABOUT_US,
  ROUTING_INFO_TERM,
  ROUTING_INFO_PRIVACY,
  ROUTING_INFO_PRIVACY_EN,
  ROUTING_INFO_GIVE_GIFT_CARD,
  ROUTING_INFO_BUY_ON_APP,
  ROUTING_INFO_BUY_ON_WEB,
  ROUTING_INFO_SHIPPING_FEE,
  ROUTING_INFO_DELIVERY_AND_PAYMENT,
  ROUTING_INFO_RECEIVE_TIME,
  ROUTING_INFO_RECEIVE_AND_REDEEM,
  // ROUTING_INFO_GUARANTEE,
  ROUTING_INFO_QUESTION_RECEIVE_GIFT,
  ROUTING_INFO_QUESTION_INVITE_FRIENDS_GET_REWARDS,
  ROUTING_INFO_QUESTION_GIFT_CARD_2019,
  ROUTING_INFO_MAKEOVER,
  ROUTING_INFO_MASK_BAR,
  ROUTING_INFO_SKIN_TEST,
  ROUTING_INFO_RECOMMEND,
  ROUTING_INFO_HALIO_DISTRIBUTOR
} from '../../../../routings/path';
import ProductCategoryModal from '../../../../presentation-component/product/category-modal';

import MobileAutoDisplayHeader from '../../../../presentation-component/general/mobile-auto-display-header';
import MobileScreenHeader from '../../../../presentation-component/general/mobile-screen-header';
import Modal from '../../../../presentation-component/modal/general-modal';
import { mobileNavigationList, mobileNavigationBrowseNode } from '../panel/initialize';
import { isMobileVersion } from '../../../../utils/responsive';
import { isSameOriginLink } from '../../../../utils/validate';

import { IProps } from './model';
const RenderAboutUs = lazy(() => import('./view-about-us'));
const RenderTerm = lazy(() => import('./view-term'));
const RenderPrivacy = lazy(() => import('./view-privacy'));
const RenderPrivacyEn = lazy(() => import('./view-privacy-en'));
const RenderGiveGiftCard = lazy(() => import('./view-give-gift-card'));
const RenderBuyOnApp = lazy(() => import('./view-buy-on-app'));
const RenderBuyOnWeb = lazy(() => import('./view-buy-on-web'));
const RenderShippingFee = lazy(() => import('./view-shipping-fee'));
const RenderDeliveryAndPayment = lazy(() => import('./view-delivery-and-payment'));
const RenderReceiveTime = lazy(() => import('./view-receive-time'));
const RenderReceiveAndRedeem = lazy(() => import('./view-receive-and-redeem'));
// const RenderGuarantee = lazy(() => import('./view-guarantee'));
const RenderQuestionReceiveGift = lazy(() => import('./view-question-receive-gift'));
const RenderQuestionInviteFriendsGetRewards = lazy(() => import('./view-question-invite-friends-get-rewards'));
const RenderQuestionGiftCard2019 = lazy(() => import('./view-question-gift-card-2019'));
const RenderMakeover = lazy(() => import('./view-makeover'));
const RenderMaskBar = lazy(() => import('./view-mask-bar'));
const RenderSkinTest = lazy(() => import('./view-skin-test'));
const RenderRecommend = lazy(() => import('./view-recommend'));
const RenderDistributorInfo = lazy(() => import('./view-halio-distributor'));

const getTitle = (routeLink) => {
  const filter = mobileNavigationList.find((item) => item.link === routeLink);
  if (!filter) return '';

  return filter.title;
};

const GeneralWrap = ({ children, routeLink, history, mobileappWebviewStatus }) => {
  const title = getTitle(routeLink);
  const [isOpenCategoryModal, setOpenCategoryModal] = useState(false);

  const isShowMobileHeader = !mobileappWebviewStatus && !!isMobileVersion() && !!title && !!title.length;

  return (
    <Suspense fallback={<LazyLoading />}>
      {isShowMobileHeader && (
        <MobileAutoDisplayHeader row={1}>
          <MobileScreenHeader title={title} isShowIcon={true} onClick={() => setOpenCategoryModal(true)} />
        </MobileAutoDisplayHeader>
      )}

      {children}

      <Modal
        {...{
          isOpen: isOpenCategoryModal,
          title: '',
          isShowHeading: false,
          fullHeight: true,
          onRequestClose: () => setOpenCategoryModal(false)
        }}
      >
        <ProductCategoryModal
          title={'Danh mục thông tin'}
          breadCrumbHeading={'Thông tin'}
          isDisplaySubTitle={false}
          browseNodes={mobileNavigationBrowseNode}
          onRequestClose={(selectedCategory) => {
            if (!!selectedCategory) {
              if (!isSameOriginLink(selectedCategory)) {
                window.location.href = selectedCategory;
              } else {
                history.push(selectedCategory);
              }
            }

            setOpenCategoryModal(false);
          }}
        />
      </Modal>
    </Suspense>
  );
};

const SwitchRender = ({ constants, routeLink }) => {
  let phone = constants?.phone || '';
  let bankAccount = constants.bank_account;

  switch (routeLink) {
    case ROUTING_INFO_ABOUT_US:
      return <RenderAboutUs />;

    case ROUTING_INFO_TERM:
      return <RenderTerm />;

    case ROUTING_INFO_PRIVACY:
      return <RenderPrivacy phone={phone} />;

    case ROUTING_INFO_PRIVACY_EN:
      return <RenderPrivacyEn phone={phone} />;

    case ROUTING_INFO_GIVE_GIFT_CARD:
      return <RenderGiveGiftCard phone={phone} />;

    case ROUTING_INFO_BUY_ON_APP:
      return <RenderBuyOnApp />;

    case ROUTING_INFO_BUY_ON_WEB:
      return <RenderBuyOnWeb phone={phone} />;

    case ROUTING_INFO_SHIPPING_FEE:
      return <RenderShippingFee />;

    case ROUTING_INFO_DELIVERY_AND_PAYMENT:
      return <RenderDeliveryAndPayment phone={phone} bankAccount={bankAccount} />;

    case ROUTING_INFO_RECEIVE_TIME:
      return <RenderReceiveTime />;

    case ROUTING_INFO_RECEIVE_AND_REDEEM: {
      return <RenderReceiveAndRedeem />;
    }

    // case ROUTING_INFO_GUARANTEE:
    //   return <RenderGuarantee phone={phone} />;

    case ROUTING_INFO_QUESTION_RECEIVE_GIFT:
      return <RenderQuestionReceiveGift />;

    case ROUTING_INFO_QUESTION_INVITE_FRIENDS_GET_REWARDS:
      return <RenderQuestionInviteFriendsGetRewards />;

    case ROUTING_INFO_QUESTION_GIFT_CARD_2019:
      return <RenderQuestionGiftCard2019 phone={phone} />;

    case ROUTING_INFO_MAKEOVER:
      return <RenderMakeover />;

    case ROUTING_INFO_MASK_BAR:
      return <RenderMaskBar />;

    case ROUTING_INFO_SKIN_TEST:
      return <RenderSkinTest />;

    case ROUTING_INFO_RECOMMEND:
      return <RenderRecommend />;

    case ROUTING_INFO_HALIO_DISTRIBUTOR:
      return <RenderDistributorInfo />;

    default:
      return <RenderAboutUs />;
  }
};

const renderView = (props: IProps) => {
  const {
    history,
    location,
    cartStore: { constants },
    appStore: { mobileappWebviewStatus }
  } = props;
  const routeLink = location.pathname;

  const switchRender = <SwitchRender constants={constants} routeLink={routeLink} />;
  return (
    <GeneralWrap routeLink={routeLink} history={history} mobileappWebviewStatus={mobileappWebviewStatus}>
      {switchRender}
    </GeneralWrap>
  );
};

export default renderView;
