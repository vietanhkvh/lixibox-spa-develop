import * as VARIABLE from '../../../../style/variable';
import { combineStyle } from '../../../../utils/responsive';

export default {
  heading: {
    fontWeight: VARIABLE.fontSemiBold,
    fontSize: 22,
    color: VARIABLE.color20,
    margin: '16px 0',
    width: '100%',
    textAlign: 'center' as const,
    textTransform: 'uppercase'
  },

  container: combineStyle({
    MOBILE: [{ display: 'block', background: VARIABLE.colorF0 }] as any,
    DESKTOP: [{ paddingTop: 20, paddingBottom: 20, display: 'flex', justifyContent: 'space-between' }] as any,
    GENERAL: [
      {
        position: 'relative',
        zIndex: VARIABLE.zIndex5
      }
    ] as any
  }),

  wrap: combineStyle({
    MOBILE: [{ display: 'block', padding: 0 }] as any,
    DESKTOP: [{}] as any,
    GENERAL: [
      {
        background: VARIABLE.colorWhite
      }
    ] as any
  }),

  list: {
    paddingTop: 10
  },

  itemWrap: {
    padding: 5
  },

  customStyleLoading: {
    height: 400
  },

  placeholder: {
    width: '100%',
    paddingTop: 20,

    title: {
      background: VARIABLE.colorF0,
      display: VARIABLE.display.block,
      width: '40%',
      height: 40,
      margin: '0 0 30px 10px'
    },

    titleMobile: {
      margin: '0 0 0 10px',
      textAlign: 'left' as const
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
      paddingTop: 20
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
      minWidth: '20%',
      width: '20%',

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

  coinInfo: {
    fixed: combineStyle({
      MOBILE: [
        {
          position: 'fixed',
          background: VARIABLE.colorWhite,
          zIndex: VARIABLE.zIndex5,
          boxShadow: '0 0 10px rgba(0, 0, 0, .14)',
          width: '100%',
          height: 50,
          padding: '10px 16px',
          left: 0,
          bottom: 0
        }
      ] as any,
      DESKTOP: [{}] as any,
      GENERAL: [{}] as any
    }),

    container: combineStyle({
      MOBILE: [{ width: '100%', height: 50, position: 'relative' }] as any,
      DESKTOP: [
        {
          maxWidth: 300,
          margin: '0 auto 30px',
          border: '1px solid #e2e3e5',
          width: '100%',
          borderRadius: 8,
          padding: '15px 20px'
        }
      ] as any,
      GENERAL: [{}] as any
    }),

    heading: combineStyle({
      MOBILE: [{ fontSize: 14 }] as any,
      DESKTOP: [
        {
          fontSize: 16
        }
      ] as any,
      GENERAL: [
        {
          lineHeight: '32px',
          padding: '0 20px'
        }
      ] as any
    }),

    content: combineStyle({
      MOBILE: [{ fontSize: 13 }] as any,
      DESKTOP: [
        {
          fontSize: 16
        }
      ] as any,
      GENERAL: [
        {
          fontWeight: VARIABLE.fontRegular,
          lineHeight: '20px',
          paddingRight: 40,
          marginBottom: 5,
          padding: 0,
          textAlign: 'justify' as const
        }
      ] as any
    }),

    lixicoinHeading: combineStyle({
      MOBILE: [
        {
          fontWeight: VARIABLE.fontLight,
          fontSize: 14,
          color: VARIABLE.color20,
          lineHeight: '30px'
        }
      ] as any,
      DESKTOP: [
        {
          fontSize: 14
        }
      ] as any,
      GENERAL: [{}] as any
    }),

    lixicoinRemaining: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    },

    lixicoinRemainingText: {
      fontWeight: VARIABLE.fontSemiBold,
      fontSize: 18,
      color: VARIABLE.color20,
      lineHeight: '30px'
    },

    redText: {
      color: VARIABLE.colorRed
    },

    link: combineStyle({
      MOBILE: [{ fontSize: 14 }] as any,
      DESKTOP: [{ fontSize: 16 }] as any,
      GENERAL: [
        {
          fontWeight: VARIABLE.fontSemiBold,
          textDecoration: 'underline',
          color: VARIABLE.color4D,

          display: 'flex',
          lineHeight: '22px',
          justifyContent: 'flex-start',
          alignItems: 'center'
        }
      ] as any
    }),

    linkIcon: {
      width: 16,
      height: 22,
      color: VARIABLE.colorBlack
    },

    innerLinkIcon: {
      width: 5
    }
  },

  messageWrap: {
    wrap: combineStyle({
      MOBILE: [{ padding: '16px 16px 0 16px' }] as any,
      DESKTOP: [{ padding: '16px 0 16px' }] as any,
      GENERAL: [{}]
    }),

    container: combineStyle({
      MOBILE: [{ padding: '12px 16px' }] as any,
      DESKTOP: [{ padding: 18 }] as any,
      GENERAL: [
        {
          zIndex: VARIABLE.zIndex5,
          background: 'rgba(254, 44, 109, .02)',
          border: '1px solid rgba(254, 44, 109, .1)',
          width: '100%',
          borderRadius: 8,
          left: 0,
          bottom: 0
        }
      ] as any
    })
  }
} as any;
