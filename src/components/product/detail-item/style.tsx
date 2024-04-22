import { combineStyle } from '../../../utils/responsive';

import * as LAYOUT from '../../../style/layout';
import * as VARIABLE from '../../../style/variable';

export default {
  container: combineStyle({
    MOBILE: [
      {
        boxShadow: VARIABLE.shadowBlur
      }
    ] as any,

    DESKTOP: [{}] as any,

    GENERAL: [
      {
        display: 'block',
        position: 'relative',
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        width: '100%',
        background: VARIABLE.colorWhite,
        zIndex: VARIABLE.zIndex2
      }
    ] as any
  }),

  top: {
    width: '100%',
    paddingTop: '67.77%',
    position: 'relative',

    image: {
      maxWidth: '100%',
      maxHeight: '100%',
      position: VARIABLE.position.absolute,
      top: '50%',
      left: '50%',
      width: '100%',
      height: '100%',
      transform: 'translate(-50%, -50%)',
      zIndex: VARIABLE.zIndex1,
      backgroundColor: VARIABLE.colorF7
    },

    innerImage: {
      objectFit: 'cover',
      width: '100%',
      height: '100%',
      transition: VARIABLE.transitionOpacity
    },

    quickView: {
      width: 120,
      maxWidth: '100%',
      left: '50%',
      top: '100%',
      marginTop: -45,
      marginBottom: 0,
      zIndex: VARIABLE.zIndex9,
      position: VARIABLE.position.absolute,
      transition: VARIABLE.transitionOpacity,
      transform: 'translate(-50%, 0) scale(.85)',
      lineHeight: '32px',
      fontSize: 14,
      display: 'inline-flex',
      textTransform: 'uppercase',
      textAlign: 'center' as const,

      whiteSpace: 'nowrap',
      cursor: 'pointer',
      height: 30,
      padding: '0px 14px',
      backgroundColor: VARIABLE.colorBlack,
      color: VARIABLE.colorWhite
    },

    soldOutView: {
      marginTop: -80,
      cursor: 'text',
      opacity: 1,
      boxShadow: 'none',
      pointerEvents: 'none'
    },

    colorList: {
      width: '100%',
      left: 0,
      bottom: -22,
      position: VARIABLE.position.absolute,
      zIndex: VARIABLE.zIndex9,
      justifyContent: 'flex-end',

      colorItem: {
        width: 20,
        minWidth: 20,
        height: 20,
        borderRadius: '50%',
        marginLeft: 3,
        marginRight: 3,
        boxShadow: '0 0 0 2px #eee',
        position: VARIABLE.position.relative,

        number: {
          position: VARIABLE.position.absolute,
          height: '100%',
          width: '100%',
          top: 0,
          left: 0,
          display: VARIABLE.display.flex,
          alignItems: 'center',
          justifyContent: 'center',
          color: VARIABLE.colorWhite,
          fontSize: 12
        }
      }
    },

    line: {
      width: 0,
      height: '1px',
      background: VARIABLE.colorBlack,
      position: VARIABLE.position.absolute,
      left: '50%',
      transform: 'translate(-50%, 0)',
      bottom: -1,
      zIndex: VARIABLE.zIndex2,
      transition: VARIABLE.transitionNormal,
      opacity: 0,

      active: {
        width: '100%',
        opacity: 1
      }
    },

    wishList: combineStyle({
      MOBILE: [{ marginRight: 0 }] as any,
      DESKTOP: [{ marginRight: 15 }] as any,

      GENERAL: [
        {
          width: 20,
          height: 18,
          zIndex: VARIABLE.zIndex9,
          background: VARIABLE.colorTransparent,
          cursor: 'pointer',
          transition: VARIABLE.transitionNormal,
          borderRadius: 0,
          position: VARIABLE.position.absolute,
          top: -22,
          left: 0
        }
      ] as any
    }),

    wishListInner: {
      width: 16,
      height: 16
    },

    wishListToolip: Object.assign(
      {},
      {
        position: VARIABLE.position.absolute,
        zIndex: VARIABLE.zIndex9,
        right: 25,
        top: -30,
        background: VARIABLE.colorBlack,
        color: VARIABLE.colorWhite,
        borderRadius: 2,
        lineHeight: '24px',
        paddingLeft: 10,
        paddingRight: 10,
        fontSize: 12,
        opacity: 0,
        transition: VARIABLE.transitionNormal,
        visibility: 'hidden',
        transform: `translateX(50%) translateY(-10px)`
      }
    ),

    wishListToolipArrow: {
      position: VARIABLE.position.absolute,
      width: 8,
      height: 4,
      boxSizing: 'border-box',
      borderTop: `4px solid ${VARIABLE.colorBlack}`,
      borderLeft: `4px solid transparent`,
      borderRight: `4px solid transparent`,
      left: '50%',
      marginLeft: -4
    }
  },

  bottom: {
    paddingTop: 25,

    overlay: {
      width: '100%',
      height: '100%',
      backgroundColor: 'transparent',
      position: VARIABLE.position.absolute,
      top: 0,
      left: 0,
      zIndex: VARIABLE.zIndex7,
      cursor: 'pointer',

      withBorder: {
        border: `1px solid ${VARIABLE.colorRed}`,
        borderRadius: 5
      }
    },

    brandGroup: Object.assign({}, LAYOUT.flexContainer.justify, {
      width: '100%',
      position: VARIABLE.position.relative
    }),

    brand: {
      flex: 10,
      maxWidth: 'calc(100% - 40px)',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      color: VARIABLE.color75,
      paddingTop: 0,
      paddingBottom: 0,
      width: '100%',
      textAlign: 'left' as const,
      textTransform: 'uppercase',

      fontSize: 11,
      lineHeight: '20px'
    },

    name: {
      fontSize: 13,

      color: VARIABLE.colorBlack,
      lineHeight: '18px',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      display: '-webkit-box',
      WebkitBoxOrient: 'vertical',
      paddingTop: 0,
      paddingBottom: 0,
      width: '100%',
      textAlign: 'left' as const,
      marginBottom: 10,
      textTransform: 'capitalize',
      paddingRight: 0,
      whiteSpace: 'normal'
    },

    price: {
      fontSize: 14,
      lineHeight: '22px',
      color: VARIABLE.colorBlack,

      width: '100%',
      textAlign: 'left' as const
    },

    priceAddOn: {
      fontSize: 13,
      color: VARIABLE.color4D,
      textDecoration: 'line-through',
      marginLeft: 5
    },

    rating: {
      style: {
        marginBottom: 5
      },

      star: {
        width: 14,
        height: 14,
        marginLeft: 0
      },

      startInner: {
        width: 12
      }
    }
  },

  ratingGroup: {
    display: VARIABLE.display.flex,
    opacity: 0.8,

    ratingCount: {
      fontSize: 12,
      marginLeft: 5,
      color: VARIABLE.color97
    }
  },

  btnAddToCart: combineStyle({
    MOBILE: [{ margin: 0 }] as any,
    DESKTOP: [{ marginBottom: 0 }] as any,

    GENERAL: [
      {
        zIndex: VARIABLE.zIndex9
      }
    ] as any
  })
} as any;
