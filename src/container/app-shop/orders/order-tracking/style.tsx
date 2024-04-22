import * as VARIABLE from '../../../../style/variable';
import { combineStyle } from '../../../../utils/responsive';
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
  opacity: 0,

  show: {
    visibility: VARIABLE.visible.visible,
    transform: 'translateX(0)',
    opacity: 1
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
        color: VARIABLE.color4D,

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
    container: combineStyle({
      MOBILE: [{ height: 150, padding: '10px 50px', marginBottom: 20 }] as any,
      DESKTOP: [{ height: 300, padding: 20, marginBottom: 40 }] as any,

      GENERAL: [
        {
          backgroundImage: `url(${INFO_BACKGROUND})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: VARIABLE.display.flex,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center' as const,
          maxHeight: 300
        }
      ] as any
    }),

    search: {
      container: combineStyle({
        MOBILE: [{ width: '100%' }] as any,
        DESKTOP: [{ width: 600, maxWidth: 600 }] as any,

        GENERAL: [
          {
            flex: 10,
            height: 40,
            maxHeight: 40,
            marginBottom: 10,
            boxShadow: VARIABLE.shadowBlurSort,
            position: VARIABLE.position.relative,
            background: VARIABLE.colorWhite
          }
        ] as any
      }),

      input: {
        flex: 10,
        fontSize: 14,
        color: VARIABLE.color4D,
        paddingLeft: 15,
        border: 'none',
        background: VARIABLE.colorTransparent
      },

      button: {
        flex: 1,
        width: 70,
        height: 40,
        maxWidth: 70,
        minWidth: 70,
        color: VARIABLE.colorWhite,
        lineHeight: '40px',
        fontSize: 16,
        cursor: 'pointer',
        transition: VARIABLE.transitionColor,
        background: VARIABLE.colorPink,

        inner: {
          width: 17,
          color: VARIABLE.colorWhite
        },

        disable: {
          opacity: 0.7
        }
      }
    },

    textInfo: {
      color: VARIABLE.colorBlack08,
      fontSize: 25,
      lineHeight: '25px',
      textShadow: '0 2px 5px #FFF, 0 2px 10px #FFF, 0 0px 15px #FFF, 0 0px 15px #FFF',
      marginBottom: 20
    }
  },

  contentContainer: combineStyle({
    MOBILE: [{ margin: '0 10px' }] as any,
    DESKTOP: [{}] as any,
    GENERAL: [{}] as any
  }),

  infoParent: {
    container: combineStyle({
      MOBILE: [{ margin: '0px 0px 10px 0px' }] as any,
      DESKTOP: [{ margin: 20 }] as any,

      GENERAL: [
        {
          boxShadow: VARIABLE.shadowBlurSort,
          paddingTop: 20,
          paddingLeft: 10,
          paddingRight: 10
        }
      ] as any
    }),

    infoContainer: {
      container: combineStyle({
        MOBILE: [{ marginBottom: 0 }] as any,
        DESKTOP: [{ marginBottom: 30, paddingBottom: 10 }] as any,
        GENERAL: [{ textAlign: 'center' as const }] as any
      }),

      title: {
        fontSize: 16,
        color: VARIABLE.colorBlack08,
        marginBottom: 10
      },

      name: {
        fontSize: 18,
        color: VARIABLE.colorBlack08,

        success: {
          color: VARIABLE.colorGreen
        },

        wait: {
          color: VARIABLE.colorYellow
        },

        cancel: {
          color: VARIABLE.colorRed
        }
      },

      status: combineStyle({
        MOBILE: [{ display: VARIABLE.display.block }] as any,
        DESKTOP: [{}] as any,

        GENERAL: [
          {
            fontSize: 18,
            color: VARIABLE.colorRed,

            textTransform: 'uppercase'
          }
        ] as any
      }),

      txtNotFound: { fontSize: 20, textAlign: 'center' as const }
    }
  },

  processWrap: {
    container: combineStyle({
      MOBILE: [
        {
          flexDirection: 'column',
          paddingLeft: 10,
          paddingRight: 10,
          paddingTop: 10,
          paddingBottom: 10
        }
      ] as any,
      DESKTOP: [
        {
          flexDirection: 'row',
          paddingLeft: 20,
          paddingRight: 20,
          paddingTop: 20,
          paddingBottom: 20
        }
      ] as any,
      GENERAL: [
        {
          display: VARIABLE.display.flex,
          justifyContent: 'space-between',
          position: VARIABLE.position.relative
        }
      ] as any
    }),

    processGroup: {
      container: combineStyle({
        MOBILE: [
          {
            flexDirection: 'row',
            width: '100%',
            height: '100px',
            paddingLeft: 0,
            paddingRight: 0,
            paddingTop: 0,
            paddingBottom: 0
          }
        ] as any,
        DESKTOP: [
          {
            flexDirection: 'column',
            width: '25%',
            paddingLeft: 10,
            paddingRight: 10,
            paddingTop: 10,
            paddingBottom: 10
          }
        ] as any,
        GENERAL: [
          {
            display: VARIABLE.display.flex,
            alignItems: 'center',
            position: VARIABLE.position.relative
          }
        ] as any
      }),

      iconGroup: {
        container: combineStyle({
          MOBILE: [
            {
              paddingLeft: 0,
              paddingRight: 0,
              paddingTop: 0,
              paddingBottom: 0,
              borderWidth: 2,
              height: 40,
              width: 40,
              marginRight: 10
            }
          ] as any,

          DESKTOP: [
            {
              paddingLeft: 10,
              paddingRight: 10,
              paddingTop: 10,
              paddingBottom: 10,
              borderWidth: 3,
              height: 64,
              width: 64,
              marginRight: 0
            }
          ] as any,

          GENERAL: [
            {
              borderStyle: 'solid',
              borderColor: VARIABLE.colorBlack06,
              borderRadius: '50%',
              backgroundColor: VARIABLE.colorWhite,
              display: VARIABLE.display.flex,
              alignItems: 'center',
              justifyContent: 'center',
              position: VARIABLE.position.relative,
              zIndex: VARIABLE.zIndex1
            }
          ] as any
        }),

        success: {
          borderColor: VARIABLE.colorGreen
        },

        icon: combineStyle({
          MOBILE: [{ width: 20, height: 20 }] as any,
          DESKTOP: [{ width: 40, height: 40 }] as any,
          GENERAL: [{ color: VARIABLE.colorBlack06 }] as any
        }),

        innerIcon: {
          width: 30,
          height: 30
        },

        innerTransportIcon: {
          width: 40,
          height: 40
        }
      },

      title: {
        container: combineStyle({
          MOBILE: [{ fontSize: 14, paddingTop: 0 }] as any,
          DESKTOP: [{ fontSize: 18, paddingTop: 20 }] as any,
          GENERAL: [
            {
              color: VARIABLE.colorBlack08,
              textAlign: 'center' as const,
              fontWeight: VARIABLE.fontBold,
              textTransform: 'uppercase'
            }
          ] as any
        }),

        link: { cursor: 'pointer' }
      },

      line: ({ isLeft, isSuccess = false }) =>
        combineStyle({
          MOBILE: [
            { height: 2, width: 100, top: '100%', transform: 'rotate(90deg)' },
            isLeft ? { left: -30 } : { right: '50%' }
          ] as any,
          DESKTOP: [{ height: 3, width: '100%', top: 42 }, isLeft ? { left: '50%' } : { right: '50%' }] as any,

          GENERAL: [
            {
              position: VARIABLE.position.absolute,
              backgroundColor: true === isSuccess ? VARIABLE.colorGreen : VARIABLE.colorBlack06,
              zIndex: VARIABLE.zIndexMin
            }
          ] as any
        })
    }
  },

  txtNotFound: {
    textAlign: 'center' as const,
    width: '100%',
    fontSize: 25
  },

  momo: {
    container: combineStyle({
      MOBILE: [{ margin: '10px 0px' }] as any,
      DESKTOP: [{ margin: '10px 20px' }] as any,

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
