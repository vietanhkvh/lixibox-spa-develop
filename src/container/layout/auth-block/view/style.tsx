import * as LAYOUT from 'style/layout';
import * as VARIABLE from 'style/variable';
import { combineStyle } from 'utils/responsive';
import { CDN_ASSETS_PREFIX } from 'utils/uri';
const mobileImage = CDN_ASSETS_PREFIX('/login/desktop-signin.png');
const mobileAuthBg = CDN_ASSETS_PREFIX('/login/mobile-auth.png');

export default {
  container: combineStyle({
    MOBILE: [{ flexDirection: 'column' }] as any,
    DESKTOP: [
      { flexDirection: 'row', boxShadow: '0 0 4px rgba(0, 0, 0, .1)', borderRadius: 8, overflow: 'hidden' }
    ] as any,

    GENERAL: [
      {
        display: 'flex',
        justifyContent: 'space-between',
        maxWidth: 780,
        background: VARIABLE.colorWhite,
        transition: VARIABLE.transitionNormal
      }
    ] as any
  }),

  leftContent: {
    flex: 5,
    position: 'relative',
    overflow: 'hidden',
    background: VARIABLE.colorWhite,
    zIndex: VARIABLE.zIndex9,
    borderRight: `1px solid ${VARIABLE.colorE5}`,

    backdrop: {
      backgroundImage: `url(${mobileImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'left top',
      position: VARIABLE.position.absolute,
      width: '100%',
      height: '100%',
      top: 0,
      left: 0,
      opacity: 0.3
    },

    topInfo: {
      marginBottom: 20,

      heading: {
        color: VARIABLE.color20,
        fontWeight: VARIABLE.fontSemiBold,
        fontSize: 30,
        lineHeight: '36px',
        marginBottom: 10,
        position: 'relative'
      },

      textDescription: {
        color: VARIABLE.color20,
        fontWeight: VARIABLE.fontSemiBold,
        fontSize: 14,
        marginBottom: 20,
        lineHeight: '20px'
      }
    },

    bottomInfo: {},

    facebookLogin: {
      width: '100%',
      textAlign: 'center' as const,
      fontSize: 14,
      marginBottom: 20,

      icon: {
        display: 'inline-block',
        width: 36,
        height: 36,
        verticalAlign: 'middle'
      }
    },

    spacer: {
      width: 150,
      height: 1,
      background: VARIABLE.colorE5,
      marginTop: 30,
      marginRight: 'auto',
      marginBottom: 30,
      marginLeft: 'auto'
    },

    promotion: {
      padding: '30px 20px 0',

      avatarWrap: {
        display: VARIABLE.display.flex,
        alignItems: 'center',
        justifyContent: 'center'
      },

      avatar: (url = '') => {
        return {
          backgroundImage: `url(${url})`,
          backgroundSize: 'contain',
          backgroundPosition: 'center center',
          backgroundColor: VARIABLE.colorE5,
          width: 70,
          height: 70,
          borderRadius: '50%',
          marginBottom: 10,
          boxShadow: VARIABLE.shadowBlurSort
        };
      },

      title: {
        fontSize: 18,

        marginBottom: 10,
        textAlign: 'center' as const
      },

      note: {
        fontSize: 14,
        textAlign: 'justify' as const
      }
    }
  },

  relatedLink: {
    width: '100%',
    textAlign: 'center' as const,

    text: {
      color: VARIABLE.color2E,
      fontSize: 14,
      lineHeight: '20px'
    },

    link: {
      textDecoretion: 'underline',
      color: VARIABLE.color4D,
      fontSize: 14,
      lineHeight: '20px',
      cursor: 'pointer',
      marginLeft: 5,
      marginRight: 5
    }
  },

  rightContent: {
    flex: 5,
    position: 'relative',

    orSpacer: combineStyle({
      MOBILE: [{ display: VARIABLE.display.none }] as any,
      DESKTOP: [{ display: VARIABLE.display.block }] as any,

      GENERAL: [
        {
          position: VARIABLE.position.absolute,
          width: 34,
          height: 34,
          lineHeight: '34px',
          textAlign: 'center' as const,
          borderRadius: '50%',
          boxShadow: VARIABLE.shadowBlurSort,
          zIndex: VARIABLE.zIndex9,
          top: '50%',
          left: 0,
          transform: 'translate(-50%, -50%)',
          background: VARIABLE.colorWhite,
          fontSize: 12,
          color: VARIABLE.colorBlack
        }
      ] as any
    })
  },

  innerContent: Object.assign({}, LAYOUT.flexContainer.justify, LAYOUT.flexContainer.verticalFlex, {
    position: 'relative',
    zIndex: VARIABLE.zIndex5,
    padding: '40px 50px 40px',
    height: '100%'
  }),

  innerContentRight: Object.assign({}, LAYOUT.flexContainer.justify, LAYOUT.flexContainer.verticalFlex, {
    position: 'relative',
    zIndex: VARIABLE.zIndex5,
    padding: '60px 50px 40px',
    height: '100%'
  }),

  errorMessage: {
    color: VARIABLE.colorRed,
    fontSize: 13,
    lineHeight: '18px',
    paddingTop: 5,
    paddingBottom: 5,
    textAlign: 'center' as const,
    overflow: VARIABLE.visible.hidden,
    transition: VARIABLE.transitionNormal
  },

  mobile: {
    container: {
      backgroundImage: `url("${mobileAuthBg}")`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minWidth: '100%',
      display: VARIABLE.display.flex,
      flexDirection: 'column',
      justifyContent: 'space-between',
      minHeight: '100vh',
      top: 0,
      left: 0,
      bottom: 0,
      overflowX: 'hidden',
      overflowY: 'auto'
    },

    mainContainer: { flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' },

    top: {
      width: '100%',
      position: VARIABLE.position.absolute,
      top: 0,
      zIndex: VARIABLE.zIndex5,
      marginBottom: 30,

      overlay: {
        position: VARIABLE.position.absolute,
        zIndex: VARIABLE.zIndex1,
        background: VARIABLE.colorBlack,
        opacity: 0.6,
        top: 0,
        left: 0,
        width: '100%',
        height: '100%'
      },

      iconList: {
        width: '100%',
        paddingTop: 5,
        paddingRight: 5,
        paddingBottom: 5,
        paddingLeft: 5,
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: 35
      },

      link: combineStyle({
        MOBILE: [{ color: VARIABLE.colorWhite, cursor: 'pointer' }] as any,
        DESKTOP: [{ color: VARIABLE.color20 }] as any,

        GENERAL: [
          {
            height: 44,
            lineHeight: '44px',
            zIndex: VARIABLE.zIndex5,
            display: 'flex',

            fontSize: 15
          }
        ] as any
      }),

      icon: {
        width: 44,
        height: 44,
        color: VARIABLE.colorWhite,
        position: VARIABLE.position.relative,
        zIndex: VARIABLE.zIndex5
      },

      innerIcon: {
        height: 20
      },

      logo: {
        width: 80,
        height: 80,
        color: VARIABLE.colorBlack,
        borderRadius: '50%',
        position: VARIABLE.position.absolute,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
      },

      innerLogo: {
        width: 70
      },

      gap: {
        position: VARIABLE.position.relative,
        top: 20,
        zIndex: VARIABLE.zIndex5,
        backgroundSize: '100% 100%',
        width: '100%',
        height: 40,
        borderTop: `50% solid ${VARIABLE.colorWhite}`,
        borderLeft: `50% solid ${VARIABLE.colorWhite}`,
        borderRight: `50% solid ${VARIABLE.colorTransparent}`,
        borderBottom: `50% solid ${VARIABLE.colorTransparent}`,
        filter: `drop-shadow(-4px -4px 2px rgba(0,0,0,.1))`
      },

      title: {
        fontSize: 16
      }
    },

    main: {
      padding: '10px 35px',
      maxWidth: 400,
      width: '100%',
      margin: '0 auto'
    },

    fbButtonHeading: {
      fontWeight: VARIABLE.fontLight,
      fontSize: 14,
      color: VARIABLE.colorF5,
      width: '100%',
      textAlign: 'center' as const,
      height: 40,
      lineHeight: '40px',
      marginTop: 10,
      marginBottom: 10
    },

    fbButton: {
      paddingTop: 10,
      paddingLeft: 35,
      paddingRight: 35,
      maxWidth: 400,
      width: '100%',
      margin: '0 auto'
    }
  }
} as any;
