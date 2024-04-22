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

  hashTagTitle: {
    container: combineStyle({
      MOBILE: [{}] as any,
      DESKTOP: [{}] as any,
      GENERAL: [
        {
          display: VARIABLE.display.flex,
          alignItems: 'center',
          paddingLeft: 20,
          paddingRight: 20
        }
      ] as any
    }),

    character: {
      display: VARIABLE.display.flex,
      alignItems: 'center',
      justifyContent: 'center',
      width: 40,
      fontSize: 40,
      marginRight: 10
    },

    content: {
      fontSize: 38
    }
  },

  screenHeading: {
    height: 50,
    lineHeight: '50px',
    fontSize: 22,
    color: VARIABLE.color20,
    fontWeight: VARIABLE.fontSemiBold
  }
} as any;
