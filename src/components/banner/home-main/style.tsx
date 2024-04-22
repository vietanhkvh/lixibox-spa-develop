import { combineStyle } from '../../../utils/responsive';

import * as LAYOUT from '../../../style/layout';
import * as COMPONENT from '../../../style/component';
import * as VARIABLE from '../../../style/variable';

export default {
  container: combineStyle({
    MOBILE: [{ paddingTop: '41.66%' }] as any,

    DESKTOP: [{}] as any,

    GENERAL: [
      {
        display: 'block',
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
        background: VARIABLE.colorFA
      }
    ] as any
  }),

  navigationStyle: Object.assign(
    {},
    LAYOUT.flexContainer.center,
    LAYOUT.flexContainer.verticalCenter,
    COMPONENT.slideNavigation
  ),

  default: {
    background: VARIABLE.colorFA
  },

  list: {
    display: 'block',
    whiteSpace: 'nowrap',
    overflowY: 'hidden',
    overflowX: 'scroll',
    scrollSnapType: 'x mandatory'
  },

  item: {
    scrollSnapAlign: 'center',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    width: '100%',
    height: '100%',
    position: 'relative',
    transition: VARIABLE.transitionOpacity,
    cursor: 'pointer',
    opacity: 1,
    paddingTop: '41.66%',
    display: 'inline-block'
  },

  linkWrap: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },

  paginationStyle: combineStyle({
    MOBILE: [{ opacity: 1, transform: `transform: 'translate3d(0, 0, 0)',` }] as any,
    DESKTOP: [{}] as any,

    GENERAL: [
      LAYOUT.flexContainer.center,
      COMPONENT.slidePagination,
      {
        transition: VARIABLE.transitionNormal
      }
    ] as any
  }),

  link: {
    display: 'block',
    height: '100%',
    flex: 1,
    zIndex: VARIABLE.zIndex5
  },

  imageBanner: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    zIndex: VARIABLE.zIndex1,
    objectFit: 'cover'
  },

  loading: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0
  },

  slidePagination: {
    isActive: {
      background: VARIABLE.colorWhite,
      boxShadow: `0 0 0 1px ${VARIABLE.colorBlack} inset`,
      position: 'absolute',
      top: 0,
      transition: VARIABLE.transitionNormal
    }
  }
} as any;
