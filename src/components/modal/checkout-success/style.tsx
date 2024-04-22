import * as VARIABLE from '../../../style/variable';
import { combineStyle } from '../../../utils/responsive';
import { CDN_ASSETS_PREFIX } from '../../../utils/uri';
const DONE_BG_IMAGE = CDN_ASSETS_PREFIX('/checkout/done.jpg');

export default {
  container: combineStyle({
    MOBILE: [{}] as any,
    DESKTOP: [{}] as any,
    GENERAL: [{ display: VARIABLE.display.block }] as any
  }),

  successTable: {
    container: combineStyle({
      MOBILE: [{ marginBottom: 10, marginLeft: 10, marginRight: 10 }] as any,
      DESKTOP: [{ marginBottom: 20, marginLeft: 0, marginRight: 0 }] as any,
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
      MOBILE: [{}] as any,
      DESKTOP: [{}] as any,
      GENERAL: [
        {
          display: VARIABLE.display.flex,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          backgroundImage: `url(${withImage ? DONE_BG_IMAGE : ''})`,
          backgroundSize: contain ? 'contain' : 'cover'
        }
      ] as any
    }),

  footerOrder: {
    panel: combineStyle({
      MOBILE: [{ flexDirection: 'column', padding: 10 }] as any,
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

  detailBtn: {
    width: '100%',

    btn: {
      width: 150,
      maxWidth: 150,
      paddingTop: 10,
      paddingBottom: 10,
      border: `1px solid ${VARIABLE.colorBlack01}`,
      borderRadius: 5,
      margin: '0 auto',
      marginBottom: 20,
      boxShadow: VARIABLE.shadowBlur,
      fontSize: 14,

      textAlign: 'center' as const,
      cursor: 'pointer'
    }
  }
} as any;
