export interface IProps {
  children?: any;
  routes?: any;

  match: {
    params: {
      idVideo: any;
    };
  };

  perPage?: number;
  content?: any;

  magazineStore?: any;
  fetchMagazineList?: any;
  updateMetaInfoAction?: any;
}

export interface IState {
  page?: number;
  isLoading?: boolean;
  isFetchVideo?: boolean;
  isFullyLoading?: boolean;
}
