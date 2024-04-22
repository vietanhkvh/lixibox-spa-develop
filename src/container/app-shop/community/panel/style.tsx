import * as VARIABLE from '../../../../style/variable';
import { CDN_ASSETS_PREFIX } from '../../../../utils/uri';
import { combineStyle } from '../../../../utils/responsive';

const bannerImage = CDN_ASSETS_PREFIX('/community/banner.jpg');

export default {
  wrap: combineStyle({
    MOBILE: [{ background: VARIABLE.colorWhite }] as any,

    DESKTOP: [{ background: VARIABLE.colorF5 }] as any,

    GENERAL: [
      {
        display: VARIABLE.display.block,
        borderBottom: `1px solid ${VARIABLE.colorE5}`
      }
    ] as any
  }),

  mobileWrap: {
    display: VARIABLE.display.block,
    background: VARIABLE.colorWhite
  },

  container: {
    paddingTop: 20,
    minHeight: `calc(100vh - 200px)`
  },

  leftSideBarBlock: {
    marginTop: 30,
    paddingRight: 10
  },

  mainNavigation: {
    icon: {
      width: 50,
      height: 44,
      color: VARIABLE.color20
    },

    customOuterIcon: {
      youtube: {
        color: VARIABLE.colorRed
      }
    },

    innerIcon: {
      width: 20
    },

    customIcon: {
      'color-community': {},
      'color-unboxing': {
        width: 18,
        marginLeft: -1
      },
      'color-star': {
        width: 24
      },

      youtube: {
        width: 22,
        color: VARIABLE.colorRed
      }
    }
  },

  userNavigation: {
    lineBreak: {
      width: '100%',
      height: 1,
      background: VARIABLE.colorD2,
      margin: '30px 0'
    },

    subNavActive: {
      backgroundColor: VARIABLE.colorWhite,
      borderRadius: 8
    },

    subNav: {
      height: 44,
      paddingLeft: 2,
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      cursor: 'pointer',

      inner: {
        height: 44,
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        cursor: 'pointer',
        transition: VARIABLE.transitionBackground,
        border: `1px solid ${VARIABLE.colorTransparent}`
      },

      icon: {
        width: 44,
        height: 44,
        color: VARIABLE.colorBlack
      },

      innerIcon: {
        width: 14
      },

      customeIcon: {
        'star-line': {
          width: 16
        }
      },

      image: {
        minWidth: 20,
        width: 20,
        height: 20,
        backgroundColor: VARIABLE.colorD2,
        backgroundSize: 'cover',
        borderRadius: '50%',
        marginLeft: 10,
        marginRight: 10
      },

      title: {
        fontSize: 16,
        color: VARIABLE.color20,
        fontWeight: VARIABLE.fontSemiBold,
        lineHeight: '40px',
        overflow: 'hidden',
        height: 40,
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        paddingRight: 40
      }
    }
  },

  contentWrap: {
    paddingTop: 20,

    title: {
      fontSize: 25,
      textAlign: 'center' as const
    },

    content: {
      textAlign: 'justify' as const,

      textMain: {
        fontSize: 20,
        margin: '20px 0'
      },

      text: {
        fontSize: 15,
        lineHeight: '21px'
      }
    }
  },

  bannerImage: {
    backgroundImage: `url(${bannerImage})`,
    backgroundColor: VARIABLE.colorF0,
    backgroundRepeat: 'no-reapeat',
    backgroundSize: 'cover',
    backgroundPositionX: 'center',
    backgroundPositionY: 'center',
    width: '100%',
    paddingTop: '20%',
    marginBottom: 20,
    position: VARIABLE.position.relative,

    wrapTitle: {
      position: VARIABLE.position.absolute,
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      display: VARIABLE.display.flex,
      flexDirection: 'column',
      alignItems: 'center',

      largeTitle: {
        fontSize: 44,
        whiteSpace: 'nowrap',

        fontWeight: VARIABLE.fontBold,
        letterSpacing: 5,

        textShadow: `5px 3px ${VARIABLE.colorCC}`
      },

      title: {
        fontSize: 16,
        borderRadius: 50,
        padding: '10px 20px',
        background: VARIABLE.colorBlack05,
        color: VARIABLE.colorWhite,
        fontWeight: VARIABLE.fontBold,
        height: 35,
        display: VARIABLE.display.flex,
        alignItems: 'center',
        justifyContent: 'center'
      }
    }
  },

  category: {
    display: 'flex',

    height: 44,
    lineHeight: '44px',
    paddingLeft: 2,
    fontSize: 16,
    color: VARIABLE.color20,
    fontWeight: VARIABLE.fontSemiBold,
    letterSpacing: 1,

    active: {
      color: VARIABLE.colorBlack,
      backgroundColor: VARIABLE.colorWhite,
      borderRadius: 8,
      position: 'relative',
      zIndex: VARIABLE.zIndex5
    }
  },

  userCover: {
    container: combineStyle({
      MOBILE: [{}] as any,

      DESKTOP: [{}] as any,

      GENERAL: [
        {
          width: '100%',
          position: 'relative',
          overflow: 'hidden',
          zIndex: VARIABLE.zIndex1
        }
      ] as any
    }),

    outerBg: combineStyle({
      MOBILE: [
        {
          height: 130
        }
      ] as any,

      DESKTOP: [
        {
          height: '100%'
        }
      ] as any,

      GENERAL: [
        {
          position: 'absolute',
          width: '100%',

          top: 0,
          left: 0,
          overflow: 'hidden'
        }
      ] as any
    }),

    blurBackground: combineStyle({
      MOBILE: [
        {
          height: 130
        }
      ] as any,

      DESKTOP: [
        {
          height: '90%',
          opacity: 0.75
        }
      ] as any,

      GENERAL: [
        {
          position: 'absolute',
          width: '100%',

          top: 0,
          left: 0,
          zIndex: VARIABLE.zIndex1,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(20px)',
          transform: 'scale(1.2)'
        }
      ] as any
    }),

    gradientOverlay: combineStyle({
      MOBILE: [
        {
          height: '100%',
          top: 0
        }
      ] as any,

      DESKTOP: [
        {
          height: 'calc(100% + 60px)',
          top: -50
        }
      ] as any,

      GENERAL: [
        {
          background: 'linear-gradient(to bottom, rgba(255,255,255,0) 0%,rgb(245, 246, 246) 100%)',
          filter: `progid:DXImageTransform.Microsoft.gradient( startColorstr='#00ffffff', endColorstr='#ffffff',GradientType=0 )`,
          position: 'absolute',
          width: '100%',
          left: 0,
          opacity: 1,
          zIndex: VARIABLE.zIndex5
        }
      ] as any
    }),

    infoGroup: combineStyle({
      MOBILE: [{}] as any,

      DESKTOP: [
        {
          display: 'flex',
          maxWidth: 580
        }
      ] as any,

      GENERAL: [
        {
          position: 'relative',
          zIndex: VARIABLE.zIndex9
        }
      ] as any
    }),

    info: {
      container: combineStyle({
        MOBILE: [{}] as any,

        DESKTOP: [
          {
            display: 'block',
            flex: 1,
            paddingTop: 50,
            paddingLeft: 40,
            paddingBottom: 40
          }
        ] as any,

        GENERAL: [
          {
            position: 'relative',
            zIndex: VARIABLE.zIndex9
          }
        ] as any
      }),

      heading: combineStyle({
        MOBILE: [
          {
            display: 'none'
          }
        ] as any,

        DESKTOP: [
          {
            fontSize: 12
          }
        ] as any,

        GENERAL: [{}] as any
      }),

      name: combineStyle({
        MOBILE: [
          {
            textAlign: 'center' as const,
            fontSize: 18,

            lineHeight: '22px',
            padding: '0 50px'
          }
        ] as any,

        DESKTOP: [
          {
            textAlign: 'left' as const,
            fontSize: 30,
            lineHeight: '38px'
          }
        ] as any,

        GENERAL: [
          {
            color: VARIABLE.color20,
            fontWeight: VARIABLE.fontSemiBold,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }
        ] as any
      })
    },

    avatar: {
      container: combineStyle({
        MOBILE: [{ padding: '60px 0 13px' }] as any,

        DESKTOP: [
          {
            width: 150,
            paddingTop: 50,
            paddingLeft: 20
          }
        ] as any,

        GENERAL: [{}] as any
      }),
      image: combineStyle({
        MOBILE: [
          {
            width: 120,
            boxShadow: '0 3px 8px rgba(0, 0, 0, .05), 0 0px 6px rgba(0, 0, 0, .1)'
          }
        ] as any,

        DESKTOP: [
          {
            width: 130
          }
        ] as any,

        GENERAL: [
          {
            display: 'block',
            borderRadius: '50%',
            margin: '0 auto 0'
          }
        ] as any
      })
    },

    infoItem: {
      container: combineStyle({
        MOBILE: [
          {
            width: 90,
            padding: '0 5px'
          }
        ] as any,

        DESKTOP: [
          {
            width: 80
          }
        ] as any,

        GENERAL: [
          {
            position: 'relative',
            zIndex: VARIABLE.zIndex5
          }
        ] as any
      }),

      withBorder: {
        borderRight: `1px solid ${VARIABLE.colorA2}`
      },

      title: {
        fontSize: 18,
        fontWeight: VARIABLE.fontSemiBold,
        lineHeight: '30px',
        height: 30,
        width: '100%',
        textAlign: 'center' as const,
        color: VARIABLE.color20
      },

      text: {
        fontSize: 14,
        fontWeight: VARIABLE.fontRegular,
        lineHeight: '20px',
        height: 20,
        width: '100%',
        textAlign: 'center' as const,
        color: VARIABLE.color20
      },

      line: {
        width: 1,
        height: 50,
        background: VARIABLE.colorC6
      }
    },

    bigInfoItem: {
      container: {
        display: 'flex',
        flexDirection: 'column',
        padding: '0 15px',
        position: 'relative',
        zIndex: VARIABLE.zIndex5,
        justifyContent: 'center',
        alignItems: 'center'
      },

      icon: {
        width: 40,
        height: 40,
        color: VARIABLE.color4D
      },

      innerIcon: {
        width: 30
      },

      customIcon: {
        edit: {
          width: 14
        },
        gift: {
          width: 14
        },
        'star-line': {
          width: 16
        },
        like: {
          width: 24
        },
        message: {
          width: 24
        }
      },

      text: {
        fontSize: 13,
        lineHeight: '32px',
        height: 30,
        color: VARIABLE.color4D
      }
    },

    infoProvince: {
      container: combineStyle({
        MOBILE: [
          {
            display: 'flex',
            witth: '100%',
            justifyContent: 'center',
            alignItems: 'center'
          }
        ] as any,

        DESKTOP: [
          {
            display: 'flex',
            marginBottom: 2
          }
        ] as any,

        GENERAL: [{}] as any
      }),

      info: combineStyle({
        MOBILE: [
          {
            color: VARIABLE.color8A
          }
        ] as any,

        DESKTOP: [
          {
            color: VARIABLE.color20
          }
        ] as any,

        GENERAL: [
          {
            display: 'flex',

            whiteSpace: 'nowrap',
            lineHeight: '30px',
            fontSize: 14,
            fontWeight: VARIABLE.fontRegular
          }
        ] as any
      })
    },

    infoStat: {
      container: combineStyle({
        MOBILE: [
          {
            display: 'flex',
            justifyContent: 'center',
            padding: '14px 0 20px'
          }
        ] as any,

        DESKTOP: [
          {
            display: 'flex',
            justifyContent: 'flex-start',
            padding: '10px 0 20px'
          }
        ] as any,

        GENERAL: [{}] as any
      }),

      feed: combineStyle({
        MOBILE: [
          {
            display: 'flex',
            justifyContent: 'center',
            margin: '10px auto',
            padding: `0 10px`
          }
        ] as any,

        DESKTOP: [
          {
            display: 'flex',
            justifyContent: 'flex-start',
            margin: '5px 0 5px -7px'
          }
        ] as any,

        GENERAL: [{}] as any
      })
    },

    placeholder: {
      container: combineStyle({
        MOBILE: [
          {
            opacity: 0.7,
            width: '100%',
            height: 375,
            maringBottom: 20,
            paddingTop: 50
          }
        ] as any,

        DESKTOP: [
          {
            width: '100%',
            height: 333,
            paddingTop: 100,
            paddingLeft: 60,
            display: 'flex'
          }
        ] as any,

        GENERAL: [{}] as any
      }),

      avatar: combineStyle({
        MOBILE: [
          {
            width: 120,
            height: 120,
            marginBottom: 20,
            margin: '0 auto 30px'
          }
        ] as any,

        DESKTOP: [
          {
            width: 140,
            height: 140,
            marginRight: 100
          }
        ] as any,

        GENERAL: [
          {
            display: 'block',
            borderRadius: '50%'
          }
        ] as any
      }),

      info: combineStyle({
        MOBILE: [{}] as any,

        DESKTOP: [
          {
            flex: 1
          }
        ] as any,

        GENERAL: [{}] as any
      }),

      name: combineStyle({
        MOBILE: [
          {
            width: 250,
            height: 50,
            margin: '0 auto 30px'
          }
        ] as any,

        DESKTOP: [
          {
            width: 250,
            height: 50,
            margin: '0 0 30px'
          }
        ] as any,

        GENERAL: [
          {
            borderRadius: 10
          }
        ] as any
      }),

      text: combineStyle({
        MOBILE: [
          {
            width: 120,
            height: 25,
            margin: '0 auto 10px'
          }
        ] as any,

        DESKTOP: [
          {
            width: 120,
            height: 25,
            margin: '0 0 10px'
          }
        ] as any,

        GENERAL: [{}] as any
      })
    }
  },

  level: {
    display: 'inline-block',
    height: 18,
    width: 'auto',
    margin: '0 auto',

    outer: combineStyle({
      MOBILE: [
        {
          display: 'block',
          textAlign: 'center' as const
        }
      ] as any,

      DESKTOP: [
        {
          display: 'block',
          textAlign: 'left' as const
        }
      ] as any,

      GENERAL: [{}] as any
    }),

    img: {
      display: 'block',
      height: 18,
      width: 'auto'
    }
  }
} as any;
