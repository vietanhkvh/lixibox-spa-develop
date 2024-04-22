import { combineStyle, getDeviceVersion } from '../../../../utils/responsive';
import * as VARIABLE from '../../../../style/variable';

const generateSwitchStyle = (mobile, desktop) => {
  const switchStyle = {
    MOBILE: { padding: 5, width: mobile, minWidth: mobile },
    DESKTOP: { width: desktop }
  };

  return switchStyle[getDeviceVersion()];
};

export default {
  container: combineStyle({
    MOBILE: [
      {
        paddingTop: 0,
        minHeight: '100vh'
      }
    ] as any,

    DESKTOP: [{ paddingTop: 30 }] as any,

    GENERAL: [
      {
        display: VARIABLE.display.block,
        position: VARIABLE.position.relative,
        zIndex: VARIABLE.zIndex5
      }
    ] as any
  }),

  column: {
    2: { width: '50%' },
    3: generateSwitchStyle('50%', '33.33%'),
    4: generateSwitchStyle('50%', '25%'),
    5: generateSwitchStyle('50%', '20%'),
    6: generateSwitchStyle('50%', '16.66%')
  },

  customStyleLoading: {
    height: 300
  },

  list: {
    paddingTop: 0,
    paddingRight: 5,
    paddingBottom: 5,
    paddingLeft: 5,

    txtNotFound: {
      textAlign: 'center' as const,
      width: '100%',
      fontSize: 25
    }
  },

  empty: {
    display: VARIABLE.display.flex,
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '50px 30px',

    image: {
      width: 175,
      height: 'auto',
      marginBottom: 10
    },

    content: {
      textAlign: 'center' as const,

      title: {
        fontSize: 24,
        lineHeight: '32px',
        marginBottom: 10,

        fontWeight: VARIABLE.fontBold,
        color: VARIABLE.color97
      },

      description: {
        fontSize: 16,
        color: VARIABLE.color97,
        maxWidth: 300,
        width: '100%',
        margin: '0 auto'
      }
    }
  },

  placeholder: {
    width: '100%',

    title: {
      background: VARIABLE.colorF0,
      display: VARIABLE.display.block,
      width: 100,
      height: 40,
      margin: '0 auto 30px'
    },

    control: {
      width: '100%',
      display: VARIABLE.display.flex,
      justifyContent: 'space-between',
      paddingLeft: 10,
      paddingRight: 10,
      marginBottom: 20
    },

    controlItem: {
      width: 150,
      height: 30,
      background: VARIABLE.colorF7
    },

    productList: {
      display: VARIABLE.display.flex,
      flexWrap: 'wrap',
      paddingTop: 5
    },

    productMobileItem: {
      minWidth: '50%',
      width: '50%'
    },

    productItem: {
      flex: 1,
      paddingLeft: 10,
      paddingRight: 10,
      marginBottom: 20,
      minWidth: '25%',
      width: '25%',

      image: {
        width: '100%',
        height: 'auto',
        paddingTop: '82%',
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
    }
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
            fontSize: 18,
            height: 60,
            lineHeight: '60px',
            textTransform: 'capitalize'
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
    DESKTOP: [{}] as any,
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

  mobileList: {
    padding: '16px 0',
    width: '100%'
  }
} as any;
