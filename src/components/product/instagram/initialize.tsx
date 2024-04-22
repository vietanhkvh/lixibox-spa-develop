import { IProps, IState } from './model';
import { CDN_ASSETS_PREFIX } from '../../../utils/uri';

export const DEFAULT_PROPS = {} as IProps;

export const INITIAL_STATE = {} as IState;

export const instagram = [
  {
    link: 'https://www.instagram.com/p/BonhEs_FQlb/embed',
    img: CDN_ASSETS_PREFIX('/landing-page/lustre-makeup/instagram01.jpg')
  },
  {
    link: 'https://www.instagram.com/p/BoY3uz0B5Uf/embed',
    img: CDN_ASSETS_PREFIX('/landing-page/lustre-makeup/instagram02.jpg')
  },
  {
    link: 'https://www.instagram.com/p/BoiIwAlF72c/embed',
    img: CDN_ASSETS_PREFIX('/landing-page/lustre-makeup/instagram03.jpg')
  },
  {
    link: 'https://www.instagram.com/p/BpCUbWQnWHx/embed',
    img: CDN_ASSETS_PREFIX('/landing-page/lustre-makeup/instagram04.jpg')
  }
];
