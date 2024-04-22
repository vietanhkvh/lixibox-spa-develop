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

    item: {
      marginBottom: 20,
      borderRadius: 3,
      border: `1px solid ${VARIABLE.colorF0}`,
      background: VARIABLE.colorWhite,
      padding: 10,

      top: {
        display: VARIABLE.display.flex,
        paddingTop: 5,
        marginBottom: 10,

        avatar: {
          width: 50,
          height: 50,
          borderRadius: '50%',
          marginRight: 10
        },

        info: { flex: 10 },

        username: {
          width: 180,
          height: 20,
          marginBottom: 10,
          borderRadius: 2
        },

        star: {
          width: 100,
          height: 20,
          marginBottom: 10,
          borderRadius: 2
        }
      },

      bottom: {
        firstText: {
          width: '72%',
          height: 20,
          marginBottom: 10,
          borderRadius: 2
        },

        text: {
          width: '65%',
          height: 20,
          marginBottom: 10,
          borderRadius: 2
        },

        lastText: {
          width: '40%',
          height: 20,
          borderRadius: 2
        }
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
  },

  emptyMessage: {
    borderRadius: 4,
    padding: 20
  }
} as any;
