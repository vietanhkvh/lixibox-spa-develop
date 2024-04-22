import * as VARIABLE from 'style/variable';
import { combineStyle } from 'utils/responsive';

export default {
  container: combineStyle({
    MOBILE: [
      {
        paddingTop: 0,
        minHeight: '100vh'
      }
    ] as any,
    DESKTOP: [{}] as any,

    GENERAL: [
      {
        display: VARIABLE.display.block,
        position: VARIABLE.position.relative,
        zIndex: VARIABLE.zIndex5
      }
    ] as any
  }),

  row: {
    display: VARIABLE.display.flex,
    flexWrap: 'wrap',
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 5
  },

  itemWrap: {
    padding: 5
  },

  customStyleLoading: {
    height: 400
  },

  headerMenuContainer: {
    display: VARIABLE.display.block,
    position: VARIABLE.position.relative,
    height: 50,
    maxHeight: 50,
    marginBottom: 5,

    headerMenuParent: {
      width: '100%',
      height: '100%',
      display: VARIABLE.display.flex,
      justifyContent: 'space-between',
      position: VARIABLE.position.relative,
      zIndex: VARIABLE.zIndexMax,

      headerMenuWrap: {
        maxWidth: '70%',
        height: '100%',
        display: VARIABLE.display.flex,
        justifyContent: 'space-between'
      }
    },

    headerMenu: {
      display: VARIABLE.display.flex,
      alignItems: 'center',
      justifyContent: 'flex-start',

      borderBottom: `1px solid ${VARIABLE.colorBlack005}`,
      height: '100%',
      width: '100%',
      position: VARIABLE.position.absolute,
      top: 0,
      left: 0,
      zIndex: VARIABLE.zIndexMax,

      isTop: {
        position: VARIABLE.position.fixed,
        top: 0,
        left: 0,
        width: '100%',
        height: 50,
        backgroundColor: VARIABLE.colorWhite
      },

      textBreadCrumb: combineStyle({
        MOBILE: [
          {
            fontSize: 15,
            lineHeight: '50px',
            height: '100%',
            width: '100%',
            flex: 10,
            overflow: 'hidden',
            paddingLeft: 10,

            color: VARIABLE.colorBlack,
            display: VARIABLE.display.inlineBlock,
            textTransform: 'capitalize',
            cursor: 'pointer'
          }
        ] as any,

        DESKTOP: [
          {
            fontSize: 15,
            lineHeight: '50px',
            height: '100%',
            width: '100%',
            flex: 10,
            overflow: 'hidden',
            paddingLeft: 10,

            color: VARIABLE.colorBlack,
            display: VARIABLE.display.inlineBlock,
            textTransform: 'capitalize',
            cursor: 'pointer'
          }
        ] as any,

        GENERAL: [
          {
            color: VARIABLE.colorBlack,

            cursor: 'pointer'
          }
        ] as any
      }),

      icon: (isOpening) => ({
        width: 50,
        height: 50,
        color: VARIABLE.colorBlack08,
        transition: VARIABLE.transitionNormal,
        transform: isOpening ? 'rotate(-180deg)' : 'rotate(0deg)'
      }),

      inner: {
        width: 16,
        height: 16
      }
    },

    overlay: {
      position: VARIABLE.position.absolute,
      width: '100vw',
      height: '100vh',
      top: 50,
      left: 0,
      zIndex: VARIABLE.zIndex9,
      background: VARIABLE.colorBlack06,
      transition: VARIABLE.transitionNormal
    }
  },

  categoryList: combineStyle({
    MOBILE: [
      {
        height: 'calc(100vh - 50px)',
        overflowY: 'auto'
      }
    ] as any,
    DESKTOP: [{ overflowY: 'auto' }] as any,
    GENERAL: [
      {
        position: VARIABLE.position.absolute,
        top: 50,
        left: 0,
        width: '100%',
        zIndex: VARIABLE.zIndex9,
        backgroundColor: VARIABLE.colorWhite,
        display: VARIABLE.display.none,
        opacity: 0
      }
    ] as any
  }),

  isShowingCategoryList: {
    transition: VARIABLE.transitionNormal,
    display: VARIABLE.display.block,
    opacity: 1,
    zIndex: VARIABLE.zIndexMax
  },

  borderBetween: {
    display: VARIABLE.display.block,
    border: `1px solid ${VARIABLE.colorBlack005}`
  },

  themeCategoryWrap: {
    display: VARIABLE.display.block,
    overflow: 'scroll',
    width: '100%',
    paddingTop: 10,
    paddingBottom: 10
  },

  themeCategoryContainer: {
    display: VARIABLE.display.block,
    whiteSpace: 'nowrap',
    marginLeft: 10,
    paddingRight: 10,
    width: '180%',
    maxWidth: 940,

    themeCategory: {
      display: VARIABLE.display.inlineBlock,
      paddingRight: 10,
      width: 'calc(50% - 5px)',
      maxWidth: 'calc(50% - 5px)',
      whiteSpace: 'nowrap',
      cursor: 'pointer',
      overflow: 'scroll'
    },

    lastChild: {
      marginRight: 10
    },

    imgWrap: {
      display: VARIABLE.display.block,
      width: '100%',
      padding: 0,
      borderRadius: 5,
      overflow: 'hidden',
      boxShadow: VARIABLE.shadowBlur,

      img: {
        display: VARIABLE.display.block,
        width: '100%',
        maxWidth: '100%',
        minHeight: 80,
        height: 'auto'
      }
    }
  },

  topBannerContainer: {
    container: combineStyle({
      MOBILE: [{ paddingTop: 5, paddingLeft: 10, paddingBottom: 5, paddingRight: 10 }] as any,
      DESKTOP: [{ paddingTop: 5, paddingLeft: 10, paddingBottom: 5, paddingRight: 10 }] as any,
      GENERAL: [{}] as any
    }),

    topBanner: {
      width: '100%',
      height: 'auto',
      boxShadow: VARIABLE.shadowBlur,
      borderRadius: 10
    }
  },

  brandPriceGroup: combineStyle({
    MOBILE: [
      {
        position: VARIABLE.position.absolute,
        top: 50,
        right: 5,
        background: VARIABLE.colorWhite,
        width: 200,
        maxWidth: 200,
        borderRadius: 8,
        height: 'calc(100vh - 200px)',
        maxHeight: 'calc(100vh - 200px)',
        overflowX: 'hidden',
        overflowY: 'auto',
        boxShadow: '0 3px 3px rgba(0,0,0,.25)'
      }
    ] as any,
    DESKTOP: [
      {
        paddingLeft: 10,
        paddingRight: 10
      }
    ] as any,
    GENERAL: [{}] as any
  }),

  filterMobile: {
    position: VARIABLE.position.relative,
    borderLeft: `1px solid ${VARIABLE.colorBlack005}`,

    angle: {
      position: VARIABLE.position.absolute,
      top: 30,
      right: 15,
      borderTop: `10px solid ${VARIABLE.colorTransparent}`,
      borderRight: `10px solid ${VARIABLE.colorTransparent}`,
      borderBottom: `10px solid ${VARIABLE.colorE5}`,
      borderLeft: `10px solid ${VARIABLE.colorTransparent}`
    }
  },

  discountCountCodeList: {
    item: combineStyle({
      MOBILE: [
        {
          scrollSnapAlign: 'center',
          minWidth: 270,
          width: '100%',
          marginTop: 16,
          marginBottom: 16
        }
      ] as any,
      DESKTOP: [
        {
          scrollSnapAlign: 'center',
          minWidth: 270,
          width: '100%',
          marginTop: 16,
          marginBottom: 16,
          cursor: 'pointer'
        }
      ] as any,

      GENERAL: [
        {
          display: 'flex',
          overflow: 'hidden'
        }
      ] as any
    }),

    innerItem: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: 50,
      padding: 0
    },

    description: {
      fontSize: 13,
      lineHeight: '20px',
      color: VARIABLE.color20,
      padding: '0 12px',
      fontWeight: VARIABLE.fontRegular,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      display: '-webkit-box',
      WebkitBoxOrient: 'vertical',
      WebkitLineClamp: 2,
      maxHeight: 40,
      position: 'relative',
      flex: 1,
      width: '100%'
    },

    code: {
      fontSize: 14,
      fontWeight: VARIABLE.fontBold,
      color: VARIABLE.colorBlue,
      paddingLeft: 12,
      paddingRight: 12,
      lineHeight: '20px',
      userSelect: 'text',
      textAlign: 'center' as const,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      display: '-webkit-box',
      WebkitBoxOrient: 'vertical',
      WebkitLineClamp: 2,
      textTransform: 'uppercase',
      minWidth: 85,
      maxWidth: 160,
      wordBreak: 'break-all'
    },

    icon: {
      width: 28,
      height: 28,
      color: VARIABLE.color2E
    },

    innerIcon: {
      width: 14
    }
  },
  heading: {
    wrap: combineStyle({
      MOBILE: [{}] as any,

      DESKTOP: [{}] as any,

      GENERAL: [{}] as any
    }),

    imgOuter: {
      paddingTop: '41.66%',
      position: 'relative'
    },

    img: {
      display: 'block',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%'
    },

    titleWrap: {
      position: 'relative'
    },

    titleBlur: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      filter: 'blur(30px)',
      opacity: 0.15
    },

    title: ({ color }) =>
      combineStyle({
        MOBILE: [
          {
            fontSize: 16,
            lineHeight: '24px',
            padding: '10px 16px',
            fontWeight: VARIABLE.fontRegular,
            color: VARIABLE.color20,
            borderTop: `1px solid ${VARIABLE.colorE9}`,
            borderBottom: `1px solid ${VARIABLE.colorE9}`
          }
        ] as any,

        DESKTOP: [
          {
            fontSize: 16,
            lineHeight: '24px',
            padding: '10px 16px',
            fontWeight: VARIABLE.fontRegular,
            color: VARIABLE.color20,
            borderTop: `1px solid ${VARIABLE.colorE9}`,
            borderBottom: `1px solid ${VARIABLE.colorE9}`
          }
        ] as any,

        GENERAL: [
          {
            color: VARIABLE.color2E,
            width: '100%',
            textAlign: 'center' as const,
            position: 'relative'
          }
        ] as any
      })
  },

  section: {
    container: combineStyle({
      MOBILE: [
        {
          margin: 0,
          width: 'calc(100%- 20px)'
        }
      ] as any,

      DESKTOP: [
        {
          margin: 0,
          width: 'calc(100%- 20px)'
        }
      ] as any,

      GENERAL: [
        {
          overflow: 'hidden',
          boxShadow: VARIABLE.shadowBlur
        }
      ] as any
    }),

    img: {
      display: 'block',
      width: '100%',
      height: 'auto'
    },

    list: combineStyle({
      MOBILE: [{ padding: 0 }] as any,

      DESKTOP: [{ padding: 10 }] as any,

      GENERAL: [{ position: 'relative', overflow: 'hidden' }] as any
    }),

    overlay: (color) => ({
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: color
    }),

    name: (color) =>
      combineStyle({
        MOBILE: [
          {
            fontSize: 14,
            lineHeight: '22px',
            padding: '10px 15px',
            margin: '10px 10px 0',
            width: 'calc(100% - 20px)'
          }
        ] as any,

        DESKTOP: [
          {
            fontSize: 14,
            lineHeight: '22px',
            padding: '10px 15px',
            margin: '10px 10px 0',
            width: 'calc(100% - 20px)'
          }
        ] as any,

        GENERAL: [
          {
            textAlign: 'center' as const,
            position: 'relative',

            background: VARIABLE.colorWhite,
            borderBottom: `1px solid ${VARIABLE.colorE5}`,
            color
          }
        ] as any
      }),

    slider: combineStyle({
      MOBILE: [{}] as any,

      DESKTOP: [{ background: VARIABLE.colorWhite }] as any,

      GENERAL: [
        {
          paddingTop: 0,
          paddingBottom: 0,
          borderRadius: '0 0 7px 7px',
          overflow: 'hidden'
        }
      ] as any
    })
  },

  desktopListHeader: {
    marginTop: 10
  }
} as any;
