import * as VARIABLE from '../../../../style/variable';
import { combineStyle, isMobileVersion } from '../../../../utils/responsive';
import { CDN_ASSETS_PREFIX } from '../../../../utils/uri';
const INFO_BACKGROUND = CDN_ASSETS_PREFIX('/info/cover.png');

export default {
  display: 'block',
  position: VARIABLE.position.fixed,
  background: VARIABLE.colorBlack04,
  width: '100vw',
  height: '100vh',
  visibility: VARIABLE.visible.hidden,
  top: 0,
  left: 0,
  zIndex: VARIABLE.zIndexMax,
  overflow: 'auto',
  transition: VARIABLE.transitionNormal,
  transform: 'translateX(-100%)',

  show: {
    visibility: VARIABLE.visible.visible,
    transform: 'translateX(0)'
  },

  menu: {
    paddingRight: 0,
    paddingLeft: 0,
    flex: 10,
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',

    heading: {
      display: VARIABLE.display.flex,
      background: VARIABLE.colorBlack005,
      height: 50,
      minHeight: 50,
      maxHeight: 50,

      logoGroup: {
        display: VARIABLE.display.flex,

        logo: {
          height: 50,

          line: {
            width: 50,
            height: 50,
            color: VARIABLE.colorWhite,
            marginLeft: 10,
            marginRight: 10,

            inner: {
              width: 30
            }
          },

          text: {
            width: 120,
            height: 50,
            color: VARIABLE.colorWhite,

            inner: {
              width: 120
            }
          }
        }
      },

      closePanel: {
        top: 0,
        right: 0,
        color: VARIABLE.colorWhite,
        width: 50,
        height: 50,

        inner: {
          width: 16
        }
      }
    },

    item: {
      display: VARIABLE.display.flex,
      alignItems: 'center',
      height: 50,

      icon: {
        width: 50,
        height: 50,
        color: VARIABLE.colorWhite,
        marginLeft: 10,
        marginRight: 10,

        inner: {
          width: 18
        }
      },

      text: {
        display: VARIABLE.display.flex,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        fontSize: 18,
        color: VARIABLE.colorWhite
      },

      title: {
        lineHeight: '50px',
        fontSize: 15,
        color: VARIABLE.colorWhite,
        flex: 10,
        paddingLeft: 30
      },

      sub: {
        flex: 10,

        iconSub: {
          container: (isOpenMenuSub: boolean) => ({
            width: 50,
            height: 50,
            color: VARIABLE.colorWhite,
            transition: VARIABLE.transitionNormal,
            transform: `rotate(${isOpenMenuSub ? -180 : 0}deg)`
          }),

          inner: {
            width: 18,
            height: 18
          }
        }
      },

      subContainer: {
        paddingLeft: 0,
        paddingRight: 0,
        paddingTop: 0,
        paddingBottom: 0,
        boxShadow: VARIABLE.shadowInsetMiddle,
        backgroundColor: VARIABLE.colorBlack01,
        transition: VARIABLE.transitionNormal,
        overflow: 'hidden',

        item: {
          display: VARIABLE.display.block,
          paddingLeft: 70,
          height: 40,
          lineHeight: '40px',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          fontSize: 16,
          color: VARIABLE.colorWhite08
        }
      }
    },

    contentGroup: {
      display: VARIABLE.display.block,
      overflowY: 'auto',
      paddingTop: 20,
      paddingBottom: 20,

      content: {
        paddingBottom: 20,
        borderBottom: `1px solid ${VARIABLE.colorWhite03}`
      },

      about: {
        paddingTop: 20
      }
    }
  },

  searchWrap: {
    overlay: {
      background: VARIABLE.colorBlack,
      opacity: 0.2,
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%'
    },

    heading: combineStyle({
      MOBILE: [
        {
          fontSize: 16,
          lineHeight: '22px'
        }
      ] as any,

      DESKTOP: [
        {
          fontSize: 32,
          lineHeight: '40px'
        }
      ] as any,

      GENERAL: [
        {
          position: 'relative',
          fontWeight: VARIABLE.fontRegular,

          color: VARIABLE.colorWhite,
          textAlign: 'center' as const,
          marginBottom: 10
        }
      ] as any
    }),

    container: combineStyle({
      MOBILE: [
        {
          height: 150,
          padding: '10px 32px',
          marginBottom: 0
        }
      ] as any,

      DESKTOP: [
        {
          height: 300,
          padding: 20
        }
      ] as any,

      GENERAL: [
        {
          backgroundImage: `url(${INFO_BACKGROUND})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: VARIABLE.display.flex,
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          maxHeight: 300,
          textAlign: 'center' as const,
          position: 'relative'
        }
      ] as any
    }),

    search: {
      container: combineStyle({
        MOBILE: [
          {
            width: '100%',
            height: 40,
            maxHeight: 40
          }
        ] as any,

        DESKTOP: [
          {
            width: 600,
            maxWidth: 600,
            height: 40,
            maxHeight: 40
          }
        ] as any,

        GENERAL: [
          {
            flex: 10,
            marginBottom: 10,
            boxShadow: VARIABLE.shadowBlurSort,
            position: VARIABLE.position.relative
          }
        ] as any
      }),

      input: combineStyle({
        MOBILE: [
          {
            height: 40,
            lineHeight: '40px',
            borderRadius: '8px 0 0 8px'
          }
        ] as any,

        DESKTOP: [
          {
            fontSize: 14,
            paddingLeft: 15,
            borderRadius: '8px 0 0 8px'
          }
        ] as any,

        GENERAL: [
          {
            flex: 10,
            fontSize: 14,
            padding: '0 16px',
            fontWeight: VARIABLE.fontLight,
            color: VARIABLE.color4D,
            border: 'none',
            background: VARIABLE.colorWhite
          }
        ] as any
      }),

      button: combineStyle({
        MOBILE: [
          {
            height: 40,
            width: 50,
            maxWidth: 50,
            minWidth: 50
          }
        ] as any,

        DESKTOP: [
          {
            height: 40,
            width: 70,
            maxWidth: 70,
            minWidth: 70
          }
        ] as any,

        GENERAL: [
          {
            borderRadius: '0 8px 8px 0',
            flex: 1,
            color: VARIABLE.color20,
            lineHeight: '40px',
            fontSize: 16,
            cursor: 'pointer',
            transition: VARIABLE.transitionColor,
            background: VARIABLE.colorWhite,
            borderLeft: `1px solid ${VARIABLE.colorD2}`
          }
        ] as any
      }),

      inner: {
        width: 17
      },

      suggestionSearch: {
        text: {
          display: VARIABLE.display.block,
          color: VARIABLE.colorBlack06,
          fontSize: 13,
          lineHeight: '40px',
          height: 40,
          cursor: 'pointer',
          borderBottom: `1px solid #eee`,
          padding: '0 10px'
        }
      },

      showSuggestionSearch: {
        display: VARIABLE.display.block,
        transition: VARIABLE.transitionNormal
      }
    },

    textInfo: {
      color: VARIABLE.colorWhite,
      fontSize: 16,
      lineHeight: '30px',
      marginBottom: 30,
      position: 'relative'
    }
  },

  infoContainer: {
    textAlign: 'center' as const,
    display: VARIABLE.display.flex,
    justifyContent: 'center',
    alignItems: 'center',

    infoGroup: {
      container: combineStyle({
        MOBILE: [
          {
            width: '100%',
            maxWidth: '100%',
            padding: '32px 32px 10px'
          }
        ] as any,

        DESKTOP: [
          {
            flexDirection: 'row',
            width: 595,
            maxWidth: 595,
            paddingLeft: 0,
            paddingRight: 0,
            paddingTop: 40,
            paddingBottom: 40
          }
        ] as any,

        GENERAL: [
          {
            display: VARIABLE.display.flex,
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap'
          }
        ] as any
      }),

      info: {
        container: (isWithoutMargin) =>
          combineStyle({
            MOBILE: [{ padding: '8px', width: '50%', marginBottom: 10 }] as any,
            DESKTOP: [{ padding: 20, width: 'calc(50% - 10px)', marginBottom: 20 }] as any,

            GENERAL: [
              {
                borderRadius: 8,
                cursor: 'pointer',
                alignItems: 'center',
                flexDirection: 'column',
                display: VARIABLE.display.flex,
                justifyContent: 'space-between',
                background: VARIABLE.colorWhite,
                transition: VARIABLE.transitionNormal
              }
            ] as any
          }),

        icon: {
          flex: 1,
          width: 60,
          height: 60,
          maxWidth: 60,
          minWidth: 60,
          backgroundColor: 'transparent',
          color: VARIABLE.color4D,
          lineHeight: '60px',
          fontSize: 16,
          marginBottom: 10,
          transition: VARIABLE.transitionColor,

          inner: {
            width: 32
          }
        },

        txtTitle: {
          fontSize: 14,
          fontWeight: VARIABLE.fontSemiBold,
          color: VARIABLE.color20,
          marginBottom: 5,
          ...(isMobileVersion() ? { textDecoration: 'underline' } : {}),
          textWrap: 'nowrap'
        },

        txt: {
          fontSize: 13,
          fontWeight: VARIABLE.fontLight,
          paddingLeft: 16,
          paddingRight: 16,
          color: VARIABLE.color4D
        }
      }
    }
  },

  txtNotFound: {
    textAlign: 'center' as const,
    width: '100%',
    fontSize: 25
  }
} as any;
