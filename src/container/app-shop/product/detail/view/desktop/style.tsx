import * as VARIABLE from '../../../../../../style/variable';
import { combineStyle } from '../../../../../../utils/responsive';

export default {
  desktop: {
    display: 'block',
    position: 'relative',
    zIndex: VARIABLE.zIndex5,

    mainCol: {
      width: '60%',
      paddingRight: 30,
      position: VARIABLE.position.relative,
      zIndex: VARIABLE.zIndex5
    },

    rightCol: {
      display: 'flex',
      flexDirection: 'column' as const,
      width: `40%`,
      paddingTop: 0,
      paddingRight: 0,
      paddingBottom: 0,
      paddingLeft: 0,

      title: combineStyle({
        MOBILE: [{ textAlign: 'center' as const }] as any,
        DESKTOP: [] as any,
        GENERAL: [
          {
            fontSize: 14,
            marginBottom: 5,
            color: VARIABLE.colorBlack05
          }
        ] as any
      }),

      brand: {
        fontSize: 16,
        fontWeight: VARIABLE.fontSemiBold,
        marginBottom: 15,
        color: VARIABLE.colorBlue
      }
    },

    fullCol: {
      width: '100%'
    },

    buttonGroup: {
      paddingTop: 10,

      button: {
        width: 'auto',
        flex: 1,

        left: {
          marginRight: 7
        },

        right: {
          marginLeft: 7
        },

        iconCart: {
          width: 18,
          height: 18,
          color: VARIABLE.colorWhite,
          position: VARIABLE.position.relative,
          top: -3
        },

        iconTime: {
          width: 18,
          height: 18,
          color: VARIABLE.colorWhite,
          position: VARIABLE.position.relative,
          marginTop: -2
        },

        iconLove: {
          width: 16,
          height: 16,
          color: VARIABLE.color4D,
          position: VARIABLE.position.relative,
          top: -1,

          liked: {
            color: VARIABLE.colorBlack
          }
        }
      },

      btnWaiting: combineStyle({
        MOBILE: [
          {
            marginBottom: 0,
            marginTop: 0,
            width: 300,
            padding: `0 20px`
          }
        ] as any,

        DESKTOP: [
          {
            flex: 1,
            marginRight: 7
          }
        ] as any,

        GENERAL: [
          {
            color: VARIABLE.color4D,
            border: `1px solid ${VARIABLE.color4D}`,
            pointerEvents: 'none'
          }
        ] as any
      })
    },

    titleSticky: {
      height: 60,
      fontSize: 22,
      fontWeight: VARIABLE.fontSemiBold,
      letterSpacing: -0.5,
      lineHeight: `60px`,
      textTransform: 'uppercase',
      color: VARIABLE.color20,
      maxWidth: `100%`,
      overflow: `hidden`,
      textOverflow: `ellipsis`,
      whiteSpace: `nowrap`,
      top: -1,
      background: VARIABLE.colorWhite,
      zIndex: VARIABLE.zIndex5,
      position: VARIABLE.position.relative,

      video: {
        marginTop: 20,
        marginBottom: 40,
        paddingTop: 0,
        paddingBottom: 0,
        paddingLeft: 0,
        paddingRight: 0,
        backgroundColor: VARIABLE.colorBlack
      },

      viewMoreGroup: {
        display: VARIABLE.display.flex,
        justifyContent: 'space-between',
        alignItems: 'center',
        position: VARIABLE.position.absolute,
        top: 0,
        right: 0,

        viewMore: {
          fontSize: 14,
          color: VARIABLE.colorBlack06,
          marginRight: 10
        },

        viewMoreIcon: {
          width: 8,
          color: VARIABLE.colorBlack06
        },

        viewMoreIconInner: {
          width: 8
        }
      },

      content: {
        container: combineStyle({
          MOBILE: [
            {
              flexDirection: 'column'
            }
          ] as any,

          DESKTOP: [
            {
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 20,
              paddingTop: 30,
              paddingLeft: 50,
              paddingRight: 50
            }
          ] as any,

          GENERAL: [
            {
              display: VARIABLE.display.flex
            }
          ] as any
        }),

        img: {
          width: 300,
          height: 'auto'
        },

        desc: {
          fontSize: 17,
          marginLeft: 60,
          textAlign: 'justify' as const,
          lineHeight: '24px'
        }
      }
    },

    containerSticky: {
      paddingTop: 20,
      paddingBottom: 20,

      testimonial: {
        marginLeft: -10,
        marginRight: -10
      }
    },

    toolbar: {
      position: VARIABLE.position.fixed,
      top: 0,
      left: 0,
      height: 70,
      backgroundColor: VARIABLE.colorWhite,
      boxShadow: VARIABLE.shadowBlurSort,
      width: '100%',
      zIndex: VARIABLE.zIndex9,
      transition: VARIABLE.transitionTransform,
      transform: `translate3D(0,-100px,0)`,
      visibility: 'hidden',
      //
      show: {
        transform: `translate3D(0,0,0)`,
        visibility: 'visible'
      },
      //
      wrap: {
        display: VARIABLE.display.flex,
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: '100%'
      },
      //
      info: {
        display: VARIABLE.display.flex,
        alignItems: 'center',
        height: '100%',
        width: '70%',
        paddingRight: 30,

        imgWrap: {
          height: '100%',
          width: 100,
          marginRight: 20,

          productImg: (url) => ({
            width: '100%',
            height: '100%',
            backgroundImage: `url(${url})`,
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          })
        },

        namePriceGroup: {
          display: VARIABLE.display.flex,
          flexDirection: 'column',

          name: {
            fontSize: 16,

            marginBottom: 8,
            lineHeight: '22px',
            maxHeight: 22,
            overflow: 'hidden'
          },

          priceGroup: {
            display: VARIABLE.display.flex,
            alignItems: 'center',

            price: {
              fontSize: 24,
              lineHeight: '24px',
              color: VARIABLE.colorBlack,

              display: VARIABLE.display.inlineBlock,
              marginRight: 20
            },

            oldPrice: {
              fontSize: 16,
              textDecoration: 'line-through'
            }
          }
        }
      },

      name: {
        marginBottom: 0,
        flex: 10
      },

      priceGroup: {
        width: 300,
        display: VARIABLE.display.flex,
        alignItems: 'center',
        justifyContent: 'space-between',

        price: {}
      },
      //
      btnGroup: {
        width: '30%'
      }
    }
  },

  shopTheLook: {
    footer: {
      container: combineStyle({
        MOBILE: [
          {
            flexDirection: 'column'
          }
        ] as any,

        DESKTOP: [
          {
            paddingTop: 40,
            paddingBottom: 40,
            paddingRight: 40,
            paddingLeft: 40,
            marginBottom: 20
          }
        ] as any,

        GENERAL: [
          {
            display: VARIABLE.display.flex,
            alignItems: 'center',
            backgroundColor: '#181818'
          }
        ] as any
      }),

      logo: combineStyle({
        MOBILE: [
          {
            width: '100%',
            height: 'auto',
            paddingTop: 20,
            paddingLeft: 20,
            paddingRight: 20,
            paddingBottom: 10
          }
        ] as any,

        DESKTOP: [
          {
            width: 350,
            marginRight: 40
          }
        ] as any,

        GENERAL: [{}] as any
      }),

      desc: combineStyle({
        MOBILE: [
          {
            fontSize: 16,
            textAlign: 'justify' as const,
            paddingTop: 10,
            paddingRight: 20,
            paddingLeft: 20,
            paddingBottom: 15
          }
        ] as any,

        DESKTOP: [
          {
            fontSize: 18,
            textAlign: 'justify' as const
          }
        ] as any,

        GENERAL: [
          {
            color: VARIABLE.colorWhite
          }
        ] as any
      })
    }
  }
} as any;
