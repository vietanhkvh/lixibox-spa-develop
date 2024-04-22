export interface IBreadCrumbProps {
  listMenu: any;
  selectedSlug?: any;
  isFinalList?: boolean;
  updateMetaInfoAction?: any;
}

export interface IBreadCrumbState {
  list: Array<any>;
}
