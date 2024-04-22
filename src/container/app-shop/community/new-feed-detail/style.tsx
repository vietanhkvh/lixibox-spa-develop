import * as VARIABLE from '../../../../style/variable';
import { combineStyle } from '../../../../utils/responsive';

export default {
  container: combineStyle({
    MOBILE: [{}] as any,
    DESKTOP: [
      {
        paddingTop: 10,
        marginBottom: 20
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
    marginLeft: 10,
    marginRight: 10,
    textAlign: 'center' as const,
    paddingTop: 10,
    marginBottom: 20,

    btn: {
      marginTop: 0,
      marginBottom: 10,
      width: 200,
      maxWidth: 200
    },

    btnMobile: {
      width: '100%',
      marginTop: 0,
      marginBottom: 0,
      marginLeft: 0,
      marginRight: 0
    }
  },

  wrapLayout: {
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
    paddingBottom: 0
  },

  feedList: {
    paddingLeft: 0,
    paddingRight: 0
  },

  wrapMobileLayout: {
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
    paddingBottom: 0
  },

  placeholder: {
    paddingBottom: 10,

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

  notfoundContainer: {
    background: VARIABLE.colorWhite,
    borderRadius: 5,
    boxShadow: VARIABLE.shadowBlurSort
  }
} as any;
