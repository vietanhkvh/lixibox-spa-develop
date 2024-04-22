import { ReactNode } from 'react';

export interface IProps {
  title?: string | ReactNode;
  viewMoreText?: string;
  viewMoreLink?: string;
  showViewMore?: boolean;
  isIframeLoading?: boolean;
  showHeader?: boolean;
  content?: any;
  style?: any;
  textAlignType?: any;
}

export interface IState {}
