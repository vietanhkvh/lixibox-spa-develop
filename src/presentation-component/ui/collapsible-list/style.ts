import * as VARIABLE from 'style/variable';
import { combineStyle } from 'utils/responsive';

export default {
  header: {
    container: combineStyle({
      MOBILE: [{ padding: 20 }] as any,

      DESKTOP: [
        {
          padding: 40
        }
      ] as any,

      GENERAL: [
        {
          backgroundSize: 'cover',
          backgroundPosition: 'top left',
          position: 'relative',

          background: VARIABLE.colorWhite,
          boxShadow: VARIABLE.shadowBlur
        }
      ] as any
    }),

    cover: {
      width: '100%',
      height: '100%',
      position: 'absolute',
      opacity: 0.075,
      top: 0,
      left: 0
    },

    link: {
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      justifyContent: 'center'
    },

    messageIcon: {
      width: 110,
      height: 70,
      color: VARIABLE.colorBlack
    },

    messageInnerIcon: combineStyle({
      MOBILE: [{ width: 65 }] as any,

      DESKTOP: [{ width: 75 }] as any,

      GENERAL: [{}] as any
    }),

    content: {
      paddingRight: 20,
      display: 'flex',
      position: 'relative',
      justifyContent: 'center',
      alignItems: 'center'
    },

    info: {},

    title: combineStyle({
      MOBILE: [{ fontSize: 18, lineHeight: '24px' }] as any,

      DESKTOP: [
        {
          fontSize: 22,
          lineHeight: '32px'
        }
      ] as any,

      GENERAL: [
        {
          color: VARIABLE.colorBlack,
          marginBottom: 2
        }
      ] as any
    }),

    description: combineStyle({
      MOBILE: [{ fontSize: 13, lineHeight: '20px', maxWidth: 160 }] as any,

      DESKTOP: [{ fontSize: 16, lineHeight: '24px', maxWidth: 190 }] as any,

      GENERAL: [
        {
          color: VARIABLE.colorBlack
        }
      ] as any
    })
  },

  faq: {
    container: combineStyle({
      MOBILE: [{ marginBottom: 10 }] as any,

      DESKTOP: [{}] as any,

      GENERAL: [
        {
          overflow: 'hidden',
          maxWidth: '100%',
          width: '100%'
        }
      ] as any
    }),

    item: {
      background: VARIABLE.colorWhite,

      header: {
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        transition: VARIABLE.transitionBackground,

        open: {
          borderBottom: `none`
        }
      },

      headerWithSeparator: {
        borderBottom: `1px solid ${VARIABLE.colorE5}`
      },

      title: combineStyle({
        MOBILE: [{ fontSize: 14 }] as any,

        DESKTOP: [{ fontSize: 16 }] as any,

        GENERAL: [
          {
            color: VARIABLE.color20,
            fontWeight: VARIABLE.fontSemiBold,
            padding: '20px 20px 20px 0',
            lineHeight: '20px'
          }
        ] as any
      }),

      contentItem: combineStyle({
        MOBILE: [{ fontSize: 14 }] as any,

        DESKTOP: [{ fontSize: 14 }] as any,

        GENERAL: [
          {
            color: VARIABLE.color20,
            fontWeight: VARIABLE.fontLight,
            marginBottom: 10,
            lineHeight: '20px'
          }
        ] as any
      }),

      contentLinkItem: combineStyle({
        MOBILE: [{ fontSize: 13 }] as any,

        DESKTOP: [{ fontSize: 14 }] as any,

        GENERAL: [
          {
            textDecoration: 'underline',
            color: VARIABLE.color4D,
            marginBottom: 10,
            lineHeight: '20px'
          }
        ] as any
      }),

      content: combineStyle({
        MOBILE: [{ padding: '0 20px 10px 20px' }] as any,

        DESKTOP: [{ padding: '0 70px 10px 20px' }] as any,

        GENERAL: [
          {
            textAlign: 'justify' as const,
            color: VARIABLE.color75,
            display: 'none'
          }
        ] as any
      }),

      contentWithSeparator: {
        borderBottom: `1px solid ${VARIABLE.colorE5}`
      },

      openContent: {
        display: 'block'
      },

      icon: {
        width: 70,
        minWidth: 70,
        height: 60,
        color: VARIABLE.color75,
        transition: VARIABLE.transitionTransform,
        transform: 'rotate(0deg)'
      },

      openIcon: {
        transform: 'rotate(-180deg)'
      },

      innerIcon: {
        width: 16
      }
    }
  }
} as any;
