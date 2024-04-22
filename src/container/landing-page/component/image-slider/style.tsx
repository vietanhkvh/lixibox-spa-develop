import * as COMPONENT from '../../../../style/component';
import * as LAYOUT from '../../../../style/layout';
import * as VARIABLE from '../../../../style/variable';
import { combineStyle } from '../../../../utils/responsive';

export default {
  container: combineStyle({
    MOBILE: [{}] as any,
    DESKTOP: [{}] as any,
    GENERAL: [{ display: VARIABLE.display.block, width: '100%' }] as any
  }),

  imageSlide: {
    position: 'relative',
    overflow: 'hidden',

    container: Object.assign({}, LAYOUT.flexContainer.justify, COMPONENT.block.content, {
      paddingTop: 10,
      transition: VARIABLE.transitionOpacity
    }),

    pagination: Object.assign({}, LAYOUT.flexContainer.center, COMPONENT.slidePagination, {
      transition: VARIABLE.transitionNormal,
      bottom: 0
    }),

    navigation: Object.assign(
      {},
      LAYOUT.flexContainer.center,
      LAYOUT.flexContainer.verticalCenter,
      COMPONENT.slideNavigation
    )
  },

  customStyleLoading: {
    height: 300
  },

  mobileWrap: {
    width: '100%',
    overflowX: 'auto',

    panel: {
      whiteSpace: 'nowrap'
    },

    center: {
      justifyContent: 'center',
      width: '100%',
      minWidth: '100%'
    }
  },

  placeholder: {
    width: '100%',
    display: VARIABLE.display.flex,
    marginBottom: 35,

    item: {
      flex: 1,
      paddingLeft: 10,
      paddingRight: 10
    },

    image: {
      width: '100%',
      height: 'auto',
      paddingTop: '65%',
      marginBottom: 10
    },

    text: {
      width: '94%',
      height: 25,
      marginBottom: 10
    },

    lastText: {
      width: '65%',
      height: 25
    }
  },

  desktop: {
    mainWrap: {
      display: VARIABLE.display.block,
      marginLeft: -9,
      marginRight: -9
    },

    container: {
      width: '100%',
      overflowX: 'auto',
      whiteSpace: 'nowrap',
      paddingTop: 0,
      display: VARIABLE.display.flex,
      overflow: 'hidden',
      justifyContent: 'center',

      itemSlider: {
        width: `100%`,
        display: VARIABLE.display.inlineBlock,
        borderRadius: 5,
        overflow: 'hidden',
        boxShadow: VARIABLE.shadowBlur,
        position: VARIABLE.position.relative
      },

      itemSliderPanel: (imgUrl) => ({
        width: '100%',
        paddingTop: '62.5%',
        position: VARIABLE.position.relative,
        backgroundImage: `url(${imgUrl})`,
        backgroundColor: VARIABLE.colorF7,
        backgroundPosition: 'top center',
        backgroundSize: 'cover'
      }),

      videoIcon: {
        width: 70,
        height: 70,
        position: VARIABLE.position.absolute,
        top: '50%',
        left: '55%',
        transform: 'translate(-50%, -50%)',
        borderTop: '35px solid transparent',
        boxSizing: 'border-box',
        borderLeft: '51px solid white',
        borderBottom: '35px solid transparent',
        opacity: 0.8
      },

      info: {
        width: '100%',
        height: 110,
        padding: 12,
        position: VARIABLE.position.relative,
        background: VARIABLE.colorWhite,
        display: VARIABLE.display.flex,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',

        image: (imgUrl) => ({
          width: '100%',
          height: '100%',
          top: 0,
          left: 0,
          zIndex: -1,
          position: VARIABLE.position.absolute,
          backgroundColor: VARIABLE.colorF7,
          backgroundImage: `url(${imgUrl})`,
          backgroundPosition: 'bottom center',
          backgroundSize: 'cover',
          filter: 'blur(4px)',
          transform: `scaleY(-1) scale(1.1)`,
          WebkitBackfaceVisibility: 'hidden',
          WebkitPerspective: 1000,
          WebkitTransform: 'translate3d(0,0,0) translateZ(0)',
          backfaceVisibility: 'hidden',
          perspective: 1000
        }),

        title: {
          color: VARIABLE.colorBlack,
          whiteSpace: 'pre-wrap',

          fontSize: 14,
          lineHeight: '22px',
          maxHeight: '44px',
          overflow: 'hidden',
          marginBottom: 5
        },

        description: {
          fontSize: 12,
          color: VARIABLE.colorBlack,

          opacity: 0.7,
          marginRight: 10,
          whiteSpace: 'pre-wrap',
          lineHeight: '18px',
          maxHeight: 36,
          overflow: 'hidden'
        },

        tagList: {
          width: '100%',
          display: VARIABLE.display.flex,
          flexWrap: 'wrap',
          height: '36px',
          maxHeight: '36px',
          overflow: 'hidden'
        },

        tagItem: {
          fontSize: 12,
          lineHeight: '18px',
          color: VARIABLE.colorBlack,

          opacity: 0.7,
          marginRight: 10,
          whiteSpace: 'pre-wrap'
        }
      }
    }
  }
} as any;
