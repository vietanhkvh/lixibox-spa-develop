import { IProps } from './model';

import {
  ROUTING_COMMUNITY_PATH,
  ROUTING_COMMUNITY_UNBOXING_PATH,
  ROUTING_COMMUNITY_BEST_DEALS_PATH
} from '../../../../routings/path';

import { GA_TRACKING_EVENT_LABEL } from '../../../../tracking/google-analytic/type';

import { COMMUNITY_CATEGORY_NAME } from '../../../../constants/application/community';

export const DEFAULT_PROPS = {
  days: 7
} as IProps;

export const navigationList = [
  {
    id: 1,
    title: COMMUNITY_CATEGORY_NAME[1],
    icon: 'message-heart',
    mobile: {
      title: COMMUNITY_CATEGORY_NAME[1],
      description: COMMUNITY_CATEGORY_NAME[1]
    },
    link: ROUTING_COMMUNITY_PATH,
    clickTracking: GA_TRACKING_EVENT_LABEL.BEHAVIOR_IN_PAGE.COMMNUNITY_PAGE.MAIN_NAVIGATION.FEED
  },
  {
    id: 2,
    title: COMMUNITY_CATEGORY_NAME[2],
    icon: 'gift',
    mobile: {
      title: COMMUNITY_CATEGORY_NAME[2],
      description: COMMUNITY_CATEGORY_NAME[2]
    },
    link: ROUTING_COMMUNITY_UNBOXING_PATH,
    clickTracking: GA_TRACKING_EVENT_LABEL.BEHAVIOR_IN_PAGE.COMMNUNITY_PAGE.MAIN_NAVIGATION.UNBOXING
  },
  {
    id: 3,
    title: COMMUNITY_CATEGORY_NAME[3],
    icon: 'verification',
    mobile: {
      title: COMMUNITY_CATEGORY_NAME[3],
      description: COMMUNITY_CATEGORY_NAME[3]
    },
    link: ROUTING_COMMUNITY_BEST_DEALS_PATH,
    clickTracking: GA_TRACKING_EVENT_LABEL.BEHAVIOR_IN_PAGE.COMMNUNITY_PAGE.MAIN_NAVIGATION.BEST_DEALS
  }
  // {
  //   id: 4,
  //   title: COMMUNITY_CATEGORY_NAME[4],
  //   icon: 'youtube',
  //   mobile: {
  //     title: COMMUNITY_CATEGORY_NAME[4],
  //     description: COMMUNITY_CATEGORY_NAME[4]
  //   },
  //   link: ROUTING_COMMUNITY_LIVE,
  //   clickTracking: GA_TRACKING_EVENT_LABEL.BEHAVIOR_IN_PAGE.COMMNUNITY_PAGE.MAIN_NAVIGATION.LIVE,
  //   class: 'animate-shake'
  // }
];
