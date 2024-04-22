import * as VARIABLE from '../../../../../style/variable';
import { combineStyle } from '../../../../../utils/responsive';
import { CDN_ASSETS_PREFIX } from '../../../../../utils/uri';
const DONE_BG_IMAGE = CDN_ASSETS_PREFIX('/checkout/done.jpg');
const INVITE_BG_IMAGE = CDN_ASSETS_PREFIX('/checkout/invite.jpg');

export default {
  container: combineStyle({
    MOBILE: [{ paddingTop: 0 }] as any,
    DESKTOP: [{ paddingTop: 10 }] as any,
    GENERAL: [{ display: VARIABLE.display.block }] as any
  }),

  successListBlock: {
    container: combineStyle({
      MOBILE: [{ paddingTop: 10 }] as any,
      DESKTOP: [{ paddingTop: 30 }] as any,
      GENERAL: [{ flex: 6 }] as any
    }),

    loginGroup: {
      padding: 20
    },

    center: {
      width: '100%',
      textAlign: 'center' as const
    },

    txtInvite: {
      text: {
        fontSize: 14,
        lineHeight: '22px',

        textAlign: 'center' as const,
        width: '100%',
        paddingLeft: 20,
        paddingRight: 20,
        maxWidth: 450,
        color: VARIABLE.color4D
      },

      heading: combineStyle({
        MOBILE: [{ fontSize: 24 }] as any,
        DESKTOP: [{ fontSize: 34 }] as any,
        GENERAL: [
          {
            fontWeight: VARIABLE.fontBold,
            lineHeight: '44px',
            width: '100%',
            textAlign: 'center' as const,
            marginBottom: 20
          }
        ] as any
      }),

      bolder: {
        fontSize: 18
      },

      note: {
        color: VARIABLE.colorRed,
        fontSize: 18
      }
    },

    shareContainer: {
      container: combineStyle({
        MOBILE: [{ flexDirection: 'column', padding: 10 }] as any,
        DESKTOP: [{ flexDirection: 'row', padding: 20 }] as any,
        GENERAL: [
          {
            display: VARIABLE.display.flex,
            marginBottom: 10,
            alignItems: 'center'
          }
        ] as any
      }),

      txt: combineStyle({
        MOBILE: [{ marginBottom: 10 }] as any,
        DESKTOP: [{ marginBottom: 0 }] as any,
        GENERAL: [
          {
            fontSize: 14,
            lineHeight: '22px',

            textAlign: 'center' as const,
            color: VARIABLE.color4D,
            width: 100
          }
        ] as any
      }),

      input: combineStyle({
        MOBILE: [{ marginRight: 0, marginBottom: 10, width: '100%' }] as any,
        DESKTOP: [{ marginRight: 10, marginBottom: 0 }] as any,
        GENERAL: [
          {
            height: 40,
            flex: 10,
            borderRadius: 3,
            border: `1px solid ${VARIABLE.colorD2}`,
            paddingLeft: 10
          }
        ] as any
      }),

      btnShare: combineStyle({
        MOBILE: [{ width: '100%' }] as any,
        DESKTOP: [{ width: 100 }] as any,
        GENERAL: [{ margin: 0 }] as any
      })
    },

    btnGroup: {
      container: combineStyle({
        MOBILE: [{ padding: 10 }] as any,
        DESKTOP: [{ padding: 20 }] as any,
        GENERAL: [{}] as any
      }),

      btnEmail: {
        width: '100%',
        background: VARIABLE.colorF0,
        color: VARIABLE.colorBlack
      },

      btnFacebook: {
        width: '100%',
        marginBottom: 10,
        background: VARIABLE.colorSocial.facebook
      }
    }
  },

  successTable: {
    container: combineStyle({
      MOBILE: [{ marginBottom: 10, marginLeft: 10, marginRight: 10 }] as any,
      DESKTOP: [{ marginBottom: 30, marginLeft: 0, marginRight: 0 }] as any,
      GENERAL: [
        {
          borderTop: `1px solid ${VARIABLE.colorD2}`,
          borderLeft: `1px solid ${VARIABLE.colorD2}`,
          borderRight: `1px solid ${VARIABLE.colorD2}`,
          borderRadius: 3,
          width: 'calc(100% - 20px)',
          maxWidth: 370,
          background: VARIABLE.colorWhite
        }
      ] as any
    }),

    row: {
      borderBottom: `1px solid ${VARIABLE.colorD2}`,
      lineHeight: '20px',
      fontSize: 14,
      paddingLeft: 10,
      paddingRight: 10,
      paddingTop: 7,
      paddingBottom: 7,
      display: VARIABLE.display.flex,

      title: {
        color: VARIABLE.color75,
        width: 80
      },

      data: {
        flex: 10,
        paddingLeft: 20
      },

      infoTransferBank: {
        border: 'none',
        cursor: 'pointer'
      },

      icon: {
        width: 20,
        height: 20,
        color: VARIABLE.colorBlack08,
        cursor: 'pointer'
      },

      innerIcon: {
        width: 13
      },

      textCopy: {
        marginRight: 5,
        color: VARIABLE.colorBlack07
      },

      phone: {
        color: VARIABLE.colorRed
      }
    }
  },

  blockContainer: (withImage: boolean, contain: boolean) =>
    combineStyle({
      MOBILE: [{ marginTop: 10, marginLeft: 10, marginRight: 10, marginBottom: 10 }] as any,
      DESKTOP: [{ marginTop: 0, marginLeft: 0, marginRight: 0, marginBottom: 20 }] as any,
      GENERAL: [
        {
          display: VARIABLE.display.flex,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          backgroundImage: `url(${withImage ? DONE_BG_IMAGE : ''})`,
          backgroundSize: contain ? 'contain' : 'cover',
          borderRadius: 3,
          boxShadow: VARIABLE.shadowBlurSort
        }
      ] as any
    }),

  inviteBlock: combineStyle({
    MOBILE: [
      {
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
        display: VARIABLE.display.block
      }
    ] as any,
    DESKTOP: [
      {
        marginTop: 0,
        marginLeft: 0,
        marginRight: 0,
        marginBottom: 20,
        display: VARIABLE.display.flex
      }
    ] as any,
    GENERAL: [
      {
        borderRadius: 3,
        boxShadow: VARIABLE.shadowBlurSort,
        background: VARIABLE.colorWhite
      }
    ] as any
  }),

  footerOrder: {
    panel: combineStyle({
      MOBILE: [{ flexDirection: 'column', padding: 10, background: VARIABLE.colorWhite }] as any,
      DESKTOP: [{ flexDirection: 'row', padding: 20 }] as any,
      GENERAL: [{ display: VARIABLE.display.flex }] as any
    }),

    container: {
      textAlign: 'justify' as const,
      display: VARIABLE.display.flex,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',

      txtInfo: {
        fontSize: 14,
        lineHeight: '22px',

        textAlign: 'center' as const,
        maxWidth: 400,
        color: VARIABLE.color4D
      }
    }
  },

  thankyouHeading: {
    icon: {
      width: 88,
      height: 88,
      color: VARIABLE.colorBlack
    },

    innerIcon: {
      width: 60
    },

    messsage: combineStyle({
      MOBILE: [{ fontSize: 24 }] as any,
      DESKTOP: [{ fontSize: 34 }] as any,
      GENERAL: [
        {
          fontWeight: VARIABLE.fontBold,
          lineHeight: '44px',
          width: '100%',
          textAlign: 'center' as const,
          marginBottom: 30
        }
      ] as any
    })
  },

  inviteBackground: combineStyle({
    MOBILE: [{ backgroundPosition: 'center right', paddingTop: '40%' }] as any,
    DESKTOP: [{ backgroundPosition: 'top right', paddingTop: 0 }] as any,
    GENERAL: [
      {
        flex: 4,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundImage: `url(${INVITE_BG_IMAGE})`
      }
    ] as any
  }),

  paymentInfo: {
    width: '100%',
    maxWidth: 370,

    container: combineStyle({
      MOBILE: [{ width: 'calc(100% - 20px)' }] as any,
      DESKTOP: [{ width: '100%' }] as any,
      GENERAL: [{ marginBottom: 10 }] as any
    }),

    title: {
      textAlign: 'center' as const,
      fontSize: 15,
      marginBottom: 10
    },

    text: combineStyle({
      MOBILE: [{ paddingLeft: 10, paddingRight: 10 }] as any,
      DESKTOP: [{}] as any,
      GENERAL: [
        {
          fontSize: 13,
          marginBottom: 20,
          textAlign: 'justify' as const
        }
      ] as any
    }),

    bankTransferText: {
      color: VARIABLE.colorPink
    }
  },

  momo: {
    container: combineStyle({
      MOBILE: [{ margin: 10 }] as any,
      DESKTOP: [{ margin: '10px 0' }] as any,
      GENERAL: [
        {
          padding: 30,

          background: VARIABLE.colorWhite,
          boxShadow: VARIABLE.shadowBlur
        }
      ] as any
    }),

    icon: {
      width: 100,
      height: 100,
      margin: '0 auto 30px',
      marginBottom: 20
    },

    innerIcon: {
      width: 100
    },

    text: {
      width: '100%',
      maxWidth: 300,
      textAlign: 'center' as const,
      fontSize: 14,
      lineHeight: '20px',
      margin: '0 auto 10px',

      bold: {
        color: VARIABLE.colorSocial.momo,

        fontSize: 16
      }
    },

    button: {
      display: 'block',
      maxWidth: 300,
      margin: '0 auto'
    }
  }
} as any;
