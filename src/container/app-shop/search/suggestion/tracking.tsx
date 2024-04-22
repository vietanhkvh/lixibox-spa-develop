import {
  GA_TRACKING_EVENT_LABEL,
  GA_TRACKING_EVENT_ACTION,
  GA_TRACKING_EVENT_CATEGORY
} from '../../../../tracking/google-analytic/type';
import { gaEventTracking } from '../../../../tracking/google-analytic/ga-event-tracking';

const GENERAL_TRACKING_DATA = {
  category: GA_TRACKING_EVENT_CATEGORY.FEATURE_EFFECTIVE,
  action: GA_TRACKING_EVENT_ACTION.FEATURE_EFFECTIVE.SEARCH_BOX,
  value: 1
};

const trackingCloseModal = () =>
  gaEventTracking({
    ...GENERAL_TRACKING_DATA,
    label: GA_TRACKING_EVENT_LABEL.FEATURE_EFFECTIVE.SEARCH_BOX.CLOSE_SUGGESTION_SEARCH_MODAL
  });

const trackingClickBoxSuggestionResult = () =>
  gaEventTracking({
    ...GENERAL_TRACKING_DATA,
    label: GA_TRACKING_EVENT_LABEL.FEATURE_EFFECTIVE.SEARCH_BOX.CLICK_BOX_SUGGESTION_RESULT
  });

const trackingClickMagazineSuggestionResult = () =>
  gaEventTracking({
    ...GENERAL_TRACKING_DATA,
    label: GA_TRACKING_EVENT_LABEL.FEATURE_EFFECTIVE.SEARCH_BOX.CLICK_MAGAZINE_SUGGESTION_RESULT
  });

const trackingClickPopularKeyword = () =>
  gaEventTracking({
    ...GENERAL_TRACKING_DATA,
    label: GA_TRACKING_EVENT_LABEL.FEATURE_EFFECTIVE.SEARCH_BOX.CLICK_POPULAR_KEYWORD
  });

const trackingClickHistoryKeyword = () =>
  gaEventTracking({
    ...GENERAL_TRACKING_DATA,
    label: GA_TRACKING_EVENT_LABEL.FEATURE_EFFECTIVE.SEARCH_BOX.CLICK_HISTORY_KEYWORD
  });

const tracking = {
  closeModal: trackingCloseModal,
  clickBoxSuggestionResult: trackingClickBoxSuggestionResult,
  clickMagazineSuggestionResult: trackingClickMagazineSuggestionResult,
  clickPopularKeyword: trackingClickPopularKeyword,
  clickHistoryKeyword: trackingClickHistoryKeyword
};

export default tracking;
