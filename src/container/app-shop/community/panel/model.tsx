export interface IProps {
  location?: any;
  match?: any;
  authStore: any;
  cartStore: any;
  userStore: any;
  activityFeedStore: any;

  openAlertAction: any;
  fetchUserProfileAction: any;
  fetchCommunityHashtagsAction?: any;
  clearDataCommunityHashtagsAction?: any;
  clearDataCommunityHashtagFeedsAction?: any;
  fetchMagazineListAction?: any;
  fetchHomeProductByCategoryAction?: any;
  fetchUserBoxesToFeedbackAction?: any;

  fetchUserFeedbacksAction?: any;
  clearDataMagazineListAction?: any;
  clearDataProductByCategoryAction?: any;

  days?: number;
}

export interface IState {}
