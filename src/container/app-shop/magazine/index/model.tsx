export interface IProps {
  children: any;
  routes: any;

  magazineStore?: any;
  fetchMagazineListAction?: any;
  updateMetaInfoAction?: any;
  fetchMagazineDashboard?: any;

  magazineDefaultParams?: any;
  clearDataMagazineAction?: any;
}

export interface IState {
  page?: number;
  isPriorityBlock?: boolean;
}
