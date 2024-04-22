import * as VARIABLE from '../../../style/variable';
import { combineStyle } from '../../../utils/responsive';

export default {
  headerWrap: {
    marginBottom: 20,

    imgWrap: {
      display: VARIABLE.display.block,
      height: 'auto',
      marginTop: 50,
      marginBottom: 20,
      width: 'calc(100%)',
      position: VARIABLE.position.relative,
      borderRadius: 8,
      marginLeft: 0
    },

    viewGroup: {
      container: combineStyle({
        MOBILE: [{ paddingLeft: 10, paddingRight: 10 }] as any,
        DESKTOP: [{}] as any,

        GENERAL: [
          {
            display: VARIABLE.display.flex,
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 10
          }
        ] as any
      }),

      iconWrap: {
        display: VARIABLE.display.flex,

        icon: {
          marginLeft: 10,
          width: 20,
          height: 20,
          color: VARIABLE.colorBlack
        },

        iconEmail: {
          marginLeft: 10,
          width: 30,
          height: 20,
          color: VARIABLE.colorBlack
        }
      }
    },

    blogSubInfo: {
      paddingLeft: 0,
      paddingRight: 0,
      maxWidth: 800,
      margin: '0 auto 20px',
      display: VARIABLE.display.flex,
      flexWrap: 'wrap',
      justifyContent: 'center',

      sub: {
        paddingLeft: 0,
        paddingRight: 0,
        maxWidth: 800,
        display: VARIABLE.display.flex,
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 0
      },

      icon: {
        width: 20,
        height: 20,
        marginRight: 5,
        color: VARIABLE.color8A
      },

      text: {
        height: 30,
        lineHeight: '30px',
        display: VARIABLE.display.block,
        fontSize: 16,
        color: VARIABLE.color8A,
        fontWeight: VARIABLE.fontLight,
        marginRight: 20
      },

      line: {
        width: 50,
        height: 1,
        background: 'rgba(0,0,0,.35)',
        margin: '0 auto',
        borderRadius: 2
      }
    },

    blogTitle: {
      display: VARIABLE.display.block,
      width: '100%',
      maxWidth: 800,
      margin: '0 auto',
      textAlign: 'center' as const,
      fontSize: 36,
      fontWeight: VARIABLE.fontSemiBold,
      lineHeight: '42px',
      padding: '10px 40px 30px'
    },

    desc: combineStyle({
      MOBILE: [{ paddingLeft: 10, paddingRight: 10, fontSize: 18 }] as any,
      DESKTOP: [
        {
          fontSize: 18,
          lineHeight: '30px',
          maxWidth: 800,
          fontWeight: VARIABLE.fontLight,
          color: VARIABLE.color20,
          margin: '0 auto 30px'
        }
      ] as any,

      GENERAL: [
        {
          fontStyle: 'italic',
          color: VARIABLE.colorBlack,
          textAlign: 'justify' as const
        }
      ] as any
    })
  },

  contentWrap: combineStyle({
    MOBILE: [{ padding: '0 20px' }] as any,
    DESKTOP: [{ maxWidth: 800, margin: '0 auto' }] as any,
    GENERAL: [{ position: 'relative', zIndex: VARIABLE.zIndex5 }] as any
  }),

  tagWrap: {
    container: {
      paddingLeft: 0,
      paddingRight: 0,
      maxWidth: 800,
      margin: '0 auto 20px'
    },

    header: {
      height: 30,
      lineHeight: '30px',

      display: VARIABLE.display.block,
      fontSize: 20,
      color: VARIABLE.colorBlack08,
      marginRight: 20
    },

    tag: {
      display: VARIABLE.display.block,
      marginBottom: 10,
      marginRight: 10,
      borderRadius: 4,
      background: VARIABLE.colorF0,
      color: VARIABLE.colorBlack,
      fontSize: 14,
      lineHeight: '30px',
      paddingLeft: 10,
      paddingRight: 10
    }
  },

  customStyleLoading: {
    height: 80
  },

  placeholder: {
    width: '100%',
    paddingTop: 20,

    mainImg: {
      width: 1130,
      height: 635,
      marginBottom: 20
    },

    mainImgMobile: {
      width: '100%',
      height: 240,
      marginBottom: 20
    },

    iconGroup: {
      display: VARIABLE.display.flex,
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 10,

      dateGroup: {
        height: 20,
        width: '20%'
      },

      socialGroup: {
        height: 20,
        width: '20%'
      }
    },

    title: {
      width: '100%',
      height: 70,
      marginBottom: 20
    },

    content: {
      height: 30,
      width: '100%',
      marginBottom: 10
    }
  },

  mobile: {
    coverImage: {
      width: '100%',
      height: 'auto',
      display: VARIABLE.display.block
    },

    coverInfo: {
      position: 'relative',
      margin: '-24px 16px 16px',
      borderRadius: 8,
      padding: '16px 20px 20px',
      background: VARIABLE.colorWhite,
      boxShadow: '0 2px 15px rgba(0 ,0, 0, 0.14)',

      category: {
        fontWeight: VARIABLE.fontBold,
        fontSize: 11,
        color: VARIABLE.colorPrimary,
        textTransform: 'uppercase',
        lineHeight: '22px',
        marginBottom: 5
      },

      blurImage: {
        position: VARIABLE.position.absolute,
        width: '100%',
        height: '100%',
        backgroundSize: 'cover',
        backgroundPosition: 'bottom center',
        opacity: 0.5,
        transform: `scaleY(-1)`
      },

      info: {
        display: 'flex',
        justifyContent: 'space-between'
      },

      title: {
        fontWeight: VARIABLE.fontSemiBold,
        fontSize: 20,
        color: VARIABLE.color20,
        lineHeight: '26px',
        marginBottom: 10
      },

      date: {
        display: 'flex',
        fontWeight: VARIABLE.fontLight,
        fontSize: 13,
        color: VARIABLE.color8A,
        lineHeight: '20px'
      }
    },

    tagWrap: {
      container: {
        paddingLeft: 20,
        paddingRight: 20,
        marginBottom: 20
      },

      header: {
        height: 30,
        lineHeight: '30px',
        display: VARIABLE.display.block,
        fontSize: 14,
        fontWeight: VARIABLE.fontSemiBold,
        color: VARIABLE.color20,
        marginRight: 20
      },

      list: {
        display: 'flex',
        flexWrap: 'wrap'
      },

      tag: {
        display: VARIABLE.display.block,
        marginBottom: 10,
        marginRight: 10,
        borderRadius: 4,
        background: VARIABLE.colorF5,
        color: VARIABLE.color20,
        fontWeight: VARIABLE.fontLight,
        fontSize: 14,
        lineHeight: '30px',
        height: 30,
        paddingLeft: 15,
        paddingRight: 15
      }
    }
  }
} as any;
