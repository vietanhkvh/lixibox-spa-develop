export interface IProps {
  children: any;
  routes: any;

  match: {
    params: {
      idPost: any;
    };
  };

  authStore?: any;
  magazineStore?: any;
  fetchMagazineList?: any;
  fetchMagazineBySlug?: any;
  fetchMagazineDashboard?: any;
  fetchMagazineRelatedBlog?: any;
  updateMetaInfoAction?: any;

  magazineDefaultParams?: any;
  clearDataMagazineAction?: any;
  openModalAction?: any;
  likeProductAction?: any;
  unLikeProductAction?: any;
  likedIdList?: any;
}

export interface IState {
  isPriorityBlock?: boolean;
  isFetchMagazineList?: boolean;
  didScroll?: boolean;
}
