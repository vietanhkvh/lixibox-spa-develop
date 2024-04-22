import * as VARIABLE from '../../../../style/variable';
import { CDN_ASSETS_PREFIX } from '../../../../utils/uri';
const BG_IMAGE = CDN_ASSETS_PREFIX('/login/bg-blur.jpg');
export default {
  background: VARIABLE.colorWhite,
  minHeight: '100%',

  closePanel: {
    position: 'absolute',
    top: 0,
    right: 0,
    cursor: 'pointer',
    color: VARIABLE.colorWhite,
    width: 44,
    height: 44,
    zIndex: VARIABLE.zIndex9,

    inner: {
      width: 15
    }
  },

  loginPanel: {
    width: '100%',
    height: 150,
    backgroundImage: `url('${BG_IMAGE}')`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    boxShadow: VARIABLE.shadowInsetBottom,
    position: 'relative'
  },

  profilePanel: {
    position: 'relative',
    overflow: 'hidden',

    backgroundBlur: {
      zIndex: VARIABLE.zIndex1,
      position: 'absolute',
      top: 0,
      left: 0,
      height: '100%',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      width: '100%',
      filter: 'blur(20px)',
      transform: 'scale(1.2)'
    },

    container: {
      position: 'relative',
      zIndex: VARIABLE.zIndex5,
      backgroundColor: VARIABLE.colorBlack03,
      paddingTop: 40,
      boxShadow: VARIABLE.shadowInsetBottom
    },

    avatar: {
      width: 120,
      height: 120,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      borderRadius: '50%',
      marginBottom: 20,
      boxShadow: VARIABLE.shadowBlur
    },

    userName: {
      fontSize: 18,
      lineHeight: '24px',
      color: VARIABLE.colorWhite,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      marginBottom: 20,
      paddingTop: 0,
      paddingRight: 30,
      paddingBottom: 0,
      paddingLeft: 30,
      maxWidth: '100%'
    },

    listNavigation: {
      transition: VARIABLE.transitionNormal,
      overflow: 'hidden',

      item: {
        fontSize: 14,
        lineHeight: '32px',
        textAlign: 'center' as const,
        color: VARIABLE.colorWhite07
      }
    },

    toggleNavigation: {
      width: 40,
      height: 40,
      color: VARIABLE.colorWhite06,
      cursor: 'pointer',
      marginBottom: 10,

      inner: {
        width: 18
      }
    }
  },

  menu: {
    paddingTop: 20,
    paddingRight: 0,
    paddingBottom: 30,
    paddingLeft: 0,

    item: {
      height: 50,
      cursor: 'pointer',

      icon: {
        width: 60,
        height: 50,
        lineHeight: '50px',
        textAlign: 'center' as const,
        fontSize: 20,
        marginLeft: 20,
        color: VARIABLE.color75
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
          width: 50,
          height: 50,
          color: VARIABLE.color97,

          inner: {
            width: 18,
            height: 18
          }
        }
      },

      subContainer: {
        paddingTop: 0,
        paddingRight: 20,
        paddingBottom: 0,
        paddingLeft: 30,
        boxShadow: VARIABLE.shadowInsetMiddle,
        backgroundColor: VARIABLE.colorE5,
        overflow: 'hidden',
        transition: VARIABLE.transitionHeight,

        item: {
          height: 32,
          lineHeight: '32px',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          fontSize: 13,

          color: VARIABLE.color4D
        }
      }
    }
  },

  footerInfo: {
    logo: {
      height: 50,

      line: {
        width: 30,
        height: 50,
        color: VARIABLE.color2E,
        marginRight: 10,

        inner: {
          width: 30
        }
      },

      text: {
        width: 120,
        color: VARIABLE.color2E,

        inner: {
          width: 120
        }
      }
    },

    link: {
      background: VARIABLE.colorBlack,

      item: {
        color: VARIABLE.colorWhite07,
        fontSize: 12,
        lineHeight: '30px',
        paddingTop: 0,
        paddingRight: 15,
        paddingBottom: 0,
        paddingLeft: 15
      }
    }
  }
} as any;
