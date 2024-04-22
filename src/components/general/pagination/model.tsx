export interface IPaginationProps {
  current: number;
  per: number;
  total: number;
  urlList: Array<any>;
  handleClick?: any;
  canScrollToTop?: boolean;
  elementId?: any;
  scrollToElementNum?: any;
}

export interface IPaginationState {
  list: Array<any>;
}
