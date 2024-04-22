import * as LAYOUT from '../../../../style/layout';
import * as VARIABLE from '../../../../style/variable';

import { CDN_ASSETS_PREFIX } from '../../../../utils/uri';
const giftBackground = CDN_ASSETS_PREFIX('/cart/gift.jpg');

export default {
  container: {
    display: 'block',
    position: 'fixed',
    width: '100vw',
    height: 'calc(100% - var(--sticky-top-banner-height, 0px))',
    top: 'var(--sticky-top-banner-height, 0px)',
    left: 0,
    zIndex: VARIABLE.zIndexMax,
    transition: VARIABLE.transitionNormal
  },

  overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    zIndex: VARIABLE.zIndex1,
    background: VARIABLE.colorBlack06,
    transition: VARIABLE.transitionNormal
  },

  panel: Object.assign({}, LAYOUT.flexContainer.justify, LAYOUT.flexContainer.verticalFlex, {
    position: 'absolute',
    width: '100%',
    maxWidth: 400,
    height: '100%',
    top: 0,
    right: 0,
    zIndex: VARIABLE.zIndex5,
    background: VARIABLE.colorWhite,
    transition: VARIABLE.transitionNormal,
    paddingRight: 12,
    paddingLeft: 8
  }),

  inner: Object.assign({}, LAYOUT.flexContainer.left, LAYOUT.flexContainer.verticalFlex, {
    position: VARIABLE.position.relative,
    zIndex: VARIABLE.zIndex5,
    height: '100%'
  }),

  heading: {
    padding: '0 0 0 15px',
    display: VARIABLE.display.flex,
    alginItems: 'center',
    background: VARIABLE.colorWhite,
    justifyContent: 'space-between'
  },

  whiteHeading: {
    background: VARIABLE.colorWhite
  },

  cartHeadingGroup: {
    height: '100%',
    flex: 10,
    display: VARIABLE.display.flex,
    alignItems: 'flex-start',
    flexDirection: 'column',

    icon: {
      width: 50,
      height: 50,
      color: VARIABLE.color4D,
      cursor: 'pointer'
    },

    inner: {
      width: 20,
      position: VARIABLE.position.relative,
      top: -2
    },

    title: {
      fontSize: 20,

      color: VARIABLE.color4D,
      lineHeight: '50px'
    },

    subTitle: {
      fontSize: 14,
      lineHeight: '20px',

      color: VARIABLE.color4D
    }
  },

  innerIcon: {
    width: 16
  },

  scrollView: {
    flex: 10,
    paddingRight: 15
  },

  giftContainer: {
    cursor: 'pointer',
    padding: 10,
    position: 'relative',
    border: `1px solid ${VARIABLE.colorF0}`
  },

  discountCode: {
    padding: 15,
    background: VARIABLE.colorWhite,
    boxShadow:
      '0 1px 1px rgba(0,0,0,.075), 0 -1px 1px rgba(0,0,0,.075), 1px 0px 1px rgba(0,0,0,.075), -1px 0px 1px rgba(0,0,0,.075)',

    icon: {
      width: 20,
      height: 20,
      background: VARIABLE.colorWhite,
      color: VARIABLE.colorBlack05,
      cursor: 'pointer'
    },

    innerIcon: {
      width: 8
    },

    iconGift: {
      width: 90,
      height: 90,
      position: 'absolute',
      bottom: 33,
      right: 12,
      backgroundImage: `url(${giftBackground})`,
      backgroundSize: '90px 90px'
    },

    innerIconGift: {
      width: 50
    },

    iconLeft: {
      position: VARIABLE.position.absolute,
      top: 0,
      left: 0,
      zIndex: VARIABLE.zIndex8
    },

    iconRight: {
      position: VARIABLE.position.absolute,
      top: 0,
      right: 0,
      zIndex: VARIABLE.zIndex8
    }
  },

  btnContainer: {
    display: VARIABLE.display.flex,
    alignItems: 'center',
    justifyContent: 'center',

    viewMoreGiftButton: {
      paddingTop: 8,
      paddingBottom: 8,
      // border: `1px solid ${VARIABLE.colorBlack02}`,
      textAlign: 'center' as const,
      width: 120,
      maxWidth: 120,
      borderRadius: 5,
      fontSize: 15,
      fontWeight: VARIABLE.fontBold,
      // color: VARIABLE.colorBlack07,
      boxShadow: VARIABLE.shadowBlurSort,
      cursor: 'pointer'
    }
  },

  byToGet: {
    container: {
      display: 'flex',
      cursor: 'pointer',
      flex: 10,
      minHeight: 80,

      content: {
        fontSize: 14,
        height: '100%',
        maxHeight: '100%',
        overflow: 'hidden',
        lineHeight: '18px',
        textAlign: 'left' as const,
        color: VARIABLE.color4D,
        maxWidth: 220,
        marginBottom: 15,
        zIndex: VARIABLE.zIndex5,

        price: {
          fontSize: 14,
          color: VARIABLE.colorRed
        },

        link: {
          marginTop: 5,

          color: VARIABLE.color75,
          textDecoration: 'underline',
          fontSize: 14
        }
      }
    },

    progress: {},

    text: {
      marginBottom: 20,
      fontSize: 10
    },

    hightLightText: {
      fontSize: 10
    },

    line: {
      width: '100%',
      height: 20,
      borderRadius: 10,
      backgroundColor: VARIABLE.colorE5,
      padding: '5px 35px 5px 5px',
      position: VARIABLE.position.relative
    },

    valueLine: {
      maxWidth: '100%',
      transition: VARIABLE.transitionNormal,
      width: 0,
      height: 10,
      borderRadius: 5,
      backgroundColor: VARIABLE.colorPink
    },

    imageContainer: {
      width: 40,
      height: 40,
      borderRadius: 20,
      padding: 5,
      position: VARIABLE.position.absolute,
      backgroundColor: VARIABLE.colorE5,
      right: 0,
      top: -10,

      full: {
        backgroundColor: VARIABLE.colorPink
      }
    },

    giftIcon: {
      width: 30,
      height: 30,
      borderRadius: 15,
      background: VARIABLE.colorWhite,
      color: VARIABLE.colorPink
    },

    innerGiftIcon: {
      width: 18
    },

    image: {
      width: 30,
      height: 30,
      borderRadius: 15,
      backgroundImage: `url(https://upload.lixibox.com/system/pictures/files/000/035/695/small/1539166357.png)`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }
  }
} as any;
