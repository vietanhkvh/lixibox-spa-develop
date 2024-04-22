export interface IProps {
  children: any;
  routes: any;
  match?: any;
  location?: Location;
  perPage?: number;

  magazineStore?: any;
  fetchMagazineList?: any;
  updateMetaInfoAction?: any;
  fetchMagazineCategory?: any;
  fetchMagazineDashboard?: any;
  fetchMagazineByTagName?: any;

  fetchMagazineListAction?: any;
  magazineDefaultParams?: any;
  clearDataMagazineAction?: any;
}

export interface IState {
  page: any;
  urlList: Array<any>;

  isPriorityBlock?: boolean;
}
