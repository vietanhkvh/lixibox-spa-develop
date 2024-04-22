export interface IFilterItem {
  /**
   * id template
   */
  id?: string;
  /**
   * template component
   */
  template: any;
  /**
   * props component
   */
  propsTemplate: any;

  isDisplayDiveLine?: boolean;
}

export interface IFilterAside {
  /**
   * list template
   */
  list?: IFilterItem[];
  /**
   * class names
   */
  classes?: {
    container?: string;
    item?: string;
  };
}

export interface Price {
  id: string | number;
  range: {
    min: number | string;
    max: number | string;
  };
  value: string;
  isActive?: boolean;
}

export interface IPriceItem {
  /**
   * item price - object
   */
  item: {
    /**
     * id price item
     */
    id?: string | number;
    /**
     * price lowest - number
     */
    pl?: number;
    /**
     * price highest - number
     */
    ph?: number;
    /**
     * tilte from pl to ph - string
     */
    title?: string;
    /**
     * is active flag -boolean
     */
    isActive?: boolean;
  };
  /**
   * handle click event
   */
  onClick?: (id: number | string, range: { min: number; max: number }) => void;
  /**
   * handle change param
   */
  handleClickPrice?: (...params: any[]) => void;
}

export interface IPriceFilter {
  /**
   * list price item
   */
  prices?: Array<Price>;
  /**
   * on submit button click
   */
  onSubmit?: (...paramaters) => void;
  /**
   * history broswer
   */
  history: any;
  /**
   * price low from parameter url
   */
  pl?: number | string;
  /**
   * price highest from parameter url
   */
  ph?: number | string;
  /**
   * brands filter id
   */
  bids?: any;
  /**
   * sort filter parameter url
   */
  sort?: any;
  /**
   * page filter  parameter url
   */
  page?: any;
  /**
   * min prices limit from api
   */
  minLimit?: number;
  /**
   * max prices limit from api
   */
  maxLimit?: number;

  isLoading?: boolean;
}

export interface IBrandFilter {
  /**
   * brand list display
   */
  brandList?: any;
  /**
   * brand selected id list
   */
  bids?: any;
  /**
   * history broswer
   */
  history?: any;
  /**
   * pl?: price lowest filter
   */
  pl?: any;
  /**
   * ph?: price highest filter
   */
  ph?: any;
  /**
   * sort filter parameter url
   */
  sort?: any;
  /**
   * page filter  parameter url
   */
  page?: any;
  /**
   * loading phase flag
   */
  isLoading?: boolean;
}

export interface IIndexAlphabet {
  /**
   * alphabet list
   */
  list: any;
  /**
   * active id
   */
  hoverID?: string | number;
  /**
   * handle scroll into view brand group
   */
  handleScrollView: (id) => void;
}

export interface IBrandList {
  /**
   * brand list
   */
  brands: any;
  /**
   * height of container
   */
  height: number | string;
  /**
   * set hover ID
   */
  setHoverID: (id) => void;
}

export interface IBrandScroll {
  /**
   * brand list
   */
  brandsList?: any;
  /**
   * class name for each part of component
   */
  classes?: {
    container?: string;
    header?: string;
    content?: string;
  };
}

export interface IStockStatus {
  listStatus?: Array<any>;
  /**
   * history broswer
   */
  history: any;
  /**
   * price low from parameter url
   */
  pl?: number | string;
  /**
   * price highest from parameter url
   */
  ph?: number | string;
  /**
   * brands filter id
   */
  bids?: any;
  /**
   * sort filter parameter url
   */
  sort?: any;
  /**
   * page filter  parameter url
   */
  page?: any;
  /**
   * stock status filter  parameter url
   */
  stockStatus?: string;
}
