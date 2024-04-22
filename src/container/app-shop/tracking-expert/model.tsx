export interface IProps {
  match: {
    params: {
      trackingCode?: any;
    };
  };

  type?: any;
  column?: number;

  trackingStore?: any;
  fetchExpertsTrackingGroup?: any;
  clearDataExpertsTrackingGroupAction?: any;
  likedIdList?: any;
  openModalAction?: any;
  likeProductAction?: any;
  unLikeProductAction?: any;
  addItemToCartAction?: any;
}

export interface IState {}
