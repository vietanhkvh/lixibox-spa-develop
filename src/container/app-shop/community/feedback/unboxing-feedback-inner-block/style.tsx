import * as VARIABLE from '../../../../../style/variable';
import { combineStyle } from '../../../../../utils/responsive';

export default {
  container: combineStyle({
    MOBILE: [{ paddingBottom: 50 }] as any,
    DESKTOP: [
      {
        borderRadius: 4,
        overflow: 'hidden',
        marginBottom: 20
      }
    ] as any,
    GENERAL: [
      {
        background: VARIABLE.colorWhite,
        position: 'relative',
        zIndex: VARIABLE.zIndex1
      }
    ] as any
  }),

  editContainer: combineStyle({
    MOBILE: [{}] as any,
    DESKTOP: [{ zIndex: VARIABLE.zIndexMax }] as any,
    GENERAL: [
      {
        position: 'relative',
        padding: 16
      }
    ] as any
  }),

  submitButtonGroup: {
    position: 'relative',
    zIndex: VARIABLE.zIndex9,

    fixed: combineStyle({
      MOBILE: [{ position: 'fixed', padding: 16, boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.08)', height: 70 }] as any,
      DESKTOP: [{ paddingTop: 16 }] as any,
      GENERAL: [
        {
          background: VARIABLE.colorWhite,
          width: '100%',
          bottom: 0,
          left: 0
        }
      ] as any
    })
  },

  socialList: {
    display: 'flex',
    paddingLeft: 48,
    paddingBottom: 30,
    opacity: 0.65,

    facebookIcon: {
      color: VARIABLE.colorBlack,
      width: 36,
      height: 36,
      borderRadius: 7,
      marginRight: 15,
      border: `2px solid  ${VARIABLE.colorBlack}`,
      boxShadow: `0 0 0 0.5px ${VARIABLE.colorBlack}`
    },
    innerFacebookIcon: {
      width: 12
    },

    instagramIcon: {
      color: VARIABLE.colorBlack,
      width: 36,
      height: 36
    },
    innerInstagramIcon: {
      width: 36
    }
  },

  sharingForm: {
    container: combineStyle({
      MOBILE: [
        {
          display: 'block',
          paddingBottom: 30,
          maxWidth: 480
        }
      ] as any,
      DESKTOP: [
        {
          display: 'flex',
          flexDirection: 'column',
          padding: 10,
          width: '100%'
        }
      ] as any,
      GENERAL: [{}] as any
    }),

    input: {
      padding: '16px 16px',
      background: VARIABLE.colorF5,
      borderRadius: 8,
      width: '100%',
      height: 100,
      border: 'none',
      boxShadow: 'none',
      outline: 'none',
      marginBottom: 10
    },

    innerInput: {
      background: VARIABLE.colorF7,
      border: `1px solid ${VARIABLE.colorF0}`,
      height: 40
    },

    button: combineStyle({
      MOBILE: [
        {
          marginTop: 10
        }
      ] as any,
      DESKTOP: [{}] as any,
      GENERAL: [
        {
          width: '100%',
          marginTop: 0,
          marginBottom: 0
        }
      ] as any
    }),

    buttonIcon: {
      color: VARIABLE.colorWhite
    }
  },

  unboxingUser: {
    container: {
      display: 'flex',
      marginBottom: 10
    },

    img: {
      width: 32,
      height: 32,
      borderRadius: '50%',
      marginRight: 10
    },

    name: {
      fontWeight: VARIABLE.fontSemiBold,
      fontSize: 14,
      lineHeight: '32px',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      color: VARIABLE.color20,
      whiteSpace: 'nowrap'
    }
  }
} as any;
