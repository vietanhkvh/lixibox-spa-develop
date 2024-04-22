import * as VARIABLE from '../../../style/variable';
import { combineStyle } from '../../../utils/responsive';

export default {
  title: {
    height: 50,
    fontSize: 30,
    textTransform: `uppercase`,
    display: VARIABLE.display.flex,
    alignItems: `center`,
    justifyContent: `center`,
    letterSpacing: -0.5,
    lineHeight: `50px`,
    maxWidth: `100%`,
    overflow: `hidden`,
    textOverflow: `ellipsis`,
    whiteSpace: `nowrap`,
    top: 0,
    background: VARIABLE.colorWhite,
    zIndex: VARIABLE.zIndex9
  },

  productInfo: {
    container: combineStyle({
      MOBILE: [
        {
          padding: '10px 16px 0'
        }
      ] as any,

      DESKTOP: [{ marginBottom: 20 }] as any,

      GENERAL: [{}] as any
    }),

    desc: {
      fontSize: 14,
      lineHeight: `24px`,
      overflow: `hidden`,
      fontWeight: VARIABLE.fontLight,
      color: VARIABLE.color20,
      textAlign: `justify`,
      marginBottom: 20
    },

    img: (url = '') => ({
      backgroundImage: `url(${url})`,
      backgroundRepeat: `no-repeat`,
      backgroundSize: `contain`,
      backgroundPosition: `center`,
      width: `100%`,
      paddingTop: `30%`,
      position: VARIABLE.position.relative,
      cursor: `pointer`
    }),

    gradient: {
      position: VARIABLE.position.absolute,
      bottom: 0,
      left: 0,
      width: `100%`,
      height: `100%`
    },

    txtViewMore: {
      position: VARIABLE.position.absolute,
      left: `50%`,
      bottom: 10,
      transform: `translateX(-50%)`,
      color: VARIABLE.colorBlack07,

      display: VARIABLE.display.flex,
      flexDirection: `column`,
      alignItems: `center`,
      fontSize: 20
    },

    icon: {
      width: 20,
      height: 20,
      color: VARIABLE.colorBlack07
    },

    innerIcon: {
      width: 20
    },

    infoTitle: {
      fontWeight: VARIABLE.fontRegular,
      fontSize: 16,
      color: VARIABLE.color20,
      lineHeight: '40px',
      marginBottom: 5
    },

    viewMoreGroup: {
      marginBottom: 12
    },

    htmlContent: {
      fontWeight: VARIABLE.fontLight,
      fontSize: 14,
      color: VARIABLE.color20,
      lineHeight: '20px'
    },

    viewMore: {
      fontSize: 14,
      color: VARIABLE.color8A,
      cursor: 'pointer'
    }
  },

  productDetail: {
    display: VARIABLE.display.flex,
    flexWrap: 'wrap',
    marginLeft: -10,
    marginRight: -10,

    inforWrap: combineStyle({
      MOBILE: [{ width: '100%' }] as any,
      DESKTOP: [{ width: '33%', marginBottom: 20 }] as any,
      GENERAL: [
        {
          display: VARIABLE.display.flex,
          paddingTop: 0,
          paddingBottom: 0,
          paddingLeft: 10,
          paddingRight: 10
        }
      ] as any
    }),

    infoGroup: {
      container: combineStyle({
        MOBILE: [
          {
            width: '100%',
            marginBottom: 10
          }
        ] as any,

        DESKTOP: [
          {
            width: '100%'
          }
        ] as any,

        GENERAL: [
          {
            display: VARIABLE.display.flex,
            border: `1px solid ${VARIABLE.colorF0}`,
            paddingTop: 10,
            paddingBottom: 10,
            paddingLeft: 10,
            paddingRight: 10,
            borderRadius: 8
          }
        ] as any
      }),

      imgWrap: {
        width: '30%',
        marginRight: 10,
        display: VARIABLE.display.flex,
        alignItems: 'center',
        justifyContent: 'center',

        img: combineStyle({
          MOBILE: [{}] as any,

          DESKTOP: [{}] as any,

          GENERAL: [
            {
              width: `100%`,
              height: 'auto'
            }
          ] as any
        })
      },

      info: {
        flex: 10,

        productName: {
          fontSize: 14,

          marginBottom: 10,
          color: VARIABLE.colorBlack,
          display: VARIABLE.display.block
        }
      }
    }
  },

  category: {
    width: `100%`,
    display: VARIABLE.display.flex,
    justifyContent: `flex-start`,
    marginBottom: 5,
    color: VARIABLE.colorBlack,

    title: {
      fontWeight: VARIABLE.fontLight,
      fontSize: 13,
      lineHeight: '20px',
      color: VARIABLE.color8A,
      width: 90
    },

    name: {
      fontWeight: VARIABLE.fontLight,
      fontSize: 13,
      lineHeight: '20px',
      color: VARIABLE.color20,

      brand: {
        color: VARIABLE.colorBlue,
        fontWeight: VARIABLE.fontSemiBold
      }
    }
  },

  tabContainer: {
    brandContainer: combineStyle({
      MOBILE: [
        {
          padding: '11px 0 0px',
          borderTop: `1px solid ${VARIABLE.colorF0}`
        }
      ] as any,
      DESKTOP: [
        {
          padding: '11px 0 15px',
          borderTop: `1px solid ${VARIABLE.colorF0}`,
          marginTop: 30
        }
      ] as any,
      GENERAL: [] as any
    })
  },

  individualInfo: combineStyle({
    MOBILE: [
      {
        flexDirection: 'column'
      }
    ] as any,
    DESKTOP: [{}] as any,
    GENERAL: [
      {
        display: VARIABLE.display.flex,
        paddingTop: 20,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 10,
        alignItems: 'center'
      }
    ] as any
  }),

  brandInfo: {
    group: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },

    brandImg: {
      width: 70,
      minWidth: 70,
      height: 'auto',
      maxHeight: 70,
      objectFit: 'contain',
      marginRight: 20
    },

    content: { flex: 1 },

    container: combineStyle({
      MOBILE: [
        {
          display: 'block'
        }
      ] as any,
      DESKTOP: [
        {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }
      ] as any,
      GENERAL: [
        {
          padding: 10,
          width: '100%'
        }
      ] as any
    }),

    image: combineStyle({
      MOBILE: [
        {
          width: '70%',
          margin: '0 auto  10px'
        }
      ] as any,
      DESKTOP: [
        {
          width: 200,
          marginRight: 20
        }
      ] as any,
      GENERAL: [{ height: 'auto', display: 'block' }] as any
    }),

    info: combineStyle({
      MOBILE: [{}] as any,
      DESKTOP: [{}] as any,
      GENERAL: [{}] as any
    }),
    name: {},
    description: {
      textAlign: 'justify' as const,
      fontSize: 14,
      lineHeight: '20px',
      fontWeight: VARIABLE.fontLight,
      color: VARIABLE.color20,
      display: '-webkit-box',
      WebkitBoxOrient: 'vertical',
      WebkitLineClamp: 2,
      overflow: 'hidden',
      flex: 1
    }
  }
} as any;
