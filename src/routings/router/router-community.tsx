import { Suspense, lazy } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import LazyLoading from '../../components/ui/lazy-loading';
import { AuthenticatedRoute } from './router-utils';
import * as ROUTINGS from '../path';

const CommunityNewFeedContainer = lazy(() => import('../../container/app-shop/community/new-feed'));
const CommunityUnBoxingContainer = lazy(() => import('../../container/app-shop/community/unboxing'));
const CommunityUnBoxingGiudeLineContainer = lazy(
  () => import('../../container/app-shop/community/unboxing-guide-line')
);
const CommunityFeedbackContainer = lazy(
  () => import('../../container/app-shop/community/feedback/submitted-feedbacks')
);
const CommunityBestDealsContainer = lazy(() => import('../../container/app-shop/community/best-deals'));
const CommunityFeedbackEditContainer = lazy(() => import('../../container/app-shop/community/feedback/feedback-edit'));
const CommunityNewFeedDetailContainer = lazy(() => import('../../container/app-shop/community/new-feed-detail'));
const CommunityQuestionAnswerContainer = lazy(() => import('../../container/app-shop/community/question-answer'));
const CommunityUserFeedDetailContainer = lazy(() => import('../../container/app-shop/community/user-feed-detail'));
const CommunityFeedbacksToSubmitContainer = lazy(
  () => import('../../container/app-shop/community/feedback/feedbacks-to-submit')
);
const CommunityFeedbackNewContainer = lazy(() => import('../../container/app-shop/community/feedback/feedback-new'));
const CommunityUnboxingFeedbackCreateContainer = lazy(
  () => import('../../container/app-shop/community/feedback/unboxing-feedback-create')
);
const CommunityCollectionDetailContainer = lazy(() => import('../../container/app-shop/community/collection-detail'));
const CommunityHotBoxesContainer = lazy(() => import('../../container/app-shop/community/top-hot-boxes'));
const CommunityGoodSaleContainer = lazy(() => import('../../container/app-shop/community/top-good-sale'));
const CommunityTopReviewContainer = lazy(() => import('../../container/app-shop/community/top-review'));
const CommunityTopLikedContainer = lazy(() => import('../../container/app-shop/community/top-liked'));
const CommunityTopHashTagContainer = lazy(() => import('../../container/app-shop/community/top-hash-tag'));
const OrderFeedback = lazy(() => import('../../components/feedback/order-feedback'));

export const AppShopCommunitySwitchRouting = () => (
  <Suspense fallback={<LazyLoading />}>
    <Switch>
      <Route
        exact
        path={ROUTINGS.ROUTING_COMMUNITY_LIVE}
        render={() => <Redirect to={ROUTINGS.ROUTING_SHOP_INDEX} />}
      />
      <Route
        exact
        path={ROUTINGS.ROUTING_COMMUNITY_LIVE_DETAIL}
        render={() => <Redirect to={ROUTINGS.ROUTING_SHOP_INDEX} />}
      />
      <Route exact path={ROUTINGS.ROUTING_COMMUNITY_BEST_DEALS_PATH} component={CommunityBestDealsContainer} />

      <Route path={ROUTINGS.ROUTING_COMMUNITY_HOT_BOXES} component={CommunityHotBoxesContainer} />
      <Route path={ROUTINGS.ROUTING_COMMUNITY_GODD_SALE} component={CommunityGoodSaleContainer} />
      <Route path={ROUTINGS.ROUTING_COMMUNITY_TOP_REVIEW} component={CommunityTopReviewContainer} />
      <Route path={ROUTINGS.ROUTING_COMMUNITY_TOP_LIKED} component={CommunityTopLikedContainer} />
      <Route path={ROUTINGS.ROUTING_COMMUNITY_TOP_HASH_TAG} component={CommunityTopHashTagContainer} />
      <AuthenticatedRoute
        path={ROUTINGS.ROUTING_COMMUNITY_FEEDBACKS_TO_SUBMIT}
        component={CommunityFeedbacksToSubmitContainer}
      />
      <AuthenticatedRoute path={ROUTINGS.ROUTING_COMMUNITY_NEW_FEEDBACK} component={CommunityFeedbackNewContainer} />
      <AuthenticatedRoute
        path={ROUTINGS.ROUTING_COMMUNITY_FEEDBACK_CREATE}
        component={() => <Redirect to={ROUTINGS.ROUTING_COMMUNITY_FEEDBACKS_TO_SUBMIT} />}
      />
      <AuthenticatedRoute
        exact
        path={ROUTINGS.ROUTING_COMMUNITY_FEEDBACK_EDIT}
        component={CommunityFeedbackEditContainer}
      />
      <AuthenticatedRoute
        path={ROUTINGS.ROUTING_COMMUNITY_UNBOXING_FEEDBACK_NEW}
        component={CommunityUnboxingFeedbackCreateContainer}
      />
      <AuthenticatedRoute
        exact
        path={ROUTINGS.ROUTING_COMMUNITY_SUBMITTED_FEEDBACKS}
        component={CommunityFeedbackContainer}
      />
      <AuthenticatedRoute
        exact
        path={ROUTINGS.ROUTING_COMMUNITY_FEEDBACK}
        component={() => <Redirect to={ROUTINGS.ROUTING_COMMUNITY_SUBMITTED_FEEDBACKS} />}
      />

      <Route exact path={ROUTINGS.ROUTING_COMMUNITY_UNBOXING_PATH} component={CommunityUnBoxingContainer} />

      <Route
        exact
        path={ROUTINGS.ROUTING_COMMUNITY_UNBOXING_GUIDE_LINE}
        component={CommunityUnBoxingGiudeLineContainer}
      />

      <Route exact path={ROUTINGS.ROUTING_COMMUNITY_PATH} component={CommunityNewFeedContainer} />
      <AuthenticatedRoute
        exact
        path={ROUTINGS.ROUTING_COMMUNITY_USER_FEED_DETAIL}
        component={CommunityUserFeedDetailContainer}
      />
      <AuthenticatedRoute exact path={ROUTINGS.ROUTING_ORDER_FEEDBACK} component={OrderFeedback} />
      <Route exact path={ROUTINGS.ROUTING_COMMUNITY_TAG_DETAIL} component={CommunityNewFeedContainer} />
      <Route
        path={ROUTINGS.ROUTING_COMMUNITY_COLLECTION_DETAIL}
        render={(routeProps) => <CommunityCollectionDetailContainer {...routeProps} />}
      />
      <Route
        path={ROUTINGS.ROUTING_COMMUNITY_DETAIL_PATH}
        render={(routeProps) => <CommunityNewFeedDetailContainer {...routeProps} />}
      />
      <Route
        path={ROUTINGS.ROUTING_COMMUNITY_QUESTION_ANSWER_PATH}
        render={(routeProps) => <CommunityQuestionAnswerContainer {...routeProps} />}
      />
    </Switch>
  </Suspense>
);
