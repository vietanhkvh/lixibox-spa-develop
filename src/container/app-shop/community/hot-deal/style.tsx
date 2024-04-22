import * as VARIABLE from '../../../../style/variable';
import { combineStyle } from '../../../../utils/responsive';

export default {
  container: combineStyle({
    MOBILE: [{}] as any,
    DESKTOP: [
      {
        paddingTop: 10
      }
    ] as any,
    GENERAL: [
      {
        display: 'block',
        position: 'relative'
      }
    ] as any
  }),
  wrap: {
    paddingTop: '30px',
    display: 'block',
    position: 'relative',
    zIndex: 50
  },

  heading: {
    display: 'flex',
    width: '100%',
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    zIndex: VARIABLE.zIndex7,

    title: {
      fontWeight: VARIABLE.fontSemiBold,
      fontSize: 22,
      color: VARIABLE.color20,
      height: 60,
      lineHeight: '60px',
      textAlign: 'center',
      flex: 1,
      maxWidth: '60%',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  },
  btnWrap: {
    textAlign: 'center' as const,
    paddingTop: 10,
    marginBottom: 20,

    btn: {
      marginTop: 0,
      marginBottom: 10,
      width: '100%',
      maxWidth: '100%'
    },

    btnMobile: {
      width: 'calc(100% - 40px)',
      marginTop: 0,
      marginBottom: 0,
      marginLeft: 20,
      marginRight: 20
    }
  },

  wrapLayout: {
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
    paddingBottom: 0
  },

  feedList: {},

  wrapMobileLayout: {
    paddingBottom: 20
  },

  placeholder: {
    container: combineStyle({
      MOBILE: [{}] as any,
      DESKTOP: [
        {
          paddingTop: 10
        }
      ] as any,
      GENERAL: [
        {
          paddingBottom: 10
        }
      ] as any
    }),

    productList: {
      display: 'flex',
      flexWrap: 'wrap',
      paddingTop: 20
    },

    productItem: {
      init: {
        flex: 1,
        paddingLeft: 10,
        paddingRight: 10,
        marginBottom: 20
      },
      DESKTOP: {
        minWidth: '20%',
        width: '20%'
      },
      MOBILE: {
        minWidth: '50%',
        width: '50%'
      },

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

  collection: {
    mobile: {
      margin: 0
    },

    desktop: {
      marginBottom: 20
    }
  },
  column: {
    MOBILE: { padding: 5, width: '50%', minWidth: '50%' },
    DESKTOP: { width: '20%' }
  },

  item: {
    container: combineStyle({
      MOBILE: [
        {
          marginTop: 10,
          marginRight: 10,
          marginLeft: 10
        }
      ] as any,
      DESKTOP: [{}] as any,
      GENERAL: [
        {
          display: VARIABLE.display.flex,
          position: VARIABLE.position.relative,
          boxShadow: VARIABLE.shadowBlur,
          borderRadius: 5,
          overflow: 'hidden',
          marginBottom: 20
        }
      ] as any
    }),

    icon: {
      position: VARIABLE.position.absolute,
      bottom: 0,
      right: -45,
      opacity: 0.25,
      width: 110,
      height: 110,
      color: VARIABLE.randomColorList(-1)
    },

    innerIcon: {
      height: 130
    },

    content: {
      paddingTop: 20,
      paddingRight: 20,
      paddingBottom: 20,
      paddingLeft: 20,
      display: VARIABLE.display.flex,
      alignItems: 'center',
      justifyContent: 'space-between',

      avatar: (url) => ({
        backgroundImage: `url(${url})`,
        width: 80,
        minWidth: 80,
        height: 80,
        borderRadius: 40,
        marginRight: 20,
        backgroundPosition: 'center center',
        backgroundSize: 'cover',
        backgroundColor: VARIABLE.colorE5,
        cursor: 'pointer',
        display: VARIABLE.display.block
      }),

      infoGroup: {
        display: VARIABLE.display.flex,
        flexDirection: 'column',

        intro: {
          fontSize: 15,
          color: VARIABLE.colorBlack08
        },

        name: {
          fontSize: 25,
          fontWeight: VARIABLE.fontBold,
          color: VARIABLE.colorBlack
        }
      }
    }
  }
} as any;
