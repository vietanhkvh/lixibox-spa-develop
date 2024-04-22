import * as VARIABLE from '../../../../style/variable';
import { combineStyle } from '../../../../utils/responsive';

export default {
  container: {
    background: VARIABLE.colorF0
  },

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

  wrap: combineStyle({
    MOBILE: [{}] as any,

    DESKTOP: [
      {
        display: 'flex',
        padding: 20,
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: 20
      }
    ] as any,

    GENERAL: [{ position: 'relative' }] as any
  }),

  sidebar: {
    container: combineStyle({
      MOBILE: [{ width: '100%' }] as any,

      DESKTOP: [{ width: 400 }] as any,

      GENERAL: [{}] as any
    }),

    buttonLinkPanel: {
      background: VARIABLE.colorF5,
      padding: '10px 16px'
    },

    buttonLink: {
      borderRadius: 5,
      fontSize: 16,
      height: 44,
      margin: 0,
      lineHeight: '44px',
      paddingRight: 10,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',

      cursor: 'pointer',
      textTransform: 'uppercase'
    },

    giftIcon: {
      width: 16,
      marginBottom: 3,
      marginRight: 8,
      color: VARIABLE.colorBlack
    },

    block: combineStyle({
      MOBILE: [{}] as any,

      DESKTOP: [{ marginBottom: 20 }] as any,

      GENERAL: [
        {
          background: VARIABLE.colorWhite
        }
      ] as any
    }),

    heading: combineStyle({
      MOBILE: [{ padding: '0 20px' }] as any,

      DESKTOP: [
        {
          padding: '0 20px'
        }
      ] as any,

      GENERAL: [
        {
          height: 50,
          display: 'flex',
          justifyContent: 'space-between',
          borderBottom: `1px solid ${VARIABLE.colorF0}`
        }
      ] as any
    }),

    title: combineStyle({
      MOBILE: [{ fontSize: 14 }] as any,

      DESKTOP: [
        {
          fontSize: 16
        }
      ] as any,

      GENERAL: [
        {
          lineHeight: '50px',
          paddingRight: 10,

          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }
      ] as any
    }),

    content: {
      width: '100%',
      padding: 20
    },

    levelList: {
      display: 'flex',
      overflow: 'hidden'
    },

    levelItem: {
      flex: 1,
      padding: '15px 0',
      background: VARIABLE.colorF5,
      borderRadius: 4,
      marginLeft: 3,
      marginRight: 3
    },

    itemWidthBorder: {},

    levelBoldTitle: {
      fontSize: 14,
      fontWeight: VARIABLE.fontBold,
      textAlign: 'center' as const,
      marginBottom: 10
    },

    levelTitle: {
      fontSize: 12,
      fontWeight: VARIABLE.fontRegular,
      textAlign: 'center' as const,
      marginBottom: 10
    },

    levelImage: {
      display: 'block',
      height: 15,
      width: 'auto',
      margin: '0 auto'
    },

    text: combineStyle({
      MOBILE: [{ fontSize: 13 }] as any,

      DESKTOP: [{ fontSize: 14 }] as any,

      GENERAL: [
        {
          fontWeight: VARIABLE.fontRegular,
          color: VARIABLE.color20,
          marginBottom: 16,
          lineHeight: '20px',
          textAlign: 'center' as const
        }
      ] as any
    }),

    boldText: combineStyle({
      MOBILE: [{ fontSize: 16 }] as any,

      DESKTOP: [{ fontSize: 18 }] as any,

      GENERAL: [
        {
          fontWeight: VARIABLE.fontBold,
          color: VARIABLE.color20,
          marginBottom: 10,
          lineHeight: '20px',
          textAlign: 'center' as const
        }
      ] as any
    })
  },

  main: combineStyle({
    MOBILE: [{}] as any,

    DESKTOP: [
      {
        // width: `calc(100% - 420px)`
      }
    ] as any,

    GENERAL: [{}] as any
  }),

  faq: {
    container: combineStyle({
      MOBILE: [{ marginBottom: 10 }] as any,

      DESKTOP: [
        {
          marginBottom: 20
        }
      ] as any,

      GENERAL: [
        {
          background: VARIABLE.colorWhite,
          overflow: 'hidden',
          maxWidth: '100%',
          width: '100%'
        }
      ] as any
    }),

    item: {
      header: {
        cursor: 'pointer',
        borderBottom: `1px solid ${VARIABLE.colorE5}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        transition: VARIABLE.transitionBackground,

        open: {
          borderBottom: `none`
        }
      },

      title: combineStyle({
        MOBILE: [{ fontSize: 14 }] as any,

        DESKTOP: [{ fontSize: 16 }] as any,

        GENERAL: [
          {
            color: VARIABLE.color20,
            fontWeight: VARIABLE.fontSemiBold,
            padding: '20px 20px ',
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
            display: 'none',
            borderBottom: `1px solid ${VARIABLE.colorE5}`
          }
        ] as any
      }),

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
  },

  backToInfo: {
    container: {
      boxShadow: VARIABLE.shadowBlur,
      background: VARIABLE.colorWhite,
      borderRadius: 5,
      padding: 17
    },

    link: {
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      justifyContent: 'center'
    },

    messageIcon: {
      width: 90,
      height: 70,
      color: VARIABLE.colorBlack
    },

    messageInnerIcon: {
      width: 50
    },

    content: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },

    title: combineStyle({
      MOBILE: [{ fontSize: 14, lineHeight: '22px' }] as any,

      DESKTOP: [
        {
          fontSize: 16,
          lineHeight: '24px'
        }
      ] as any,

      GENERAL: [
        {
          color: VARIABLE.colorBlack,
          marginBottom: 2
        }
      ] as any
    }),

    description: {
      maxWidth: 160,

      fontSize: 13,
      lineHeight: '20px',
      color: VARIABLE.colorBlack
    },

    angleIcon: {
      width: 50,
      height: 50,
      color: VARIABLE.color75
    },

    innerAngleIcon: {
      width: 9
    }
  }
} as any;
