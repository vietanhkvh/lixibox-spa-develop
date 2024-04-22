import * as LAYOUT from '../../../style/layout';
import * as VARIABLE from '../../../style/variable';

export default {
  display: 'block',
  backgroundColor: VARIABLE.colorBlack,
  paddingTop: 40,
  paddingRight: 0,
  paddingBottom: 40,
  paddingLeft: 0,

  container: LAYOUT.flexContainer.wrap,

  col: {
    overflow: 'hidden',
    position: VARIABLE.position.relative
  },

  bigCol: {
    width: '34%'
  },

  smallCol: {
    width: '22%'
  },

  title: {
    width: '100%',
    fontSize: 22,
    lineHeight: '30px',
    color: VARIABLE.colorWhite09,

    marginBottom: 20
  },

  nav: {
    link: {
      display: VARIABLE.display.block,

      fontSize: 13,
      lineHeight: '32px',
      cursor: 'pointer',
      color: VARIABLE.colorWhite07
    }
  },

  payment: {
    paddingTop: 20,
    paddingRight: 0,
    paddingBottom: 20,
    paddingLeft: 0,

    description: {
      width: '100%',
      fontSize: 12,
      lineHeight: '20px',
      color: VARIABLE.color4D,
      textAlign: 'center' as const,
      marginBottom: 30
    },

    list: {
      width: '100%',
      textAlign: 'center' as const,
      marginBottom: 15,

      item: {
        display: 'inline-block',
        height: 35,
        width: 'auto',
        cursor: 'pointer',

        marginTop: 0,
        marginRight: 10,
        marginBottom: 0,
        marginLeft: 10
      }
    },

    mixpanel: {
      display: 'block',
      marginTop: 0,
      marginRight: 'auto',
      marginBottom: 0,
      marginLeft: 'auto',
      width: 114,
      height: 'auto',
      logo: {}
    }
  },

  logo: {
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 20,
    paddingLeft: 0,
    whiteSpace: 'nowrap',
    cursor: 'pointer',
    marginRight: 50,

    icon: {
      height: 180,
      width: 180,
      color: VARIABLE.colorWhite01,
      marginRight: 20,
      position: 'absolute',
      left: -40,
      top: 0
    },

    text: {
      width: 140,
      color: VARIABLE.colorWhite09,
      marginTop: 0,
      marginRight: 0,
      marginBottom: 0,
      marginLeft: 0
    }
  },

  text: {
    color: VARIABLE.colorWhite07,
    fontSize: 13,
    lineHeight: '22px',

    paddingRight: 30
  },

  subcribe: {
    display: VARIABLE.display.flex,
    height: 44,
    borderRadius: 4,
    border: `1px solid ${VARIABLE.colorWhite}`,
    marginTop: 30,
    marginBottom: 5,
    position: VARIABLE.position.relative,
    zIndex: VARIABLE.zIndex1,

    input: {
      flex: 10,
      height: 42,
      border: 'none',
      outline: 'none',
      paddingLeft: 10,
      paddingRight: 10
    },

    button: {
      borderRadius: 4,
      width: 42,
      height: 42,
      minWidth: 42,
      maxWidth: 42,
      color: VARIABLE.colorWhite,
      background: VARIABLE.colorTransparent,
      cursor: 'pointer',

      inner: {
        width: 16
      }
    }
  },

  hotline: {
    fontSize: 16,
    lineHeight: '30px',
    color: VARIABLE.colorWhite07,

    marginBottom: 10,

    phone: {
      color: VARIABLE.colorWhite,
      fontSize: 18,
      marginLeft: 10,
      marginBottom: 10
    }
  },

  iconList: {
    display: 'flex',
    width: '100%',
    position: VARIABLE.position.relative,
    zIndex: VARIABLE.zIndex1,
    marginLeft: -16,

    icon: {
      width: 50,
      height: 50,
      color: VARIABLE.colorWhite07,
      cursor: 'pointer',

      facebook: {
        backgroundColor: VARIABLE.colorTransparent,

        inner: {
          height: 24
        }
      },

      instagram: {
        backgroundColor: VARIABLE.colorTransparent,

        inner: {
          height: 24
        }
      },

      youtube: {
        backgroundColor: VARIABLE.colorTransparent,

        inner: {
          height: 22
        }
      },

      messager: {
        backgroundColor: VARIABLE.colorTransparent,

        inner: {
          height: 23
        }
      },

      pinterest: {
        backgroundColor: VARIABLE.colorTransparent,

        inner: {
          height: 24
        }
      },

      zalo: {
        backgroundColor: VARIABLE.colorTransparent,

        inner: {
          height: 25
        }
      }
    }
  },

  logoOverlay: {
    color: VARIABLE.colorWhite09,
    marginRight: 20,
    width: 240,
    height: 240,
    position: VARIABLE.position.absolute,
    opacity: 0.1,
    right: -70,
    top: -35
  },

  download: {
    width: '85%',
    paddingBottom: 20,
    zIndex: VARIABLE.zIndex1,
    position: VARIABLE.position.relative,
    display: 'flex',

    left: {
      width: '36%'
    },

    right: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      paddingLeft: 15,
      item: {
        height: 'auto'
      }
    },

    image: {
      transition: VARIABLE.transitionOpacity,
      display: VARIABLE.display.inlineBlock,
      width: '100%',
      height: 'auto'
    },

    qr: {
      borderRadius: 8,
      transition: VARIABLE.transitionOpacity,
      display: VARIABLE.display.inlineBlock,
      width: '100%',
      height: 'auto'
    }
  },

  referalLink: {
    background: VARIABLE.colorPink,
    color: VARIABLE.colorWhite07,
    // border: `1px solid ${VARIABLE.colorWhite05}`,
    display: VARIABLE.display.inlineBlock,
    paddingRight: 15,
    paddingLeft: 15,
    borderRadius: 15,
    lineHeight: '30px',
    height: 30,
    fontSize: 13,
    marginTop: 20,

    icon: {
      width: 10,
      height: 10,
      color: VARIABLE.colorWhite,
      display: VARIABLE.display.inlineBlock,
      marginRight: 8
    }
  }
} as any;
