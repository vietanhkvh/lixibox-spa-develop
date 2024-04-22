import { ComponentType } from 'react';
import { PropsFromRedux } from './store';

export interface ICategory {
  id?: string;
  icon?: { name: string; className?: string };
  posIcon?: { name: string; className?: string };
  title?: any;
  url?: string;
  className?: string;
  hoverable?: boolean;
  isHighlighted?: boolean;
  activeModal?: (v: boolean) => void;
  onMouseEnter?: (item: any) => void;
  onMouseLeave?: (item: any) => void;
  onClickHiddenModal?: (...param) => void;
  onClick?: (...params) => void;
  onClickFixedItem?: (...params) => void;
  childComponent?: any;
  childProps?: any;
  dropDownContent?: any;
}

export interface ICategories {
  dataOptional?: Array<any>;
  dataArray?: Array<ICategory>;
  onClick?: (item: any) => void;
  onMouseEnter?: (item: any) => void;
  onMouseLeave?: (item: any) => void;
  onClickHiddenModal?: (...param) => void;
  className?: string;
}

export interface IPanelAction {
  listMenu?: Array<any>;
  template?: ComponentType<any>;
  renderTemplate?: (props: any) => any;
  onMouseEnter?: (item: any) => void;
  onMouseLeave?: (item: any) => void;
  onClickHiddenModal?: (...param) => void;
  className?: string;
  propsTemplate?: any;
}

export interface INavigations extends PropsFromRedux {
  leftData?: IPanelAction;
  rightData?: IPanelAction;
  optionalData?: IPanelAction;
  activeList?: Array<any>;
  modalData?: Array<{ id: string; content: any; contentProps: any }>;
}

export interface ISpecialComponent {
  onMouseLeave?: () => void;
  promotions?: any;
}
