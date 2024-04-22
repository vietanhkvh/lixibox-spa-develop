import { combineStyle } from '../../../../../../../utils/responsive';
import * as VARIABLE from '../../../../../../../style/variable';
import { CDN_ASSETS_PREFIX } from '../../../../../../../utils/uri';
const giftBackground = CDN_ASSETS_PREFIX('/cart/gift.jpg');

export default {
  container: () =>
    combineStyle({
      MOBILE: [{ paddingLeft: 10, paddingRight: 10 }] as any,
      DESKTOP: [{}] as any,

      GENERAL: [
        {
          display: 'block',
          borderRadius: 0,
          position: VARIABLE.position.relative,
          zIndex: VARIABLE.zIndex5
        }
      ] as any
    }),

  iconCollapse: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: '50%',
    background: VARIABLE.colorWhite,
    left: '50%',
    top: -20,
    marginLeft: -20,
    cursor: 'pointer',
    boxShadow: VARIABLE.shadowBlur,
    transition: VARIABLE.transitionNormal,
    transform: 'rotate(0)',

    icon: {
      color: VARIABLE.colorBlack,
      width: 15,
      height: 15
    }
  },

  cart: {
    container: () => ({
      paddingTop: 0,
      paddingRight: 15,
      paddingBottom: 0,
      paddingLeft: 15,
      marginBottom: 20
    }),

    tableInfo: {
      container: {
        overflow: 'hidden',
        transition: VARIABLE.transitionNormal,
        opacity: 1
      }
    },

    rowInfo: {
      borderBottom: `1px solid ${VARIABLE.colorE5}`,

      title: {
        fontSize: 14,
        lineHeight: '22px',
        paddingTop: 6,
        paddingBottom: 6,
        whiteSpace: 'nowrap',

        maxWidth: '40%'
      },

      value: {
        fontSize: 14,
        lineHeight: '22px',
        paddingTop: 6,
        paddingBottom: 6,
        textAlign: 'right' as const
      }
    },

    total: {
      borderTop: `2px solid ${VARIABLE.colorBlack}`,
      paddingTop: 22,
      position: 'relative',
      top: -1,
      transition: VARIABLE.transitionNormal,

      text: {
        textTransform: 'uppercase',
        fontSize: 18
      },

      price: {
        textTransform: 'uppercase',
        fontSize: 18,
        color: VARIABLE.colorPink
      }
    },
    button: {
      marginBottom: 12
    }
  },

  lixicoin: {
    paddingTop: 10,
    paddingRight: 12,
    paddingBottom: 12,
    paddingLeft: 12,
    opacity: 1,
    transition: VARIABLE.transitionNormal,
    visiblity: 'visible',
    overflow: 'hidden',
    height: 90,

    text: {
      fontSize: 14,
      lineHeight: '20px',
      textAlign: 'center' as const,

      color: VARIABLE.color4D
    },

    heading: {
      fontSize: 30,
      lineHeight: '40px',
      textAlign: 'center' as const,
      marginBottom: 8,

      color: VARIABLE.color4D
    }
  },

  discountCode: {
    padding: 15,

    icon: {
      width: 20,
      height: 20,
      background: VARIABLE.colorWhite,
      color: VARIABLE.colorBlack05,
      cursor: 'pointer'
    },

    innerIcon: {
      width: 8
    },

    iconGift: {
      width: 70,
      height: 70,
      position: 'absolute',
      bottom: 33,
      right: 12,
      backgroundImage: `url(${giftBackground})`,
      backgroundSize: '70px 70px'
    },

    productImage: {
      display: VARIABLE.display.flex,
      justifyContent: 'center',
      flexDirection: 'column',
      alignItems: 'center',
      width: 50,
      height: 50,
      minWidth: 50,
      position: VARIABLE.position.relative,
      zIndex: 50,
      background: VARIABLE.colorWhite,
      transition: VARIABLE.transitionNormal,
      opacity: 1,

      img: {
        maxWidth: '100%',
        maxHeight: '100%',
        textAlign: 'center' as const,
        backgroundColor: VARIABLE.colorF7
      }
    },

    value: {
      marginTop: 0,
      marginBottom: 0,
      fontSize: 20,
      lineHeight: '30px',
      paddingRight: 10,

      overflow: 'hidden',
      textOverflow: 'ellipsis',
      textTransform: 'uppercase'
    },

    input: {
      marginTop: 0,
      paddingTop: 0,
      marginBottom: 0,
      paddingBottom: 0
    },

    button: {
      display: VARIABLE.display.flex,
      width: 120,
      maxWidth: 120,
      marginLeft: 15,
      marginTop: 0,
      marginBottom: 0
    }
  },

  notShowDiscount: {
    marginBottom: 0
  },

  referralNotification: {
    display: VARIABLE.display.flex,
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 0,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    background: VARIABLE.colorRed,
    cursor: 'pointer',

    text: {
      color: VARIABLE.colorWhite,
      fontSize: 13,
      lineHeight: '22px'
    },

    icon: {
      marginLeft: 13,
      marginRight: 10,
      width: 44,
      height: 44,
      color: VARIABLE.colorWhite
    },

    innerIcon: {
      width: 18
    }
  },

  noteOutStock: {
    borderRadius: 0,
    color: VARIABLE.colorWhite,
    background: VARIABLE.colorRed,
    fontWeight: VARIABLE.fontBold,
    padding: 10,
    margin: `0 10px 15px`
  },

  giftContainer: {
    cursor: 'pointer',
    position: 'relative',
    borderBottom: `1px solid ${VARIABLE.colorF0}`,
    marginBottom: 0
  },

  giftDetailContainer: combineStyle({
    MOBILE: [
      {
        marginBottom: 10
      }
    ] as any,
    DESKTOP: [
      {
        marginBottom: 20
      }
    ] as any,
    GENERAL: [
      {
        cursor: 'pointer',
        position: 'relative'
      }
    ] as any
  }),

  byToGet: {
    container: {
      display: 'flex',
      cursor: 'pointer',
      flex: 10,
      minHeight: 70,
      justifyContent: 'space-between',

      content: {
        fontSize: 14,
        height: '100%',
        maxHeight: '100%',
        overflow: 'hidden',
        lineHeight: '18px',
        textAlign: 'left' as const,
        color: VARIABLE.color4D,
        maxWidth: 220,
        marginBottom: 15,
        zIndex: VARIABLE.zIndex5,

        price: {
          fontSize: 14,
          color: VARIABLE.colorRed
        },

        link: {
          marginTop: 5,

          color: VARIABLE.color75,
          textDecoration: 'underline',
          fontSize: 14
        }
      }
    },

    progress: {},

    text: {
      marginBottom: 20,
      fontSize: 10
    },

    hightLightText: {
      fontSize: 10
    },

    line: {
      width: '100%',
      height: 20,
      borderRadius: 10,
      backgroundColor: VARIABLE.colorE5,
      padding: '5px 35px 5px 5px',
      position: VARIABLE.position.relative
    },

    valueLine: {
      maxWidth: '100%',
      transition: VARIABLE.transitionNormal,
      width: 0,
      height: 10,
      borderRadius: 5,
      backgroundColor: VARIABLE.colorPink
    },

    imageContainer: {
      width: 40,
      height: 40,
      borderRadius: 20,
      padding: 5,
      position: VARIABLE.position.absolute,
      backgroundColor: VARIABLE.colorE5,
      right: 0,
      top: -10,

      full: {
        backgroundColor: VARIABLE.colorPink
      }
    },

    giftIcon: {
      width: 30,
      height: 30,
      borderRadius: 15,
      background: VARIABLE.colorWhite,
      color: VARIABLE.colorPink
    },

    innerGiftIcon: {
      width: 18
    },

    image: {
      width: 30,
      height: 30,
      borderRadius: 15,
      backgroundImage: `url(https://upload.lixibox.com/system/pictures/files/000/035/695/small/1539166357.png)`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }
  },

  gift: {
    display: 'flex',
    cursor: 'pointer',
    flex: 10,
    justifyContent: 'space-between',

    content: {
      fontSize: 14,
      lineHeight: '18px',
      color: VARIABLE.color4D,
      height: '100%',
      maxHeight: '100%',
      overflow: 'hidden',
      textAlign: 'left' as const,
      maxWidth: 220,
      zIndex: VARIABLE.zIndex5,

      link: {
        marginTop: 5,

        color: VARIABLE.color75,
        textDecoration: 'underline',
        fontSize: 14
      }
    }
  },

  suggestionCodeGroup: combineStyle({
    MOBILE: [{ marginBottom: 10 }] as any,
    DESKTOP: [{}] as any,

    GENERAL: [
      {
        borderRadius: 0,
        boxShadow: VARIABLE.shadowBlurSort,
        background: VARIABLE.colorWhite
      }
    ] as any
  }),

  inputCodeGroup: combineStyle({
    MOBILE: [{ marginBottom: 10 }] as any,

    DESKTOP: [
      {
        marginBottom: 20
      }
    ] as any,

    GENERAL: [
      {
        paddingTop: 15,
        paddingRight: 15,
        paddingBottom: 15,
        paddingLeft: 15
      }
    ] as any
  })
} as any;
